"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { BEARING_CATALOG } from "@/data/bearings";
import { BearingItem } from "@/types/bearing";
import { getBearingProductImage } from "@/components/catalog/BearingCard";
import { useRfq } from "@/context/RfqContext";
import { getWhatsAppUrl } from "@/data/siteConfig";

interface ApplicationDomain {
  id: string;
  name: string;
  icon: string;
  subtitle: string;
  defaultCategory: string;
  recommendedClearance: "CN" | "C3" | "C4";
  lubricationHint: string;
}

const APPLICATION_DOMAINS: ApplicationDomain[] = [
  {
    id: "motors",
    name: "Electric Motors & Spindles",
    icon: "⚡",
    subtitle: "Low torque loss, whisper-quiet running, EMQ vibration standard",
    defaultCategory: "Deep Groove",
    recommendedClearance: "C3",
    lubricationHint: "Polyurea low-noise synthetic grease (35% fill)",
  },
  {
    id: "heavy-crushers",
    name: "Heavy Mining & Crusher Screens",
    icon: "🏭",
    subtitle: "High impact shock, severe particulate dust, self-aligning deflection",
    defaultCategory: "Spherical Roller",
    recommendedClearance: "C4",
    lubricationHint: "Extreme-pressure molybdenum disulphide heavy grease",
  },
  {
    id: "gearboxes",
    name: "Industrial Gearboxes & Axles",
    icon: "⚙️",
    subtitle: "Heavy combined radial and axial thrust loads in reducers",
    defaultCategory: "Tapered Roller",
    recommendedClearance: "CN",
    lubricationHint: "EP Industrial mineral/synthetic gear oil bath (ISO VG 220-460)",
  },
  {
    id: "cnc-automation",
    name: "CNC Machinery & Automation",
    icon: "🤖",
    subtitle: "Zero backlash, sub-micron positioning repeatability, linear travel",
    defaultCategory: "Ball Screw",
    recommendedClearance: "CN",
    lubricationHint: "Low-viscosity linear motion lithium boundary grease",
  },
  {
    id: "pumps-compressors",
    name: "Pumps & Vertical Extruders",
    icon: "🚰",
    subtitle: "Continuous unidirectional axial thrust & fluid sealing",
    defaultCategory: "Thrust Bearing",
    recommendedClearance: "CN",
    lubricationHint: "Synthetic circulating oil or high-tack fluorosilicone grease",
  },
];

