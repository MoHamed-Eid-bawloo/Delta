import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Eye, Calendar, Users } from "lucide-react";
import { Hero } from "@/components/Hero";
import { StatsCard } from "@/components/StatsCard";
import { EventCard } from "@/components/EventCard";
import { EventRegistrationModal } from "@/components/EventRegistrationModal";
import { companyInfo } from "@/data/company";
import eventsData from "@/data/events.json";

/**
 * Home Page
 * 
 * Main landing page with:
 * - Hero section with typing animation
 * - Company overview
 * - Statistics (visits counter using localStorage)
 * - Upcoming events
 */
const Home = () => {
  const { t } = useTranslation();
  const [visits, setVisits] = useState(0);
  const [selectedEventType, setSelectedEventType] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<typeof eventsData[0] | null>(null);

  const handleRegisterClick = (event: typeof eventsData[0]) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  // Simple visits counter using localStorage
  useEffect(() => {
    const storedVisits = localStorage.getItem("siteVisits");
    const currentVisits = storedVisits ? parseInt(storedVisits, 10) : 0;
    const newVisits = currentVisits + 1;
    localStorage.setItem("siteVisits", newVisits.toString());
    setVisits(newVisits);
  }, []);

  // Filter events by type
  const filteredEvents = selectedEventType === "all" 
    ? eventsData 
    : eventsData.filter(event => event.type.toLowerCase() === selectedEventType);

  const eventTypes = ["all", "workshop", "bootcamp", "conference"];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* About Blurb */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl font-bold">
              About <span className="text-primary">Delta Cybersecurity</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {companyInfo.shortDescription}
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              {companyInfo.universityPartnership.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <StatsCard
              icon={Eye}
              value={visits.toLocaleString()}
              label={t("stats.visits")}
              delay={0}
            />
            <StatsCard
              icon={Calendar}
              value={eventsData.length}
              label={t("stats.events")}
              delay={0.1}
            />
            <StatsCard
              icon={Users}
              value="50+"
              label={t("stats.clients")}
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Section Header */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold">
                {t("events.title")}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Join us for upcoming workshops, bootcamps, and conferences focused on cybersecurity education and professional development.
              </p>
            </div>

            {/* Event Type Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {eventTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedEventType(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedEventType === type
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {t(`events.filter.${type}`)}
                </button>
              ))}
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, index) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  date={event.date}
                  location={event.location}
                  description={event.description}
                  type={event.type}
                  onRegisterClick={() => handleRegisterClick(event)}
                  delay={index * 0.1}
                />
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <p className="text-center text-muted-foreground py-12">
                No events found for this category.
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Event Registration Modal */}
      {selectedEvent && (
        <EventRegistrationModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          eventTitle={selectedEvent.title}
          eventDate={selectedEvent.date}
          eventLocation={selectedEvent.location}
          eventId={selectedEvent.id}
        />
      )}
    </div>
  );
};

export default Home;
