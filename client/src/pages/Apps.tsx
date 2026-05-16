/*
 * Design: Digital Forge — Dark Industrial Premium
 * Page: Applications — App Store style with download links
 * Color: Dark slate + cyan/blue accents
 */
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import {
  Search,
  Download,
  ExternalLink,
  Star,
  Smartphone,
  Filter,
  ChevronRight,
  MessageCircle,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  SortAsc,
} from "lucide-react";

interface AppItem {
  name: string;
  description: string;
  category: string;
  icon: string;
  rating: number;
  link: string;
  badge?: string;
  paid?: boolean;
}

const topFreeApps: AppItem[] = [
  { name: "Instants, an Instagram app", description: "Share in the moment", category: "Social", icon: "📸", rating: 4.5, link: "https://apps.apple.com/us/app/instants-an-instagram-app/id6504935498", badge: "#1" },
  { name: "ChatGPT", description: "Your everyday AI assistant", category: "AI", icon: "🤖", rating: 4.8, link: "https://apps.apple.com/us/app/chatgpt/id6448311069", badge: "#2" },
  { name: "Claude by Anthropic", description: "AI assistant for life and work", category: "AI", icon: "🧠", rating: 4.7, link: "https://apps.apple.com/us/app/claude-by-anthropic/id6473753684", badge: "#3" },
  { name: "Google Gemini", description: "Your AI assistant from Google", category: "AI", icon: "✨", rating: 4.6, link: "https://apps.apple.com/us/app/google-gemini/id6477141779", badge: "#4" },
  { name: "Meta AI", description: "Your personal AI assistant", category: "AI", icon: "🔵", rating: 4.3, link: "https://apps.apple.com/us/app/meta-ai/id6504949364", badge: "#5" },
  { name: "Threads", description: "Join the conversation", category: "Social", icon: "🧵", rating: 4.4, link: "https://apps.apple.com/us/app/threads/id6446901002", badge: "#6" },
  { name: "Google", description: "Search with AI, Images & Text", category: "Utilities", icon: "🔍", rating: 4.7, link: "https://apps.apple.com/us/app/google/id284815942", badge: "#7" },
];

const mustHaveApps: AppItem[] = [
  { name: "YouTube", description: "Videos, Music and Live Streams", category: "Entertainment", icon: "▶️", rating: 4.7, link: "https://apps.apple.com/us/app/youtube/id544007664" },
  { name: "TikTok", description: "Videos, Shop & LIVE", category: "Entertainment", icon: "🎵", rating: 4.6, link: "https://apps.apple.com/us/app/tiktok/id835599320" },
  { name: "Duolingo", description: "Languages, Math, Music & Chess", category: "Education", icon: "🦉", rating: 4.7, link: "https://apps.apple.com/us/app/duolingo/id570060128" },
  { name: "Snapchat", description: "Share the moment!", category: "Social", icon: "👻", rating: 4.3, link: "https://apps.apple.com/us/app/snapchat/id447188370" },
  { name: "ChatGPT", description: "Your everyday AI assistant", category: "AI", icon: "🤖", rating: 4.8, link: "https://apps.apple.com/us/app/chatgpt/id6448311069" },
  { name: "HBO Max", description: "Stream Movies & TV", category: "Entertainment", icon: "🎬", rating: 4.5, link: "https://apps.apple.com/us/app/hbo-max/id971265422" },
  { name: "Audible", description: "Audiobooks & Podcasts", category: "Entertainment", icon: "🎧", rating: 4.7, link: "https://apps.apple.com/us/app/audible/id379693831" },
  { name: "ESPN", description: "Live Sports & Scores", category: "Sports", icon: "🏈", rating: 4.6, link: "https://apps.apple.com/us/app/espn/id317469184" },
  { name: "Peacock TV", description: "Stream TV & Movies", category: "Entertainment", icon: "🦚", rating: 4.4, link: "https://apps.apple.com/us/app/peacock-tv/id1508422121" },
  { name: "Paramount+", description: "Originals, Movies and Sports", category: "Entertainment", icon: "⭐", rating: 4.3, link: "https://apps.apple.com/us/app/paramount/id1340650234" },
  { name: "Bumble", description: "Dating App: Meet & Date", category: "Social", icon: "🐝", rating: 4.2, link: "https://apps.apple.com/us/app/bumble/id930441707" },
  { name: "Hinge", description: "Dating App: Match & Date", category: "Social", icon: "💜", rating: 4.3, link: "https://apps.apple.com/us/app/hinge/id595287172" },
];

