import { useState } from "react";
import { LogIn, UserPlus, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AuthDialog from "./AuthDialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

export default function UserMenu({ compact = false }: { compact?: boolean }) {
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");

  if (loading) {
    return <div className="w-9 h-9 rounded-full bg-white/5 animate-pulse" />;
  }

  if (!user) {
    return (
      <>
        {!compact && (
          <button
            type="button"
            onClick={() => { setMode("login"); setOpen(true); }}
            className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <LogIn className="w-4 h-4" />
            Connexion
          </button>
        )}
        <button
          type="button"
          onClick={() => { setMode("signup"); setOpen(true); }}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-[oklch(0.65_0.2_250)] to-[oklch(0.7_0.15_195)] text-white text-sm font-semibold shadow-lg shadow-[oklch(0.65_0.2_250/0.3)] hover:shadow-[oklch(0.65_0.2_250/0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5"
        >
          <UserPlus className="w-4 h-4" />
          {compact ? "Inscription" : "S'inscrire"}
        </button>
        <AuthDialog open={open} onOpenChange={setOpen} initialMode={mode} />
      </>
    );
  }

  const label = user.name || user.email || user.phone || "Compte";
  const initials = (user.name || user.email || user.phone || "?").slice(0, 2).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
        >
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt={label} className="w-8 h-8 rounded-full object-cover" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[oklch(0.65_0.2_250)] to-[oklch(0.7_0.15_195)] flex items-center justify-center text-white text-xs font-semibold">
              {initials}
            </div>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="text-sm font-medium truncate">{label}</div>
          {user.email && user.name && <div className="text-xs text-muted-foreground truncate">{user.email}</div>}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <UserIcon className="w-4 h-4 mr-2" />
          Mon profil
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()}>
          <LogOut className="w-4 h-4 mr-2" />
          Se déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
