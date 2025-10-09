import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Shield, Linkedin, Facebook, Instagram } from "lucide-react";
import { companyInfo } from "@/data/company";

/**
 * Footer Component
 * 
 * Site footer with:
 * - Company branding
 * - Quick navigation links
 * - Social media icons
 * - Copyright information
 */
export const Footer = () => {
  const { t } = useTranslation();

  const quickLinks = [
    { path: "/", label: t("nav.home") },
    { path: "/about", label: t("nav.about") },
    { path: "/team", label: t("nav.team") },
    { path: "/contact", label: t("nav.contact") },
  ];

  const socialLinks = [
    { 
      icon: Facebook, 
      url: companyInfo.social.facebook, 
      label: "Facebook",
      color: "hover:text-[#1877f2]"
    },
    { 
      icon: Instagram, 
      url: companyInfo.social.instagram, 
      label: "Instagram",
      color: "hover:text-[#e4405f]"
    },
    { 
      icon: Linkedin, 
      url: companyInfo.social.linkedin, 
      label: "LinkedIn",
      color: "hover:text-[#0077b5]"
    },
  ];

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-primary" strokeWidth={2} />
              <span className="font-bold text-xl">
                Delta <span className="text-primary">Cyber</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">{t("footer.connect")}</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-muted-foreground transition-colors ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            {t("footer.copyright")}
          </p>
          <p className="text-xs text-muted-foreground/70">
            Developed by Muhamed Eid El.Sayed
          </p>
        </div>
      </div>
    </footer>
  );
};