const bestNewApps: AppItem[] = [
  { name: "Vooks", description: "Read-Aloud Kids' Books", category: "Education", icon: "📚", rating: 4.8, link: "https://apps.apple.com/us/app/vooks/id1465582639" },
  { name: "Werdsmith", description: "Writing App", category: "Productivity", icon: "✍️", rating: 4.5, link: "https://apps.apple.com/us/app/werdsmith/id599690891" },
  { name: "ArtWorkout", description: "Learn How to Draw", category: "Education", icon: "🎨", rating: 4.6, link: "https://apps.apple.com/us/app/artworkout/id1609050773" },
  { name: "Morpho", description: "Convert Currency & Unit", category: "Utilities", icon: "💱", rating: 4.4, link: "https://apps.apple.com/us/app/morpho/id6449942638" },
  { name: "TinySong", description: "Send Your Message as a Song", category: "Music", icon: "🎶", rating: 4.7, link: "https://apps.apple.com/us/app/tinysong/id6476585498" },
  { name: "Solarday", description: "Plan Days Better", category: "Productivity", icon: "☀️", rating: 4.5, link: "https://apps.apple.com/us/app/solarday/id6475705844" },
  { name: "Binge", description: "Movies and Shows", category: "Entertainment", icon: "🎞️", rating: 4.3, link: "https://apps.apple.com/us/app/binge/id1534690498" },
  { name: "Bandana Job Search", description: "Jobs on a map, with real pay", category: "Business", icon: "💼", rating: 4.4, link: "https://apps.apple.com/us/app/bandana-job-search/id6449971551" },
];

const editorsChoice: AppItem[] = [
  { name: "LinkedIn", description: "Community & Jobs", category: "Business", icon: "💼", rating: 4.5, link: "https://apps.apple.com/us/app/linkedin/id288429040", badge: "Editor's Choice" },
  { name: "Detail: AI Video Editor", description: "Vlog, Short Reel", category: "Photo & Video", icon: "🎥", rating: 4.6, link: "https://apps.apple.com/us/app/detail/id6443701227", badge: "Editor's Choice" },
  { name: "Moshi Kids", description: "Sleep, Relax", category: "Health", icon: "😴", rating: 4.7, link: "https://apps.apple.com/us/app/moshi-kids/id1477466500", badge: "Editor's Choice" },
  { name: "PBS KIDS Video", description: "Episodes, shorts", category: "Education", icon: "📺", rating: 4.5, link: "https://apps.apple.com/us/app/pbs-kids-video/id435138734", badge: "Editor's Choice" },
  { name: "StoryGraph", description: "Reading & Book Tracker", category: "Books", icon: "📖", rating: 4.8, link: "https://apps.apple.com/us/app/storygraph/id1570489264", badge: "Editor's Choice" },
  { name: "Pro Camera by Moment", description: "Manual Photo + Video", category: "Photo & Video", icon: "📷", rating: 4.6, link: "https://apps.apple.com/us/app/pro-camera-by-moment/id927098908", badge: "Editor's Choice" },
];

const photoVideoApps: AppItem[] = [
  { name: "Picsart AI Photo Editor", description: "Photo & Video Retouch", category: "Photo & Video", icon: "🖼️", rating: 4.6, link: "https://apps.apple.com/us/app/picsart/id587366035" },
  { name: "Lightroom", description: "AI Photo Editor", category: "Photo & Video", icon: "📸", rating: 4.7, link: "https://apps.apple.com/us/app/lightroom/id878783582" },
  { name: "Filto", description: "AI Photo & Video Editor", category: "Photo & Video", icon: "🎞️", rating: 4.5, link: "https://apps.apple.com/us/app/filto/id1489498330" },
  { name: "Facetune", description: "Photo & Video Editor", category: "Photo & Video", icon: "✨", rating: 4.4, link: "https://apps.apple.com/us/app/facetune/id606310581" },
  { name: "VSCO", description: "Photo Editor & Presets", category: "Photo & Video", icon: "🌅", rating: 4.5, link: "https://apps.apple.com/us/app/vsco/id588013838" },
  { name: "Canva", description: "AI Video & Photo Editor", category: "Photo & Video", icon: "🎨", rating: 4.8, link: "https://apps.apple.com/us/app/canva/id897446215" },
  { name: "Photoshop Express", description: "Video, AI Retouch", category: "Photo & Video", icon: "🖌️", rating: 4.6, link: "https://apps.apple.com/us/app/photoshop-express/id331975235" },
  { name: "Photoleap", description: "AI Photo Editor", category: "Photo & Video", icon: "🌟", rating: 4.5, link: "https://apps.apple.com/us/app/photoleap/id1191337894" },
];

