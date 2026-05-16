import { Monitor, Sun, Moon, Check, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useTheme, type Theme } from "@/contexts/ThemeContext";
import { useFont, fonts, type FontChoice } from "@/contexts/FontContext";

export default function Settings() {
  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <header className="mb-10">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight">
            Paramètres
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Personnalisez l'apparence et la typographie du site.
          </p>
        </header>

        <Section title="Apparence">
          <ThemePicker />
        </Section>

        <Section title="Police">
          <FontPicker />
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-border py-6 first:border-t">
      <div className="flex items-center justify-between gap-6 flex-wrap">
        <h2 className="text-base font-medium">{title}</h2>
        <div className="ml-auto">{children}</div>
      </div>
    </section>
  );
}

// ─── Theme picker (3 icon-buttons grouped) ────────────────────────

function ThemePicker() {
  const { theme, setTheme } = useTheme();

  const options: { id: Theme; icon: React.ComponentType<{ className?: string }>; label: string }[] = [
    { id: "system", icon: Monitor, label: "Système" },
    { id: "light", icon: Sun, label: "Clair" },
    { id: "dark", icon: Moon, label: "Sombre" },
  ];

  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-muted border border-border">
      {options.map((opt) => {
        const Icon = opt.icon;
        const active = theme === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => setTheme(opt.id)}
            title={opt.label}
            aria-label={opt.label}
            aria-pressed={active}
            className={`w-9 h-9 inline-flex items-center justify-center rounded-md transition-all ${
              active
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="w-4 h-4" />
          </button>
        );
      })}
    </div>
  );
}

// ─── Font picker (dropdown) ───────────────────────────────────────

function FontPicker() {
  const { font, setFont, fontInfo } = useFont();
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!btnRef.current?.parentElement?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-base hover:bg-muted transition-colors"
        style={{ fontFamily: fontInfo.cssFamily }}
      >
        <span>{fontInfo.label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-64 rounded-lg border border-border bg-popover shadow-lg overflow-hidden z-20">
          {fonts.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => {
                setFont(f.id as FontChoice);
                setOpen(false);
              }}
              className="w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm text-left hover:bg-muted transition-colors"
              style={{ fontFamily: f.cssFamily }}
            >
              <span>{f.label}</span>
              {font === f.id && <Check className="w-4 h-4 text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
