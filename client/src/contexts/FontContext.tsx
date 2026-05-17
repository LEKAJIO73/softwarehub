import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type FontChoice = "sans" | "serif" | "mono";

interface FontInfo {
  id: FontChoice;
  label: string;
  cssFamily: string;
}

export const fonts: FontInfo[] = [
  { id: "serif", label: "Times New Roman (par défaut)", cssFamily: "'Times New Roman', Times, 'Liberation Serif', Georgia, serif" },
  { id: "sans", label: "Inter (sans-serif)", cssFamily: "'Inter', system-ui, -apple-system, sans-serif" },
  { id: "mono", label: "Monospace", cssFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" },
];

interface FontContextType {
  font: FontChoice;
  setFont: (f: FontChoice) => void;
  fontInfo: FontInfo;
}

const FontContext = createContext<FontContextType | undefined>(undefined);
const STORAGE_KEY = "font";

export function FontProvider({ children }: { children: ReactNode }) {
  const [font, setFontState] = useState<FontChoice>(() => {
    if (typeof window === "undefined") return "serif";
    const stored = localStorage.getItem(STORAGE_KEY) as FontChoice | null;
    return stored ?? "serif";
  });

  useEffect(() => {
    const info = fonts.find((f) => f.id === font) ?? fonts[0];
    document.documentElement.style.setProperty("--font-body", info.cssFamily);
    document.body.style.fontFamily = info.cssFamily;
  }, [font]);

  const setFont = (f: FontChoice) => {
    localStorage.setItem(STORAGE_KEY, f);
    setFontState(f);
  };

  const fontInfo = fonts.find((f) => f.id === font) ?? fonts[0];

  return <FontContext.Provider value={{ font, setFont, fontInfo }}>{children}</FontContext.Provider>;
}

export function useFont() {
  const ctx = useContext(FontContext);
  if (!ctx) throw new Error("useFont must be used within FontProvider");
  return ctx;
}
