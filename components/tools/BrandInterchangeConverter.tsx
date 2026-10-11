"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { BEARING_CATALOG } from "@/data/bearings";
import { BearingItem } from "@/types/bearing";
import { getBearingProductImage } from "@/components/catalog/BearingCard";
import { useRfq } from "@/context/RfqContext";
import { getWhatsAppUrl } from "@/data/siteConfig";

interface BrandInterchangeConverterProps {
  onAddRfq?: (item: BearingItem) => void;
}

const QUICK_LOOKUP_SUGGESTIONS = [
  { code: "6204", brand: "SKF", note: "Deep Groove 20mm" },
  { code: "22212", brand: "SKF / FAG", note: "Spherical Roller 60mm" },
  { code: "30205", brand: "Timken / SKF", note: "Tapered Roller 25mm" },
  { code: "NU 210", brand: "FAG / NSK", note: "Cylindrical Roller 50mm" },
  { code: "29416", brand: "SKF / Timken", note: "Spherical Thrust 80mm" },
  { code: "51108", brand: "SKF / INA", note: "Thrust Ball 40mm" },
  { code: "HGR 25", brand: "HIWIN / THK", note: "Linear Guide Rail" },
  { code: "SFU 2505", brand: "TBI / NSK", note: "Ball Screw Assembly" },
  { code: "TC 50X72X10", brand: "Simrit / NOK", note: "Rotary Oil Seal" },
];

