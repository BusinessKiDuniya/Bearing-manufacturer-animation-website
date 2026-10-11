import React from "react";

interface OtherProductItem {
  id: string;
  title: string;
  desc: string;
  specs: string;
  imageSrc: string;
  iconSvg: React.ReactNode;
}

const OTHER_PRODUCTS: OtherProductItem[] = [
  {
    id: "v-belts",
    title: "V Belts & Industrial Belting",
    desc: "Industrial grade wrapped classical and wedge V-belts engineered for extreme heat resistance, high tensile load transmission, and anti-static operation.",
    specs: "Sections: A, B, C, D, SPA, SPB, SPC, 3V, 5V, 8V",
    imageSrc: "/images/spares/v-belt.webp",
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="12" rx="10" ry="6" />
        <ellipse cx="12" cy="12" rx="6" ry="3" />
      </svg>
    ),
  },
  {
    id: "transmission-chain",
    title: "Transmission Chains & Sprockets",
    desc: "Precision industrial roller chains, double pitch conveyor chains, and heavy-duty cranked link chains manufactured from heat-treated alloy steel.",
    specs: "ANSI & BS Standards: 08B to 32B, Simplex & Duplex",
    imageSrc: "/images/spares/transmission-chain.webp",
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="12" r="3" />
        <path d="M6 9h12M6 15h12" />
      </svg>
    ),
  },
  {
    id: "conveyor-belts",
    title: "Conveyor Belts & Rubber Systems",
    desc: "Multi-ply textile and steel-cord conveyor belting for mining, cement works, thermal power, and bulk quarry handling under high-impact conditions.",
    specs: "Tensile Ratings: EP 200 to EP 1600 · Widths up to 2200mm",
    imageSrc: "/images/spares/conveyor-belts.webp",
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <line x1="6" y1="12" x2="18" y2="12" />
      </svg>
    ),
  },
  {
    id: "crusher-spares",
    title: "Crusher Spares & Vibratory Parts",
    desc: "High-manganese wear liners, eccentric shafts, spherical roller screen bearings, and toggle plates designed for harsh aggregate crushing.",
    specs: "High-Shock Bearing Clearance: C4 Special Vibratory Spec",
    imageSrc: "/images/spares/crusher-spares.webp",
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    id: "oil-seals",
    title: "Rotary Shaft Oil Seals & Hydraulic Packing",
    desc: "Viton (FKM) and Nitrile double-lip spring-loaded radial shaft seals engineered to retain industrial lubricants and exclude abrasive slurry.",
    specs: "Sizes: 10mm to 350mm Shaft Bore · Viton, NBR & PTFE",
    imageSrc: "/products/oil-seal.png",
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
      </svg>
    ),
  },
  {
    id: "solid-shafts",
    title: "Induction Hardened Linear Shafts",
    desc: "Hard chrome plated solid precision transmission shafts induction surface hardened to HRC 60-64 with Ra 0.2µm finish for linear bushings.",
    specs: "Diameters: 8mm to 80mm · Tolerance ISO h6 / f7",
    imageSrc: "/products/solid-shaft.png",
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="10" rx="3" />
        <line x1="6" y1="7" x2="6" y2="17" />
        <line x1="18" y1="7" x2="18" y2="17" />
      </svg>
    ),
  },
];

export default function OtherProducts() {
  return (
    <section className="evo-other-section">
      <div className="evo-container">
        <div className="evo-other-header">
          <div>
            <span className="evo-sec-tag">COMPLETE POWER TRANSMISSION RANGE</span>
            <h2 className="evo-sec-title">We Also Deal In Other Spares</h2>
            <p className="evo-sec-sub">
              Along with industrial rolling bearings, EVO Machineries supplies industrial transmission components for one-stop plant maintenance.
            </p>
          </div>
          <a href="/contact#quote" className="evo-btn-primary">
            Inquire for Spares →
          </a>
        </div>

        <div className="evo-other-grid">
          {OTHER_PRODUCTS.map((prod) => (
            <div key={prod.id} className="evo-other-card">
              <div className="evo-other-img-wrap">
                <img
                  src={prod.imageSrc}
                  alt={prod.title}
                  className="evo-other-img"
                  loading="lazy"
                />
                <div className="evo-other-icon-overlay">{prod.iconSvg}</div>
              </div>
              <h3 className="evo-other-title">{prod.title}</h3>
              <p className="evo-other-desc">{prod.desc}</p>
              <div className="evo-other-specs">{prod.specs}</div>
              <a href="/contact#quote" className="evo-other-link">
                <span>Request Quotation</span>
                <span className="evo-arrow">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
