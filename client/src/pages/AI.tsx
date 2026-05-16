/**
 * Page IA & Comptes Premium
 * Design: Digital Forge - Dark industrial premium
 * Produits extraits de aiplus123.com, prix convertis en USD, liens vers lekajio.com
 */
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Bot, Crown, ExternalLink, Globe, Key, Mail, MessageSquare, Phone, Shield, Sparkles, Star, Zap } from "lucide-react";
import { useState } from "react";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const categories = [
  { id: "all", icon: Sparkles, label: { fr: "Tout", en: "All", zh: "全部", ar: "الكل", es: "Todo", pt: "Tudo", ja: "すべて" } },
  { id: "gpt", icon: Bot, label: { fr: "ChatGPT", en: "ChatGPT", zh: "GPT充值", ar: "ChatGPT", es: "ChatGPT", pt: "ChatGPT", ja: "ChatGPT" } },
  { id: "claude", icon: MessageSquare, label: { fr: "Claude", en: "Claude", zh: "Claude卡密", ar: "Claude", es: "Claude", pt: "Claude", ja: "Claude" } },
  { id: "gemini", icon: Star, label: { fr: "Gemini", en: "Gemini", zh: "Gemini", ar: "Gemini", es: "Gemini", pt: "Gemini", ja: "Gemini" } },
  { id: "grok", icon: Zap, label: { fr: "Grok", en: "Grok", zh: "Grok", ar: "Grok", es: "Grok", pt: "Grok", ja: "Grok" } },
  { id: "gmail", icon: Mail, label: { fr: "Gmail", en: "Gmail", zh: "Gmail", ar: "Gmail", es: "Gmail", pt: "Gmail", ja: "Gmail" } },
  { id: "sora", icon: Globe, label: { fr: "Sora", en: "Sora", zh: "Sora", ar: "Sora", es: "Sora", pt: "Sora", ja: "Sora" } },
  { id: "apple", icon: Phone, label: { fr: "Apple ID", en: "Apple ID", zh: "Apple ID", ar: "Apple ID", es: "Apple ID", pt: "Apple ID", ja: "Apple ID" } },
  { id: "telegram", icon: Shield, label: { fr: "Telegram", en: "Telegram", zh: "TG成品号", ar: "Telegram", es: "Telegram", pt: "Telegram", ja: "Telegram" } },
];

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: { fr: string; en: string; zh: string; ar: string; es: string; pt: string; ja: string };
  stock: number;
  badge?: string;
  popular?: boolean;
  icon: string;
}

