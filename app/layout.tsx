import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EVO Bearings and Machineries Pvt. Ltd. | Industrial Bearing Manufacturer in India",
  description:
    "EVO Bearings and Machineries Pvt. Ltd. is a leading industrial bearings manufacturer and supplier in India. German-adapted technology, ISO 9001:2015 certified, supplying ball bearings, taper roller, spherical, and cylindrical bearings across Kolkata, Delhi, and PAN India.",
  keywords: [
    "EVO Bearings",
    "Industrial Bearings Manufacturer",
    "Bearings supplier India",
    "Bearing Manufacturer Kolkata",
    "Bearing Supplier Delhi",
    "Ball Bearings",
    "Taper Roller Bearings",
    "Spherical Roller Bearings",
    "Cylindrical Roller Bearings",
    "German Bearing Technology",
    "ISO 9001 Bearings"
  ],
  authors: [{ name: "EVO Bearings and Machineries Pvt. Ltd." }],
};

import { RfqProvider } from "@/context/RfqContext";
import SitePreloader from "@/components/layout/SitePreloader";

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <RfqProvider>
          <SitePreloader />
          {children}
        </RfqProvider>
      </body>
    </html>
  );
}
