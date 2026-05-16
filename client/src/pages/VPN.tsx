import { motion, AnimatePresence } from "framer-motion";
import { Shield, Lock, Globe, Zap, Server, Eye, Cat, Box, Layers, Network, Wifi, KeyRound, Smartphone, ArrowRight, X, BookOpen, ExternalLink, MessageCircle, ChevronRight, Download } from "lucide-react";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SoftwareCard from "@/components/SoftwareCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

const VPN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028817801/XPqrZbAhRUKbe838GaNGdm/vpn-section-WrjXvJSgKzs7rbxWR9vAdL.webp";

/* ── VPN Premium ── */
const vpnPremiumList = [
  { title: "V2Box - V2ray Client", description: "Client V2Ray complet supportant Shadowsocks, VMess, Trojan, SSH, Ping Tunnel, Hysteria2, DNSTT. Gratuit, 94K+ évaluations, 4.7 étoiles.", category: "V2Ray Client", rating: 4.7, downloads: "94K+", version: "5.1", size: "145.7 MB", logo: "/manus-storage/v2box-logo_5cded4bc.jpg", downloadUrl: "https://apps.apple.com/us/app/v2box-v2ray-client/id6446814690" },
  { title: "ExpressVPN", description: "Accédez à du contenu mondial avec une vitesse ultra-rapide et un cryptage militaire.", category: "VPN Premium", rating: 4.7, downloads: "20K+", version: "12.0", size: "52 MB" },
  { title: "Surfshark", description: "VPN illimité pour tous vos appareils. Protection complète à prix abordable.", category: "VPN", rating: 4.6, downloads: "15K+", version: "4.2", size: "38 MB" },
  { title: "CyberGhost", description: "VPN facile à utiliser avec des serveurs optimisés pour le streaming et le P2P.", category: "VPN", rating: 4.5, downloads: "12K+", version: "8.4", size: "42 MB" },
  { title: "ProtonVPN", description: "VPN suisse axé sur la confidentialité avec un plan gratuit généreux.", category: "VPN Gratuit", rating: 4.4, downloads: "10K+", version: "3.1", size: "35 MB" },
  { title: "Private Internet Access", description: "VPN open-source avec une politique stricte de non-journalisation.", category: "VPN", rating: 4.3, downloads: "8K+", version: "3.5", size: "40 MB" },
];

/* ── VPN & Proxy Clients (from user screenshot) ── */
const vpnProxyList = [
  {
    title: "Clash Mi",
    description: "Based on mihomo core, powerful proxy client with advanced routing rules and protocol support.",
    category: "Proxy Client",
    rating: 4.7,
    downloads: "18K+",
    version: "2.8",
    size: "28 MB",
    icon: "🐱",
    tags: ["mihomo", "proxy", "rules"],
  },
  {
    title: "sing-box VT",
    description: "The universal proxy platform. Supports multiple protocols including Shadowsocks, VMess, Trojan, and more.",
    category: "Proxy Platform",
    rating: 4.8,
    downloads: "22K+",
    version: "1.9",
    size: "32 MB",
    icon: "📦",
    tags: ["universal", "multi-protocol", "proxy"],
  },
  {
    title: "Happ - Proxy Utility",
    description: "New level of security by Xray. Advanced proxy utility with Xray core for maximum privacy.",
    category: "Proxy Utility",
    rating: 4.5,
    downloads: "14K+",
    version: "3.2",
    size: "25 MB",
    icon: "🔷",
    tags: ["xray", "security", "proxy"],
  },
  {
    title: "Geph",
    description: "Open-source, privacy-first VPN. Designed to bypass censorship with strong encryption.",
    category: "VPN Open Source",
    rating: 4.6,
    downloads: "12K+",
    version: "4.9",
    size: "20 MB",
    icon: "🌊",
    tags: ["open-source", "privacy", "censorship"],
  },
  {
    title: "V2Box - V2ray Client",
    description: "V2ray / vmess / trojan / v2rayng. Full-featured V2Ray client with intuitive interface.",
    category: "V2Ray Client",
    rating: 4.7,
    downloads: "20K+",
    version: "5.1",
    size: "22 MB",
    icon: "🔴",
    tags: ["v2ray", "vmess", "trojan", "v2rayng"],
  },
  {
    title: "Hiddify Proxy & VPN",
    description: "VPN, Clash, SingBox, XRay, V2Ray. Multi-core proxy client supporting all major protocols.",
    category: "Multi-Protocol",
    rating: 4.8,
    downloads: "25K+",
    version: "2.5",
    size: "35 MB",
    icon: "📊",
    tags: ["clash", "singbox", "xray", "v2ray"],
  },
  {
    title: "AmneziaVPN",
    description: "Multi protocol VPN client. Self-hosted VPN with advanced obfuscation techniques.",
    category: "VPN Client",
    rating: 4.5,
    downloads: "10K+",
    version: "4.1",
    size: "30 MB",
    icon: "🔮",
    tags: ["multi-protocol", "self-hosted", "obfuscation"],
  },
  {
    title: "Streisand",
    description: "Flexible Proxy Client. Lightweight and versatile proxy tool with multiple protocol support.",
    category: "Proxy Client",
    rating: 4.4,
    downloads: "8K+",
    version: "2.3",
    size: "18 MB",
    icon: "⭐",
    tags: ["flexible", "lightweight", "proxy"],
  },
  {
    title: "Outline App",
    description: "Utilities. Created by Jigsaw (Google). Easy-to-use VPN that uses Shadowsocks protocol.",
    category: "VPN Utility",
    rating: 4.6,
    downloads: "15K+",
    version: "1.12",
    size: "24 MB",
    icon: "🟢",
    tags: ["jigsaw", "google", "shadowsocks"],
  },
];

