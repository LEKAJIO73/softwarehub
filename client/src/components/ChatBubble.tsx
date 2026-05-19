import { useState, useRef, useEffect } from "react";
import { Send, X, Sparkles, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const INTRO: Msg = {
  role: "assistant",
  content:
    "Bonjour 👋 Je suis l'assistant Lekajio. Je peux vous aider à choisir un VPN, un logiciel, un compte IA, ou répondre à vos questions sur le catalogue. Que cherchez-vous ?",
};

export default function ChatBubble() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([INTRO]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || streaming) return;
    setInput("");

    const next: Msg[] = [...messages, { role: "user", content: text }, { role: "assistant", content: "" }];
    setMessages(next);
    setStreaming(true);

    try {
      const res = await fetch("/api/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(0, -1).filter((m) => m.content !== INTRO.content) }),
      });

      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({}));
        setMessages((cur) => {
          const copy = [...cur];
          copy[copy.length - 1] = { role: "assistant", content: `❌ ${err.error || "Erreur du chat"}` };
          return copy;
        });
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split("\n\n");
        buffer = events.pop() ?? "";
        for (const evt of events) {
          const lines = evt.split("\n");
          let event = "";
          let data = "";
          for (const l of lines) {
            if (l.startsWith("event: ")) event = l.slice(7).trim();
            else if (l.startsWith("data: ")) data += l.slice(6);
          }
          if (event === "delta") {
            try {
              const text = JSON.parse(data);
              setMessages((cur) => {
                const copy = [...cur];
                const last = copy[copy.length - 1];
                copy[copy.length - 1] = { role: "assistant", content: last.content + text };
                return copy;
              });
            } catch {}
          } else if (event === "error") {
            try {
              const err = JSON.parse(data);
              setMessages((cur) => {
                const copy = [...cur];
                copy[copy.length - 1] = { role: "assistant", content: `❌ ${err.message}` };
                return copy;
              });
            } catch {}
          }
        }
      }
    } catch (e) {
      setMessages((cur) => {
        const copy = [...cur];
        copy[copy.length - 1] = { role: "assistant", content: `❌ ${(e as Error).message}` };
        return copy;
      });
    } finally {
      setStreaming(false);
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fermer le chat" : "Ouvrir le chat IA"}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[oklch(0.65_0.2_250)] to-[oklch(0.55_0.22_280)] text-white shadow-xl shadow-[oklch(0.55_0.22_280/0.4)] hover:scale-105 active:scale-95 transition-transform flex items-center justify-center"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span key="s" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <Sparkles className="w-6 h-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="fixed bottom-24 right-5 z-50 w-[min(380px,calc(100vw-2.5rem))] h-[min(580px,calc(100vh-8rem))] rounded-2xl border border-border bg-popover text-popover-foreground shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-border flex items-center gap-3 bg-gradient-to-r from-[oklch(0.65_0.2_250)] to-[oklch(0.55_0.22_280)] text-white">
              <Sparkles className="w-5 h-5" />
              <div className="flex-1">
                <div className="text-sm font-semibold leading-none">Assistant Lekajio</div>
                <div className="text-[11px] opacity-80 mt-0.5">Propulsé par Claude</div>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === "user"
                      ? "ml-auto bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  }`}
                >
                  {m.content || (streaming && i === messages.length - 1 ? <span className="inline-flex items-center gap-1.5 opacity-70"><Loader2 className="w-3.5 h-3.5 animate-spin" />Réfléchit…</span> : "")}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-border p-3">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKey}
                  placeholder="Posez votre question…"
                  rows={1}
                  className="flex-1 resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 max-h-32"
                />
                <button
                  type="button"
                  onClick={send}
                  disabled={!input.trim() || streaming}
                  aria-label="Envoyer"
                  className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity shrink-0"
                >
                  {streaming ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1.5 text-center">L'IA peut se tromper. Vérifiez les infos importantes.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
