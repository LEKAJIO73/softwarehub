import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";

export interface PublicUser {
  id: number;
  email: string | null;
  phone: string | null;
  name: string | null;
  avatarUrl: string | null;
  emailVerified: boolean;
  phoneVerified: boolean;
}

interface AuthContextValue {
  user: PublicUser | null;
  loading: boolean;
  googleEnabled: boolean;
  refresh: () => Promise<void>;
  loginEmail: (email: string, password: string) => Promise<void>;
  registerEmail: (email: string, password: string, name?: string) => Promise<void>;
  requestPhoneOtp: (phone: string) => Promise<void>;
  verifyPhoneOtp: (phone: string, code: string, name?: string) => Promise<void>;
  loginWithGoogle: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

async function api<T = unknown>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = (data && (data as any).error) || `Erreur ${res.status}`;
    throw new Error(msg);
  }
  return data as T;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [googleEnabled, setGoogleEnabled] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const data = await api<{ user: PublicUser | null }>("/api/auth/me");
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    fetch("/api/auth/config", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setGoogleEnabled(!!d.google))
      .catch(() => setGoogleEnabled(false));
  }, [refresh]);

  const loginEmail: AuthContextValue["loginEmail"] = async (email, password) => {
    const data = await api<{ user: PublicUser }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setUser(data.user);
  };

  const registerEmail: AuthContextValue["registerEmail"] = async (email, password, name) => {
    const data = await api<{ user: PublicUser }>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
    });
    setUser(data.user);
  };

  const requestPhoneOtp: AuthContextValue["requestPhoneOtp"] = async (phone) => {
    await api("/api/auth/phone/request-otp", {
      method: "POST",
      body: JSON.stringify({ phone }),
    });
  };

  const verifyPhoneOtp: AuthContextValue["verifyPhoneOtp"] = async (phone, code, name) => {
    const data = await api<{ user: PublicUser }>("/api/auth/phone/verify-otp", {
      method: "POST",
      body: JSON.stringify({ phone, code, name }),
    });
    setUser(data.user);
  };

  const loginWithGoogle = () => {
    window.location.href = "/api/auth/google";
  };

  const logout = async () => {
    await api("/api/auth/logout", { method: "POST" });
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        googleEnabled,
        refresh,
        loginEmail,
        registerEmail,
        requestPhoneOtp,
        verifyPhoneOtp,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
