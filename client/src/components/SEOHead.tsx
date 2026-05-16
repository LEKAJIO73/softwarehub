import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  path?: string;
  type?: string;
}

export default function SEOHead({ title, description, keywords, path = "/", type = "website" }: SEOHeadProps) {
  const baseUrl = "https://lekajio.com";
  const fullUrl = `${baseUrl}${path}`;
  const fullTitle = `${title} | Lekajio Software`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper to set or create meta tags
    const setMeta = (attr: string, attrValue: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${attrValue}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Primary meta
    setMeta("name", "description", description);
    if (keywords) {
      setMeta("name", "keywords", keywords);
    }

    // Open Graph
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", fullUrl);
    setMeta("property", "og:type", type);

    // Twitter
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:url", fullUrl);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", fullUrl);

    return () => {
      // Reset to default on unmount
      document.title = "Lekajio Software - Logiciels, VPN, IA & Outils Numériques";
    };
  }, [fullTitle, description, keywords, fullUrl, type]);

  return null;
}
