import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Shield, Download, Wrench, Home, Bot, Smartphone, Settings as SettingsIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";
import UserMenu from "./UserMenu";

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const { t } = useLanguage();

  const navLinks = [
    { href: "/", label: t("nav.home"), icon: Home },
    { href: "/vpn", label: t("nav.vpn"), icon: Shield },
    { href: "/logiciels", label: t("nav.software"), icon: Download },
    { href: "/outils", label: t("nav.tools"), icon: Wrench },
    { href: "/ia", label: t("nav.ai"), icon: Bot },
    { href: "/applications", label: "Apps", icon: Smartphone },
    { href: "/parametres", label: "Paramètres", icon: SettingsIcon },
  ];

  const SidebarContent = ({ onNavigate }: { onNavigate?: () => void }) => (
    <>
      <Link
        href="/"
        onClick={onNavigate}
        className="flex items-center gap-3 px-4 py-5 border-b border-border"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[oklch(0.7_0.15_195)] to-[oklch(0.65_0.2_250)] flex items-center justify-center shadow-lg shadow-[oklch(0.65_0.2_250/0.3)]">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <span className="font-heading text-lg font-bold text-foreground leading-tight">
          Lekajio <span className="text-gradient">Software</span>
        </span>
      </Link>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-primary rounded-r-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3 space-y-2">
        <LanguageSelector />
        <div className="flex items-center justify-end">
          <UserMenu />
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col fixed top-0 left-0 bottom-0 w-64 glass-surface border-r border-border z-40">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 glass-surface border-b border-border">
        <div className="flex items-center justify-between px-4 h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[oklch(0.7_0.15_195)] to-[oklch(0.65_0.2_250)] flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading text-base font-bold">
              Lekajio <span className="text-gradient">Software</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <UserMenu compact />
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-lg hover:bg-white/5"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="md:hidden fixed top-0 left-0 bottom-0 w-72 glass-surface border-r border-border z-50 flex flex-col"
            >
              <div className="flex items-center justify-end p-2">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/5"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <SidebarContent onNavigate={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