const products: Product[] = [
  {
    id: "gpt-plus",
    name: "ChatGPT Plus",
    category: "gpt",
    price: 20.99,
    originalPrice: 24.99,
    description: {
      fr: "ChatGPT Plus 1 mois | 100% officiel | Recharge par carte",
      en: "ChatGPT Plus 1 month | 100% official | Card recharge",
      zh: "ChatGPT Plus 一个月 | 100%正规充值 | 卡密自助充值",
      ar: "ChatGPT Plus شهر واحد | 100% رسمي | شحن بالبطاقة",
      es: "ChatGPT Plus 1 mes | 100% oficial | Recarga por tarjeta",
      pt: "ChatGPT Plus 1 mês | 100% oficial | Recarga por cartão",
      ja: "ChatGPT Plus 1ヶ月 | 100%公式 | カードチャージ"
    },
    stock: 33,
    badge: "Populaire",
    popular: true,
    icon: "🤖"
  },
  {
    id: "claude-pro",
    name: "Claude Pro",
    category: "claude",
    price: 20.99,
    originalPrice: 25.99,
    description: {
      fr: "Claude Pro 1 mois | Membre officiel | Recharge par carte",
      en: "Claude Pro 1 month | Official member | Card recharge",
      zh: "Claude Pro 一个月 | 官方会员 | 卡密充值",
      ar: "Claude Pro شهر واحد | عضو رسمي | شحن بالبطاقة",
      es: "Claude Pro 1 mes | Miembro oficial | Recarga por tarjeta",
      pt: "Claude Pro 1 mês | Membro oficial | Recarga por cartão",
      ja: "Claude Pro 1ヶ月 | 公式メンバー | カードチャージ"
    },
    stock: 6,
    badge: "Nouveau",
    popular: true,
    icon: "🧠"
  },
  {
    id: "gemini-pro",
    name: "Gemini Pro",
    category: "gemini",
    price: 12.49,
    description: {
      fr: "Gemini Pro 12 mois | Compte prêt à l'emploi (première connexion uniquement)",
      en: "Gemini Pro 12 months | Ready-to-use account (first login only)",
      zh: "Gemini Pro12 个月成品号（仅保首登）",
      ar: "Gemini Pro 12 شهرًا | حساب جاهز (تسجيل أول فقط)",
      es: "Gemini Pro 12 meses | Cuenta lista para usar (solo primer inicio)",
      pt: "Gemini Pro 12 meses | Conta pronta para uso (apenas primeiro login)",
      ja: "Gemini Pro 12ヶ月 | 即使用可能アカウント（初回ログインのみ）"
    },
    stock: 0,
    icon: "✨"
  },
  {
    id: "grok",
    name: "Grok",
    category: "grok",
    price: 22.00,
    description: {
      fr: "Grok activation automatique par carte",
      en: "Grok self-activation by card",
      zh: "Grok自助开通卡密",
      ar: "Grok تفعيل ذاتي بالبطاقة",
      es: "Grok activación automática por tarjeta",
      pt: "Grok ativação automática por cartão",
      ja: "Grok セルフアクティベーションカード"
    },
    stock: 1,
    icon: "⚡"
  },
  {
    id: "gpt-team",
    name: "ChatGPT Team",
    category: "gpt",
    price: 35.99,
    description: {
      fr: "ChatGPT Team 1 mois | Accès complet pour équipes | Fonctionnalités avancées",
      en: "ChatGPT Team 1 month | Full team access | Advanced features",
      zh: "ChatGPT Team 一个月 | 团队完整访问 | 高级功能",
      ar: "ChatGPT Team شهر واحد | وصول كامل للفريق | ميزات متقدمة",
      es: "ChatGPT Team 1 mes | Acceso completo para equipos | Funciones avanzadas",
      pt: "ChatGPT Team 1 mês | Acesso completo para equipes | Recursos avançados",
      ja: "ChatGPT Team 1ヶ月 | チーム完全アクセス | 高度な機能"
    },
    stock: 15,
    badge: "Pro",
    icon: "🚀"
  },
  {
    id: "gmail-account",
    name: "Compte Gmail",
    category: "gmail",
    price: 5.99,
    description: {
      fr: "Compte Gmail vérifié | Prêt à l'emploi | Accès immédiat",
      en: "Verified Gmail account | Ready to use | Immediate access",
      zh: "Gmail验证账号 | 即用 | 立即访问",
      ar: "حساب Gmail موثق | جاهز للاستخدام | وصول فوري",
      es: "Cuenta Gmail verificada | Lista para usar | Acceso inmediato",
      pt: "Conta Gmail verificada | Pronta para uso | Acesso imediato",
      ja: "認証済みGmailアカウント | すぐ使える | 即時アクセス"
    },
    stock: 50,
    icon: "📧"
  },
  {
    id: "sora-access",
    name: "Sora Access",
    category: "sora",
    price: 29.99,
    description: {
      fr: "Accès Sora (OpenAI) | Génération vidéo IA | Compte activé",
      en: "Sora (OpenAI) Access | AI video generation | Activated account",
      zh: "Sora (OpenAI) 访问 | AI视频生成 | 已激活账号",
      ar: "وصول Sora (OpenAI) | إنشاء فيديو بالذكاء الاصطناعي | حساب مفعل",
      es: "Acceso Sora (OpenAI) | Generación de video IA | Cuenta activada",
      pt: "Acesso Sora (OpenAI) | Geração de vídeo IA | Conta ativada",
      ja: "Sora (OpenAI) アクセス | AI動画生成 | アクティベート済みアカウント"
    },
    stock: 8,
    badge: "Nouveau",
    icon: "🎬"
  },
  {
    id: "apple-id",
    name: "Apple ID",
    category: "apple",
    price: 8.99,
    description: {
      fr: "Apple ID vérifié | Région US/EU | Prêt à l'emploi",
      en: "Verified Apple ID | US/EU region | Ready to use",
      zh: "Apple ID 已验证 | 美国/欧洲区 | 即用",
      ar: "Apple ID موثق | منطقة أمريكا/أوروبا | جاهز للاستخدام",
      es: "Apple ID verificado | Región US/EU | Listo para usar",
      pt: "Apple ID verificado | Região US/EU | Pronto para uso",
      ja: "認証済みApple ID | US/EU地域 | すぐ使える"
    },
    stock: 20,
    icon: "🍎"
  },
  {
    id: "telegram-account",
    name: "Compte Telegram",
    category: "telegram",
    price: 6.99,
    description: {
      fr: "Compte Telegram prêt à l'emploi | Numéro vérifié | Accès immédiat",
      en: "Ready-to-use Telegram account | Verified number | Immediate access",
      zh: "TG成品号 | 已验证号码 | 立即访问",
      ar: "حساب Telegram جاهز | رقم موثق | وصول فوري",
      es: "Cuenta Telegram lista | Número verificado | Acceso inmediato",
      pt: "Conta Telegram pronta | Número verificado | Acesso imediato",
      ja: "Telegramアカウント | 認証済み番号 | 即時アクセス"
    },
    stock: 30,
    icon: "📱"
  },
  {
    id: "claude-team",
    name: "Claude Team",
    category: "claude",
    price: 38.99,
    description: {
      fr: "Claude Team 1 mois | Accès équipe | Fonctionnalités premium",
      en: "Claude Team 1 month | Team access | Premium features",
      zh: "Claude Team 一个月 | 团队访问 | 高级功能",
      ar: "Claude Team شهر واحد | وصول الفريق | ميزات مميزة",
      es: "Claude Team 1 mes | Acceso equipo | Funciones premium",
      pt: "Claude Team 1 mês | Acesso equipe | Recursos premium",
      ja: "Claude Team 1ヶ月 | チームアクセス | プレミアム機能"
    },
    stock: 10,
    badge: "Pro",
    icon: "🧠"
  },
  {
    id: "gpt-4-api",
    name: "GPT-4 API Key",
    category: "gpt",
    price: 15.99,
    description: {
      fr: "Clé API GPT-4 | Crédit inclus | Activation immédiate",
      en: "GPT-4 API Key | Credit included | Immediate activation",
      zh: "GPT-4 API密钥 | 含额度 | 即时激活",
      ar: "مفتاح API GPT-4 | رصيد مضمن | تفعيل فوري",
      es: "Clave API GPT-4 | Crédito incluido | Activación inmediata",
      pt: "Chave API GPT-4 | Crédito incluído | Ativação imediata",
      ja: "GPT-4 APIキー | クレジット含む | 即時アクティベーション"
    },
    stock: 25,
    icon: "🔑"
  },
  {
    id: "gemini-advanced",
    name: "Gemini Advanced",
    category: "gemini",
    price: 18.99,
    description: {
      fr: "Gemini Advanced 1 mois | Google One AI Premium | Accès complet",
      en: "Gemini Advanced 1 month | Google One AI Premium | Full access",
      zh: "Gemini Advanced 一个月 | Google One AI Premium | 完整访问",
      ar: "Gemini Advanced شهر واحد | Google One AI Premium | وصول كامل",
      es: "Gemini Advanced 1 mes | Google One AI Premium | Acceso completo",
      pt: "Gemini Advanced 1 mês | Google One AI Premium | Acesso completo",
      ja: "Gemini Advanced 1ヶ月 | Google One AI Premium | フルアクセス"
    },
    stock: 12,
    badge: "Premium",
    icon: "💎"
  },
];

