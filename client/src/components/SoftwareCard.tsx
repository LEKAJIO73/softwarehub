import { Download, Star, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface SoftwareCardProps {
  title: string;
  description: string;
  category: string;
  image?: string;
  logo?: string;
  rating?: number;
  downloads?: string;
  version?: string;
  size?: string;
  downloadUrl?: string;
}

export default function SoftwareCard({
  title,
  description,
  category,
  image,
  logo,
  rating = 4.5,
  downloads = "10K+",
  version = "1.0",
  size = "50 MB",
  downloadUrl,
}: SoftwareCardProps) {
  const { t } = useLanguage();

  const handleDownload = () => {
    if (downloadUrl && downloadUrl !== "#") {
      window.open(downloadUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="glow-card p-5 group"
    >
      {/* Image / Logo / Placeholder */}
      <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 bg-[oklch(0.12_0.02_250)]">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : logo ? (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[oklch(0.16_0.03_250)] to-[oklch(0.12_0.02_250)]">
            <img
              src={logo}
              alt={title}
              className="w-20 h-20 rounded-2xl object-cover shadow-lg"
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[oklch(0.16_0.03_250)] to-[oklch(0.12_0.02_250)]">
            <Download className="w-10 h-10 text-muted-foreground/40" />
          </div>
        )}
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-primary/90 text-white backdrop-blur-sm">
            {category}
          </span>
        </div>
        {/* Download indicator */}
        {downloadUrl && downloadUrl !== "#" && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 rounded-md text-[10px] font-medium bg-[oklch(0.55_0.2_155)]/90 text-white backdrop-blur-sm flex items-center gap-1">
              <Download className="w-3 h-3" />
              Dispo
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          {logo && (
            <img src={logo} alt={title} className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
          )}
          <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-1">
            {title}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-[oklch(0.75_0.15_85)]" fill="oklch(0.75 0.15 85)" />
            {rating}
          </span>
          <span>{downloads} {t("card.downloads")}</span>
          <span>v{version}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2">
          {downloadUrl && downloadUrl !== "#" ? (
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[oklch(0.55_0.2_155)] to-[oklch(0.6_0.18_170)] text-white text-sm font-medium hover:shadow-lg hover:shadow-[oklch(0.55_0.2_155/0.3)] transition-all duration-200 active:scale-[0.97]"
            >
              <Download className="w-4 h-4" />
              {t("card.download")}
            </button>
          ) : (
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-all duration-200 active:scale-[0.97]">
              <Download className="w-4 h-4" />
              {t("card.download")}
            </button>
          )}
          {downloadUrl && downloadUrl !== "#" && (
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all duration-200"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {(!downloadUrl || downloadUrl === "#") && (
            <button className="p-2.5 rounded-lg bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all duration-200">
              <ExternalLink className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
