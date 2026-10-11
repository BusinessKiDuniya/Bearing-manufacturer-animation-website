import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContactBar from "@/components/layout/FloatingContactBar";
import PageBanner from "@/components/layout/PageBanner";
import FitCalculator from "@/components/tools/FitCalculator";
import SmartApplicationWizard from "@/components/tools/SmartApplicationWizard";

export const metadata: Metadata = {
  title: "Engineering Tools & ISO 286 Shaft Fit Calculator | EVO Bearings",
  description:
    "Interactive ISO 286 shaft and housing fit calculator & 3-step smart application selection wizard for industrial machine design and precision bearing installations.",
};

export default function ToolsPage() {
  return (
    <>
      <Header />
      <main>
        <PageBanner
          badge="PRECISION DESIGN SUITE · ISO 286 / DIN 620"
          title="Engineering Fit & Application Selection Suite."
          description="Avoid premature bearing spalling or inner-ring slippage. Calculate recommended shaft and housing fits and identify the optimal rolling element series for your machine's operational envelope."
          breadcrumb="Engineering Tools"
        />
        <SmartApplicationWizard />
        <FitCalculator />

        {/* Dedicated Cross-Reference Link to Interchange Page */}
        <section className="evo-sec-space" style={{ paddingTop: 0 }}>
          <div className="evo-container">
            <div className="evo-home-rfq-banner">
              <span className="badge-tech">LOOKING FOR BRAND CROSS-REFERENCE?</span>
              <h2 className="evo-banner-title">Universal Bearing Brand Interchange Desk</h2>
              <p className="evo-banner-desc">
                Cross-reference competitor part numbers from SKF, FAG, NSK, Timken, NTN, and KOYO into 1:1 certified EVO drop-in equivalents with verified load capacities on our dedicated Interchange tool.
              </p>
              <div className="evo-banner-actions">
                <Link href="/interchange" className="evo-btn-primary">
                  Open Brand Interchange Tool →
                </Link>
                <Link href="/contact" className="evo-btn-outline">
                  Contact Technical Support
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContactBar />
    </>
  );
}
