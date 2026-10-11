import React from "react";
import { SITE_CONFIG } from "@/data/siteConfig";

interface IndustryItem {
  id: string;
  title: string;
  specs: string;
  body: string;
  series: string;
  tag: string;
  imageSrc: string;
}

const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: "cement",
    title: "Cement Industry & Kilns",
    specs: "High heat up to 180°C · C3/C4 Clearance · Solid Machined Brass Cages",
    body: "Heavy spherical roller bearings and cylindrical roller bearings engineered for raw grinding mills, clinker crushers, rotary kilns, and bucket elevators under severe particulate abrasion.",
    series: "22200 & 22300 Spherical Series",
    tag: "High Shock & Dust",
    imageSrc: "/images/industries/cement-industry.webp",
  },
  {
    id: "automotive",
    title: "Automotive Industry & Powertrains",
    specs: "Low friction torque · Electric motor EMQ quality · Long-life synthetic lubrication",
    body: "Deep groove ball bearings and tapered roller assemblies fitted across wheel hubs, alternators, gearbox shafts, transmission axles, and EV traction motors.",
    series: "6200, 6300 & 30200 Series",
    tag: "High Reliability",
    imageSrc: "/images/industries/automotive-industry.webp",
  },
  {
    id: "steel",
    title: "Steel Mills & Continuous Casters",
    specs: "Continuous water washdown · Fluorocarbon Viton seals · Dynamic Cr > 350 kN",
    body: "Multi-row cylindrical and spherical roller bearings operating reliably in roll necks, continuous casting guide rollers, cooling beds, and high-load rolling stands.",
    series: "NU Heavy & Spherical Casters",
    tag: "Extreme Load",
    imageSrc: "/images/industries/steel-industry.webp",
  },
  {
    id: "wind",
    title: "Wind Mill Energy Systems",
    specs: "Extended L10h fatigue life · Black oxide surface treatment · Low startup friction",
    body: "Large-diameter pitch bearings, yaw drives, and generator ceramic hybrid bearings engineered to endure turbulent gust loads and offshore moisture environments.",
    series: "Hybrid & Large Tapered Series",
    tag: "Renewable Power",
    imageSrc: "/images/industries/wind-mill-energy.webp",
  },
  {
    id: "oil-gas",
    title: "Oil and Gas Industry",
    specs: "Explosion-proof tolerances · API compliance · High thrust capability",
    body: "Angular contact duplex bearings and thrust spherical bearings powering offshore mud pumps, downhole drill heads, blowout preventers, and cryogenic liquid compressors.",
    series: "7200 Duplex & 29000 Thrust",
    tag: "Hazardous Duty",
    imageSrc: "/images/industries/oil-gas-industry.webp",
  },
  {
    id: "refineries",
    title: "Petrochemical Refineries",
    specs: "Chemical resistance · Dual Viton 2RS seals · Polyurea synthetic grease",
    body: "Centrifugal pump and pipeline mixer bearings designed to prevent toxic vapor leakage, withstand cavitation vibration, and maintain smooth 24/7 continuous duty.",
    series: "6200-2RSH & 7300 Spindle",
    tag: "Continuous Operation",
    imageSrc: "/images/industries/steel-industry.webp",
  },
  {
    id: "crushers",
    title: "Crusher & Quarry Mining",
    specs: "Vibratory acceleration > 5g · Self-aligning ± 2.5° · Machined brass cages",
    body: "Extra-clearance spherical bearings designed specifically for eccentric shafts in jaw crushers, cone crushers, and high-frequency vibrating sizing screens.",
    series: "22300 VA405 Vibratory Spec",
    tag: "Severe Impact",
    imageSrc: "/images/spares/crusher-spares.webp",
  },
  {
    id: "pharma-food",
    title: "Pharmaceuticals & Food Processing",
    specs: "FDA compliant lubrication · Stainless steel & ceramic options · Washdown ready",
    body: "High-cleanliness sealed ball bearings and mounted pillow blocks installed on tablet press machines, sterile bottling lines, conveyor mixers, and sanitary packaging.",
    series: "Stainless & Hybrid 6000",
    tag: "Clean Environment",
    imageSrc: "/images/industries/automotive-industry.webp",
  },
];

export default function Industries() {
  return (
    <section id="industries" className="evo-industries-section">
      <div className="evo-container">
        <div className="evo-industries-header">
          <div>
            <span className="evo-sec-tag">KEY SECTORS WHERE WE DELIVER VALUE</span>
            <h2 className="evo-sec-title">Industries We Serve Across India</h2>
            <p className="evo-sec-sub">
              EVO Bearings and Machineries supplies heavy-duty rolling element systems engineered for uninterrupted machine availability in severe operating environments.
            </p>
          </div>
          <a
            href={SITE_CONFIG.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="evo-btn-primary"
          >
            Consult Engineering Desk →
          </a>
        </div>

        <div className="evo-industries-grid">
          {INDUSTRIES_DATA.map((ind, i) => (
            <div key={ind.id} className="evo-industry-card">
              <div className="evo-ind-img-wrap">
                <img
                  src={ind.imageSrc}
                  alt={ind.title}
                  className="evo-ind-img"
                  loading="lazy"
                />
                <span className="evo-ind-badge-overlay">{ind.tag}</span>
              </div>
              <div className="evo-ind-card-body">
                <div className="evo-ind-header">
                  <span className="evo-ind-num">0{i + 1}</span>
                  <span className="evo-ind-series">{ind.series}</span>
                </div>
                <h3 className="evo-ind-title">{ind.title}</h3>
                <div className="evo-ind-specs">{ind.specs}</div>
                <p className="evo-ind-body">{ind.body}</p>
                <div className="evo-ind-footer">
                  <a href="/contact#quote" className="evo-ind-link">
                    Inquire Sector Solutions <span>→</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Banner CTA matching evomachinery.in */}
        <div className="evo-industries-cta-strip">
          <div className="evo-strip-left">
            <h3>To know more about the industries <em>&ldquo;WHERE WE SERVE&rdquo;</em></h3>
            <p>Our engineers calculate expected L10h life, lubrication intervals, and radial load factors for your machinery.</p>
          </div>
          <div className="evo-strip-right">
            <a href="#quote" className="evo-btn-primary">
              Request Application Study
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
