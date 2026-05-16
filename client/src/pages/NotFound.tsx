import { Link } from "wouter";
import { Home } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center px-4">
        <div className="font-heading text-8xl md:text-9xl font-bold text-gradient mb-4">
          404
        </div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
          {t("notfound.title")}
        </h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          {t("notfound.description")}
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[oklch(0.65_0.2_250)] to-[oklch(0.7_0.15_195)] text-white font-semibold shadow-lg shadow-[oklch(0.65_0.2_250/0.3)] hover:shadow-[oklch(0.65_0.2_250/0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Home className="w-4 h-4" />
            {t("notfound.back")}
          </Link>
        </div>
      </div>
    </div>
  );
}
