import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import { Loader2, CheckCircle2, XCircle, Clock, ArrowLeft } from "lucide-react";
import { formatXAF } from "../../../shared/products";

interface Order {
  id: number;
  productName: string;
  amountXaf: number;
  status: "pending" | "paid" | "failed" | "cancelled";
  createdAt: string;
  paidAt: string | null;
}

export default function OrderDetail() {
  const params = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    const poll = async () => {
      try {
        const res = await fetch(`/api/payments/order/${params.id}`, { credentials: "include" });
        const data = await res.json();
        if (data.order) setOrder(data.order);
        setLoading(false);
        // Re-poll if pending
        if (data.order?.status === "pending") {
          timer = setTimeout(poll, 4000);
        }
      } catch {
        setLoading(false);
      }
    };
    poll();
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Commande introuvable.
      </div>
    );
  }

  const Icon =
    order.status === "paid" ? CheckCircle2 : order.status === "failed" ? XCircle : Clock;
  const tone =
    order.status === "paid" ? "text-green-700" : order.status === "failed" ? "text-red-700" : "text-amber-600";

  const label =
    order.status === "paid"
      ? "Paiement confirmé"
      : order.status === "failed"
      ? "Paiement échoué"
      : "Paiement en attente…";

  return (
    <div className="min-h-screen px-6 md:px-12 py-12">
      <div className="max-w-md mx-auto text-center">
        <Link href="/orders" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" />
          Mes commandes
        </Link>

        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted ${tone} mb-6`}>
          <Icon className="w-10 h-10" />
        </div>
        <h1 className="font-heading text-3xl font-semibold mb-2">{label}</h1>
        <p className="text-muted-foreground mb-8">
          {order.productName} · {formatXAF(order.amountXaf)}
        </p>

        {order.status === "pending" && (
          <p className="text-sm text-muted-foreground">
            Validez le paiement sur votre téléphone (MTN MoMo / Orange Money). Cette page se met à jour automatiquement.
          </p>
        )}

        {order.status === "paid" && (
          <p className="text-sm text-muted-foreground">
            Merci ! Vous recevrez les détails par email / WhatsApp dans quelques minutes.
          </p>
        )}

        {order.status === "failed" && (
          <Link href="/" className="inline-block mt-4 text-primary hover:underline text-sm">
            Retourner à l'accueil
          </Link>
        )}
      </div>
    </div>
  );
}
