import { motion } from "framer-motion";
import { Download, Users, Shield, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function StatsSection() {
  const { t } = useLanguage();

  const stats = [
    { icon: Download, value: "50K+", label: t("stats.downloads"), color: "text-primary" },
    { icon: Users, value: "10K+", label: t("stats.users"), color: "text-[oklch(0.7_0.15_195)]" },
    { icon: Shield, value: "100%", label: t("stats.secure"), color: "text-[oklch(0.7_0.18_150)]" },
    { icon: Star, value: "4.9/5", label: t("stats.rating"), color: "text-[oklch(0.75_0.15_85)]" },
  ];

  return (
    <section className="relative py-16 border-y border-border bg-[oklch(0.13_0.02_250)]">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                className="text-center"
              >
                <div className="flex justify-center mb-3">
                  <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
