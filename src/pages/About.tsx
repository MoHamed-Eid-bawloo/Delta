import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Shield, Target, Award, Users } from "lucide-react";
import { companyInfo } from "@/data/company";

/**
 * About Page
 * 
 * Detailed company information including:
 * - Mission and values
 * - Services offered
 * - University partnership details
 * - Timeline/milestones
 */
const About = () => {
  const { t } = useTranslation();

  const valueIcons = [Shield, Target, Award, Users];

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
            {t("about.title")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {companyInfo.tagline}
          </p>
        </motion.div>

        {/* Mission */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6 text-center">
              {t("about.mission")}
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-4xl mx-auto leading-relaxed">
              {companyInfo.mission}
            </p>
          </div>
        </motion.section>

        {/* Values */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            {t("about.values")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyInfo.values.map((value, index) => {
              const Icon = valueIcons[index];
              return (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-xl p-6 text-center card-hover"
                >
                  <div className="inline-flex p-3 bg-primary/10 rounded-lg mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold">{value}</h3>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Services */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            {t("about.services")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {companyInfo.services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-8 card-hover"
              >
                <h3 className="text-xl font-bold mb-3 text-primary">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* University Partnership */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6 text-center">
              {t("about.partnership")}
            </h2>
            <div className="space-y-4 max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold text-primary text-center">
                {companyInfo.universityPartnership.name}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {companyInfo.universityPartnership.description}
              </p>
              <p className="text-sm text-muted-foreground text-center">
                Partnership established: {companyInfo.universityPartnership.established}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Our Journey</h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
              
              {/* Timeline items */}
              <div className="space-y-8">
                {companyInfo.milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-20"
                  >
                    {/* Year badge */}
                    <div className="absolute left-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center font-bold text-primary-foreground border-4 border-background">
                      {milestone.year}
                    </div>
                    
                    {/* Content */}
                    <div className="bg-card border border-border rounded-xl p-6">
                      <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;
