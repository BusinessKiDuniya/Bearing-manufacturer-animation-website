import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContactBar from "@/components/layout/FloatingContactBar";
import PageBanner from "@/components/layout/PageBanner";
import Industries from "@/components/home/Industries";
import Testimonials from "@/components/home/Testimonials";

export const metadata: Metadata = {
  title: "Industries Served | EVO Bearings and Machineries",
  description:
    "EVO Bearings supplies heavy-duty bearings for Cement plants, Steel mills, Automotive OEMs, Mining & Crushers, Power generation, and Agricultural machinery.",
};

export default function IndustriesPage() {
  return (
    <>
      <Header />
      <main>
        <PageBanner
          badge="SECTOR ENGINEERING SOLUTIONS"
          title="Engineered For Extreme Industrial Environments."
          description="Whether confronting abrasive clinker dust in cement plants, severe shock loads in steel rolling mills, or continuous duty in thermal plants, EVO bearings deliver uninterrupted uptime."
          breadcrumb="Industries Served"
        />
        <Industries />
        <Testimonials />
      </main>
      <Footer />
      <FloatingContactBar />
    </>
  );
}