export default function BrandInterchangeConverter({ onAddRfq }: BrandInterchangeConverterProps) {
  const { toggleRfq, isItemInRfq } = useRfq();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrandFilter, setSelectedBrandFilter] = useState<string>("All");

  const normalizedQuery = searchTerm.trim().toLowerCase().replace(/[^a-z0-9]/g, "");

  const searchResults = useMemo(() => {
    if (!normalizedQuery) {
      // Default to top 6 popular industrial items
      return BEARING_CATALOG.slice(0, 6);
    }

    return BEARING_CATALOG.filter((item) => {
      const designationNorm = item.designation.toLowerCase().replace(/[^a-z0-9]/g, "");
      const skfNorm = item.crossRef.skf.toLowerCase().replace(/[^a-z0-9]/g, "");
      const fagNorm = item.crossRef.fag.toLowerCase().replace(/[^a-z0-9]/g, "");
      const nskNorm = item.crossRef.nsk.toLowerCase().replace(/[^a-z0-9]/g, "");
      const timkenNorm = item.crossRef.timken.toLowerCase().replace(/[^a-z0-9]/g, "");
      const catNorm = item.category.toLowerCase().replace(/[^a-z0-9]/g, "");

      const matchesQuery =
        designationNorm.includes(normalizedQuery) ||
        skfNorm.includes(normalizedQuery) ||
        fagNorm.includes(normalizedQuery) ||
        nskNorm.includes(normalizedQuery) ||
        timkenNorm.includes(normalizedQuery) ||
        catNorm.includes(normalizedQuery);

      if (!matchesQuery) return false;

      if (selectedBrandFilter === "SKF") return skfNorm.length > 0;
      if (selectedBrandFilter === "FAG") return fagNorm.length > 0;
      if (selectedBrandFilter === "NSK") return nskNorm.length > 0;
      if (selectedBrandFilter === "TIMKEN") return timkenNorm.length > 0;

      return true;
    });
  }, [normalizedQuery, selectedBrandFilter]);

  const handleToggle = (item: BearingItem) => {
    if (onAddRfq) {
      onAddRfq(item);
    } else {
      toggleRfq(item);
    }
  };

  return (
    <section className="evo-interchange-section" id="interchange">
      <div className="evo-container">
        {/* Header Block */}
        <div className="interchange-header-block">
          <div className="interchange-badge-row">
            <span className="badge-tech">UNIVERSAL CROSS-REFERENCE</span>
            <span className="interchange-pill-brand">SKF · FAG · NSK · TIMKEN · NTN ➔ EVO</span>
          </div>
          <h2 className="interchange-title">Brand Interchange &amp; Cross-Reference Converter</h2>
          <p className="interchange-desc">
            Instantly identify 100% form-fit-function EVO equivalents for all major global bearing manufacturers. Review dimensional matches (d × D × B), compare dynamic load capacities, and verify same-day dispatch stock.
          </p>
        </div>

        {/* Search & Brand Filter Bar */}
        <div className="interchange-search-card">
          <div className="interchange-input-wrap">
            <svg
              className="interchange-search-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Enter competitor part code (e.g. 22212, 6204-2RS, 30205, NU 210, SFU 2505, HGR 25)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="interchange-input"
            />
            {searchTerm && (
              <button
                type="button"
                className="interchange-clear-btn"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Suggestions Chips */}
          <div className="interchange-quick-row">
            <span className="quick-label">Popular Lookups:</span>
            <div className="quick-chips">
              {QUICK_LOOKUP_SUGGESTIONS.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="quick-chip"
                  onClick={() => setSearchTerm(s.code)}
                >
                  <strong className="chip-brand">{s.brand}</strong>
                  <span>{s.code}</span>
                  <span className="chip-note">({s.note})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Brand Filter Tabs */}
          <div className="interchange-brand-tabs">
            {["All", "SKF", "FAG", "NSK", "TIMKEN"].map((brand) => (
              <button
                key={brand}
                type="button"
                className={`brand-filter-btn ${selectedBrandFilter === brand ? "active" : ""}`}
                onClick={() => setSelectedBrandFilter(brand)}
              >
                {brand === "All" ? "All Global Brands" : `${brand} Interchange`}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="interchange-results-meta">
          <span>
            Matched <strong>{searchResults.length}</strong> certified industrial reference{searchResults.length === 1 ? "" : "s"}
            {searchTerm && ` for "${searchTerm}"`}
          </span>
          <span className="interchange-iso-note">
            ✓ 1:1 Interchangeability to ISO 15 / DIN 625 Standards
          </span>
        </div>

        {/* Comparison Cards Grid */}
        <div className="interchange-cards-grid">
          {searchResults.map((item) => {
            const inCart = isItemInRfq(item.id);
            const imgSrc = getBearingProductImage(item.category, item.customImage);

            return (
              <div key={item.id} className="interchange-card-item">
                {/* Top Badge & Category */}
                <div className="ic-top">
                  <span className="badge-cat">{item.category}</span>
                  <span className="ic-series-pill">{item.series}</span>
                  <span className="stock-tag in-stock">
                    <span className="dot-green" /> In Stock ({item.stockQty.toLocaleString()} pcs)
                  </span>
                </div>

                {/* Main Content Row: Image + Code Comparison */}
                <div className="ic-main-row">
                  {/* Real Product Photo */}
                  <div className="ic-photo-box">
                    <Image
                      src={imgSrc}
                      alt={item.designation}
                      width={120}
                      height={120}
                      className="ic-product-img"
                      style={{ objectFit: "contain", maxHeight: "100px", width: "auto" }}
                    />
                    <span className="ic-photo-caption">100Cr6 Vacuum Steel</span>
                  </div>

                  {/* Interchange Equivalents Table */}
                  <div className="ic-cross-matrix">
                    <div className="ic-evo-match">
                      <span className="ic-evo-lbl">EVO CERTIFIED EQUIVALENT:</span>
                      <h3 className="ic-evo-code s-mono">{item.designation}</h3>
                    </div>

                    <div className="ic-competitor-grid">
                      <div className="ic-comp-cell">
                        <span className="ic-brand-tag">SKF</span>
                        <span className="ic-comp-code s-mono">{item.crossRef.skf || "Direct Spec Match"}</span>
                      </div>
                      <div className="ic-comp-cell">
                        <span className="ic-brand-tag">FAG / INA</span>
                        <span className="ic-comp-code s-mono">{item.crossRef.fag || "Direct Spec Match"}</span>
                      </div>
                      <div className="ic-comp-cell">
                        <span className="ic-brand-tag">NSK</span>
                        <span className="ic-comp-code s-mono">{item.crossRef.nsk || "Direct Spec Match"}</span>
                      </div>
                      <div className="ic-comp-cell">
                        <span className="ic-brand-tag">TIMKEN</span>
                        <span className="ic-comp-code s-mono">{item.crossRef.timken || "Direct Spec Match"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dimensions & Load Data Strip */}
                <div className="ic-specs-strip s-mono">
                  <div className="ic-spec-col">
                    <span className="ic-s-lbl">Bore (d)</span>
                    <strong className="ic-s-val">{item.bore} mm</strong>
                  </div>
                  <div className="ic-spec-col">
                    <span className="ic-s-lbl">OD (D)</span>
                    <strong className="ic-s-val">{item.od} mm</strong>
                  </div>
                  <div className="ic-spec-col">
                    <span className="ic-s-lbl">Width (B)</span>
                    <strong className="ic-s-val">{item.width} mm</strong>
                  </div>
                  <div className="ic-spec-col">
                    <span className="ic-s-lbl">Dyn. Cr</span>
                    <strong className="ic-s-val text-cyan">{item.dynamicLoadCr} kN</strong>
                  </div>
                  <div className="ic-spec-col">
                    <span className="ic-s-lbl">Limiting RPM</span>
                    <strong className="ic-s-val text-amber">{item.limitingSpeedGrease.toLocaleString()}</strong>
                  </div>
                  <div className="ic-spec-col">
                    <span className="ic-s-lbl">Clearance</span>
                    <strong className="ic-s-val">{item.clearance}</strong>
                  </div>
                </div>

                {/* Card Bottom: Advantage & RFQ Button */}
                <div className="ic-actions-row">
                  <div className="ic-advantage-text">
                    <span className="evo-check">✓</span>
                    <span>Direct 1:1 Form-Fit Drop-in · Zero Redesign Required · Mill Test Cert Included</span>
                  </div>

                  <div className="ic-action-btns">
                    <a
                      href={getWhatsAppUrl(
                        `Hello EVO Team, I need price and availability for interchange match: ${item.designation} (Equivalent to ${item.crossRef.skf})`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ic-whatsapp"
                      title="Quick WhatsApp Quotation"
                    >
                      WhatsApp Quote
                    </a>
                    <button
                      type="button"
                      className={`btn-ic-rfq ${inCart ? "active" : ""}`}
                      onClick={() => handleToggle(item)}
                    >
                      {inCart ? "✓ In RFQ Cart" : "+ Add to Quote List"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {searchResults.length === 0 && (
          <div className="ic-empty-card">
            <h3 className="empty-title">No direct reference found for "{searchTerm}"</h3>
            <p className="empty-sub">
              Our engineering desk stocks over 10,000+ custom non-standard bearings and hard-to-find legacy part numbers.
            </p>
            <a
              href={getWhatsAppUrl(
                `Hello EVO Team, I am looking for bearing reference: ${searchTerm}. Please check stock & price.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="evo-btn-primary"
            >
              Ask Engineering Desk on WhatsApp →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