const fitnessApps: AppItem[] = [
  { name: "LADDER", description: "Strength Training Plans", category: "Fitness", icon: "💪", rating: 4.7, link: "https://apps.apple.com/us/app/ladder/id1502936521" },
  { name: "Nike Run Club", description: "Running Coach", category: "Fitness", icon: "🏃", rating: 4.8, link: "https://apps.apple.com/us/app/nike-run-club/id387771637" },
  { name: "Fitbod", description: "Gym & Fitness Planner", category: "Fitness", icon: "🏋️", rating: 4.7, link: "https://apps.apple.com/us/app/fitbod/id1041517543" },
  { name: "Strava", description: "Run, Bike, Walk", category: "Fitness", icon: "🚴", rating: 4.6, link: "https://apps.apple.com/us/app/strava/id426826309" },
  { name: "Peloton", description: "Fitness & Workouts", category: "Fitness", icon: "🧘", rating: 4.5, link: "https://apps.apple.com/us/app/peloton/id792750948" },
  { name: "MyFitnessPal", description: "Calorie Counter", category: "Fitness", icon: "🍎", rating: 4.6, link: "https://apps.apple.com/us/app/myfitnesspal/id341232718" },
];

const productivityApps: AppItem[] = [
  { name: "Speechify", description: "Text to Speech", category: "Productivity", icon: "🔊", rating: 4.7, link: "https://apps.apple.com/us/app/speechify/id1209815023" },
  { name: "Notability", description: "AI Notes & PDF", category: "Productivity", icon: "📝", rating: 4.6, link: "https://apps.apple.com/us/app/notability/id360593530" },
  { name: "Goodnotes", description: "AI Notes, Docs", category: "Productivity", icon: "📓", rating: 4.8, link: "https://apps.apple.com/us/app/goodnotes/id1444383602" },
  { name: "Focus Timer", description: "Flow Timer & Pomodoro", category: "Productivity", icon: "⏱️", rating: 4.5, link: "https://apps.apple.com/us/app/focus-traveller/id1521796380" },
  { name: "Otter Transcribe", description: "AI Note Taking", category: "Productivity", icon: "🦦", rating: 4.4, link: "https://apps.apple.com/us/app/otter/id1276437113" },
];

const topPaidApps: AppItem[] = [
  { name: "Shadowrocket", description: "Rule based proxy utility", category: "Utilities", icon: "🚀", rating: 4.8, link: "https://apps.apple.com/us/app/shadowrocket/id932747118", badge: "#1", paid: true },
  { name: "HotSchedules", description: "Business scheduling", category: "Business", icon: "📅", rating: 4.5, link: "https://apps.apple.com/us/app/hotschedules/id294aborting8", badge: "#2", paid: true },
  { name: "AnkiMobile Flashcards", description: "Smart & powerful flashcards", category: "Education", icon: "🃏", rating: 4.7, link: "https://apps.apple.com/us/app/ankimobile-flashcards/id373493387", badge: "#3", paid: true },
  { name: "Procreate Pocket", description: "Sketch and Paint", category: "Graphics", icon: "🎨", rating: 4.8, link: "https://apps.apple.com/us/app/procreate-pocket/id916366645", badge: "#4", paid: true },
  { name: "SkyView", description: "Explore the Universe", category: "Education", icon: "🔭", rating: 4.6, link: "https://apps.apple.com/us/app/skyview/id404990064", badge: "#5", paid: true },
];

const kidsApps: AppItem[] = [
  { name: "Dora: Explore and Play!", description: "Fun Learning Kids", category: "Kids", icon: "🎒", rating: 4.5, link: "https://apps.apple.com/us/app/dora-explore-and-play/id1589208778" },
  { name: "Lingokids", description: "Games & Shows", category: "Kids", icon: "🧸", rating: 4.7, link: "https://apps.apple.com/us/app/lingokids/id1002043426" },
  { name: "Toca Boca World", description: "Create & Roleplay", category: "Kids", icon: "🌍", rating: 4.6, link: "https://apps.apple.com/us/app/toca-boca-world/id1463764917" },
  { name: "PAW Patrol Rescue World", description: "Preschool Toddler", category: "Kids", icon: "🐕", rating: 4.4, link: "https://apps.apple.com/us/app/paw-patrol-rescue-world/id1587649731" },
  { name: "Kiddopia", description: "Kids Learning Games", category: "Kids", icon: "🎮", rating: 4.5, link: "https://apps.apple.com/us/app/kiddopia/id1458355498" },
  { name: "Blippi's Curiosity Club", description: "Kids Learning", category: "Kids", icon: "🎈", rating: 4.3, link: "https://apps.apple.com/us/app/blippis-curiosity-club/id6449662037" },
];

