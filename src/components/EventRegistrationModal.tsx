import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import emailjs from "@emailjs/browser"; // ✅ استدعاء EmailJS

interface EventRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  eventId: string;
}

interface RegistrationFormValues {
  fullName: string;
  email: string;
  university: string;
  phone: string;
  message: string;
}

const validationSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .required("Full name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required")
    .max(255, "Email must be less than 255 characters"),
  university: Yup.string()
    .trim()
    .required("University/Organization is required")
    .max(200, "Must be less than 200 characters"),
  phone: Yup.string()
    .trim()
    .max(20, "Phone must be less than 20 characters"),
  message: Yup.string()
    .trim()
    .max(1000, "Message must be less than 1000 characters"),
});

/**
 * EventRegistrationModal Component
 * 
 * Modal with form for event registration:
 * - Auto-fills event details
 * - Formik + Yup validation
 * - Focus trap for accessibility
 * - Success confirmation view
 * - localStorage demo storage
 */
export const EventRegistrationModal = ({
  isOpen,
  onClose,
  eventTitle,
  eventDate,
  eventLocation,
  eventId,
}: EventRegistrationModalProps) => {
  const { t } = useTranslation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitTriggerRef, setSubmitTriggerRef] = useState<HTMLButtonElement | null>(null);

  const formattedDate = new Date(eventDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const formik = useFormik<RegistrationFormValues>({
    initialValues: {
      fullName: "",
      email: "",
      university: "",
      phone: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      // ✅ تم تفعيل EmailJS هنا بدل الـ localStorage
      try {
        await emailjs.send(
          "service_tv9zpip", // ← حط هنا Service ID بتاعك
          "template_jtzmv2j", // ← ده Template ID
          {
            event_title: eventTitle,
            event_date: formattedDate,
            event_location: eventLocation,
            full_name: values.fullName,
            email: values.email,
            university: values.university,
            phone: values.phone,
            message: values.message,
          },
          "4GErrO2JfFmXyW3P-" // ← حط هنا الـ Public Key بتاعك
        );

        setShowSuccess(true);
        toast.success("Registration submitted successfully!");
      } catch (error) {
        console.error("EmailJS Error:", error);
        toast.error("Failed to send registration. Please try again.");
      }
    },
  });

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const modal = document.getElementById("event-registration-modal");
    if (!modal) return;

    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    modal.addEventListener("keydown", handleTab as any);
    firstElement?.focus();

    return () => {
      modal.removeEventListener("keydown", handleTab as any);
    };
  }, [isOpen, showSuccess]);

  const handleClose = () => {
    setShowSuccess(false);
    formik.resetForm();
    onClose();
    
    // Return focus to trigger button
    setTimeout(() => {
      submitTriggerRef?.focus();
    }, 100);
  };

  // Store the button that triggered the modal
  useEffect(() => {
    if (isOpen) {
      setSubmitTriggerRef(document.activeElement as HTMLButtonElement);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              id="event-registration-modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-card border border-border rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {!showSuccess ? (
                <>
                  {/* Header */}
                  <div className="sticky top-0 bg-card border-b border-border p-6 flex items-start justify-between">
                    <div className="flex-1">
                      <h2 id="modal-title" className="text-2xl font-bold mb-2">
                        Register for Event
                      </h2>
                      <p className="text-sm text-muted-foreground">{eventTitle}</p>
                    </div>
                    <button
                      onClick={handleClose}
                      className="text-muted-foreground hover:text-foreground transition-colors p-1"
                      aria-label="Close modal"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Event Info */}
                  <div className="px-6 py-4 bg-muted/30 space-y-2">
                    <div className="flex items-start gap-2 text-sm">
                      <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                      <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                      <span>{eventLocation}</span>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={formik.handleSubmit} className="p-6 space-y-4">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                        Full Name <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="John Doe"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={formik.touched.fullName && formik.errors.fullName ? "border-destructive" : ""}
                      />
                      {formik.touched.fullName && formik.errors.fullName && (
                        <p className="text-destructive text-xs mt-1">{formik.errors.fullName}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={formik.touched.email && formik.errors.email ? "border-destructive" : ""}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <p className="text-destructive text-xs mt-1">{formik.errors.email}</p>
                      )}
                    </div>

                    {/* University */}
                    <div>
                      <label htmlFor="university" className="block text-sm font-medium mb-2">
                        University / Organization <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="university"
                        name="university"
                        type="text"
                        placeholder="6th of October University"
                        value={formik.values.university}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={formik.touched.university && formik.errors.university ? "border-destructive" : ""}
                      />
                      {formik.touched.university && formik.errors.university && (
                        <p className="text-destructive text-xs mt-1">{formik.errors.university}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Phone <span className="text-muted-foreground text-xs">(optional)</span>
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+20 123 456 7890"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={formik.touched.phone && formik.errors.phone ? "border-destructive" : ""}
                      />
                      {formik.touched.phone && formik.errors.phone && (
                        <p className="text-destructive text-xs mt-1">{formik.errors.phone}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message <span className="text-muted-foreground text-xs">(optional)</span>
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Any questions or special requirements..."
                        rows={4}
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={formik.touched.message && formik.errors.message ? "border-destructive" : ""}
                      />
                      {formik.touched.message && formik.errors.message && (
                        <p className="text-destructive text-xs mt-1">{formik.errors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleClose}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={formik.isSubmitting}
                        className="flex-1 bg-primary hover:bg-primary/90"
                      >
                        {formik.isSubmitting ? "Submitting..." : "Submit Registration"}
                      </Button>
                    </div>
                  </form>
                </>
              ) : (
                /* Success View */
                <div className="p-8 text-center space-y-6">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10 text-primary" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Registration Confirmed!</h3>
                    <p className="text-muted-foreground">
                      Thank you for registering for <strong>{eventTitle}</strong>
                    </p>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-4 space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                      <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                      <span>{eventLocation}</span>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>✓ Confirmation email sent to {formik.values.email}</p>
                    <p>✓ Event details and access link included</p>
                    <p>✓ Add to your calendar reminder</p>
                  </div>

                  <Button
                    onClick={handleClose}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Close
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
