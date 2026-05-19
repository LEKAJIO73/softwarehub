import { useState } from "react";
import { Shield, Download, Wrench, Bot, Smartphone } from "lucide-react";
import { products, formatXAF, type Product, type ProductCategory } from "../../../shared/products";
import BuyButton from "@/components/BuyButton";

const CATEGORIES: { id: ProductCategory | "all"; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "all", label: "Tout", icon: Download },
  { id: "vpn", label: "VPN", icon: Shield },
  { id: "software", label: "Logiciels", icon: Download },
  { id: "tools", label: "Outils", icon: Wrench },
  { id: "ai", label: "IA", icon: Bot },
  { id: "apps", label: "Apps", icon: Smartphone },
];

export default function Catalogue() {
  const [cat, setCat] = useState<ProductCategory | "all">("all");
  const filtered = cat === "all" ? products : products.filter((p) => p.category === cat);

  return (
    <div className="min-h-screen px-6 md:px-12 py-12">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold mb-2">Catalogue</h1>
          <p className="text-sm text-muted-foreground">
            Tous nos produits avec leurs tarifs. Paiement sécurisé via MTN Mobile Money ou Orange Money.
          </p>
        </header>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((c) => {
            const Icon = c.icon;
            const active = cat === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCat(c.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium border transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:text-foreground"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">Aucun produit dans cette catégorie.</div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-heading text-lg font-semibold leading-tight">{product.name}</h3>
        <span className="px-2 py-0.5 rounded-full text-[10px] uppercase font-medium bg-muted text-muted-foreground tracking-wide">
          {product.category}
        </span>
      </div>
      {product.duration && (
        <div className="text-xs text-muted-foreground">Durée : {product.duration}</div>
      )}
      <div className="text-2xl font-semibold text-foreground mt-auto">{formatXAF(product.priceXaf)}</div>
      <BuyButton product={product} className="w-full justify-center" />
    </div>
  );
}
