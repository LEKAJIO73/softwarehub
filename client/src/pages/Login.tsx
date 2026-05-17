import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import AuthForm from "@/components/AuthForm";
import WhatsappIcon from "@/components/WhatsappIcon";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const { user } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const params = new URLSearchParams(window.location.search);
  const rawError = params.get("error");
  const error = rawError && rawError !== "google_not_configured" ? rawError : null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-3 justify-center mb-8 group">
          <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 flex items-center justify-center">
            <WhatsappIcon className="w-6 h-6 text-[#25D366]" />
          </div>
          <span className="font-heading text-xl font-bold">
            Lekajio <span className="text-gradient">Software</span>
          </span>
        </Link>

        <div className="glass-surface rounded-2xl border border-border p-6 md:p-8">
          <h1 className="font-heading text-2xl font-bold mb-1">Se connecter</h1>
          <p className="text-sm text-muted-foreground mb-6">Accédez à votre espace.</p>

          {error && (
            <div className="mb-4 p-3 rounded-lg border border-destructive/40 bg-destructive/10 text-sm text-destructive">
              La connexion Google a échoué ({error}). Réessayez.
            </div>
          )}

          <AuthForm
            mode="login"
            onSuccess={() => navigate("/")}
            onSwitchMode={(m) => navigate(m === "signup" ? "/signup" : "/login")}
          />
        </div>
      </div>
    </div>
  );
}
