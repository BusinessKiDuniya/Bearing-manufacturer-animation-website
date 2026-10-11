"use client";

import React, { useState } from "react";

interface TestimonialItem {
  name: string;
  location: string;
  role: string;
  quote: string;
  rating: number;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Lavannya Jaiswal",
    location: "Kolkata, West Bengal",
    role: "Plant Operations Manager",
    quote: "The right place to get the best bearing materials with unmatched engineering support. Consistent quality across every batch of deep groove and taper roller bearings.",
    rating: 5,
  },
  {
    name: "Pavan Kumar",
    location: "Delhi NCR",
    role: "Chief Maintenance Engineer",
    quote: "Best quality and excellent service. Spherical roller bearings delivered within 24 hours during our critical plant shutdown. Prevented costly conveyor downtime.",
    rating: 5,
  },
  {
    name: "Mudit Sharma",
    location: "Delhi",
    role: "Industrial Spares Procurement Lead",
    quote: "Best Bearing House in Kolkata's market. Prompt service with most competitive market rates and German-adapted precision. Outstanding technical assistance.",
    rating: 5,
  },
  {
    name: "Anil Kumar",
    location: "Durgapur / Kolkata",
    role: "Steel Mill Mechanical Superintendent",
    quote: "Manufacturer of Best Quality and long life Spherical Roller Bearings and Pillow Blocks. High load capacity and zero vibration issues under continuous duty.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="evo-testi-section">
      <div className="evo-container">
        <div className="evo-testi-header">
          <span className="evo-sec-tag">WHAT OUR CLIENTS SAY</span>
          <h2 className="evo-sec-title">Client Testimonials Across India</h2>
          <p className="evo-sec-sub">
            Over 24 years of experience &amp; knowledge of industrial bearings making. Trusted by hundreds of machine builders, dealers, and plant managers nationwide.
          </p>
        </div>

        <div className="evo-testi-grid">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className={`evo-testi-card ${activeIdx === idx ? "highlighted" : ""}`}
              onClick={() => setActiveIdx(idx)}
            >
              <div className="evo-testi-stars">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="evo-star">★</span>
                ))}
              </div>
              <p className="evo-testi-quote">&ldquo;{t.quote}&rdquo;</p>
              <div className="evo-testi-author">
                <div className="evo-author-avatar">{t.name[0]}</div>
                <div className="evo-author-meta">
                  <h4 className="evo-author-name">{t.name}</h4>
                  <span className="evo-author-loc">{t.location} · {t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
