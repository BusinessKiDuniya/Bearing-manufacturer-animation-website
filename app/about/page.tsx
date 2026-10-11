import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContactBar from "@/components/layout/FloatingContactBar";
import PageBanner from "@/components/layout/PageBanner";
import AboutCompany from "@/components/home/AboutCompany";
import DistributorPartners from "@/components/home/DistributorPartners";
import Testimonials from "@/components/home/Testimonials";

export const metadata: Metadata = {
  title: "About Us | EVO Bearings and Machineries Pvt. Ltd.",
  description:
    "Learn about EVO Bearings and Machineries Pvt. Ltd. German-adapted technology, ISO 9001:2015 certification, Kolkata headquarters, Delhi hub, and nationwide distribution network.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <PageBanner
          badge="COMPANY PROFILE · ISO 9001:2015"
          title="Engineered For Extreme Precision."
          description="EVO Bearings and Machineries Pvt. Ltd. adapts German manufacturing tolerances to deliver whisper-quiet, low-vibration bearings for heavy industrial applications across India."
          breadcrumb="About Us"
        />
        <AboutCompany />
        <DistributorPartners />
        <Testimonials />
      </main>
      <Footer />
      <FloatingContactBar />
    </>
  );
}
