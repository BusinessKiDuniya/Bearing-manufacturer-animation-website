"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { BearingItem } from "@/types/bearing";
import { getBearingProductImage } from "./BearingCard";

interface ItemDetailModalProps {
  item: BearingItem | null;
  onClose: () => void;
  onAddToRfq: (item: BearingItem) => void;
  isAddedToRfq: boolean;
}

export default function ItemDetailModal({
  item,
  onClose,
  onAddToRfq,
  isAddedToRfq,
}: ItemDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (item) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  const handleDownloadSpec = () => {
    const content = `=====================================================
EVO BEARINGS & MACHINERIES PVT. LTD. - TECHNICAL SPEC SHEET
=====================================================
PART DESIGNATION: ${item.designation}
CATEGORY: ${item.category} (${item.series})
PRECISION GRADE: ${item.precisionGrade}
RADIAL CLEARANCE: ${item.clearance}
-----------------------------------------------------
DIMENSIONAL PARAMETERS:
- Bore Diameter (d): ${item.bore} mm
- Outside Diameter (D): ${item.od} mm
- Width (B): ${item.width} mm
- Net Mass: ${item.weightKg} kg

LOAD & SPEED CAPACITIES:
- Basic Dynamic Load Rating (Cr): ${item.dynamicLoadCr} kN
- Basic Static Load Rating (C0r): ${item.staticLoadCor} kN
- Fatigue Load Limit (Pu): ${item.fatigueLimitPu} kN
- Limiting Speed (Grease): ${item.limitingSpeedGrease.toLocaleString()} RPM
- Limiting Speed (Oil): ${item.limitingSpeedOil.toLocaleString()} RPM

CONSTRUCTION & MATERIALS:
- Steel Grade: Vacuum-degassed 100Cr6 / AISI 52100 high carbon chrome steel
- Rolling Elements: Grade 10 precision polished spheres / rollers
- Cage Type: ${item.cageType}
- Sealing: ${item.sealType}
- Lubrication: ${item.lubrication}
- Temperature Limits: ${item.tempRange}

CROSS-REFERENCE & INTERCHANGE:
- SKF Equivalent: ${item.crossRef.skf}
- FAG / INA Equivalent: ${item.crossRef.fag}
- NSK Equivalent: ${item.crossRef.nsk}
- TIMKEN Equivalent: ${item.crossRef.timken}

RECOMMENDED SHAFT / HOUSING FITS:
- Rotating Shaft (Normal load): ISO k5 / m5 (+0.009 / +0.002 mm)
- Stationary Housing: ISO H7 / J7 (+0.021 / 0.000 mm)

QUALITY ASSURANCE:
- DIN ISO 9001:2015 & IATF 16949 Certified
- 100% Noise & Vibration Anderon Meter Inspection
- Radial Runout Certified < 0.002 mm
=====================================================
EVO Bearings Engineering Desk: +91 98300 23456 / Kolkata & New Delhi
Email: info@evomachinery.in · https://evomachinery.in/
=====================================================`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `EVO-SPEC-${item.designation.replace(/[^a-zA-Z0-9]/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-left">
            <span className="badge-tech">{item.category}</span>
            <span className="badge-sub">{item.series}</span>
            <span className="badge-grade">{item.precisionGrade}</span>
          </div>
          <button className="btn-close" onClick={onClose} aria-label="Close dialog">
            ✕
          </button>
        </div>

        {/* Title row */}
        <div className="modal-title-row">
          <div>
            <h2 id="modal-title" className="modal-designation">{item.designation}</h2>
            <p className="modal-lead">{item.description}</p>
          </div>
          <div className="modal-stock-badge">
            <span className="stock-indicator-dot" />
            <div>
              <div className="stock-label">In Stock ({item.stockQty.toLocaleString()} pcs)</div>
              <div className="stock-sub">{item.leadTime}</div>
            </div>
          </div>
        </div>

        {/* Interactive CAD Blueprint Drawing & Real Product Photo */}
        <div className="modal-visual-row">
          <div className="modal-product-photo-box">
            <Image
              src={getBearingProductImage(item.category, item.customImage)}
              alt={item.designation}
              width={160}
              height={160}
              className="modal-product-img"
              style={{ objectFit: "contain", maxHeight: "140px", width: "auto" }}
            />
            <span className="modal-photo-caption">Industrial Bearing Element</span>
          </div>

          <div className="cad-blueprint-box">
            <div className="cad-header">
              <span className="cad-tag">ISO 15 / DIN 625 MECHANICAL PROFILE</span>
              <span className="cad-coords">SECTION A-A · SCALE 1:1 · METRIC (MM)</span>
            </div>
          <div className="cad-diagram-wrapper">
            <svg viewBox="0 0 540 200" className="cad-svg" aria-label={`Technical drawing of ${item.designation}`}>
              <defs>
                <pattern id="cadGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 113, 227, 0.06)" strokeWidth="0.8" />
                </pattern>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#0071E3" />
                </marker>
              </defs>

              {/* Grid Background */}
              <rect width="100%" height="100%" fill="url(#cadGrid)" />

              {/* Centerline */}
              <line x1="20" y1="100" x2="520" y2="100" stroke="#0071E3" strokeWidth="1" strokeDasharray="10 4 2 4" opacity="0.4" />

              {/* Bearing Cross-Section Representation */}
              {/* Outer Ring Top */}
              <rect x="180" y="24" width="180" height="32" rx="4" fill="#F5F5F7" stroke="#1D1D1F" strokeWidth="1.5" />
              <path d="M 270 42 Q 270 56 270 56" stroke="#0071E3" strokeWidth="1" />

              {/* Balls Top */}
              <circle cx="230" cy="74" r="16" fill="#FFFFFF" stroke="#0071E3" strokeWidth="1.5" />
              <circle cx="270" cy="74" r="16" fill="#FFFFFF" stroke="#1D1D1F" strokeWidth="1.5" />
              <circle cx="310" cy="74" r="16" fill="#FFFFFF" stroke="#0071E3" strokeWidth="1.5" />

              {/* Inner Ring Top */}
              <rect x="180" y="92" width="180" height="26" rx="4" fill="#F5F5F7" stroke="#1D1D1F" strokeWidth="1.5" />

              {/* Lower Section (Rotational mirror) */}
              <rect x="180" y="142" width="180" height="26" rx="4" fill="#F5F5F7" stroke="#1D1D1F" strokeWidth="1.5" />
              <circle cx="230" cy="126" r="16" fill="#FFFFFF" stroke="#0071E3" strokeWidth="1.5" />
              <circle cx="270" cy="126" r="16" fill="#FFFFFF" stroke="#1D1D1F" strokeWidth="1.5" />
              <circle cx="310" cy="126" r="16" fill="#FFFFFF" stroke="#0071E3" strokeWidth="1.5" />
              <rect x="180" y="110" width="180" height="14" rx="2" fill="#E5E5EA" stroke="#6E6E73" strokeWidth="1" strokeDasharray="3 3" />

              {/* Dimension B (Width) */}
              <line x1="180" y1="12" x2="360" y2="12" stroke="#0071E3" strokeWidth="1.2" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
              <text x="270" y="10" fill="#0071E3" fontSize="11" textAnchor="middle" fontFamily="sans-serif" fontWeight="600">
                B = {item.width} mm
              </text>

              {/* Dimension d (Bore) */}
              <line x1="150" y1="92" x2="150" y2="142" stroke="#0071E3" strokeWidth="1.2" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
              <text x="138" y="122" fill="#0071E3" fontSize="11" textAnchor="end" fontFamily="sans-serif" fontWeight="600">
                Ø d = {item.bore} mm
              </text>

              {/* Dimension D (Outer Diameter) */}
              <line x1="390" y1="24" x2="390" y2="174" stroke="#B45309" strokeWidth="1.2" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
              <text x="402" y="104" fill="#B45309" fontSize="11" textAnchor="start" fontFamily="sans-serif" fontWeight="600">
                Ø D = {item.od} mm
              </text>
            </svg>
          </div>
          <div className="cad-footer">
            <span>TOLERANCE CLASS: ISO NORMAL / DIN 620-2</span>
            <span>RADIAL INTERNAL CLEARANCE: {item.clearance} (DIN 620-4)</span>
          </div>
        </div>
      </div>

        {/* Engineering Specification Grid */}
        <div className="spec-tables-grid">
          {/* Main Dimensions & Loads */}
          <div className="spec-card">
            <h4 className="spec-group-title">Dimensional & Mechanical Load Ratings</h4>
            <div className="spec-row">
              <span className="spec-lbl">Bore Diameter (d)</span>
              <span className="spec-val s-mono">{item.bore} mm</span>
            </div>
            <div className="spec-row">
              <span className="spec-lbl">Outside Diameter (D)</span>
              <span className="spec-val s-mono">{item.od} mm</span>
            </div>
            <div className="spec-row">
              <span className="spec-lbl">Width (B)</span>
              <span className="spec-val s-mono">{item.width} mm</span>
            </div>
            <div className="spec-row">
              <span className="spec-lbl">Basic Dynamic Load Rating (Cr)</span>
              <span className="spec-val s-mono highlight-cyan">{item.dynamicLoadCr} kN</span>
            </div>
            <div className="spec-row">
              <span className="spec-lbl">Basic Static Load Rating (C0r)</span>
              <span className="spec-val s-mono highlight-cyan">{item.staticLoadCor} kN</span>
            </div>
            <div className="spec-row">
              <span className="spec-lbl">Fatigue Load Limit (Pu)</span>
              <span className="spec-val s-mono">{item.fatigueLimitPu} kN</span>
            </div>
            <div className="spec-row">
              <span className="spec-lbl">Net Unit Mass</span>
              <span className="spec-val s-mono">{item.weightKg} kg ({Math.round(item.weightKg * 1000)} g)</span>
            </div>
          </div>

          {/* Kinematics & Materials */}
          <div className="spec-card">
            <h4 className="spec-group-title">Operating Kinematics & Materials</h4>
            <div className="spec-row">
              <span className="spec-lbl">Limiting Speed (Grease)</span>
              <span className="spec-val s-mono highlight-amber">{item.limitingSpeedGrease.toLocaleString()} RPM</span>
            </div>
            <div className="spec-row">
              <span className="spec-lbl">Limiting Speed (Oil Bath)</span>
              <span className="spec-val s-mono highlight-amber">{item.limitingSpeedOil.toLocaleString()} RPM</span>
            </div>
            <div className="spec-row">
              <span className="spec-lbl">Seal / Shield Configuration</span>
              <span className="spec-val">{item.sealType}</span>
            </div>
            <div className="spec-row">
              <span className="spec-lbl">Separator Cage Type</span>
              <span className="spec-val">{item.cageType}</span>
            </div>
            <div className="spec-row">
              <span className="spec-lbl">Radial Internal Clearance</span>
              <span className="spec-val s-mono">{item.clearance}</span>
            </div>
            <div className="spec-row">
              <span className="spec-lbl">Standard Factory Lubricant</span>
              <span className="spec-val">{item.lubrication}</span>
            </div>
            <div className="spec-row">
              <span className="spec-lbl">Permissible Temp Range</span>
              <span className="spec-val s-mono">{item.tempRange}</span>
            </div>
          </div>
        </div>

        {/* Interchange Cross-Reference */}
        <div className="interchange-card">
          <h4 className="spec-group-title">Standard Brand Cross-Reference & Interchangeability</h4>
          <p className="interchange-sub">Direct 1:1 form-fit-function replacement for major industrial brands:</p>
          <div className="interchange-grid">
            <div className="interchange-item">
              <span className="brand-tag">SKF</span>
              <span className="brand-code s-mono">{item.crossRef.skf}</span>
            </div>
            <div className="interchange-item">
              <span className="brand-tag">FAG / INA</span>
              <span className="brand-code s-mono">{item.crossRef.fag}</span>
            </div>
            <div className="interchange-item">
              <span className="brand-tag">NSK</span>
              <span className="brand-code s-mono">{item.crossRef.nsk}</span>
            </div>
            <div className="interchange-item">
              <span className="brand-tag">TIMKEN</span>
              <span className="brand-code s-mono">{item.crossRef.timken}</span>
            </div>
          </div>
        </div>

        {/* Typical Applications */}
        <div className="app-pills-box">
          <span className="spec-lbl">Certified Operating Applications:</span>
          <div className="app-pills">
            {item.applications.map((app, idx) => (
              <span key={idx} className="app-pill">✓ {app}</span>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="modal-actions-bar">
          <button
            type="button"
            className="btn-outline-tech"
            onClick={handleDownloadSpec}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Engineering Spec Sheet (.txt)
          </button>

          <div className="modal-actions-right">
            <button
              type="button"
              className={`btn-rfq-toggle ${isAddedToRfq ? "active" : ""}`}
              onClick={() => onAddToRfq(item)}
            >
              {isAddedToRfq ? (
                <>✓ Added to RFQ Cart</>
              ) : (
                <>+ Add to Quote List</>
              )}
            </button>
            <a
              href="#quote"
              className="btn-solid-primary"
              onClick={onClose}
            >
              Request Quote for {item.designation} →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
