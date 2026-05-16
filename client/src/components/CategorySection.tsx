import { motion } from "framer-motion";
import { LucideIcon, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

interface CategorySectionProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  href: string;
  image: string;
  children?: React.ReactNode;
}

export default function CategorySection({
  title,
  subtitle,
  icon: Icon,
  href,
  image,
  children,
}: CategorySectionProps) {
  const { t } = useLanguage();

  return (
    <section className="section-spacing relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-medium uppercase tracking-wider text-primary">
                {subtitle}
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              {title}
            </h2>
          </div>
          <Link
            href={href}
            className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
          >
            {t("vpn.seeAll")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>

        {/* Content */}
        {children}
      </div>
    </section>
  );
}
