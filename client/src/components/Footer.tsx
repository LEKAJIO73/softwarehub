import { Link } from "wouter";
import { Brain, Mail, Phone, MessageCircle, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Icônes SVG personnalisées pour les réseaux sociaux
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  );
}

function WechatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.295.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.601-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-7.062-6.122zm-3.74 2.909c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm3.965 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
    </svg>
  );
}

export default function Footer() {
  const { t } = useLanguage();

  const socialLinks = [
    {
      href: "https://www.instagram.com/Lekajio",
      icon: <InstagramIcon className="w-4 h-4" />,
      label: "Instagram",
      color: "hover:text-pink-400 hover:bg-pink-400/10",
    },
    {
      href: "https://www.facebook.com/innocent.lekajio",
      icon: <FacebookIcon className="w-4 h-4" />,
      label: "Facebook",
      color: "hover:text-blue-400 hover:bg-blue-400/10",
    },
    {
      href: "https://www.tiktok.com/@Lekajio",
      icon: <TiktokIcon className="w-4 h-4" />,
      label: "TikTok",
      color: "hover:text-white hover:bg-white/10",
    },
    {
      href: "https://t.me/森特",
      icon: <Send className="w-4 h-4" />,
      label: "Telegram",
      color: "hover:text-sky-400 hover:bg-sky-400/10",
    },
    {
      href: "#wechat",
      icon: <WechatIcon className="w-4 h-4" />,
      label: "WeChat",
      color: "hover:text-green-400 hover:bg-green-400/10",
    },
  ];

  return (
    <footer className="relative border-t border-border bg-[oklch(0.1_0.02_250)]">
      <div className="container section-spacing">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <Brain className="w-9 h-9 text-[oklch(0.55_0.2_250)] shrink-0" strokeWidth={2.2} />
              <span className="font-heading text-xl font-bold">
                Lekajio <span className="text-gradient">Software</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              {t("footer.description")}
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-2 flex-wrap">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  className={`w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-muted-foreground transition-all duration-200 ${s.color}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-foreground mb-5">
              {t("footer.navigation")}
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: t("nav.home") },
                { href: "/vpn", label: t("nav.vpn") },
                { href: "/logiciels", label: t("nav.software") },
                { href: "/outils", label: t("nav.tools") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Catégories */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-foreground mb-5">
              {t("footer.categories")}
            </h4>
            <ul className="space-y-3">
              {[
                t("footer.antivirus"),
                t("footer.vpnPremium"),
                t("footer.videoEditors"),
                t("footer.systemTools"),
                t("footer.browsers"),
                t("footer.office"),
              ].map((item) => (
                <li key={item}>
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-foreground mb-5">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-3">
              {/* Emails */}
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="mailto:innocentlekajio9@gmail.com" className="hover:text-primary transition-colors duration-200 break-all">
                    innocentlekajio9@gmail.com
                  </a>
                  <a href="mailto:martinpiebeng@gmail.com" className="hover:text-primary transition-colors duration-200 break-all">
                    martinpiebeng@gmail.com
                  </a>
                </div>
              </li>

              {/* Téléphones */}
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+237673473230" className="hover:text-primary transition-colors duration-200">
                    +237 673 473 230
                  </a>
                  <a href="tel:+8615590141090" className="hover:text-primary transition-colors duration-200">
                    +86 155 9014 1090
                  </a>
                  <a href="tel:+8615009684790" className="hover:text-primary transition-colors duration-200">
                    +86 150 0968 4790
                  </a>
                </div>
              </li>

              {/* WeChat */}
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <WechatIcon className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground/70">WeChat</span>
                  <span>LEKAJIO73</span>
                  <span>L73473230</span>
                </div>
              </li>

              {/* Telegram */}
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Send className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground/70">Telegram</span>
                  <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors duration-200">
                    森特
                  </a>
                </div>
              </li>

              {/* Réseaux sociaux texte */}
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MessageCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="https://www.instagram.com/Lekajio" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors duration-200">
                    Instagram: Lekajio
                  </a>
                  <a href="https://www.facebook.com/innocent.lekajio" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-200">
                    Facebook: Innocent Lekajio
                  </a>
                  <a href="https://www.tiktok.com/@Lekajio" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors duration-200">
                    TikTok: Lekajio
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; 2025 Lekajio Software. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
              {t("footer.privacy")}
            </span>
            <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
              {t("footer.terms")}
            </span>
            <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
              {t("footer.legal")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
