import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        home: "Home",
        about: "About Us",
        team: "Our Team",
        contact: "Contact"
      },
      
      // Hero
      hero: {
        phrases: [
          "Welcome to Delta Security",
          "Securing Your Digital Future",
          "Delta Security — 6th of October University Tech Partner",
          "Delta. Community. Delta. Change"
        ],
        subtitle: "Leading cybersecurity firm partnering with 6th of October University of Technology",
        cta: {
          services: "Our Services",
          contact: "Contact Us"
        }
      },
      
      // Stats
      stats: {
        visits: "Total Visits",
        events: "Upcoming Events",
        clients: "Satisfied Clients"
      },
      
      // Events
      events: {
        title: "Upcoming Events",
        rsvp: "RSVP Now",
        register: "Register",
        filter: {
          all: "All Events",
          workshop: "Workshops",
          bootcamp: "Bootcamps",
          conference: "Conferences"
        }
      },
      
      // About
      about: {
        title: "About Delta Cybersecurity",
        mission: "Our Mission",
        values: "Our Values",
        services: "Our Services",
        partnership: "University Partnership"
      },
      
      // Team
      team: {
        title: "Meet Our Team",
        viewProfile: "View Profile",
        contact: "Contact"
      },
      
      // Contact
      contact: {
        title: "Get In Touch",
        form: {
          name: "Full Name",
          email: "Email Address",
          subject: "Subject",
          message: "Message",
          resume: "Attach Resume (optional)",
          submit: "Send Message",
          success: "Message sent successfully! We'll get back to you soon.",
          error: "Failed to send message. Please try again."
        },
        info: {
          email: "Email",
          phone: "Phone",
          address: "Address"
        }
      },
      
      // Footer
      footer: {
        tagline: "Securing the digital future, one organization at a time.",
        quickLinks: "Quick Links",
        connect: "Connect With Us",
        copyright: "© 2025 Delta Cybersecurity. All rights reserved."
      }
    }
  }
  // Add Arabic translation here later
  // ar: { translation: { ... } }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