const pageTranslations = {
  fr: {
    title: "IA & Comptes Premium",
    subtitle: "Accédez aux meilleurs outils d'intelligence artificielle à prix réduit",
    buyNow: "Acheter →",
    outOfStock: "Rupture de stock",
    stock: "Stock",
    popular: "Populaire",
    allProducts: "Tous les produits",
    searchPlaceholder: "Rechercher un produit...",
    priceLabel: "Prix",
    categoryLabel: "Catégorie",
  },
  en: {
    title: "AI & Premium Accounts",
    subtitle: "Access the best artificial intelligence tools at reduced prices",
    buyNow: "Buy Now →",
    outOfStock: "Out of Stock",
    stock: "Stock",
    popular: "Popular",
    allProducts: "All Products",
    searchPlaceholder: "Search a product...",
    priceLabel: "Price",
    categoryLabel: "Category",
  },
  zh: {
    title: "AI & 高级账号",
    subtitle: "以优惠价格获取最佳人工智能工具",
    buyNow: "购买 →",
    outOfStock: "缺货",
    stock: "库存",
    popular: "热门",
    allProducts: "所有产品",
    searchPlaceholder: "搜索产品...",
    priceLabel: "价格",
    categoryLabel: "分类",
  },
  ar: {
    title: "الذكاء الاصطناعي والحسابات المميزة",
    subtitle: "احصل على أفضل أدوات الذكاء الاصطناعي بأسعار مخفضة",
    buyNow: "شراء →",
    outOfStock: "نفذ المخزون",
    stock: "المخزون",
    popular: "شائع",
    allProducts: "جميع المنتجات",
    searchPlaceholder: "البحث عن منتج...",
    priceLabel: "السعر",
    categoryLabel: "الفئة",
  },
  es: {
    title: "IA & Cuentas Premium",
    subtitle: "Accede a las mejores herramientas de inteligencia artificial a precios reducidos",
    buyNow: "Comprar →",
    outOfStock: "Agotado",
    stock: "Stock",
    popular: "Popular",
    allProducts: "Todos los productos",
    searchPlaceholder: "Buscar un producto...",
    priceLabel: "Precio",
    categoryLabel: "Categoría",
  },
  pt: {
    title: "IA & Contas Premium",
    subtitle: "Acesse as melhores ferramentas de inteligência artificial a preços reduzidos",
    buyNow: "Comprar →",
    outOfStock: "Esgotado",
    stock: "Estoque",
    popular: "Popular",
    allProducts: "Todos os produtos",
    searchPlaceholder: "Pesquisar um produto...",
    priceLabel: "Preço",
    categoryLabel: "Categoria",
  },
  ja: {
    title: "AI & プレミアムアカウント",
    subtitle: "最高のAIツールを割引価格で入手",
    buyNow: "購入 →",
    outOfStock: "在庫切れ",
    stock: "在庫",
    popular: "人気",
    allProducts: "すべての製品",
    searchPlaceholder: "製品を検索...",
    priceLabel: "価格",
    categoryLabel: "カテゴリー",
  },
};

