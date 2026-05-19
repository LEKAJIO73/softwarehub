// @ts-nocheck
import { Router, type Request, type Response } from "express";
import { eq } from "drizzle-orm";
import { db, schema } from "../db.js";
import { getProduct } from "../../shared/products.js";
import { readSession } from "../auth/jwt.js";

export const paymentsRouter = Router();

const NOTCHPAY_BASE = "https://api.notchpay.co";

function getKeys() {
  const publicKey = process.env.NOTCHPAY_PUBLIC_KEY;
  const privateKey = process.env.NOTCHPAY_PRIVATE_KEY;
  const hash = process.env.NOTCHPAY_HASH;
  if (!publicKey) return null;
  return { publicKey, privateKey, hash };
}

// ─── Initiate purchase ─────────────────────────────────────────────

paymentsRouter.post("/initiate", async (req: Request, res: Response) => {
  const sess = readSession(req);
  if (!sess) return res.status(401).json({ error: "Connectez-vous d'abord" });

  const keys = getKeys();
  if (!keys) return res.status(503).json({ error: "Paiement non configuré (NOTCHPAY_PUBLIC_KEY manquante)" });

  const { productId, phone, email } = req.body as { productId?: string; phone?: string; email?: string };
  const product = productId ? getProduct(productId) : undefined;
  if (!product) return res.status(400).json({ error: "Produit invalide" });
  if (!phone || !/^\+?[0-9]{8,15}$/.test(phone.replace(/\s/g, ""))) {
    return res.status(400).json({ error: "Numéro de téléphone invalide" });
  }

  const appOrigin = process.env.APP_ORIGIN || "http://localhost:3000";

  // Create order in pending state first
  const [order] = await db
    .insert(schema.orders)
    .values({
      userId: sess.uid,
      productId: product.id,
      productName: `${product.name}${product.duration ? ` (${product.duration})` : ""}`,
      amountXaf: product.priceXaf,
      phone: phone,
      status: "pending",
      provider: "notchpay",
    })
    .returning();

  // Call Notch Pay to create a payment
  try {
    const resp = await fetch(`${NOTCHPAY_BASE}/payments`, {
      method: "POST",
      headers: {
        Authorization: keys.publicKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: product.priceXaf,
        currency: "XAF",
        customer: { email: email || `user${sess.uid}@lekajio.com`, phone },
        description: `Lekajio Software — ${product.name}`,
        reference: `lekajio-${order.id}`,
        callback: `${appOrigin}/orders/${order.id}`,
      }),
    });
    const data = await resp.json();
    if (!resp.ok || !data?.transaction?.reference) {
      console.error("[notchpay/initiate]", data);
      await db.update(schema.orders).set({ status: "failed" }).where(eq(schema.orders.id, order.id));
      return res.status(502).json({ error: data?.message || "Échec de l'initiation du paiement" });
    }

    await db
      .update(schema.orders)
      .set({ providerRef: data.transaction.reference, checkoutUrl: data.authorization_url })
      .where(eq(schema.orders.id, order.id));

    res.json({
      orderId: order.id,
      reference: data.transaction.reference,
      checkoutUrl: data.authorization_url,
    });
  } catch (e: any) {
    console.error("[notchpay/initiate]", e?.message || e);
    await db.update(schema.orders).set({ status: "failed" }).where(eq(schema.orders.id, order.id));
    res.status(500).json({ error: "Erreur réseau lors de l'initiation du paiement" });
  }
});

// ─── Check order status ─────────────────────────────────────────────

paymentsRouter.get("/order/:id", async (req: Request, res: Response) => {
  const sess = readSession(req);
  if (!sess) return res.status(401).json({ error: "Connectez-vous" });

  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: "id invalide" });

  const [order] = await db.select().from(schema.orders).where(eq(schema.orders.id, id)).limit(1);
  if (!order || order.userId !== sess.uid) return res.status(404).json({ error: "Commande introuvable" });

  // If still pending and we have a provider ref, ask Notch Pay for fresh status
  if (order.status === "pending" && order.providerRef) {
    const keys = getKeys();
    if (keys) {
      try {
        const resp = await fetch(`${NOTCHPAY_BASE}/payments/${order.providerRef}`, {
          headers: { Authorization: keys.publicKey },
        });
        const data = await resp.json();
        const status = data?.transaction?.status;
        if (status === "complete") {
          await db
            .update(schema.orders)
            .set({ status: "paid", paidAt: new Date() })
            .where(eq(schema.orders.id, order.id));
          order.status = "paid";
        } else if (status === "failed" || status === "canceled") {
          await db.update(schema.orders).set({ status: "failed" }).where(eq(schema.orders.id, order.id));
          order.status = "failed";
        }
      } catch (e: any) {
        console.error("[notchpay/check]", e?.message || e);
      }
    }
  }

  res.json({ order });
});

// ─── Notch Pay webhook ──────────────────────────────────────────────

paymentsRouter.post("/webhook", async (req: Request, res: Response) => {
  const event = req.body as any;
  const reference = event?.data?.reference;
  const status = event?.data?.status;
  if (!reference) return res.status(400).json({ error: "missing reference" });

  // TODO: verify the X-Notch-Signature header against NOTCHPAY_HASH

  const [order] = await db.select().from(schema.orders).where(eq(schema.orders.providerRef, reference)).limit(1);
  if (!order) return res.status(404).json({ error: "order not found" });

  if (status === "complete" && order.status !== "paid") {
    await db
      .update(schema.orders)
      .set({ status: "paid", paidAt: new Date() })
      .where(eq(schema.orders.id, order.id));
  } else if ((status === "failed" || status === "canceled") && order.status === "pending") {
    await db.update(schema.orders).set({ status: "failed" }).where(eq(schema.orders.id, order.id));
  }

  res.json({ ok: true });
});

// ─── List the current user's orders ────────────────────────────────

paymentsRouter.get("/orders", async (req: Request, res: Response) => {
  const sess = readSession(req);
  if (!sess) return res.status(401).json({ error: "Connectez-vous" });
  const rows = await db
    .select()
    .from(schema.orders)
    .where(eq(schema.orders.userId, sess.uid))
    .orderBy(schema.orders.createdAt);
  res.json({ orders: rows.reverse() });
});
