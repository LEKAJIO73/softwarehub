import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Search, Grid, Monitor, Video, Shield as ShieldIcon, Wrench, FileText, Music, MessageCircle, BookOpen, ChevronRight, Phone, Cpu, BarChart3, Eye, Code2, Database, GraduationCap, Beaker, Settings2, DollarSign, CheckCircle, AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SoftwareCard from "@/components/SoftwareCard";
import { useLanguage } from "@/contexts/LanguageContext";

const SOFTWARE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028817801/XPqrZbAhRUKbe838GaNGdm/software-section-bVHuUvj9XgNem9PoUnMA5Q.webp";
const MATLAB_TUTORIAL_IMG = "/manus-storage/matlab-tutorial_d73b353e.png";

const softwareList = [
  { title: "MATLAB R2021b", description: "Logiciel de calcul numérique haute performance développé par MathWorks, intégrant analyse numérique, calcul matriciel, traitement du signal et affichage graphique.", category: "engineering", displayCategory: "Ingénierie", rating: 4.9, downloads: "20K+", version: "R2021b", size: "4.2 GB", hasTutorial: true },
  { title: "Adobe Premiere Pro", description: "Le logiciel de montage vidéo professionnel utilisé par les créateurs du monde entier.", category: "video", displayCategory: "Vidéo", rating: 4.9, downloads: "15K+", version: "24.1", size: "1.8 GB", hasTutorial: false },
  { title: "Windows 11 Pro", description: "Le système d'exploitation nouvelle génération avec des fonctionnalités avancées.", category: "system", displayCategory: "Système", rating: 4.6, downloads: "30K+", version: "23H2", size: "5.2 GB", hasTutorial: false },
  { title: "Malwarebytes Premium", description: "Protection avancée contre les malwares, ransomwares et menaces en ligne.", category: "security", displayCategory: "Sécurité", rating: 4.7, downloads: "18K+", version: "4.6", size: "250 MB", hasTutorial: false },
  { title: "IDM - Internet Download Manager", description: "Accélérez vos téléchargements jusqu'à 5x avec la reprise et la planification.", category: "utility", displayCategory: "Utilitaire", rating: 4.8, downloads: "22K+", version: "6.42", size: "12 MB", hasTutorial: false },
  { title: "Microsoft Office 2024", description: "Suite bureautique complète : Word, Excel, PowerPoint et plus encore.", category: "office", displayCategory: "Bureautique", rating: 4.8, downloads: "28K+", version: "2024", size: "3.5 GB", hasTutorial: false },
  { title: "DaVinci Resolve", description: "Logiciel de montage vidéo et d'étalonnage professionnel gratuit.", category: "video", displayCategory: "Vidéo", rating: 4.7, downloads: "12K+", version: "18.6", size: "2.1 GB", hasTutorial: false },
  { title: "Kaspersky Total Security", description: "Protection complète pour votre PC, Mac et appareils mobiles.", category: "security", displayCategory: "Sécurité", rating: 4.6, downloads: "14K+", version: "2024", size: "180 MB", hasTutorial: false },
  { title: "WinRAR", description: "L'utilitaire de compression et décompression de fichiers le plus populaire.", category: "utility", displayCategory: "Utilitaire", rating: 4.5, downloads: "35K+", version: "6.24", size: "3.5 MB", hasTutorial: false },
  { title: "VLC Media Player", description: "Lecteur multimédia gratuit et open-source qui lit tous les formats.", category: "media", displayCategory: "Multimédia", rating: 4.9, downloads: "40K+", version: "3.0.20", size: "42 MB", hasTutorial: false },
  { title: "CCleaner Professional", description: "Nettoyez et optimisez votre PC pour des performances maximales.", category: "utility", displayCategory: "Utilitaire", rating: 4.4, downloads: "20K+", version: "6.18", size: "35 MB", hasTutorial: false },
  { title: "Adobe Photoshop", description: "Le standard mondial de l'édition photo et du design graphique.", category: "media", displayCategory: "Multimédia", rating: 4.9, downloads: "25K+", version: "25.3", size: "2.4 GB", hasTutorial: false },
  { title: "VMware Workstation Pro", description: "Créez et exécutez des machines virtuelles sur votre PC.", category: "system", displayCategory: "Système", rating: 4.6, downloads: "8K+", version: "17.5", size: "600 MB", hasTutorial: false },
];

