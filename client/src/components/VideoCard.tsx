import { Play, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface VideoCardProps {
  title: string;
  thumbnail?: string;
  duration?: string;
  category?: string;
  videoUrl?: string;
}

export default function VideoCard({
  title,
  thumbnail,
  duration = "10:30",
  category = "Tutoriel",
  videoUrl,
}: VideoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="glow-card overflow-hidden group"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-[oklch(0.12_0.02_250)] overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[oklch(0.18_0.03_250)] to-[oklch(0.12_0.02_250)]">
            <Play className="w-12 h-12 text-muted-foreground/30" />
          </div>
        )}

        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
          <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg shadow-primary/30 scale-90 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/70 backdrop-blur-sm text-xs text-white">
          <Clock className="w-3 h-3" />
          {duration}
        </div>

        {/* Category */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-0.5 rounded text-xs font-medium bg-accent/90 text-accent-foreground backdrop-blur-sm">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-heading font-semibold text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>
      </div>
    </motion.div>
  );
}
