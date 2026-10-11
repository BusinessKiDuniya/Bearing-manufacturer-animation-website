"use client";

import React from "react";
import Image from "next/image";
import { BearingItem } from "@/types/bearing";

export function getBearingProductImage(category: string, customImage?: string): string {
  if (customImage) return customImage;
  switch (category) {
    case "Tapered Roller":
      return "/products/tapper-roller-bearing.png";
    case "Cylindrical Roller":
      return "/products/cylindrical-roller-bearing.png";
    case "Spherical Roller":
      return "/products/spherical-roller-bearing.png";
    case "Angular Contact":
      return "/products/thrust-middle-bearing.png";
    case "Thrust Bearing":
      return "/products/thrust-roller-bearing.png";
    case "Linear Rail Guide":
      return "/products/linear-rail-guide.png";
    case "Linear Guide Block":
      return "/products/linear-guide-rail-block.png";
    case "Ball Screw":
      return "/products/ball screw.png";
    case "Solid Shaft":
      return "/products/solid-shaft.png";
    case "Oil Seal":
      return "/products/oil-seal.png";
    case "Pillow Block":
      return "/products/thrust-roller-bearing.png";
    case "Deep Groove":
    case "Ceramic Hybrid":
    default:
      return "/products/bearing.png";
  }
}

interface BearingCardProps {
  item: BearingItem;
  inRfq: boolean;
  onInspect: (item: BearingItem) => void;
  onToggleRfq: (item: BearingItem) => void;
}

export default function BearingCard({
  item,
  inRfq,
  onInspect,
  onToggleRfq,
}: BearingCardProps) {
  const imgSrc = getBearingProductImage(item.category, item.customImage);

  return (
    <div className="bearing-item-card">
      {/* Top Badges */}
      <div className="card-top-row">
        <span className="badge-cat">{item.category}</span>
        <span className="stock-tag in-stock">
          <span className="dot-green" /> In Stock
        </span>
      </div>

      {/* Real Product Photo */}
      <div className="card-silhouette-wrap card-real-product-wrap" onClick={() => onInspect(item)}>
        <Image
          src={imgSrc}
          alt={item.designation}
          width={180}
          height={180}
          className="card-product-img"
          style={{ objectFit: "contain", maxHeight: "140px", width: "auto" }}
          priority={false}
        />
        <span className="hover-inspect-cue">Click to inspect CAD</span>
      </div>

      {/* Title & Dimensions */}
      <div className="card-info" onClick={() => onInspect(item)}>
        <h3 className="card-designation s-mono">{item.designation}</h3>
        <p className="card-series s-muted">{item.series}</p>
        <div className="card-dimensions s-mono">
          <span>Bore: <strong>{item.bore} mm</strong></span>
          <span className="dim-sep">·</span>
          <span>OD: <strong>{item.od} mm</strong></span>
          <span className="dim-sep">·</span>
          <span>Width: <strong>{item.width} mm</strong></span>
        </div>
      </div>

      {/* Technical Key Data */}
      <div className="card-tech-meta">
        <div className="meta-col">
          <span className="meta-label">Dyn. Load (Cr)</span>
          <span className="meta-val s-mono text-cyan">{item.dynamicLoadCr} kN</span>
        </div>
        <div className="meta-col">
          <span className="meta-label">Limiting Speed</span>
          <span className="meta-val s-mono text-amber">
            {item.limitingSpeedGrease.toLocaleString()} RPM
          </span>
        </div>
        <div className="meta-col">
          <span className="meta-label">Seal / Shield</span>
          <span className="meta-val">{item.sealType.split(" ")[0]}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="card-actions">
        <button
          type="button"
          className="btn-card-inspect"
          onClick={() => onInspect(item)}
        >
          Inspect Specs & CAD
        </button>
        <button
          type="button"
          className={`btn-card-rfq ${inRfq ? "active" : ""}`}
          onClick={() => onToggleRfq(item)}
          title={inRfq ? "Remove from RFQ" : "Add to RFQ list"}
        >
          {inRfq ? "✓ Added" : "+ RFQ"}
        </button>
      </div>
    </div>
  );
}
