import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { type Product, formatXAF } from "../../../shared/products";
import CheckoutModal from "./CheckoutModal";

interface Props {
  product: Product;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function BuyButton({ product, className = "", size = "md" }: Props) {
  const [open, setOpen] = useState(false);
  const sizeClasses =
    size === "lg"
      ? "h-12 px-6 text-base"
      : size === "sm"
      ? "h-9 px-3 text-sm"
      : "h-10 px-4 text-sm";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex items-center gap-2 ${sizeClasses} rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity ${className}`}
      >
        <ShoppingCart className="w-4 h-4" />
        Acheter — {formatXAF(product.priceXaf)}
      </button>

      <CheckoutModal open={open} onOpenChange={setOpen} product={product} />
    </>
  );
}
