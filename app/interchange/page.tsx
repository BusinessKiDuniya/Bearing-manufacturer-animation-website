import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContactBar from "@/components/layout/FloatingContactBar";
import PageBanner from "@/components/layout/PageBanner";
import BrandInterchangeConverter from "@/components/tools/BrandInterchangeConverter";

export const metadata: Metadata = {
  title: "Universal Bearing Brand Interchange & Cross-Reference | EVO Bearings",
  description:
    "Cross-reference SKF, FAG, NSK, Timken, NTN, and KOYO bearings to 1:1 certified EVO replacements. Compare boundary dimensions (d x D x B) and dynamic load capacities instantly.",
};

export default function InterchangePage() {
  return (
    <>
      <Header />
      <main>
        <PageBanner
          badge="GLOBAL CROSS-REFERENCE SUITE · DIN ISO 15"
          title="Universal Brand Interchange."
          description="Enter any competitor part number to find certified EVO direct drop-in equivalents. Compare critical tolerances, dynamic load ratings, and secure immediate same-day dispatch availability."
          breadcrumb="Brand Interchange"
        />
        <BrandInterchangeConverter />
      </main>
      <Footer />
      <FloatingContactBar />
    </>
  );
}
