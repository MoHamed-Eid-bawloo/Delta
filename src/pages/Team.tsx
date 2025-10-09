import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { TeamMemberCard } from "@/components/TeamMemberCard";
import teamData from "@/data/team.json";

/**
 * Team Page
 * 
 * Displays team members with:
 * - Grid layout
 * - Individual cards with photos and info
 * - Modal for detailed bios
 * - Contact links
 */
const Team = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-4"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
            {t("team.title")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet the experts behind Delta Cybersecurity's success. Our team combines decades of experience with cutting-edge expertise.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamData.map((member, index) => (
            <TeamMemberCard
              key={member.id}
              name={member.name}
              role={member.role}
              bio={member.bio}
              image={member.image}
              linkedin={member.linkedin}
              email={member.email}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center bg-card border border-border rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're always looking for talented cybersecurity professionals to join our mission. Check our contact page to learn more about career opportunities.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Team;
