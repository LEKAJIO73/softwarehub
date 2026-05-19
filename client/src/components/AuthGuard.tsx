import { useEffect, type ReactNode } from "react";
import { useLocation } from "wouter";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const PUBLIC_PATHS = ["/login", "/signup"];

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const [location, navigate] = useLocation();
  const isPublic = PUBLIC_PATHS.includes(location);

  useEffect(() => {
    if (!loading && !user && !isPublic) {
      navigate("/login", { replace: true });
    }
  }, [loading, user, isPublic, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // While the redirect is in-flight, don't flash the protected content.
  if (!user && !isPublic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return <>{children}</>;
}
