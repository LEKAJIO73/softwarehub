import { useEffect, useState } from "react";
import { Loader2, CheckCircle2, XCircle, Clock } from "lucide-react";
import { formatXAF } from "../../../shared/products";

interface Order {
  id: number;
  productName: string;
  amountXaf: number;
  currency: string;
  status: "pending" | "paid" | "failed" | "cancelled";
  createdAt: string;
  paidAt: string | null;
  checkoutUrl?: string | null;
}

const STATUS: Record<Order["status"], { label: string; icon: React.ComponentType<{ className?: string }>; cls: string }> = {
  pending: { label: "En attente", icon: Clock, cls: "text-amber-600 bg-amber-50 border-amber-200" },
  paid: { label: "Payée", icon: CheckCircle2, cls: "text-green-700 bg-green-50 border-green-200" },
  failed: { label: "Échouée", icon: XCircle, cls: "text-red-700 bg-red-50 border-red-200" },
  cancelled: { label: "Annulée", icon: XCircle, cls: "text-muted-foreground bg-muted border-border" },
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    fetch("/api/payments/orders", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setOrders(d.orders || []))
      .catch(() => setOrders([]));
  }, []);

  return (
    <div className="min-h-screen px-6 md:px-12 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-heading text-3xl md:text-4xl font-semibold mb-2">Mes commandes</h1>
        <p className="text-sm text-muted-foreground mb-8">Historique de vos achats sur Lekajio Software.</p>

        {orders === null ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            Aucune commande pour le moment.
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((o) => {
              const s = STATUS[o.status];
              const Icon = s.icon;
              return (
                <div key={o.id} className="rounded-xl border border-border bg-card p-4 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{o.productName}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {new Date(o.createdAt).toLocaleString("fr-FR")} · #{o.id}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{formatXAF(o.amountXaf)}</div>
                    <div className={`inline-flex items-center gap-1 text-xs mt-1 px-2 py-0.5 rounded-full border ${s.cls}`}>
                      <Icon className="w-3 h-3" />
                      {s.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
