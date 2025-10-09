import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  type: string;
  onRegisterClick: () => void;
  delay?: number;
}

/**
 * EventCard Component
 * 
 * Displays event information with:
 * - Date and location
 * - Event type badge
 * - Description
 * - RSVP button
 */
export const EventCard = ({
  id,
  title,
  date,
  location,
  description,
  type,
  onRegisterClick,
  delay = 0
}: EventCardProps) => {
  const { t } = useTranslation();
  
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="bg-card border border-border rounded-xl p-6 card-hover"
    >
      {/* Event Type Badge */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
          {type}
        </span>
      </div>

      {/* Event Title */}
      <h3 className="text-xl font-bold mb-3">{title}</h3>

      {/* Date and Location */}
      <div className="space-y-2 mb-4">
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{location}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
        {description}
      </p>

      {/* Register Button */}
      <Button
        onClick={onRegisterClick}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group"
      >
        {t("events.register")}
        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </motion.div>
  );
};
