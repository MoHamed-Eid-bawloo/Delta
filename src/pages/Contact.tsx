import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { companyInfo } from "@/data/company";
import emailjs from "@emailjs/browser";

// ✅ Validation schema using Yup
const contactSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9+\-\s()]*$/, "Invalid phone number")
    .min(8, "Phone number must be at least 8 digits")
    .max(20, "Phone number must be less than 20 digits")
    .required("Phone number is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters")
    .required("Message is required"),
});

const Contact = () => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      resume: null,
    },
    validationSchema: contactSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        // ✅ EmailJS integration
        const serviceID = "service_tv9zpip";
        const templateID = "template_lnoj13b";
        const publicKey = "4GErrO2JfFmXyW3P-";

        const templateParams = {
          name: values.name,
          email: values.email,
          phone: values.phone,
          message: values.message,
        };

        await emailjs.send(serviceID, templateID, templateParams, publicKey);

        toast.success(t("contact.form.success") || "Message sent successfully!");
        resetForm();
      } catch (error) {
        console.error("Form submission error:", error);
        toast.error(t("contact.form.error") || "Failed to send message.");
      }
    },
  });

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
            {t("contact.title")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have a question or want to work together? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-card border border-border rounded-xl p-6 space-y-6">
              <h2 className="text-2xl font-bold">{t("contact.info.email")}</h2>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium mb-1">Email</p>
                  <a
                    href={`mailto:${companyInfo.contact.email}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {companyInfo.contact.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium mb-1">Phone</p>
                  <a
                    href={`tel:${companyInfo.contact.phone}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {companyInfo.contact.phone}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium mb-1">Address</p>
                  <p className="text-muted-foreground">
                    {companyInfo.contact.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-muted rounded-xl overflow-hidden h-64 flex items-center justify-center border border-border">
              <div className="text-center p-6">
                <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Google Maps integration placeholder
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-card border border-border rounded-xl p-8">
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">{t("contact.form.name")}</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.name && formik.errors.name
                        ? "border-destructive"
                        : ""
                    }
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-sm text-destructive">
                      {formik.errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">{t("contact.form.email")}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.email && formik.errors.email
                        ? "border-destructive"
                        : ""
                    }
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-sm text-destructive">
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="text"
                    placeholder="+20 10 1234 5678"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.phone && formik.errors.phone
                        ? "border-destructive"
                        : ""
                    }
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="text-sm text-destructive">
                      {formik.errors.phone}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">{t("contact.form.message")}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project or inquiry..."
                    rows={6}
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.message && formik.errors.message
                        ? "border-destructive"
                        : ""
                    }
                  />
                  {formik.touched.message && formik.errors.message && (
                    <p className="text-sm text-destructive">
                      {formik.errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      {t("contact.form.submit")}
                      <Send className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
