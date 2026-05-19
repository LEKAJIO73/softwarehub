/**
 * Source of truth for product pricing. Used by the server to validate
 * purchase amounts (never trust client-side prices).
 *
 * Edit prices freely — they are in FCFA (XAF).
 */

export type ProductCategory = "vpn" | "software" | "tools" | "ai" | "apps";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  priceXaf: number;
  description?: string;
  duration?: string; // e.g. "1 mois", "1 an", "à vie"
}

export const products: Product[] = [
  // VPN
  { id: "vpn-expressvpn-1m", name: "ExpressVPN", category: "vpn", priceXaf: 3500, duration: "1 mois" },
  { id: "vpn-expressvpn-1y", name: "ExpressVPN", category: "vpn", priceXaf: 25000, duration: "1 an" },
  { id: "vpn-nordvpn-1m", name: "NordVPN", category: "vpn", priceXaf: 3000, duration: "1 mois" },
  { id: "vpn-nordvpn-1y", name: "NordVPN", category: "vpn", priceXaf: 22000, duration: "1 an" },
  { id: "vpn-v2box", name: "V2Box - V2ray Client", category: "vpn", priceXaf: 2000, duration: "1 an" },
  { id: "vpn-surfshark-1m", name: "Surfshark VPN", category: "vpn", priceXaf: 2500, duration: "1 mois" },

  // Software
  { id: "sw-adobe-premiere", name: "Adobe Premiere Pro", category: "software", priceXaf: 15000, duration: "1 an" },
  { id: "sw-photoshop", name: "Adobe Photoshop", category: "software", priceXaf: 12000, duration: "1 an" },
  { id: "sw-windows11-pro", name: "Windows 11 Pro", category: "software", priceXaf: 18000, duration: "à vie" },
  { id: "sw-matlab", name: "MATLAB R2024", category: "software", priceXaf: 25000, duration: "à vie" },
  { id: "sw-autocad", name: "AutoCAD", category: "software", priceXaf: 20000, duration: "1 an" },
  { id: "sw-idm", name: "Internet Download Manager", category: "software", priceXaf: 5000, duration: "à vie" },
  { id: "sw-malwarebytes", name: "Malwarebytes Premium", category: "software", priceXaf: 8000, duration: "1 an" },

  // IA
  { id: "ai-chatgpt-plus-1m", name: "ChatGPT Plus", category: "ai", priceXaf: 12000, duration: "1 mois" },
  { id: "ai-claude-pro-1m", name: "Claude Pro", category: "ai", priceXaf: 12000, duration: "1 mois" },
  { id: "ai-gemini-advanced-1m", name: "Gemini Advanced", category: "ai", priceXaf: 10000, duration: "1 mois" },
  { id: "ai-midjourney-1m", name: "Midjourney", category: "ai", priceXaf: 6000, duration: "1 mois" },
  { id: "ai-perplexity-pro-1m", name: "Perplexity Pro", category: "ai", priceXaf: 12000, duration: "1 mois" },

  // Tools
  { id: "tool-1pwd", name: "1Password", category: "tools", priceXaf: 4000, duration: "1 an" },
  { id: "tool-notion-plus", name: "Notion Plus", category: "tools", priceXaf: 5500, duration: "1 mois" },

  // Apps
  { id: "app-spotify-premium-1m", name: "Spotify Premium", category: "apps", priceXaf: 3000, duration: "1 mois" },
  { id: "app-youtube-premium-1m", name: "YouTube Premium", category: "apps", priceXaf: 4500, duration: "1 mois" },
];

export const getProduct = (id: string): Product | undefined => products.find((p) => p.id === id);

export const formatXAF = (amount: number): string =>
  new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(amount) + " FCFA";
