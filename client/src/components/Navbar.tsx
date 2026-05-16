import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Shield, Download, Wrench, Home, Bot, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
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
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-surface shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-18 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[oklch(0.7_0.15_195)] to-[oklch(0.65_0.2_250)] flex items-center justify-center shadow-lg shadow-[oklch(0.65_0.2_250/0.3)] group-hover:shadow-[oklch(0.65_0.2_250/0.5)] transition-shadow duration-300">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading text-xl font-bold text-foreground">
              Lekajio <span className="text-gradient">Software</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Language Selector + Auth */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageSelector />
            <UserMenu />
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSelector />
            <UserMenu compact />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="md:hidden glass-surface border-t border-border overflow-hidden"
          >
            <div className="container py-4 space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-3 border-t border-border">
                <Link
                  href="/logiciels"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-[oklch(0.65_0.2_250)] to-[oklch(0.7_0.15_195)] text-white text-sm font-semibold"
                >
                  <Download className="w-4 h-4" />
                  {t("nav.download")}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
