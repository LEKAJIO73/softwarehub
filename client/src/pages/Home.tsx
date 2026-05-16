import { motion } from "framer-motion";
import { Shield, Download, Wrench, Play, Zap, Lock, Globe } from "lucide-react";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SoftwareCard from "@/components/SoftwareCard";
import VideoCard from "@/components/VideoCard";
import CategorySection from "@/components/CategorySection";
import StatsSection from "@/components/StatsSection";
import { useLanguage } from "@/contexts/LanguageContext";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028817801/XPqrZbAhRUKbe838GaNGdm/hero-banner-MJTP5cdZracmK4SsSmHvVs.webp";
const VPN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028817801/XPqrZbAhRUKbe838GaNGdm/vpn-section-WrjXvJSgKzs7rbxWR9vAdL.webp";
const SOFTWARE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028817801/XPqrZbAhRUKbe838GaNGdm/software-section-bVHuUvj9XgNem9PoUnMA5Q.webp";
const TOOLS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028817801/XPqrZbAhRUKbe838GaNGdm/tools-section-MZUy5GNAQ2dcaaxvSZg827.webp";
const DOWNLOAD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028817801/XPqrZbAhRUKbe838GaNGdm/download-section-H4nkyK7Mcg5dwkqYeDaX3b.webp";

const featuredSoftware = [
  { title: "V2Box - V2ray Client", description: "Client V2Ray complet : Shadowsocks, VMess, Trojan, SSH, Hysteria2, DNSTT. Gratuit et open-source.", category: "VPN", rating: 4.7, downloads: "94K+", version: "5.1", size: "145 MB", downloadUrl: "https://apps.apple.com/us/app/v2box-v2ray-client/id6446814690", logo: "/manus-storage/v2box-logo_5cded4bc.jpg" },
  { title: "ExpressVPN", description: "Accédez à du contenu mondial avec une vitesse ultra-rapide et un cryptage militaire.", category: "VPN", rating: 4.7, downloads: "20K+", version: "12.0", size: "52 MB", downloadUrl: "https://apps.apple.com/us/app/expressvpn/id886492891" },
  { title: "Adobe Premiere Pro", description: "Le logiciel de montage vidéo professionnel utilisé par les créateurs du monde entier.", category: "Vidéo", rating: 4.9, downloads: "15K+", version: "24.1", size: "1.8 GB", downloadUrl: "#" },
  { title: "Windows 11 Pro", description: "Le système d'exploitation nouvelle génération avec des fonctionnalités avancées.", category: "Système", rating: 4.6, downloads: "30K+", version: "23H2", size: "5.2 GB", downloadUrl: "#" },
  { title: "Malwarebytes Premium", description: "Protection avancée contre les malwares, ransomwares et menaces en ligne.", category: "Sécurité", rating: 4.7, downloads: "18K+", version: "4.6", size: "250 MB", downloadUrl: "#" },
  { title: "IDM - Internet Download Manager", description: "Accélérez vos téléchargements jusqu'à 5x avec la reprise et la planification.", category: "Utilitaire", rating: 4.8, downloads: "22K+", version: "6.42", size: "12 MB", downloadUrl: "#" },
];

const featuredVideos = [
  { title: "Comment installer et configurer V2Box V2ray en 2024", duration: "12:45", category: "Tutoriel VPN" },
  { title: "Top 10 des logiciels indispensables pour Windows", duration: "18:30", category: "Guide" },
  { title: "Sécuriser votre PC : Guide complet antivirus", duration: "15:20", category: "Sécurité" },
  { title: "Optimiser Windows 11 pour les performances", duration: "22:10", category: "Optimisation" },
];

