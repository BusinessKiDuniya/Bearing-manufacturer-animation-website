import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContactBar from "@/components/layout/FloatingContactBar";
import PageBanner from "@/components/layout/PageBanner";
import RfqAndContact from "@/components/rfq/RfqAndContact";
import { SITE_CONFIG } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: `Request for Quotation (RFQ) & Contact Desk | ${SITE_CONFIG.company.shortName}`,
  description:
    `Request formal pricing and lead time from ${SITE_CONFIG.company.name}. Direct hotline: ${SITE_CONFIG.contact.phoneDisplay}. Offices in Kolkata and New Delhi.`,
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <PageBanner
          badge="DIRECT PROCUREMENT & TECHNICAL DESK"
          title="Priority Engineering Quotation & Contact."
          description="Send us your required bearing numbers, bulk replenishment orders, or custom shaft drawings. Our application engineering team responds with certified pricing and dispatch schedules within 2 hours."
          breadcrumb="Contact & RFQ"
        />
        <RfqAndContact />
      </main>
      <Footer />
      <FloatingContactBar />
    </>
  );
}
