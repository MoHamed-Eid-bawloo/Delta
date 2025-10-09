# Delta Cybersecurity Website

A production-ready, modern single-page website for Delta Cybersecurity - a cybersecurity firm partnering with 6th of October University of Technology.

## 🚀 Features

- **Modern Design**: Black/white dominant color scheme with green (#032c00) accents
- **Animated Hero**: Elegant typing animation with auto-delete cycling through key phrases
- **Responsive**: Fully responsive design for mobile, tablet, and desktop
- **Accessible**: WCAG compliant with semantic HTML and ARIA labels
- **Internationalization**: Ready for translation with react-i18next (English default, Arabic support ready)
- **Events System**: Display and filter upcoming university events
- **Team Showcase**: Grid layout with expandable team member profiles
- **Contact Form**: Validated contact form with Formik + Yup
- **Visits Counter**: Simple localStorage-based visit tracking
- **Smooth Animations**: Framer Motion powered micro-interactions

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Forms**: Formik + Yup validation
- **i18n**: react-i18next
- **Icons**: Lucide React

## 📦 Installation

### Prerequisites

- Node.js 16+ and npm

### Setup

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd <PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── AnimatedBackground.tsx
│   ├── EventCard.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── StatsCard.tsx
│   └── TeamMemberCard.tsx
├── data/                # Sample data (JSON/TS)
│   ├── company.ts       # Company info and content
│   ├── events.json      # Events data
│   └── team.json        # Team members data
├── i18n/                # Internationalization
│   └── config.ts        # i18next configuration
├── pages/               # Page components
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Home.tsx
│   ├── NotFound.tsx
│   └── Team.tsx
└── App.tsx              # Main app component
```

## 🎨 Design System

The website uses a semantic design system defined in `src/index.css`:

- **Primary**: Black (#000000)
- **Background**: Black for dark sections
- **Foreground**: White text
- **Accent/Primary**: Green (#032c00) for CTAs and highlights
- **Card**: Dark gray backgrounds

All colors are defined as HSL CSS variables for easy theming.

## 🔧 Configuration

### Environment Variables

Create a `.env` file for sensitive data:

```env
# EmailJS Configuration (for contact form)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

**Note**: Never commit `.env` to version control.

### Customizing Content

1. **Company Information**: Edit `src/data/company.ts`
2. **Events**: Edit `src/data/events.json`
3. **Team Members**: Edit `src/data/team.json`
4. **Translations**: Edit `src/i18n/config.ts`

## 📧 Contact Form Integration

The contact form is ready for integration with EmailJS or a serverless function.

### Using EmailJS

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create a service, template, and get your public key
3. Add credentials to `.env`
4. Uncomment EmailJS code in `src/pages/Contact.tsx`

```typescript
// In Contact.tsx onSubmit handler
await emailjs.send(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  values,
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY
);
```

### Using Serverless Functions (Netlify/Vercel)

Create a serverless function in `netlify/functions/` or `api/` for Vercel:

```typescript
// netlify/functions/contact.ts
export const handler = async (event) => {
  const { name, email, subject, message } = JSON.parse(event.body);
  
  // Send email using your preferred service
  // (SendGrid, Mailgun, AWS SES, etc.)
  
  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
};
```

## 📊 Analytics

### Simple Visits Counter

A basic localStorage-based counter is implemented. This counts page visits per browser.

### Google Analytics Integration

Add Google Analytics by creating `src/lib/analytics.ts`:

```typescript
import ReactGA from 'react-ga4';

export const initGA = (measurementId: string) => {
  ReactGA.initialize(measurementId);
};

export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};
```

Then initialize in `src/App.tsx`:

```typescript
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initGA, logPageView } from './lib/analytics';

// In App component
useEffect(() => {
  initGA('G-XXXXXXXXXX'); // Your GA4 Measurement ID
}, []);

const location = useLocation();
useEffect(() => {
  logPageView();
}, [location]);
```

## 🌍 Adding Arabic Translation

1. Edit `src/i18n/config.ts`
2. Add Arabic translations to the `resources` object:

```typescript
ar: {
  translation: {
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      team: "فريقنا",
      contact: "اتصل بنا"
    },
    // ... add all keys
  }
}
```

3. Add language switcher in Header component
4. For RTL support, add `dir="rtl"` conditionally to `<html>` element

## 🚀 Deployment

### Netlify

```bash
npm run build
```

Deploy the `dist` folder to Netlify. Or connect your Git repository for automatic deployments.

### Vercel

```bash
npm run build
```

Deploy with Vercel CLI:

```bash
vercel --prod
```

Or connect your repository to Vercel.

### Build Command

```bash
npm run build
```

### Output Directory

```
dist/
```

## 🔒 Security & Best Practices

- ✅ All form inputs are validated (client-side with Yup)
- ✅ Never commit API keys or secrets (use `.env`)
- ✅ HTTPS recommended for production
- ✅ CSP headers recommended
- ✅ Accessible (ARIA labels, semantic HTML, keyboard navigation)
- ✅ SEO optimized (meta tags, semantic HTML)

## 📝 TODO / Future Enhancements

- [ ] Connect EmailJS or serverless function for contact form
- [ ] Add Google Analytics tracking
- [ ] Implement backend visits counter (replace localStorage)
- [ ] Add Arabic translation
- [ ] Integrate Google Maps for office location
- [ ] Add blog/news section
- [ ] Implement event RSVP system
- [ ] Add career/job postings section

## 📄 License

Copyright © 2025 Delta Cybersecurity. All rights reserved.

## 🙋 Support

For questions or support, contact us at contact@delta-cyber.com

---

Built with ❤️ by Delta Cybersecurity