export default function Home() {
  const { t } = useLanguage();

  const features = [
    { icon: Zap, title: t("features.speed"), description: t("features.speedDesc") },
    { icon: Lock, title: t("features.secure"), description: t("features.secureDesc") },
    { icon: Globe, title: t("features.global"), description: t("features.globalDesc") },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Accueil - Logiciels, VPN, IA & Outils Numériques"
        description="Lekajio Software : téléchargez les meilleurs logiciels professionnels, VPN premium, comptes IA (ChatGPT, Claude, Gemini) et outils numériques. Téléchargement rapide et sécurisé."
        keywords="Lekajio Software, logiciels, VPN, téléchargement, ChatGPT, Claude Pro, Gemini, MATLAB, Adobe, outils numériques, comptes IA, lekajio.com"
        path="/"
      />


      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
        </div>

        <div className="container relative z-10 pt-24">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-medium text-primary">{t("hero.badge")}</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] mb-6"
            >
              {t("hero.title1")}{" "}
              <span className="text-gradient">{t("hero.titleHighlight")}</span>
              <br />
              {t("hero.title2")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl"
            >
              {t("hero.description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="/logiciels"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[oklch(0.65_0.2_250)] to-[oklch(0.7_0.15_195)] text-white font-semibold shadow-xl shadow-[oklch(0.65_0.2_250/0.3)] hover:shadow-[oklch(0.65_0.2_250/0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="w-5 h-5" />
                {t("hero.cta1")}
              </a>
              <a
                href="/vpn"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/5 border border-border text-foreground font-semibold hover:bg-white/10 hover:border-primary/30 transition-all duration-300"
              >
                <Shield className="w-5 h-5" />
                {t("hero.cta2")}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-border/50"
            >
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{feature.title}</div>
                      <div className="text-xs text-muted-foreground">{feature.description}</div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsSection />

      {/* VPN Section */}
      <CategorySection
        title={t("vpn.title")}
        subtitle={t("vpn.badge")}
        icon={Shield}
        href="/vpn"
        image={VPN_IMG}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredSoftware
            .filter((s) => s.category === "VPN")
            .map((software) => (
              <SoftwareCard key={software.title} {...software} />
            ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="glow-card p-5 flex flex-col items-center justify-center min-h-[280px] border-dashed border-2 border-border"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Shield className="w-7 h-7 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              {t("vpn.comingSoon")}
            </p>
          </motion.div>
        </div>
      </CategorySection>

      {/* Software Section */}
      <CategorySection
        title={t("software.title")}
        subtitle={t("software.badge")}
        icon={Download}
        href="/logiciels"
        image={SOFTWARE_IMG}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredSoftware
            .filter((s) => s.category !== "VPN")
            .slice(0, 4)
            .map((software) => (
              <SoftwareCard key={software.title} {...software} />
            ))}
          {[1, 2].map((i) => (
            <motion.div
              key={`placeholder-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className="glow-card p-5 flex flex-col items-center justify-center min-h-[280px] border-dashed border-2 border-border"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Download className="w-7 h-7 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                {t("software.reserved")}
              </p>
            </motion.div>
          ))}
        </div>
      </CategorySection>

      {/* Video Section */}
      <section className="section-spacing relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.13_0.02_250)] via-background to-background" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[oklch(0.7_0.15_195)]/10 flex items-center justify-center">
                  <Play className="w-5 h-5 text-[oklch(0.7_0.15_195)]" />
                </div>
                <span className="text-xs font-medium uppercase tracking-wider text-[oklch(0.7_0.15_195)]">
                  {t("videos.badge")}
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                {t("videos.title")}
              </h2>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredVideos.map((video) => (
              <VideoCard key={video.title} {...video} />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={`video-placeholder-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 * i }}
                className="glow-card overflow-hidden border-dashed border-2 border-border"
              >
                <div className="aspect-video flex items-center justify-center bg-[oklch(0.14_0.02_250)]">
                  <Play className="w-10 h-10 text-muted-foreground/30" />
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground">{t("videos.spaceLabel")}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <CategorySection
        title={t("tools.title")}
        subtitle={t("tools.badge")}
        icon={Wrench}
        href="/outils"
        image={TOOLS_IMG}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <motion.div
              key={`tool-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              className="glow-card p-5 flex flex-col items-center justify-center min-h-[200px] border-dashed border-2 border-border"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <Wrench className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                {t("tools.spaceLabel")} #{i}
              </p>
              <p className="text-xs text-muted-foreground/60 text-center mt-1">
                {t("tools.spaceReady")}
              </p>
            </motion.div>
          ))}
        </div>
      </CategorySection>

      {/* Download CTA Section */}
      <section className="relative section-spacing overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={DOWNLOAD_IMG} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/80" />
        </div>
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-6">
              {t("cta.title").split(" ").map((word, i, arr) =>
                i === arr.length - 1 ? (
                  <span key={i} className="text-gradient">{word}</span>
                ) : (
                  <span key={i}>{word} </span>
                )
              )}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t("cta.description")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="/logiciels"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[oklch(0.65_0.2_250)] to-[oklch(0.7_0.15_195)] text-white font-semibold shadow-xl shadow-[oklch(0.65_0.2_250/0.3)] hover:shadow-[oklch(0.65_0.2_250/0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="w-5 h-5" />
                {t("cta.button")}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
