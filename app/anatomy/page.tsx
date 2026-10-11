import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContactBar from "@/components/layout/FloatingContactBar";
import PageBanner from "@/components/layout/PageBanner";
import BearingExplodedSection from "@/components/3d/BearingExplodedSection";
import BearingStressSimulator from "@/components/tools/BearingStressSimulator";

export const metadata: Metadata = {
  title: "3D Interactive Exploded Bearing Anatomy & FEA Stress | EVO Bearings",
  description:
    "Interactive 3D scroll experience and FEA contact stress simulation of an industrial bearing. Inspect outer raceway, machined brass cage, precision rolling elements, and inner race engineered to DIN ISO 15 standards.",
};

export default function AnatomyPage() {
  return (
    <>
      <Header />
      <main>
        <PageBanner
          badge="GERMAN PRECISION ANATOMY · DIN ISO 15"
          title="Inside The Micro-Engineering."
          description="Scroll downwards to explode the bearing into its four fundamental constituent components. Witness the precision geometry, machined brass separator cage, and ultra-smooth polished raceways."
          breadcrumb="3D Anatomy"
        />
        <BearingExplodedSection />
        <BearingStressSimulator />
      </main>
      <Footer />
      <FloatingContactBar />
    </>
  );
}