const matlabDetails = {
  intro: "MATLAB est un logiciel de calcul numérique haute performance développé par la société américaine MathWorks. Il intègre l'analyse numérique, le calcul matriciel, le traitement du signal et l'affichage graphique, et est largement utilisé dans la recherche scientifique, l'ingénierie et l'enseignement.",
  features: [
    { icon: "cpu", title: "Calcul numérique puissant", desc: "Prend en charge divers calculs numériques complexes : opérations matricielles, analyse numérique, calcul d'optimisation. Intègre un grand nombre de fonctions mathématiques et d'algorithmes pour résoudre rapidement tout type de problème mathématique." },
    { icon: "settings", title: "Boîtes à outils riches", desc: "Couvre le traitement du signal, le traitement d'images, les systèmes de contrôle, l'apprentissage automatique, le deep learning, la vision par ordinateur, la finance et bien d'autres domaines. Ces boîtes à outils fournissent des fonctions et algorithmes professionnels." },
    { icon: "eye", title: "Interface graphique intuitive", desc: "Offre des fonctions de traçage riches pour créer des graphiques 2D et 3D de haute qualité. Prend en charge les opérations interactives et l'analyse visuelle pour une compréhension intuitive des données et résultats." },
    { icon: "code", title: "Environnement de programmation efficace", desc: "Syntaxe concise et outils de programmation riches. Prend en charge la programmation par scripts et par fonctions. Compatible avec C, C++, Java et d'autres langages pour la programmation mixte." },
    { icon: "database", title: "Import/Export de données pratique", desc: "Prend en charge l'import et l'export de multiples formats : fichiers texte, fichiers Excel, fichiers MAT, facilitant l'échange de données avec d'autres logiciels." }
  ],
  applications: [
    { icon: "beaker", title: "Recherche scientifique", desc: "Physique, chimie, biologie, mathématiques — simulation numérique, analyse de données et modélisation." },
    { icon: "settings", title: "Ingénierie", desc: "Électronique, télécommunications, automatique, mécanique — conception, simulation et optimisation de systèmes." },
    { icon: "dollar", title: "Analyse financière", desc: "Modélisation financière, analyse de risques, optimisation de portefeuilles d'investissement." },
    { icon: "graduation", title: "Enseignement", desc: "Outil pédagogique dans les universités pour l'apprentissage des mathématiques et de l'ingénierie." }
  ],
  advantages: [
    "Fonctionnalités complètes : calcul numérique, traitement graphique et développement intégrés en une seule solution.",
    "Facile à apprendre : syntaxe concise, prise en main rapide sans bases approfondies en programmation.",
    "Communauté riche : vaste communauté d'utilisateurs avec de nombreux exemples de code, tutoriels et solutions.",
    "Support commercial fiable : développé et maintenu par une entreprise professionnelle avec un support technique réactif."
  ],
  limitations: [
    "Prix élevé : les licences commerciales sont relativement coûteuses pour les particuliers et petites entreprises.",
    "Efficacité de calcul limitée : pour les calculs à grande échelle, d'autres langages spécialisés peuvent être plus performants."
  ]
};

const tutorials = [
  {
    id: "matlab-r2021b",
    title: "MATLAB R2021b",
    subtitle: "Tutoriel d'installation",
    description: "Guide complet étape par étape pour installer MATLAB R2021b sur Windows. Suivez les captures d'écran ci-dessous pour une installation réussie.",
    image: MATLAB_TUTORIAL_IMG,
    steps: [
      "Téléchargez l'installateur MATLAB R2021b depuis le lien fourni",
      "Extrayez les fichiers avec WinRAR ou 7-Zip",
      "Lancez l'installateur (setup.exe) en tant qu'Administrateur",
      "Sélectionnez l'option 'Use a File Installation Key'",
      "Entrez la clé d'installation fournie",
      "Choisissez le dossier d'installation (par défaut : C:\\Program Files\\MATLAB\\R2021b)",
      "Sélectionnez les boîtes à outils dont vous avez besoin",
      "Acceptez le contrat de licence et cliquez sur Installer",
      "Attendez la fin de l'installation",
      "Copiez le fichier de licence dans le dossier d'installation",
      "Lancez MATLAB et activez-le avec la licence fournie"
    ],
    category: "engineering"
  }
];

