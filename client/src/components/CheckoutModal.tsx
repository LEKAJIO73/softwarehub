import { useState } from "react";
import { Loader2, Smartphone, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { type Product, formatXAF } from "../../../shared/products";

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  product: Product;
}

export default function CheckoutModal({ open, onOpenChange, product }: Props) {
  const { user } = useAuth();
  const [phone, setPhone] = useState(user?.phone || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/payments/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId: product.id, phone, email: user?.email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur de paiement");
      setCheckoutUrl(data.checkoutUrl);
      // Auto-redirect to Notch Pay hosted checkout
      window.location.href = data.checkoutUrl;
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Acheter — {product.name}</DialogTitle>
          <DialogDescription>
            {product.duration && `Durée : ${product.duration} · `}
            Total à payer : <span className="font-semibold text-foreground">{formatXAF(product.priceXaf)}</span>
          </DialogDescription>
        </DialogHeader>

        {!user ? (
          <div className="text-sm text-destructive">Vous devez être connecté pour acheter.</div>
        ) : checkoutUrl ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Si la redirection ne s'est pas faite automatiquement, cliquez ci-dessous :
            </p>
            <a
              href={checkoutUrl}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground"
            >
              <ExternalLink className="w-4 h-4" />
              Procéder au paiement
            </a>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="momo">Numéro Mobile Money</Label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="momo"
                  type="tel"
                  inputMode="tel"
                  required
                  placeholder="+237 6xx xx xx xx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-9"
                  autoComplete="tel"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Le paiement se fait via MTN MoMo ou Orange Money. Vous recevrez une demande de validation sur votre téléphone.
              </p>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" disabled={loading || !phone} className="w-full h-11">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Préparation du paiement…
                </>
              ) : (
                `Payer ${formatXAF(product.priceXaf)}`
              )}
            </Button>

            <p className="text-[11px] text-muted-foreground text-center">
              Paiement sécurisé par Notch Pay. Vous serez redirigé pour confirmer.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
