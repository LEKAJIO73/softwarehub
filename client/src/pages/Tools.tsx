import { motion } from "framer-motion";
import { Wrench, Cpu, HardDrive, Wifi, Battery, Key, Palette, Monitor } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SoftwareCard from "@/components/SoftwareCard";
import { useLanguage } from "@/contexts/LanguageContext";

const TOOLS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028817801/XPqrZbAhRUKbe838GaNGdm/tools-section-MZUy5GNAQ2dcaaxvSZg827.webp";

const toolsList = [
  { title: "CPU-Z", description: "Informations détaillées sur votre processeur, mémoire et carte mère.", category: "Diagnostic", rating: 4.7, downloads: "15K+", version: "2.08", size: "2 MB" },
  { title: "HWMonitor", description: "Surveillez les températures, voltages et ventilateurs de votre PC en temps réel.", category: "Monitoring", rating: 4.6, downloads: "12K+", version: "1.52", size: "1.5 MB" },
  { title: "CrystalDiskInfo", description: "Vérifiez la santé de vos disques durs et SSD avec des rapports SMART.", category: "Disque", rating: 4.5, downloads: "10K+", version: "9.2", size: "5 MB" },
  { title: "Rufus", description: "Créez des clés USB bootables pour installer Windows ou Linux facilement.", category: "Utilitaire", rating: 4.9, downloads: "30K+", version: "4.3", size: "1.4 MB" },
  { title: "7-Zip", description: "Compression et décompression de fichiers avec un taux de compression élevé.", category: "Archive", rating: 4.8, downloads: "25K+", version: "23.01", size: "1.5 MB" },
  { title: "Bitwarden", description: "Gestionnaire de mots de passe open-source et sécurisé pour tous vos comptes.", category: "Sécurité", rating: 4.8, downloads: "18K+", version: "2024.2", size: "120 MB" },
];

export default function Tools() {
  const { t } = useLanguage();

  const toolCategories = [
    { icon: Cpu, title: t("tools.cat.diagnostic"), description: t("tools.cat.diagnosticDesc"), count: "5" },
    { icon: HardDrive, title: t("tools.cat.disk"), description: t("tools.cat.diskDesc"), count: "4" },
    { icon: Wifi, title: t("tools.cat.network"), description: t("tools.cat.networkDesc"), count: "6" },
    { icon: Battery, title: t("tools.cat.optimization"), description: t("tools.cat.optimizationDesc"), count: "7" },
    { icon: Key, title: t("tools.cat.passwords"), description: t("tools.cat.passwordsDesc"), count: "3" },
    { icon: Palette, title: t("tools.cat.design"), description: t("tools.cat.designDesc"), count: "4" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Outils Numériques - Productivité et Performance"
        description="Découvrez les meilleurs outils numériques : CPU-Z, HWMonitor, CrystalDiskInfo, Rufus, 7-Zip, Bitwarden. Téléchargement gratuit et sécurisé."
        keywords="outils numériques, CPU-Z, HWMonitor, Rufus, 7-Zip, Bitwarden, diagnostic PC, outils gratuits, téléchargement outils"
        path="/outils"
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={TOOLS_IMG} alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/90 to-background" />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[oklch(0.7_0.15_195)]/10 border border-[oklch(0.7_0.15_195)]/20 mb-6">
              <Wrench className="w-4 h-4 text-[oklch(0.7_0.15_195)]" />
              <span className="text-xs font-medium text-[oklch(0.7_0.15_195)]">{t("tools.badge")}</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-[1.1]">
              {t("tools.pageTitle")}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              {t("tools.pageDesc")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tool Categories */}
      <section className="py-16 border-y border-border bg-[oklch(0.13_0.02_250)]">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {toolCategories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="glow-card p-4 text-center cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.7_0.15_195)]/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-[oklch(0.7_0.15_195)]" />
                  </div>
                  <h3 className="font-heading text-xs font-semibold text-foreground mb-1">{cat.title}</h3>
                  <p className="text-xs text-muted-foreground">{cat.count}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="section-spacing">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">
              {t("tools.allTitle")}
            </h2>
            <p className="text-muted-foreground">{t("tools.allDesc")}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolsList.map((tool) => (
              <SoftwareCard key={tool.title} {...tool} />
            ))}
          </div>

          {/* Large placeholder grid for future tools */}
          <div className="mt-12">
            <h3 className="font-heading text-xl font-semibold text-foreground mb-6">
              {t("tools.comingSoon")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: 12 }, (_, i) => (
                <motion.div
                  key={`tool-placeholder-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.03 * i }}
                  className="glow-card p-5 flex flex-col items-center justify-center min-h-[200px] border-dashed border-2 border-border"
                >
                  <div className="w-12 h-12 rounded-xl bg-[oklch(0.7_0.15_195)]/10 flex items-center justify-center mb-3">
                    <Wrench className="w-6 h-6 text-[oklch(0.7_0.15_195)]/50" />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    {t("tools.spaceLabel")} #{i + 1}
                  </p>
                  <p className="text-xs text-muted-foreground/60 text-center mt-1">
                    {t("tools.spaceReady")}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Placeholder */}
      <section className="section-spacing border-t border-border">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">
              {t("tools.gallery")}
            </h2>
            <p className="text-muted-foreground">{t("tools.galleryDesc")}</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }, (_, i) => (
              <motion.div
                key={`photo-${i}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.03 * i }}
                className="aspect-video rounded-xl bg-[oklch(0.14_0.02_250)] border-2 border-dashed border-border flex items-center justify-center group hover:border-primary/30 transition-colors duration-300"
              >
                <div className="text-center">
                  <Monitor className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground/50">{t("tools.photo")} #{i + 1}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
