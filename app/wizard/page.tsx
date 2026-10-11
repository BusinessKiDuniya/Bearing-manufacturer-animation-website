import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContactBar from "@/components/layout/FloatingContactBar";
import PageBanner from "@/components/layout/PageBanner";
import SmartApplicationWizard from "@/components/tools/SmartApplicationWizard";

export const metadata: Metadata = {
  title: "Smart Application Selector & Fit Finder | EVO Bearings",
  description:
    "3-Step engineering sizing wizard to select optimum bearing geometry, ISO internal radial clearance (CN/C3/C4), and boundary lubrication protocols.",
};

export default function WizardPage() {
  return (
    <>
      <Header />
      <main>
        <PageBanner
          badge="INTELLIGENT APPLICATION SELECTOR"
          title="3-Step Smart Bearing Engineering Wizard."
          description="Find the optimum bearing series for your operating envelope: specify equipment domain, shaft bore, RPM, and load vectors to receive tailored bearing recommendations and lubrication protocols."
          breadcrumb="Application Wizard"
        />
        <SmartApplicationWizard />
      </main>
      <Footer />
      <FloatingContactBar />
    </>
  );
}
