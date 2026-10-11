import React, { Suspense } from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContactBar from "@/components/layout/FloatingContactBar";
import PageBanner from "@/components/layout/PageBanner";
import BearingCatalog from "@/components/catalog/BearingCatalog";
import OtherProducts from "@/components/home/OtherProducts";

export const metadata: Metadata = {
  title: "Industrial Bearing Catalog & Spares | EVO Bearings",
  description:
    "Explore EVO's complete range of industrial ball bearings, taper roller, spherical roller, cylindrical bearings, and power transmission mechanical spares.",
};

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main>
        <PageBanner
          badge="PARAMETRIC ENGINEERING CATALOG"
          title="Complete Industrial Bearing Range & Mechanical Spares."
          description="Browse thousands of precision bearings, review dimensional drawings (d x D x B), inspect ISO dynamic load ratings (Cr), and download certified engineering specification sheets."
          breadcrumb="Products & Ranges"
        />
        <Suspense fallback={<div className="evo-container" style={{ padding: "60px 0", textAlign: "center" }}>Loading Catalog...</div>}>
          <BearingCatalog />
        </Suspense>
        <OtherProducts />
      </main>
      <Footer />
      <FloatingContactBar />
    </>
  );
}
