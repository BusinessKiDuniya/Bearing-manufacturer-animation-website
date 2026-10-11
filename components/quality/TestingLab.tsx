"use client";

import React, { useState } from "react";

export default function TestingLab() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tests = [
    {
      title: "Roundness & Formscan (CMM)",
      standard: "ISO 1101 / DIN ISO 492",
      metric: "Form deviation < 0.6 µm",
      description: "Zeiss Prismo Coordinate Measuring Machines scan inner and outer raceway tracks with micro-inch accuracy to verify roundness, crown profile, and raceway concentricity.",
      specs: [
        { label: "Probe Resolution", val: "0.01 µm" },
        { label: "Max Ovality Allowance", val: "0.8 µm (P4 Grade)" },
        { label: "Raceway Curvature Precision", val: "± 0.001 mm" },
      ]
    },
    {
      title: "Vibration & Anderon Noise Testing",
      standard: "ISO 15242-1 / JIS B 1548",
      metric: "Anderon Value < 1.2 Anderon",
      description: "Acoustic and piezo-electric Anderon velocity sensors analyze low, medium, and high-frequency band vibration under preload, rejecting any micro-spalling or particle contamination.",
      specs: [
        { label: "Low Band (50 - 300 Hz)", val: "Pass (< 0.8 Anderon)" },
        { label: "Medium Band (300 - 1800 Hz)", val: "Pass (< 1.1 Anderon)" },
        { label: "High Band (1800 - 10000 Hz)", val: "Pass (< 1.4 Anderon)" },
      ]
    },
    {
      title: "100Cr6 Metallurgical Verification",
      standard: "ASTM A295 / DIN EN ISO 683-17",
      metric: "Hardness 60 - 64 HRC",
      description: "Optical emission spectroscopy and micro-hardness testing confirm vacuum-degassed high-carbon chromium steel microstructure, ensuring uniform martensitic grain structure.",
      specs: [
        { label: "Carbon (C)", val: "0.98 - 1.05%" },
        { label: "Chromium (Cr)", val: "1.40 - 1.65%" },
        { label: "Inclusions (ISO 4967)", val: "Grade A ≤ 1.0, B ≤ 0.5" },
      ]
    },
    {
      title: "Endurance & Dynamic Load Rig",
      standard: "ISO 281 L10h Calculation Testing",
      metric: "Test Cycle > 2,000 hrs @ 2.5x Cr",
      description: "Continuous cyclic radial and thrust load endurance benches operate at elevated temperatures with continuous vibration telemetry to validate catalogue fatigue life ratings.",
      specs: [
        { label: "Load Factor", val: "250% Rated Dynamic Cr" },
        { label: "Oil Sump Temp", val: "110°C Continuous" },
        { label: "L10h Correlation", val: "Exceeds ISO 281 minimums" },
      ]
    }
  ];

  return (
    <section id="quality" className="quality-section">
      <div className="quality-container">
        <div className="quality-header">
          <span className="section-eyebrow s-mono">QUALITY AUDITING & METROLOGY LAB</span>
          <h2 className="section-title">Zero-Defect Verification Protocols</h2>
          <p className="section-desc">
            Every batch undergoes automated 100% dimensional laser gauging, acoustic resonance vibration testing, and metallurgical carbon-chromium verification.
          </p>
        </div>

        {/* Interactive Lab Tabs */}
        <div className="lab-card">
          <div className="lab-tabs-nav">
            {tests.map((test, index) => (
              <button
                key={index}
                className={`lab-nav-item ${activeTab === index ? "active" : ""}`}
                onClick={() => setActiveTab(index)}
              >
                <span className="lab-nav-index s-mono">0{index + 1}</span>
                <span className="lab-nav-title">{test.title}</span>
                <span className="lab-nav-metric s-mono">{test.metric}</span>
              </button>
            ))}
          </div>

          <div className="lab-tab-content">
            <div className="lab-content-header">
              <div>
                <span className="badge-tech">{tests[activeTab].standard}</span>
                <h3 className="lab-content-title">{tests[activeTab].title}</h3>
              </div>
              <div className="lab-status-badge">
                <span className="dot-green" /> 100% IN-LINE INSPECTED
              </div>
            </div>

            <p className="lab-content-desc">{tests[activeTab].description}</p>

            <div className="lab-specs-grid">
              {tests[activeTab].specs.map((sp, i) => (
                <div key={i} className="lab-spec-card">
                  <span className="spec-lbl">{sp.label}</span>
                  <span className="spec-val s-mono text-cyan">{sp.val}</span>
                </div>
              ))}
            </div>

            <div className="lab-cert-bar">
              <span className="cert-item">✓ ISO 9001:2015 Registered</span>
              <span className="cert-item">✓ IATF 16949 Automotive Standard</span>
              <span className="cert-item">✓ EN 10204 3.1 Material Certificate Available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
