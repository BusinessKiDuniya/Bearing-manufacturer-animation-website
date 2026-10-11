import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContactBar from "@/components/layout/FloatingContactBar";
import Hero from "@/components/home/Hero";
import AboutCompany from "@/components/home/AboutCompany";
import DistributorPartners from "@/components/home/DistributorPartners";
import BearingExplodedSection from "@/components/3d/BearingExplodedSection";
import { SITE_CONFIG } from "@/data/siteConfig";

export default function HomePage() {
  return (
    <>
      {/* Top Bar & Single Row Navigation Header */}
      <Header />

      <main>
        {/* 1. Flagship Apple Minimalist Studio Hero */}
        <Hero />

        {/* 2. Flagship 3D Interactive Bearing Scroll Experience */}
        <BearingExplodedSection />

        {/* 3. Curated Essentials: Flagship Bearing Families */}
        {/* 3. Curated Essentials: Precision Bearings & Motion Range */}
        <section className="evo-home-essentials-section">
          <div className="evo-container">
            <div className="evo-home-header">
              <span className="badge-tech">FLAGSHIP INDUSTRIAL PORTFOLIO</span>
              <h2 className="section-title">Precision Products &amp; Motion Range</h2>
              <p className="section-desc">
                Engineered with vacuum-degassed 100Cr6 chrome steel, precision-ground raceways,
                and German-adapted DIN standards for high-load, extreme-temperature industrial service.
              </p>
            </div>

            <div className="evo-essentials-grid">
              {/* Product 1: Deep Groove Ball Bearings */}
              <Link href="/products?cat=Deep+Groove" className="evo-essential-card">
                <div className="evo-essential-img-box">
                  <Image
                    src="/products/bearing.png"
                    alt="Deep Groove Radial Ball Bearing"
                    width={130}
                    height={130}
                    className="evo-essential-img"
                  />
                </div>
                <span className="evo-essential-series">SERIES 6000 / 6200 / 6300</span>
                <h3 className="evo-essential-name">Deep Groove Radial Bearings</h3>
                <p className="evo-essential-desc">
                  Versatile low-friction bearings handling radial loads and moderate axial thrust at rotational speeds up to 30,000 RPM.
                </p>
                <span className="evo-essential-spec s-mono">P6 / P5 Precision Grade</span>
                <span className="evo-essential-link">
                  Inspect Specifications <span>→</span>
                </span>
              </Link>

              {/* Product 2: Tapered Roller Bearings */}
              <Link href="/products?cat=Tapered+Roller" className="evo-essential-card">
                <div className="evo-essential-img-box">
                  <Image
                    src="/products/tapper-roller-bearing.png"
                    alt="Tapered Roller Bearing"
                    width={130}
                    height={130}
                    className="evo-essential-img"
                  />
                </div>
                <span className="evo-essential-series">SERIES 30200 / 32200</span>
                <h3 className="evo-essential-name">Tapered Roller Bearings</h3>
                <p className="evo-essential-desc">
                  Conical raceway geometry engineered for heavy combined radial and unidirectional thrust loads in gearboxes and vehicle wheel hubs.
                </p>
                <span className="evo-essential-spec s-mono">High Shock Capacity</span>
                <span className="evo-essential-link">
                  Inspect Specifications <span>→</span>
                </span>
              </Link>

              {/* Product 3: Spherical Roller Bearings */}
              <Link href="/products?cat=Spherical+Roller" className="evo-essential-card">
                <div className="evo-essential-img-box">
                  <Image
                    src="/products/spherical-roller-bearing.png"
                    alt="Spherical Roller Bearing"
                    width={130}
                    height={130}
                    className="evo-essential-img"
                  />
                </div>
                <span className="evo-essential-series">SERIES 22200 / 22300</span>
                <h3 className="evo-essential-name">Spherical Roller Bearings</h3>
                <p className="evo-essential-desc">
                  Self-aligning dual-row rollers accommodating severe angular misalignment (up to ±2°) and high shock vibration in cement &amp; steel mills.
                </p>
                <span className="evo-essential-spec s-mono">Self-Aligning Design</span>
                <span className="evo-essential-link">
                  Inspect Specifications <span>→</span>
                </span>
              </Link>

              {/* Product 4: Cylindrical Roller Bearings */}
              <Link href="/products?cat=Cylindrical+Roller" className="evo-essential-card">
                <div className="evo-essential-img-box">
                  <Image
                    src="/products/cylindrical-roller-bearing.png"
                    alt="Cylindrical Roller Bearing"
                    width={130}
                    height={130}
                    className="evo-essential-img"
                  />
                </div>
                <span className="evo-essential-series">SERIES NU / NJ / NUP</span>
                <h3 className="evo-essential-name">Cylindrical Roller Bearings</h3>
                <p className="evo-essential-desc">
                  Line contact geometry maximizing radial load carrying capacity with high thermal expansion allowance on heavy motor shafts.
                </p>
                <span className="evo-essential-spec s-mono">Extreme Radial Load</span>
                <span className="evo-essential-link">
                  Inspect Specifications <span>→</span>
                </span>
              </Link>

              {/* Product 5: Thrust Roller & Ball Bearings */}
              <Link href="/products?cat=Thrust+Bearing" className="evo-essential-card">
                <div className="evo-essential-img-box">
                  <Image
                    src="/products/thrust-roller-bearing.png"
                    alt="Thrust Roller Bearing"
                    width={130}
                    height={130}
                    className="evo-essential-img"
                  />
                </div>
                <span className="evo-essential-series">SERIES 29000 &amp; 51100</span>
                <h3 className="evo-essential-name">Thrust Roller &amp; Ball Bearings</h3>
                <p className="evo-essential-desc">
                  Heavy axial thrust assemblies designed for vertical crane pivots, extrusion drives, pulverizers, and turntable thrust mounts.
                </p>
                <span className="evo-essential-spec s-mono">Up to 1,730 kN Axial C0r</span>
                <span className="evo-essential-link">
                  Inspect Specifications <span>→</span>
                </span>
              </Link>

              {/* Product 6: Linear Guide Rails */}
              <Link href="/products?cat=Linear+Rail+Guide" className="evo-essential-card">
                <div className="evo-essential-img-box">
                  <Image
                    src="/products/linear-rail-guide.png"
                    alt="Linear Rail Guide"
                    width={130}
                    height={130}
                    className="evo-essential-img"
                  />
                </div>
                <span className="evo-essential-series">HGR &amp; EGR SERIES</span>
                <h3 className="evo-essential-name">Linear Motion Guide Rails</h3>
                <p className="evo-essential-desc">
                  4-row circular arc precision-ground guide rails with four-direction equal load capacity and smooth sub-micron repeatability.
                </p>
                <span className="evo-essential-spec s-mono">High Rigidity Steel</span>
                <span className="evo-essential-link">
                  Inspect Specifications <span>→</span>
                </span>
              </Link>

              {/* Product 7: Linear Guide Blocks */}
              <Link href="/products?cat=Linear+Guide+Block" className="evo-essential-card">
                <div className="evo-essential-img-box">
                  <Image
                    src="/products/linear-guide-rail-block.png"
                    alt="Linear Guide Block"
                    width={130}
                    height={130}
                    className="evo-essential-img"
                  />
                </div>
                <span className="evo-essential-series">HGH &amp; HGW BLOCKS</span>
                <h3 className="evo-essential-name">Linear Carriage Slider Blocks</h3>
                <p className="evo-essential-desc">
                  Recirculating ball runner blocks with integrated dust scrapers, end seals, and synthetic ball retainers for automation machinery.
                </p>
                <span className="evo-essential-spec s-mono">Zero-Backlash Preload</span>
                <span className="evo-essential-link">
                  Inspect Specifications <span>→</span>
                </span>
              </Link>

              {/* Product 8: Precision Ball Screws */}
              <Link href="/products?cat=Ball+Screw" className="evo-essential-card">
                <div className="evo-essential-img-box">
                  <Image
                    src="/products/ball screw.png"
                    alt="Precision Ball Screw"
                    width={130}
                    height={130}
                    className="evo-essential-img"
                  />
                </div>
                <span className="evo-essential-series">SFU &amp; DFU SERIES</span>
                <h3 className="evo-essential-name">Precision Ball Screws &amp; Nuts</h3>
                <p className="evo-essential-desc">
                  Ground and cold-rolled recirculating ball screws providing high positioning accuracy and minimum torque loss for CNC feed drives.
                </p>
                <span className="evo-essential-spec s-mono">C5 / C7 Lead Accuracy</span>
                <span className="evo-essential-link">
                  Inspect Specifications <span>→</span>
                </span>
              </Link>
            </div>

            <div className="evo-home-more-action">
              <Link href="/products" className="evo-btn-primary">
                Explore All Products in Interactive Catalog →
              </Link>
            </div>
          </div>
        </section>

        {/* 4. Core Pillars: Precision Manufacturing & German Adapted Standards */}
        <AboutCompany />

        {/* 5. Interactive Duo Navigation (Tools & Industries) */}
        <section className="evo-home-duo-section">
          <div className="evo-container">
            <div className="evo-duo-grid">
              {/* Duo Card 1: Engineering Tools */}
              <Link href="/tools" className="evo-duo-card">
                <div>
                  <span className="evo-duo-tag">DESIGN & FIT CALCULATOR</span>
                  <h3 className="evo-duo-title">ISO 286 Shaft & Housing Fit Calculator</h3>
                  <p className="evo-duo-desc">
                    Ensure proper bearing seating and operating clearance. Compute recommended shaft tolerances (k5, m5) and housing limits (H7, J7) with micron-precision fits.
                  </p>
                </div>
                <span className="evo-duo-cta">
                  Open Interactive Fit Calculator <span>→</span>
                </span>
              </Link>

              {/* Duo Card 2: Industries */}
              <Link href="/industries" className="evo-duo-card">
                <div>
                  <span className="evo-duo-tag">APPLICATION SECTORS</span>
                  <h3 className="evo-duo-title">Heavy Industry Application Solutions</h3>
                  <p className="evo-duo-desc">
                    Customized bearing metallurgy and seal solutions for severe-duty environments across Cement Plants, Steel Mills, Wind Turbines, and Automotive OEMs.
                  </p>
                </div>
                <span className="evo-duo-cta">
                  Discover Industry Solutions <span>→</span>
                </span>
              </Link>
            </div>

            {/* Quick RFQ Banner */}
            <div className="evo-home-rfq-banner">
              <span className="badge-tech">APPLICATION ENGINEERING DESK</span>
              <h2 className="evo-banner-title">Need a Quick Quote or Drawing Evaluation?</h2>
              <p className="evo-banner-desc">
                Submit your required bearing designations, custom drawings, or operational load envelope.
                Our engineering desk in Kolkata and Delhi responds with certified pricing within 2 hours.
              </p>
              <div className="evo-banner-actions">
                <Link href="/contact" className="evo-btn-primary">
                  Request Instant RFQ Quote →
                </Link>
                <a
                  href={SITE_CONFIG.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="evo-btn-outline"
                >
                  Chat on WhatsApp Hotline
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Authorised Distributor & Brand Partners */}
        <DistributorPartners />
      </main>

      {/* Extended Multi-Column Footer */}
      <Footer />

      {/* Floating Right Action Bar & WhatsApp Button */}
      <FloatingContactBar />
    </>
  );
}