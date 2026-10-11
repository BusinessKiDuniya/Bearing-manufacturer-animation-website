import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContactBar from "@/components/layout/FloatingContactBar";
import PageBanner from "@/components/layout/PageBanner";
import TestingLab from "@/components/quality/TestingLab";

export const metadata: Metadata = {
  title: "Metrology Lab & Quality Assurance | EVO Bearings",
  description:
    "Explore EVO Bearings' state-of-the-art metrology laboratory. Mitutoyo roundness testers, Taylor Hobson surface roughness profilometry, Anderon vibration testing, and metallurgical spectrometry.",
};

export default function QualityPage() {
  return (
    <>
      <Header />
      <main>
        <PageBanner
          badge="METROLOGY & QUALITY ASSURANCE LAB"
          title="Zero-Defect Quality Standards."
          description="Every EVO bearing lot undergoes rigorous mechanical, metallurgical, and dynamic acoustic validation in our ISO 9001:2015 certified metrology lab."
          breadcrumb="Metrology Lab"
        />
        <TestingLab />
      </main>
      <Footer />
      <FloatingContactBar />
    </>
  );
}