export default function AI() {
  const { language } = useLanguage();
  const t = pageTranslations[language as keyof typeof pageTranslations] || pageTranslations.fr;
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="IA & Comptes Premium - ChatGPT, Claude, Gemini, Grok"
        description="Achetez des comptes IA premium : ChatGPT Plus, Claude Pro, Gemini Pro, Grok, Sora, Apple ID, Gmail. Prix en dollars, livraison instantanée via lekajio.com."
        keywords="ChatGPT Plus, Claude Pro, Gemini Pro, Grok, Sora, comptes IA, achat compte IA, Apple ID, Gmail, intelligence artificielle, lekajio.com"
        path="/ia"
      />


      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.2_0.03_260)] to-background" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-[oklch(0.6_0.2_280)] rounded-full blur-[120px]" />
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-[oklch(0.5_0.15_200)] rounded-full blur-[150px]" />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[oklch(0.3_0.05_260)] border border-[oklch(0.4_0.1_260)] mb-6">
              <Crown className="w-4 h-4 text-[oklch(0.8_0.15_80)]" />
              <span className="text-sm text-[oklch(0.8_0.15_80)] font-medium">Premium AI Access</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-4">
              {t.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Categories */}
      <section className="py-8 border-b border-border sticky top-16 z-30 bg-background/80 backdrop-blur-xl">
        <div className="container">
          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3 rounded-xl bg-[oklch(0.2_0.02_260)] border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[oklch(0.6_0.15_195)] transition-all"
              />
              <Key className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const label = cat.label[language as keyof typeof cat.label] || cat.label.fr;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat.id
                      ? "bg-gradient-to-r from-[oklch(0.6_0.15_195)] to-[oklch(0.55_0.2_250)] text-white shadow-lg shadow-[oklch(0.5_0.15_195/0.3)]"
                      : "bg-[oklch(0.2_0.02_260)] text-muted-foreground hover:text-foreground hover:bg-[oklch(0.25_0.03_260)] border border-border"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 flex-1">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative bg-[oklch(0.18_0.02_260)] border border-border rounded-2xl overflow-hidden hover:border-[oklch(0.5_0.15_195)] transition-all duration-300 hover:shadow-xl hover:shadow-[oklch(0.5_0.15_195/0.1)]"
              >
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      product.badge === "Populaire" || product.badge === "Popular"
                        ? "bg-[oklch(0.6_0.2_145)] text-white"
                        : product.badge === "Nouveau" || product.badge === "New"
                        ? "bg-[oklch(0.6_0.15_195)] text-white"
                        : "bg-[oklch(0.7_0.15_80)] text-black"
                    }`}>
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Icon Area */}
                <div className="p-6 pb-0">
                  <div className="w-16 h-16 rounded-2xl bg-[oklch(0.25_0.03_260)] border border-border flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {product.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 pt-3">
                  <h3 className="text-lg font-heading font-bold text-foreground mb-2 group-hover:text-[oklch(0.7_0.15_195)] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {product.description[language as keyof typeof product.description] || product.description.fr}
                  </p>

                  {/* Price & Stock */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-[oklch(0.7_0.15_195)]">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-md ${
                      product.stock > 0
                        ? "bg-[oklch(0.3_0.05_145)] text-[oklch(0.7_0.15_145)]"
                        : "bg-[oklch(0.3_0.05_25)] text-[oklch(0.7_0.15_25)]"
                    }`}>
                      {t.stock}: {product.stock}
                    </span>
                  </div>

                  {/* Buy Button */}
                  <a
                    href={product.stock > 0 ? "https://lekajio.com" : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      product.stock > 0
                        ? "bg-gradient-to-r from-[oklch(0.6_0.15_195)] to-[oklch(0.55_0.2_250)] text-white hover:shadow-lg hover:shadow-[oklch(0.5_0.15_195/0.4)] active:scale-[0.97]"
                        : "bg-[oklch(0.25_0.02_260)] text-muted-foreground cursor-not-allowed"
                    }`}
                    onClick={(e) => { if (product.stock === 0) e.preventDefault(); }}
                  >
                    {product.stock > 0 ? (
                      <>
                        {t.buyNow}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </>
                    ) : (
                      t.outOfStock
                    )}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-[oklch(0.2_0.02_260)] flex items-center justify-center mx-auto mb-4">
                <Bot className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg">Aucun produit trouvé</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t border-border">
        <div className="container">
          <div className="relative rounded-3xl overflow-hidden p-12 text-center bg-gradient-to-br from-[oklch(0.25_0.05_260)] to-[oklch(0.18_0.03_280)]">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-1/3 w-64 h-64 bg-[oklch(0.5_0.15_195)] rounded-full blur-[100px]" />
              <div className="absolute bottom-0 right-1/3 w-48 h-48 bg-[oklch(0.6_0.2_280)] rounded-full blur-[80px]" />
            </div>
            <div className="relative z-10">
              <Crown className="w-12 h-12 text-[oklch(0.8_0.15_80)] mx-auto mb-4" />
              <h2 className="text-3xl font-heading font-bold text-foreground mb-3">
                {language === "fr" ? "Besoin d'aide pour choisir ?" : language === "en" ? "Need help choosing?" : language === "zh" ? "需要帮助选择？" : language === "ar" ? "تحتاج مساعدة في الاختيار؟" : language === "es" ? "¿Necesitas ayuda para elegir?" : language === "pt" ? "Precisa de ajuda para escolher?" : "選択にお困りですか？"}
              </h2>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                {language === "fr" ? "Contactez-nous sur Telegram ou WeChat pour un conseil personnalisé." : language === "en" ? "Contact us on Telegram or WeChat for personalized advice." : language === "zh" ? "通过Telegram或微信联系我们获取个性化建议。" : language === "ar" ? "اتصل بنا عبر Telegram أو WeChat للحصول على نصيحة شخصية." : language === "es" ? "Contáctenos en Telegram o WeChat para asesoramiento personalizado." : language === "pt" ? "Entre em contato conosco no Telegram ou WeChat para aconselhamento personalizado." : "パーソナライズされたアドバイスについては、TelegramまたはWeChatでお問い合わせください。"}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://t.me/森特"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[oklch(0.45_0.15_230)] text-white font-medium hover:shadow-lg transition-all active:scale-[0.97]"
                >
                  <MessageSquare className="w-4 h-4" />
                  Telegram
                </a>
                <a
                  href="https://lekajio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[oklch(0.6_0.15_195)] to-[oklch(0.55_0.2_250)] text-white font-medium hover:shadow-lg transition-all active:scale-[0.97]"
                >
                  <ExternalLink className="w-4 h-4" />
                  lekajio.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
