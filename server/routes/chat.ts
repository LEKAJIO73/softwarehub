// @ts-nocheck
import { Router, type Request, type Response } from "express";
import Anthropic from "@anthropic-ai/sdk";

export const chatRouter = Router();

const SYSTEM_PROMPT = `Tu es l'assistant officiel de **Lekajio Software**, une plateforme proposant des logiciels professionnels, VPN premium, comptes IA (ChatGPT, Claude, Gemini), outils numériques et applications mobiles, accessibles à lekajio.com.

Catalogue principal :
- **VPN** : ExpressVPN, NordVPN, V2Box, Surfshark, etc. pour navigation sécurisée et accès mondial.
- **Logiciels** : Adobe Premiere, Photoshop, Windows 11 Pro, MATLAB, AutoCAD, IDM, Malwarebytes.
- **Outils** : utilitaires de productivité, sécurité, optimisation système.
- **IA** : abonnements ChatGPT Plus, Claude Pro, Gemini Advanced, Midjourney, Perplexity Pro.
- **Apps mobiles** : Android & iOS.

Ton rôle :
1. Conseiller les visiteurs pour trouver le logiciel/VPN/IA qui correspond à leurs besoins.
2. Expliquer les fonctionnalités, prix indicatifs, compatibilité.
3. Aider à l'installation ou au téléchargement si demandé.
4. Pour les questions hors catalogue, rester serviable mais rediriger doucement vers l'offre Lekajio.
5. Pour un contact humain (problème spécifique, paiement), inviter à WhatsApp : +237 673 473 230.

Style :
- Réponds dans la langue de l'utilisateur (français par défaut).
- Concis, chaleureux, professionnel.
- Utilise des listes et du markdown léger quand utile.
- Évite les emojis sauf si l'utilisateur en utilise.`;

chatRouter.post("/stream", async (req: Request, res: Response) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: "Chat IA non configuré (ANTHROPIC_API_KEY manquante)." });
  }

  const { messages } = req.body as { messages?: { role: "user" | "assistant"; content: string }[] };
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages requis" });
  }

  // Sanitize: keep only valid roles and trim content length
  const cleanMessages = messages
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .map((m) => ({ role: m.role, content: m.content.slice(0, 8000) }))
    .slice(-30);

  if (cleanMessages.length === 0 || cleanMessages[cleanMessages.length - 1].role !== "user") {
    return res.status(400).json({ error: "le dernier message doit être de l'utilisateur" });
  }

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no",
  });

  const send = (event: string, data: unknown) => {
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  };

  const client = new Anthropic({ apiKey });
  try {
    const stream = await client.messages.stream({
      model: "claude-haiku-4-5",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: cleanMessages,
    });

    for await (const event of stream) {
      if (event.type === "content_block_delta" && event.delta?.type === "text_delta") {
        send("delta", event.delta.text);
      }
    }
    send("done", {});
  } catch (e: any) {
    console.error("[chat]", e?.message || e);
    send("error", { message: e?.message || "erreur IA" });
  } finally {
    res.end();
  }
});