export default function Software() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showTutorial, setShowTutorial] = useState<string | null>(null);
  const { t } = useLanguage();

  const categories = [
    { id: "all", label: t("cat.all"), icon: Grid },
    { id: "engineering", label: "Engineering", icon: Monitor },
    { id: "system", label: t("cat.system"), icon: Monitor },
    { id: "video", label: t("cat.video"), icon: Video },
    { id: "security", label: t("cat.security"), icon: ShieldIcon },
    { id: "utility", label: t("cat.utility"), icon: Wrench },
    { id: "office", label: t("cat.office"), icon: FileText },
    { id: "media", label: t("cat.media"), icon: Music },
  ];

  const filteredSoftware = softwareList.filter((s) => {
    const matchesCategory = activeCategory === "all" || s.category === activeCategory;
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeTutorial = tutorials.find(t => t.id === showTutorial);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Logiciels Professionnels - Téléchargement Sécurisé"
        description="Téléchargez MATLAB, Adobe Premiere Pro, Photoshop, Windows 11, Office 2024, IDM et plus. Tutoriels d'installation inclus. Contact WhatsApp disponible."
        keywords="logiciels, MATLAB, Adobe Premiere Pro, Photoshop, Windows 11, Office 2024, IDM, téléchargement logiciels, tutoriel installation"
        path="/logiciels"
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={SOFTWARE_IMG} alt="" className="w-full h-full object-cover opacity-15" />
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
              <Download className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary">{t("software.pageBadge")}</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-[1.1]">
              {t("software.pageTitle")}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              {t("software.pageDesc")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="sticky top-[72px] md:top-[80px] z-40 py-4 glass-surface border-b border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t("software.search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 w-full md:w-auto">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                      activeCategory === cat.id
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Software Grid */}
      <section className="section-spacing">
        <div className="container">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredSoftware.length} {t("software.found")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredSoftware.map((software) => (
              <div key={software.title} className="relative">
                <SoftwareCard
                  title={software.title}
                  description={software.description}
                  category={software.displayCategory}
                  rating={software.rating}
                  downloads={software.downloads}
                  version={software.version}
                  size={software.size}
                />
                {software.hasTutorial && (
                  <button
                    onClick={() => setShowTutorial("matlab-r2021b")}
                    className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-md bg-green-500/20 border border-green-500/30 text-green-400 text-[10px] font-medium hover:bg-green-500/30 transition-all"
                  >
                    <BookOpen className="w-3 h-3" />
                    Tutorial
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Placeholder spaces */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6">
            {Array.from({ length: 8 }, (_, i) => (
              <motion.div
                key={`sw-placeholder-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.03 * i }}
                className="glow-card p-5 flex flex-col items-center justify-center min-h-[240px] border-dashed border-2 border-border"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <Download className="w-6 h-6 text-primary/50" />
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  {t("software.spaceLabel")}
                </p>
                <p className="text-xs text-muted-foreground/60 text-center mt-1">
                  {t("software.spaceReady")}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Tutorials Section */}
      <section className="section-spacing border-t border-border">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
              <BookOpen className="w-4 h-4 text-green-400" />
              <span className="text-xs font-medium text-green-400">Installation Guides</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
              Installation Tutorials
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Step-by-step installation guides with screenshots. Contact us on WhatsApp for assistance.
            </p>
          </motion.div>

          {/* Tutorial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.map((tutorial) => (
              <motion.div
                key={tutorial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="glow-card overflow-hidden group cursor-pointer"
                onClick={() => setShowTutorial(tutorial.id)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={tutorial.image}
                    alt={tutorial.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.13_0.02_250)] to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="px-2 py-1 rounded-md bg-green-500/20 border border-green-500/30 text-green-400 text-[10px] font-medium">
                      {tutorial.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-1">{tutorial.title}</h3>
                  <p className="text-xs text-primary font-medium mb-2">{tutorial.subtitle}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{tutorial.description}</p>
                  <div className="flex items-center gap-2 mt-4 text-primary text-sm font-medium">
                    <span>View Tutorial</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Placeholder for more tutorials */}
            {Array.from({ length: 2 }, (_, i) => (
              <motion.div
                key={`tut-placeholder-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                className="glow-card p-5 flex flex-col items-center justify-center min-h-[320px] border-dashed border-2 border-border"
              >
                <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center mb-3">
                  <BookOpen className="w-7 h-7 text-green-400/50" />
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  More tutorials coming soon
                </p>
                <p className="text-xs text-muted-foreground/60 text-center mt-1">
                  Space reserved for new guides
                </p>
              </motion.div>
            ))}
          </div>

          {/* WhatsApp Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 glow-card p-8 md:p-10 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-green-500/10 to-green-500/5" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                Need Help Installing Software?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                Contact us on WhatsApp for personalized assistance with installation, activation, and troubleshooting.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://wa.me/237673473230"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold transition-all duration-200 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Phone className="w-5 h-5" />
                  WhatsApp: +237 673 473 230
                </a>
                <a
                  href="https://lekajio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground hover:bg-white/5 font-medium transition-all duration-200"
                >
                  Visit lekajio.com
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tutorial Modal */}
      {showTutorial && activeTutorial && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowTutorial(null)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-card border border-border shadow-2xl"
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-5 border-b border-border bg-card/95 backdrop-blur-sm">
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground">{activeTutorial.title}</h2>
                <p className="text-sm text-primary">{activeTutorial.subtitle}</p>
              </div>
              <button
                onClick={() => setShowTutorial(null)}
                className="w-9 h-9 rounded-lg bg-white/5 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 md:p-8">
              {/* Tutorial Image */}
              <div className="mb-8 rounded-xl overflow-hidden border border-border">
                <img
                  src={activeTutorial.image}
                  alt={activeTutorial.title}
                  className="w-full h-auto"
                />
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-6">{activeTutorial.description}</p>

              {/* MATLAB Detailed Description */}
              {activeTutorial.id === "matlab-r2021b" && (
                <div className="mb-8 space-y-6">
                  {/* Introduction */}
                  <div className="p-5 rounded-xl bg-primary/5 border border-primary/10">
                    <p className="text-sm text-foreground leading-relaxed">{matlabDetails.intro}</p>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-primary" />
                      Caractéristiques fonctionnelles
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {matlabDetails.features.map((feat, i) => (
                        <div key={i} className="p-4 rounded-lg bg-white/5 border border-border">
                          <div className="flex items-center gap-2 mb-2">
                            {feat.icon === "cpu" && <Cpu className="w-4 h-4 text-primary" />}
                            {feat.icon === "settings" && <Settings2 className="w-4 h-4 text-primary" />}
                            {feat.icon === "eye" && <Eye className="w-4 h-4 text-primary" />}
                            {feat.icon === "code" && <Code2 className="w-4 h-4 text-primary" />}
                            {feat.icon === "database" && <Database className="w-4 h-4 text-primary" />}
                            <h4 className="text-sm font-bold text-foreground">{feat.title}</h4>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">{feat.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Applications */}
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-primary" />
                      Domaines d'application
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {matlabDetails.applications.map((app, i) => (
                        <div key={i} className="p-4 rounded-lg bg-white/5 border border-border">
                          <div className="flex items-center gap-2 mb-2">
                            {app.icon === "beaker" && <Beaker className="w-4 h-4 text-cyan-400" />}
                            {app.icon === "settings" && <Settings2 className="w-4 h-4 text-cyan-400" />}
                            {app.icon === "dollar" && <DollarSign className="w-4 h-4 text-cyan-400" />}
                            {app.icon === "graduation" && <GraduationCap className="w-4 h-4 text-cyan-400" />}
                            <h4 className="text-sm font-bold text-foreground">{app.title}</h4>
                          </div>
                          <p className="text-xs text-muted-foreground">{app.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Advantages & Limitations */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/10">
                      <h4 className="text-sm font-bold text-green-400 mb-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Avantages
                      </h4>
                      <ul className="space-y-2">
                        {matlabDetails.advantages.map((adv, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                            <span className="text-green-400 mt-0.5">+</span>
                            {adv}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/10">
                      <h4 className="text-sm font-bold text-amber-400 mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Limitations
                      </h4>
                      <ul className="space-y-2">
                        {matlabDetails.limitations.map((lim, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                            <span className="text-amber-400 mt-0.5">-</span>
                            {lim}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Steps */}
              <div className="space-y-3">
                <h3 className="font-heading text-lg font-bold text-foreground mb-4">Étapes d'installation :</h3>
                {activeTutorial.steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-border">
                    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">{index + 1}</span>
                    </div>
                    <p className="text-sm text-foreground">{step}</p>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA in modal */}
              <div className="mt-8 p-5 rounded-xl bg-green-500/10 border border-green-500/20">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex-1">
                    <h4 className="font-heading font-bold text-foreground mb-1">Besoin d'aide ?</h4>
                    <p className="text-sm text-muted-foreground">Contactez-nous sur WhatsApp pour de l'aide à l'installation.</p>
                  </div>
                  <a
                    href="https://wa.me/237673473230"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold text-sm transition-all shadow-lg shadow-green-500/25"
                  >
                    <Phone className="w-4 h-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
}
