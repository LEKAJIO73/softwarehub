import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Shield } from "lucide-react";
import AuthForm from "@/components/AuthForm";
import { useAuth } from "@/contexts/AuthContext";

export default function Signup() {
  const { user } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-3 justify-center mb-8 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[oklch(0.7_0.15_195)] to-[oklch(0.65_0.2_250)] flex items-center justify-center shadow-lg shadow-[oklch(0.65_0.2_250/0.3)]">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="font-heading text-xl font-bold">
            Lekajio <span className="text-gradient">Software</span>
          </span>
        </Link>

        <div className="glass-surface rounded-2xl border border-border p-6 md:p-8">
          <h1 className="font-heading text-2xl font-bold mb-1">Créer un compte</h1>
          <p className="text-sm text-muted-foreground mb-6">Inscrivez-vous en quelques secondes.</p>

          <AuthForm
            mode="signup"
            onSuccess={() => navigate("/")}
            onSwitchMode={(m) => navigate(m === "login" ? "/login" : "/signup")}
          />
        </div>
      </div>
    </div>
  );
}
