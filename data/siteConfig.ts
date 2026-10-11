/**
 * ============================================================================
 * SINGLE SOURCE OF TRUTH: SITE CONFIGURATION & COMPANY DATA
 * ============================================================================
 * Edit this file to update contact numbers, email addresses, office locations,
 * company info, and WhatsApp details everywhere across the entire website.
 */

export const SITE_CONFIG = {
  // Company Identity
  company: {
    name: "EVO Bearings and Machineries Pvt. Ltd.",
    shortName: "EVO Bearings",
    brandTitle: "EVO BEARINGS & MACHINERIES",
    tagline: "Industrial Bearing Manufacturer & Solution Provider",
    certification: "ISO 9001:2015 Certified",
    technologyCollaboration: "German Adapted Engineering Standards · 100Cr6 Chrome Alloy",
    establishedYear: 2018,
    gstin: "19AAACE4928M1Z8",
  },

  // Primary Contact Details (User Specified: Phone: 9310256281, Email: iam.matyank.kansal.01@gmail.com)
  contact: {
    // Phone Details
    phoneRaw: "9310256281",
    phoneDisplay: "+91 93102 56281",
    phoneTel: "+919310256281",

    // Secondary / Alternative hotline (if needed for multiple desk display)
    hotlineDisplay: "+91 93102 56281",
    hotlineTel: "+919310256281",

    // Primary Email
    email: "iam.matyank.kansal.01@gmail.com",
    emailMailto: "mailto:iam.matyank.kansal.01@gmail.com",

    // WhatsApp Contact
    whatsappNumber: "919310256281",
    whatsappDisplay: "+91 93102 56281",
    whatsappUrl: "https://wa.me/919310256281",

    // Operating Schedule
    workingHours: "Mon - Sat: 09:00 AM - 06:00 PM IST",
    workingDays: "Monday to Saturday",
    dispatchWindow: "Same-Day Dispatch for Stock Bearings",
    rfqResponseTime: "Within 2 Hours",
  },

  // Central Offices & Logistics Hubs
  locations: {
    headOffice: {
      name: "Kolkata Head Office & Central Depot",
      address: "64 Golaghata Road, Ground Floor, Dakshindari, Kolkata - 700048, West Bengal, India",
      region: "Serving West Bengal, Bihar, Odisha, and Eastern Industrial Belts",
      phone: "+91 93102 56281",
      email: "iam.matyank.kansal.01@gmail.com",
    },
    delhiHub: {
      name: "Delhi NCR Regional Logistics Center",
      address: "Wazirabad Industrial Corridor / Burari, Delhi NCR, India",
      region: "Same-day transport dispatch across UP, Haryana, Punjab & NCR",
      phone: "+91 93102 56281",
      email: "iam.matyank.kansal.01@gmail.com",
    },
    germanTech: {
      name: "German Engineering Collaboration",
      standard: "DIN EN ISO 9001:2015 · 100Cr6 vacuum-degassed chrome alloy",
      description: "Precision raceway super-finishing with controlled radial runout < 1.5 µm",
    },
  },

  // Main Navigation Routes
  navigation: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Quality & Lab", href: "/quality" },
    { label: "Tools", href: "/tools" },
    { label: "Industries", href: "/industries" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

/**
 * Generate a pre-filled direct WhatsApp link for any inquiry or quotation
 */
export function getWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}`;
  if (!message || message.trim() === "") return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export default SITE_CONFIG;
