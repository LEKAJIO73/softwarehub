import { useState } from "react";
import { Mail, Phone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";

type Mode = "login" | "signup";

interface Props {
  mode: Mode;
  onSuccess?: () => void;
  onSwitchMode?: (m: Mode) => void;
}

export default function AuthForm({ mode, onSuccess, onSwitchMode }: Props) {
  const { loginEmail, registerEmail, requestPhoneOtp, verifyPhoneOtp, loginWithGoogle, googleEnabled } = useAuth();
  const [tab, setTab] = useState<"email" | "phone">("email");

  return (
    <div className="space-y-5">
      {googleEnabled && (
        <>
          <Button
            type="button"
            variant="outline"
            className="w-full h-11 gap-2"
            onClick={loginWithGoogle}
          >
            <GoogleIcon />
            Continuer avec Google
          </Button>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex-1 h-px bg-border" />
            ou
            <div className="flex-1 h-px bg-border" />
          </div>
        </>
      )}

      <Tabs value={tab} onValueChange={(v) => setTab(v as "email" | "phone")}>
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="email" className="gap-2"><Mail className="w-4 h-4" />Email</TabsTrigger>
          <TabsTrigger value="phone" className="gap-2"><Phone className="w-4 h-4" />Téléphone</TabsTrigger>
        </TabsList>
        <TabsContent value="email" className="mt-4">
          <EmailForm mode={mode} onSuccess={onSuccess} loginEmail={loginEmail} registerEmail={registerEmail} />
        </TabsContent>
        <TabsContent value="phone" className="mt-4">
          <PhoneForm mode={mode} onSuccess={onSuccess} requestPhoneOtp={requestPhoneOtp} verifyPhoneOtp={verifyPhoneOtp} />
        </TabsContent>
      </Tabs>

      {onSwitchMode && (
        <p className="text-sm text-center text-muted-foreground">
          {mode === "login" ? (
            <>Pas de compte ?{" "}
              <button type="button" className="text-primary hover:underline" onClick={() => onSwitchMode("signup")}>
                Créer un compte
              </button>
            </>
          ) : (
            <>Déjà un compte ?{" "}
              <button type="button" className="text-primary hover:underline" onClick={() => onSwitchMode("login")}>
                Se connecter
              </button>
            </>
          )}
        </p>
      )}
    </div>
  );
}

function EmailForm({
  mode,
  onSuccess,
  loginEmail,
  registerEmail,
}: {
  mode: Mode;
  onSuccess?: () => void;
  loginEmail: (e: string, p: string) => Promise<void>;
  registerEmail: (e: string, p: string, n?: string) => Promise<void>;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        await registerEmail(email, password, name || undefined);
      } else {
        await loginEmail(email, password);
      }
      onSuccess?.();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      {mode === "signup" && (
        <div className="space-y-1.5">
          <Label htmlFor="name">Nom (optionnel)</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </div>
      )}
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="password">Mot de passe</Label>
        <Input
          id="password"
          type="password"
          required
          minLength={mode === "signup" ? 8 : undefined}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
        />
        {mode === "signup" && <p className="text-xs text-muted-foreground">Au moins 8 caractères</p>}
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" disabled={loading} className="w-full h-11">
        {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
        {mode === "signup" ? "Créer mon compte" : "Se connecter"}
      </Button>
    </form>
  );
}

function PhoneForm({
  mode,
  onSuccess,
  requestPhoneOtp,
  verifyPhoneOtp,
}: {
  mode: Mode;
  onSuccess?: () => void;
  requestPhoneOtp: (p: string) => Promise<void>;
  verifyPhoneOtp: (p: string, c: string, n?: string) => Promise<void>;
}) {
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      await requestPhoneOtp(phone);
      setStep("code");
      setInfo("Code envoyé. En dev, regardez la console du serveur.");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const verify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await verifyPhoneOtp(phone, code, name || undefined);
      onSuccess?.();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (step === "phone") {
    return (
      <form onSubmit={send} className="space-y-3">
        {mode === "signup" && (
          <div className="space-y-1.5">
            <Label htmlFor="pname">Nom (optionnel)</Label>
            <Input id="pname" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          </div>
        )}
        <div className="space-y-1.5">
          <Label htmlFor="phone">Numéro de téléphone</Label>
          <Input
            id="phone"
            type="tel"
            required
            placeholder="+33612345678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
          />
          <p className="text-xs text-muted-foreground">Format international, ex : +33 6 12 34 56 78</p>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" disabled={loading} className="w-full h-11">
          {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
          Recevoir le code
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={verify} className="space-y-3">
      <p className="text-sm text-muted-foreground">Code envoyé à <span className="font-medium text-foreground">{phone}</span></p>
      <div className="space-y-1.5">
        <Label htmlFor="code">Code à 6 chiffres</Label>
        <Input
          id="code"
          inputMode="numeric"
          pattern="\d{6}"
          maxLength={6}
          required
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
          autoComplete="one-time-code"
        />
      </div>
      {info && <p className="text-xs text-muted-foreground">{info}</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}
      <div className="flex gap-2">
        <Button type="button" variant="outline" className="flex-1" onClick={() => setStep("phone")}>
          Retour
        </Button>
        <Button type="submit" disabled={loading} className="flex-1 h-11">
          {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
          Valider
        </Button>
      </div>
    </form>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.56c2.08-1.92 3.28-4.74 3.28-8.1Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.77c-.99.66-2.25 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.46 1.18 4.93l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.07l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z" />
    </svg>
  );
}
