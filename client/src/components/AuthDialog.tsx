import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import AuthForm from "./AuthForm";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialMode?: "login" | "signup";
}

export default function AuthDialog({ open, onOpenChange, initialMode = "login" }: Props) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === "signup" ? "Créer un compte" : "Se connecter"}</DialogTitle>
          <DialogDescription>
            {mode === "signup"
              ? "Inscrivez-vous avec votre email, votre téléphone ou Google."
              : "Connectez-vous à votre compte Lekajio Software."}
          </DialogDescription>
        </DialogHeader>
        <AuthForm mode={mode} onSuccess={() => onOpenChange(false)} onSwitchMode={setMode} />
      </DialogContent>
    </Dialog>
  );
}