const allCategories = [
  "All", "AI", "Social", "Entertainment", "Education", "Photo & Video",
  "Productivity", "Fitness", "Business", "Utilities", "Music", "Kids",
  "Health", "Sports", "Books", "Graphics"
];

export default function Apps() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSection, setActiveSection] = useState("all");
  const [sortBy, setSortBy] = useState<"default" | "rating-desc" | "rating-asc" | "name-asc" | "name-desc" | "popularity">("default");
  const [showSortMenu, setShowSortMenu] = useState(false);

  const sortOptions = [
    { id: "default" as const, label: "Par défaut", labelEn: "Default", icon: ArrowUpDown },
    { id: "rating-desc" as const, label: "Note (haute \u2192 basse)", labelEn: "Rating (high \u2192 low)", icon: ArrowDown },
    { id: "rating-asc" as const, label: "Note (basse \u2192 haute)", labelEn: "Rating (low \u2192 high)", icon: ArrowUp },
    { id: "popularity" as const, label: "Popularit\u00e9", labelEn: "Popularity", icon: TrendingUp },
    { id: "name-asc" as const, label: "Nom (A \u2192 Z)", labelEn: "Name (A \u2192 Z)", icon: SortAsc },
    { id: "name-desc" as const, label: "Nom (Z \u2192 A)", labelEn: "Name (Z \u2192 A)", icon: SortAsc },
  ];

  const sections = [
    { id: "all", label: "All Apps" },
    { id: "top-free", label: "Top Free" },
    { id: "must-have", label: "Must-Have" },
    { id: "new", label: "New & Updated" },
    { id: "editors", label: "Editors' Choice" },
    { id: "photo", label: "Photo & Video" },
    { id: "fitness", label: "Fitness" },
    { id: "productivity", label: "Productivity" },
    { id: "paid", label: "Top Paid" },
    { id: "kids", label: "Kids" },
  ];

  const getAllApps = () => {
    switch (activeSection) {
      case "top-free": return topFreeApps;
      case "must-have": return mustHaveApps;
      case "new": return bestNewApps;
      case "editors": return editorsChoice;
      case "photo": return photoVideoApps;
      case "fitness": return fitnessApps;
      case "productivity": return productivityApps;
      case "paid": return topPaidApps;
      case "kids": return kidsApps;
      default: return [
        ...topFreeApps, ...mustHaveApps, ...bestNewApps, ...editorsChoice,
        ...photoVideoApps, ...fitnessApps, ...productivityApps, ...topPaidApps, ...kidsApps
      ];
    }
  };

  const filteredApps = getAllApps().filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || app.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Remove duplicates by name
  const dedupedApps = filteredApps.filter(
    (app, index, self) => index === self.findIndex((a) => a.name === app.name)
  );

  // Popularity scores based on well-known apps
  const getPopularityScore = (app: AppItem): number => {
    const popularApps: Record<string, number> = {
      "ChatGPT": 100, "YouTube": 99, "TikTok": 98, "Google": 97, "Snapchat": 96,
      "Threads": 95, "Duolingo": 94, "Canva": 93, "Lightroom": 92, "LinkedIn": 91,
      "Strava": 90, "Nike Run Club": 89, "Goodnotes": 88, "Claude by Anthropic": 87,
      "Google Gemini": 86, "Meta AI": 85, "Instants, an Instagram app": 84,
      "HBO Max": 83, "ESPN": 82, "Peacock TV": 81, "Paramount+": 80,
      "Bumble": 79, "Hinge": 78, "Audible": 77, "Picsart AI Photo Editor": 76,
      "VSCO": 75, "Photoshop Express": 74, "Facetune": 73, "MyFitnessPal": 72,
      "Peloton": 71, "Fitbod": 70, "Notability": 69, "Speechify": 68,
      "Shadowrocket": 67, "Procreate Pocket": 66, "Toca Boca World": 65,
    };
    return popularApps[app.name] || (50 + app.rating * 5);
  };

  // Sort applications
  const uniqueApps = [...dedupedApps].sort((a, b) => {
    switch (sortBy) {
      case "rating-desc":
        return b.rating - a.rating;
      case "rating-asc":
        return a.rating - b.rating;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "popularity":
        return getPopularityScore(b) - getPopularityScore(a);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Applications - Lekajio Software"
        description="Download the best iPhone apps - AI, Social, Entertainment, Productivity, Fitness and more. Direct App Store links."
        keywords="apps, iPhone, download, App Store, AI apps, social apps, productivity"
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/5" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-green-500/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px]" />

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm mb-6">
              <Smartphone className="w-4 h-4" />
              <span>App Store Collection</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent">
                Applications
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover and download the best iPhone applications. Direct links to the App Store for instant download.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-500/50 backdrop-blur-sm"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section Filters */}
      <section className="py-4 border-b border-border/30">
        <div className="container">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeSection === section.id
                    ? "bg-green-500 text-white shadow-lg shadow-green-500/25"
                    : "bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground border border-border/30"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-4">
        <div className="container">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Filter className="w-4 h-4 text-muted-foreground mt-2 mr-1 shrink-0" />
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-card/30 text-muted-foreground hover:text-foreground border border-border/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Apps Count & Sort */}
      <section className="py-4">
        <div className="container">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {uniqueApps.length} application{uniqueApps.length > 1 ? "s" : ""} found
            </p>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card/50 border border-border/40 text-sm text-foreground hover:border-green-500/40 hover:bg-card/70 transition-all duration-200 backdrop-blur-sm"
              >
                <ArrowUpDown className="w-4 h-4 text-green-400" />
                <span className="hidden sm:inline">Trier par:</span>
                <span className="text-green-400 font-medium">
                  {sortOptions.find(o => o.id === sortBy)?.label || "Par d\u00e9faut"}
                </span>
              </button>

              {showSortMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowSortMenu(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute right-0 top-full mt-2 z-50 w-64 rounded-xl bg-card border border-border/50 shadow-xl shadow-black/30 backdrop-blur-xl overflow-hidden"
                  >
                    <div className="p-1.5">
                      {sortOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                          <button
                            key={option.id}
                            onClick={() => {
                              setSortBy(option.id);
                              setShowSortMenu(false);
                            }}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                              sortBy === option.id
                                ? "bg-green-500/15 text-green-400"
                                : "text-muted-foreground hover:bg-card/80 hover:text-foreground"
                            }`}
                          >
                            <Icon className={`w-4 h-4 ${
                              sortBy === option.id ? "text-green-400" : "text-muted-foreground/60"
                            }`} />
                            <span>{option.label}</span>
                            {sortBy === option.id && (
                              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Apps Grid */}
      <section className="py-8">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {uniqueApps.map((app, index) => (
              <motion.div
                key={`${app.name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.5) }}
              >
                <a
                  href={app.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-card/40 border border-border/30 hover:border-green-500/40 hover:bg-card/60 transition-all duration-300 backdrop-blur-sm"
                >
                  {/* App Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/10 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform duration-300">
                    {app.icon}
                  </div>

                  {/* App Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm text-foreground truncate">
                        {app.name}
                      </h3>
                      {app.badge && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                          app.badge === "Editor's Choice"
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-green-500/20 text-green-400"
                        }`}>
                          {app.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {app.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-[10px] text-muted-foreground">{app.rating}</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground/50">•</span>
                      <span className="text-[10px] text-green-400/70">{app.category}</span>
                      {app.paid && (
                        <>
                          <span className="text-[10px] text-muted-foreground/50">•</span>
                          <span className="text-[10px] text-amber-400">Paid</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Download Button */}
                  <div className="shrink-0">
                    <div className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center group-hover:bg-green-500/20 transition-colors duration-200">
                      <Download className="w-3.5 h-3.5 text-green-400" />
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Contact */}
      <section className="py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-sm" />
            <div className="relative p-8 md:p-12 text-center">
              <MessageCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Need Help Installing an App?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Contact us on WhatsApp for assistance with downloading and installing any application. We're here to help!
              </p>
              <a
                href="https://wa.me/237673473230"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/25"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp: +237 673 473 230
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* App Store Link */}
      <section className="py-8 pb-16">
        <div className="container text-center">
          <a
            href="https://apps.apple.com/us/iphone/apps"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
          >
            <span>Browse more on App Store</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