type FilterTab = "all" | "premium" | "proxy";

export default function VPN() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");

  const vpnFeatures = [
    { icon: Lock, title: t("vpn.feat.encryption"), description: t("vpn.feat.encryptionDesc") },
    { icon: Globe, title: t("vpn.feat.servers"), description: t("vpn.feat.serversDesc") },
    { icon: Zap, title: t("vpn.feat.speed"), description: t("vpn.feat.speedDesc") },
    { icon: Eye, title: t("vpn.feat.logs"), description: t("vpn.feat.logsDesc") },
    { icon: Server, title: t("vpn.feat.devices"), description: t("vpn.feat.devicesDesc") },
    { icon: Shield, title: t("vpn.feat.killswitch"), description: t("vpn.feat.killswitchDesc") },
  ];

  const filterTabs: { id: FilterTab; label: string; count: number }[] = [
    { id: "all", label: "Tout", count: vpnPremiumList.length + vpnProxyList.length },
    { id: "premium", label: "VPN Premium", count: vpnPremiumList.length },
    { id: "proxy", label: "VPN & Proxy Clients", count: vpnProxyList.length },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="VPN & Proxy - Protection et Confidentialité en Ligne"
        description="Téléchargez les meilleurs VPN et Proxy : V2Box, ExpressVPN, Clash Mi, sing-box, Hiddify, Geph, AmneziaVPN, Streisand, Outline. Protégez votre vie privée."
        keywords="VPN, proxy, V2Box, V2Ray, ExpressVPN, Clash Mi, sing-box, Hiddify, AmneziaVPN, Geph, Streisand, Outline, Shadowsocks, Trojan, VMess, téléchargement VPN"
        path="/vpn"
      />


      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={VPN_IMG} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/90 to-background" />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary">{t("vpn.badge")}</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-[1.1]">
              {t("vpn.pageTitle").split("VPN")[0]}<span className="text-gradient">VPN</span>{t("vpn.pageTitle").split("VPN")[1] || ""} & Proxy
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              {t("vpn.pageDesc")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 border-y border-border bg-[oklch(0.13_0.02_250)]">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {vpnFeatures.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="text-center p-4 rounded-xl bg-white/[0.02] border border-border/50 hover:border-primary/30 transition-colors duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading text-xs font-semibold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="pt-16 pb-4">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">
              {t("vpn.allTitle")}
            </h2>
            <p className="text-muted-foreground mb-6">{t("vpn.allDesc")}</p>

            <div className="flex flex-wrap gap-3">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeFilter === tab.id
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "bg-white/[0.04] text-muted-foreground border border-border hover:border-primary/30 hover:text-foreground"
                  }`}
                >
                  {tab.label}
                  <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                    activeFilter === tab.id ? "bg-white/20" : "bg-white/[0.06]"
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* VPN Premium Section */}
      {(activeFilter === "all" || activeFilter === "premium") && (
        <section className="pb-16">
          <div className="container">
            {activeFilter === "all" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-[oklch(0.7_0.15_195)] flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground">VPN Premium</h3>
                  <p className="text-xs text-muted-foreground">Services VPN commerciaux de haute qualité</p>
                </div>
              </motion.div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {vpnPremiumList.map((vpn) => (
                <SoftwareCard key={vpn.title} {...vpn} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* VPN & Proxy Clients Section */}
      {(activeFilter === "all" || activeFilter === "proxy") && (
        <section className="pb-16">
          <div className="container">
            {activeFilter === "all" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-8 mt-8"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[oklch(0.7_0.15_195)] to-[oklch(0.6_0.2_280)] flex items-center justify-center">
                  <Network className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground">VPN & Proxy Clients</h3>
                  <p className="text-xs text-muted-foreground">Clients proxy avancés et VPN open-source</p>
                </div>
              </motion.div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {vpnProxyList.map((vpn, i) => (
                <motion.div
                  key={vpn.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04, ease: [0.23, 1, 0.32, 1] }}
                  className="glow-card group"
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-border/50 flex items-center justify-center text-2xl">
                          {vpn.icon}
                        </div>
                        <div>
                          <h3 className="font-heading text-base font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                            {vpn.title}
                          </h3>
                          <span className="text-xs text-[oklch(0.7_0.15_195)] font-medium">{vpn.category}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[oklch(0.82_0.15_90)]">
                        <span className="text-xs font-semibold">★ {vpn.rating}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {vpn.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {vpn.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-primary/10 text-primary border border-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/50 pt-4">
                      <div className="flex items-center gap-4">
                        <span>v{vpn.version}</span>
                        <span>{vpn.size}</span>
                        <span>{vpn.downloads}</span>
                      </div>
                      <button className="flex items-center gap-1 text-primary font-medium hover:gap-2 transition-all duration-200">
                        <span>Voir</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* V2Box Tutorial Section */}
      <section className="py-16 border-t border-border/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Tutoriel V2Box - V2ray Client</h2>
                <p className="text-sm text-muted-foreground">Guide complet d'installation et d'utilisation</p>
              </div>
            </div>
          </motion.div>

          {/* Tutorial Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glow-card overflow-hidden"
          >
            <div className="p-6 md:p-8">
              {/* App Info Header */}
              <div className="flex items-start gap-4 mb-6 pb-6 border-b border-border/30">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/20 flex items-center justify-center text-3xl shrink-0">
                  🔴
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-1">V2Box - V2ray Client</h3>
                  <p className="text-sm text-muted-foreground mb-2">V2ray / vmess / trojan / v2rayng</p>
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="flex items-center gap-1 text-amber-400">★ 4.7 <span className="text-muted-foreground">(94K)</span></span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-green-400">Gratuit</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">145.7 MB</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">iPhone, iPad, Mac</span>
                  </div>
                </div>
                <a
                  href="https://apps.apple.com/us/app/v2box-v2ray-client/id6446814690"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <Download className="w-4 h-4" />
                  App Store
                </a>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h4 className="font-heading text-lg font-semibold text-foreground mb-3">Description</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  V2Box est un client VPN/Proxy Internet supportant de multiples protocoles proxy : Shadowsocks, V2ray, VMess, Trojan, SSH, Socks, Ping Tunnel, Hysteria2 et DNSTT. Développé par techlaim, il offre une interface intuitive et des performances réseau inégalées.
                </p>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className="font-heading text-lg font-semibold text-foreground mb-3">Fonctionnalités</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    "Support serveurs personnalisés (Shadowsocks, V2ray, Trojan, VLess, VMess, SSH)",
                    "Support Reality (xray) & VLess Vision",
                    "Support SSH avec UDP Gateway (udpgw)",
                    "Support Ping Tunnel & Hysteria2",
                    "Support DNSTT Protocol (Multi DNS)",
                    "Chiffrement multiple : AES-128/192/256-GCM, Chacha20-IETF-Poly1305",
                    "Furtif et stable, aucune inscription requise",
                    "Aucun journal utilisateur sauvegardé",
                    "Sécurité Wi-Fi sur les hotspots publics",
                    "Protection IP et confidentialité réseau",
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-white/[0.02]">
                      <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Installation Steps */}
              <div className="mb-6">
                <h4 className="font-heading text-lg font-semibold text-foreground mb-3">Guide d'installation</h4>
                <div className="space-y-3">
                  {[
                    { step: 1, title: "Télécharger V2Box", desc: "Ouvrez l'App Store sur votre iPhone/iPad/Mac et recherchez 'V2Box - V2ray Client' ou cliquez sur le lien direct ci-dessus." },
                    { step: 2, title: "Installer l'application", desc: "Appuyez sur 'Obtenir' pour télécharger et installer l'application gratuitement (145.7 MB)." },
                    { step: 3, title: "Ouvrir V2Box", desc: "Lancez l'application. Aucune inscription ni connexion n'est requise." },
                    { step: 4, title: "Ajouter un serveur", desc: "Appuyez sur '+' pour ajouter un serveur. Vous pouvez entrer manuellement les détails ou importer via un lien d'abonnement (subscription URL)." },
                    { step: 5, title: "Configurer le protocole", desc: "Choisissez le protocole souhaité : VMess, VLess, Trojan, Shadowsocks, SSH, Hysteria2 ou DNSTT." },
                    { step: 6, title: "Se connecter", desc: "Sélectionnez votre serveur et appuyez sur le bouton de connexion. Autorisez la configuration VPN si demandé." },
                    { step: 7, title: "Vérifier la connexion", desc: "Vérifiez que l'icône VPN apparaît dans la barre d'état. Testez votre connexion en naviguant sur internet." },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-4 p-3 rounded-xl bg-white/[0.02] border border-border/30">
                      <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold text-primary">{item.step}</span>
                      </div>
                      <div>
                        <h5 className="text-sm font-semibold text-foreground mb-0.5">{item.title}</h5>
                        <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Protocols Supported */}
              <div className="mb-6">
                <h4 className="font-heading text-lg font-semibold text-foreground mb-3">Protocoles supportés</h4>
                <div className="flex flex-wrap gap-2">
                  {["Shadowsocks", "V2Ray", "VMess", "VLess", "Trojan", "SSH", "Socks5", "Ping Tunnel", "Hysteria2", "DNSTT", "Reality (xray)"].map((proto) => (
                    <span key={proto} className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                      {proto}
                    </span>
                  ))}
                </div>
              </div>

              {/* WhatsApp Help */}
              <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-8 h-8 text-green-400" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">Besoin d'aide pour la configuration ?</p>
                    <p className="text-xs text-muted-foreground">Contactez-nous sur WhatsApp pour une assistance personnalisée</p>
                  </div>
                  <a
                    href="https://wa.me/237673473230"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white text-sm font-medium transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Placeholder spaces for future VPN */}
      <section className="pb-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
              {t("vpn.spaceLabel")}s — Bientôt disponibles
            </h3>
            <p className="text-sm text-muted-foreground">D'autres VPN et clients proxy seront ajoutés prochainement.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={`vpn-placeholder-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 * i }}
                className="glow-card p-6 flex flex-col items-center justify-center min-h-[260px] border-dashed border-2 border-border"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="w-7 h-7 text-primary/50" />
                </div>
                <p className="text-sm text-muted-foreground text-center font-medium">
                  {t("vpn.spaceLabel")} #{i}
                </p>
                <p className="text-xs text-muted-foreground/60 text-center mt-1">
                  {t("vpn.spaceReady")}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