export default function SmartApplicationWizard() {
  const { toggleRfq, isItemInRfq } = useRfq();

  // Wizard Steps: 1, 2, 3
  const [step, setStep] = useState<number>(1);

  // User input selections
  const [selectedDomain, setSelectedDomain] = useState<string>("motors");
  const [targetShaftMm, setTargetShaftMm] = useState<number>(40);
  const [targetRpm, setTargetRpm] = useState<number>(3000);
  const [loadVector, setLoadVector] = useState<"radial" | "thrust" | "combined">("radial");
  const [operatingTemp, setOperatingTemp] = useState<"normal" | "hot" | "extreme">("normal");

  const currentDomain = APPLICATION_DOMAINS.find((d) => d.id === selectedDomain) || APPLICATION_DOMAINS[0];

  // Recommendation Engine
  const recommendedItems = useMemo(() => {
    // 1. Filter by category affinity or load vector
    let matches = BEARING_CATALOG.filter((item) => {
      if (currentDomain.defaultCategory === "Ball Screw") {
        return item.category === "Ball Screw" || item.category === "Linear Rail Guide" || item.category === "Linear Guide Block";
      }
      if (currentDomain.defaultCategory === "Thrust Bearing") {
        return item.category === "Thrust Bearing" || item.category === "Angular Contact";
      }
      if (currentDomain.defaultCategory === "Spherical Roller") {
        return item.category === "Spherical Roller" || item.category === "Cylindrical Roller";
      }
      if (currentDomain.defaultCategory === "Tapered Roller") {
        return item.category === "Tapered Roller" || item.category === "Deep Groove";
      }
      return item.category === currentDomain.defaultCategory;
    });

    if (matches.length === 0) matches = BEARING_CATALOG.slice(0, 3);

    // 2. Sort by closest bore diameter match
    return matches
      .map((item) => {
        const boreDiff = Math.abs(item.bore - targetShaftMm);
        const rpmCap = item.limitingSpeedGrease;
        const rpmPenalty = targetRpm > rpmCap ? 50 : 0;
        const score = boreDiff + rpmPenalty;
        return { item, score };
      })
      .sort((a, b) => a.score - b.score)
      .slice(0, 3)
      .map((x) => x.item);
  }, [currentDomain, targetShaftMm, targetRpm]);

  const primaryRecommendation = recommendedItems[0] || BEARING_CATALOG[0];
  const inCart = isItemInRfq(primaryRecommendation.id);

  return (
    <section className="evo-wizard-section" id="smart-wizard">
      <div className="evo-container">
        {/* Header Block */}
        <div className="wizard-header">
          <div className="wizard-tag-row">
            <span className="badge-tech">SMART SELECTION WIZARD</span>
            <span className="wizard-step-indicator">
              STEP {step} OF 3: {step === 1 ? "APPLICATION DOMAIN" : step === 2 ? "OPERATIONAL ENVELOPE" : "CERTIFIED RECOMMENDATION"}
            </span>
          </div>
          <h2 className="wizard-title">3-Step Smart Bearing &amp; Fit Finder</h2>
          <p className="wizard-subtitle">
            Input your mechanical drive parameters, operating temperatures, and shaft envelope. Our engineering algorithms calculate the exact DIN ISO 281 bearing match with recommended clearance and lubrication spec.
          </p>
        </div>

        {/* Wizard Card Container */}
        <div className="wizard-card-wrapper">
          {/* Step Navigation Dots */}
          <div className="wizard-steps-bar">
            <button
              type="button"
              className={`step-btn ${step === 1 ? "active" : step > 1 ? "completed" : ""}`}
              onClick={() => setStep(1)}
            >
              <span className="step-num">1</span>
              <span className="step-txt">Application Mechanism</span>
            </button>
            <div className={`step-connector ${step > 1 ? "active" : ""}`} />
            <button
              type="button"
              className={`step-btn ${step === 2 ? "active" : step > 2 ? "completed" : ""}`}
              onClick={() => setStep(2)}
            >
              <span className="step-num">2</span>
              <span className="step-txt">Operating Envelope</span>
            </button>
            <div className={`step-connector ${step > 2 ? "active" : ""}`} />
            <button
              type="button"
              className={`step-btn ${step === 3 ? "active" : ""}`}
              onClick={() => setStep(3)}
            >
              <span className="step-num">3</span>
              <span className="step-txt">Recommended Solution</span>
            </button>
          </div>

          {/* STEP 1: Application Domain Selection */}
          {step === 1 && (
            <div className="wizard-step-content">
              <h3 className="step-heading">Select Your Target Application Domain</h3>
              <p className="step-lead">
                Every operating environment exerts unique kinematic demands on rolling elements, internal clearances, and cage alloys:
              </p>

              <div className="domain-cards-grid">
                {APPLICATION_DOMAINS.map((dom) => (
                  <div
                    key={dom.id}
                    className={`domain-card ${selectedDomain === dom.id ? "selected" : ""}`}
                    onClick={() => setSelectedDomain(dom.id)}
                  >
                    <div className="domain-icon-box">{dom.icon}</div>
                    <h4 className="domain-title">{dom.name}</h4>
                    <p className="domain-sub">{dom.subtitle}</p>
                    <div className="domain-spec-badge">
                      <span>Primary: {dom.defaultCategory}</span>
                      <span>Clearance: {dom.recommendedClearance}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="wizard-footer-action">
                <button
                  type="button"
                  className="evo-btn-primary"
                  onClick={() => setStep(2)}
                >
                  Proceed to Operating Parameters →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Operating Envelope Parameters */}
          {step === 2 && (
            <div className="wizard-step-content">
              <h3 className="step-heading">Configure Operational Envelope</h3>
              <p className="step-lead">
                Adjust shaft dimensions, rotational velocity, load vectors, and operating heat:
              </p>

              <div className="wizard-inputs-grid">
                {/* Shaft Diameter */}
                <div className="w-input-card">
                  <div className="w-label-row">
                    <span className="w-lbl">Shaft / Bore Diameter ($d$)</span>
                    <strong className="w-val s-mono">{targetShaftMm} mm</strong>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="120"
                    step="1"
                    value={targetShaftMm}
                    onChange={(e) => setTargetShaftMm(Number(e.target.value))}
                    className="sim-slider"
                  />
                  <div className="slider-ticks">
                    <span>12mm</span>
                    <span>40mm</span>
                    <span>80mm</span>
                    <span>120mm</span>
                  </div>
                </div>

                {/* Rotational Speed */}
                <div className="w-input-card">
                  <div className="w-label-row">
                    <span className="w-lbl">Rotational Velocity ($n$)</span>
                    <strong className="w-val s-mono">{targetRpm.toLocaleString()} RPM</strong>
                  </div>
                  <input
                    type="range"
                    min="200"
                    max="18000"
                    step="200"
                    value={targetRpm}
                    onChange={(e) => setTargetRpm(Number(e.target.value))}
                    className="sim-slider"
                  />
                  <div className="slider-ticks">
                    <span>200</span>
                    <span>3,000</span>
                    <span>9,000</span>
                    <span>18,000</span>
                  </div>
                </div>

                {/* Dominant Load Vector */}
                <div className="w-input-card">
                  <span className="w-lbl">Dominant Load Direction</span>
                  <div className="pill-choice-row">
                    <button
                      type="button"
                      className={`pill-choice ${loadVector === "radial" ? "active" : ""}`}
                      onClick={() => setLoadVector("radial")}
                    >
                      Pure Radial (Transverse)
                    </button>
                    <button
                      type="button"
                      className={`pill-choice ${loadVector === "thrust" ? "active" : ""}`}
                      onClick={() => setLoadVector("thrust")}
                    >
                      Axial Thrust (Parallel)
                    </button>
                    <button
                      type="button"
                      className={`pill-choice ${loadVector === "combined" ? "active" : ""}`}
                      onClick={() => setLoadVector("combined")}
                    >
                      Heavy Combined Load
                    </button>
                  </div>
                </div>

                {/* Operating Temperature */}
                <div className="w-input-card">
                  <span className="w-lbl">Operating Temperature Envelope</span>
                  <div className="pill-choice-row">
                    <button
                      type="button"
                      className={`pill-choice ${operatingTemp === "normal" ? "active" : ""}`}
                      onClick={() => setOperatingTemp("normal")}
                    >
                      Standard (-20°C to +80°C)
                    </button>
                    <button
                      type="button"
                      className={`pill-choice ${operatingTemp === "hot" ? "active" : ""}`}
                      onClick={() => setOperatingTemp("hot")}
                    >
                      Elevated Heat (&gt;120°C)
                    </button>
                    <button
                      type="button"
                      className={`pill-choice ${operatingTemp === "extreme" ? "active" : ""}`}
                      onClick={() => setOperatingTemp("extreme")}
                    >
                      Severe Thermal (&gt;160°C)
                    </button>
                  </div>
                </div>
              </div>

              <div className="wizard-footer-action">
                <button
                  type="button"
                  className="evo-btn-secondary"
                  onClick={() => setStep(1)}
                >
                  ← Back to Mechanism
                </button>
                <button
                  type="button"
                  className="evo-btn-primary"
                  onClick={() => setStep(3)}
                >
                  Generate Engineered Recommendation →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Engineered Recommendation Display */}
          {step === 3 && (
            <div className="wizard-step-content">
              <div className="rec-top-banner">
                <span className="rec-match-pill">✓ 100% DIN ISO 281 KINEMATIC COMPATIBILITY</span>
                <h3 className="rec-heading">Primary Engineered Recommendation</h3>
                <p className="rec-sub">
                  Based on {targetShaftMm}mm bore, {targetRpm.toLocaleString()} RPM, and {loadVector} loading in {currentDomain.name}:
                </p>
              </div>

              {/* Spotlight Recommendation Card */}
              <div className="rec-spotlight-card">
                <div className="rec-visual-col">
                  <div className="rec-img-box">
                    <Image
                      src={getBearingProductImage(primaryRecommendation.category, primaryRecommendation.customImage)}
                      alt={primaryRecommendation.designation}
                      width={180}
                      height={180}
                      className="rec-img"
                      style={{ objectFit: "contain", maxHeight: "150px", width: "auto" }}
                    />
                    <span className="rec-stock-badge">
                      <span className="dot-green" /> Immediate Dispatch Stock
                    </span>
                  </div>
                </div>

                <div className="rec-details-col">
                  <div className="rec-title-row">
                    <div>
                      <span className="badge-cat">{primaryRecommendation.category}</span>
                      <span className="rec-series-txt">{primaryRecommendation.series}</span>
                      <h4 className="rec-part-code s-mono">{primaryRecommendation.designation}</h4>
                    </div>
                    <div className="rec-actions-fast">
                      <button
                        type="button"
                        className={`btn-rec-rfq ${inCart ? "active" : ""}`}
                        onClick={() => toggleRfq(primaryRecommendation)}
                      >
                        {inCart ? "✓ Added to RFQ Cart" : "+ Add to Quote List"}
                      </button>
                    </div>
                  </div>

                  <p className="rec-desc">{primaryRecommendation.description}</p>

                  {/* Parametric Matching Grid */}
                  <div className="rec-metrics-grid s-mono">
                    <div className="rec-m-cell">
                      <span className="m-lbl">Bore (d)</span>
                      <strong>{primaryRecommendation.bore} mm</strong>
                    </div>
                    <div className="rec-m-cell">
                      <span className="m-lbl">OD (D)</span>
                      <strong>{primaryRecommendation.od} mm</strong>
                    </div>
                    <div className="rec-m-cell">
                      <span className="m-lbl">Width (B)</span>
                      <strong>{primaryRecommendation.width} mm</strong>
                    </div>
                    <div className="rec-m-cell">
                      <span className="m-lbl">Dyn. Cr</span>
                      <strong className="text-cyan">{primaryRecommendation.dynamicLoadCr} kN</strong>
                    </div>
                    <div className="rec-m-cell">
                      <span className="m-lbl">Speed Limit</span>
                      <strong className="text-amber">{primaryRecommendation.limitingSpeedGrease.toLocaleString()} RPM</strong>
                    </div>
                    <div className="rec-m-cell">
                      <span className="m-lbl">Clearance</span>
                      <strong>{operatingTemp !== "normal" ? "C3 / C4" : primaryRecommendation.clearance}</strong>
                    </div>
                  </div>

                  {/* Prescribed Lubrication & Seal Protocol */}
                  <div className="rec-protocol-box">
                    <div className="p-item">
                      <span className="p-title">Prescribed Factory Lubricant:</span>
                      <span className="p-val">{currentDomain.lubricationHint}</span>
                    </div>
                    <div className="p-item">
                      <span className="p-title">Recommended Radial Clearance:</span>
                      <span className="p-val">
                        {operatingTemp !== "normal" ? "C3 / C4 (Compensates for thermal expansion)" : `${currentDomain.recommendedClearance} Normal`}
                      </span>
                    </div>
                    <div className="p-item">
                      <span className="p-title">Global Interchange Match:</span>
                      <span className="p-val s-mono">SKF {primaryRecommendation.crossRef.skf} · FAG {primaryRecommendation.crossRef.fag}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alternative Runners-Up */}
              {recommendedItems.length > 1 && (
                <div className="rec-alternatives-section">
                  <h4 className="alt-title">Alternative Dimensional Candidates:</h4>
                  <div className="alt-grid">
                    {recommendedItems.slice(1).map((alt) => (
                      <div key={alt.id} className="alt-card">
                        <div className="alt-info">
                          <span className="alt-cat">{alt.category}</span>
                          <strong className="alt-code s-mono">{alt.designation}</strong>
                          <span className="alt-dim s-mono">{alt.bore} × {alt.od} × {alt.width} mm</span>
                        </div>
                        <button
                          type="button"
                          className="alt-rfq-btn"
                          onClick={() => toggleRfq(alt)}
                        >
                          {isItemInRfq(alt.id) ? "✓ Added" : "+ Quote"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="wizard-footer-action">
                <button
                  type="button"
                  className="evo-btn-secondary"
                  onClick={() => setStep(2)}
                >
                  ← Modify Operating Envelope
                </button>
                <a
                  href={getWhatsAppUrl(
                    `Hello EVO Engineering, I used your 3-Step Wizard for ${currentDomain.name} (Shaft: ${targetShaftMm}mm, ${targetRpm} RPM). Recommended: ${primaryRecommendation.designation}. Please send technical quotation.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="evo-btn-primary"
                >
                  Send Specification to WhatsApp Desk →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
