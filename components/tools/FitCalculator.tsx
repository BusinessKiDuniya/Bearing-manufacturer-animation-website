"use client";

import React, { useState } from "react";

export default function FitCalculator() {
  const [boreSize, setBoreSize] = useState<number>(25);
  const [loadCondition, setLoadCondition] = useState<"normal" | "heavy" | "light">("normal");
  const [temperature, setTemperature] = useState<"standard" | "high">("standard");

  // Calculations based on ISO 286 / DIN ISO 15 shaft tolerance fits
  const calculateShaftFit = () => {
    let fitClass = "k5";
    let lowerDev = 2; // µm
    let upperDev = 11; // µm

    if (loadCondition === "heavy") {
      fitClass = "m5";
      lowerDev = 9;
      upperDev = 18;
    } else if (loadCondition === "light") {
      fitClass = "j6";
      lowerDev = -4;
      upperDev = 9;
    }

    if (temperature === "high") {
      // Recommend slightly looser fit or larger internal clearance C3
      return {
        fitClass,
        lowerDev,
        upperDev,
        recommendation: "Ensure C3 radial internal clearance is selected to compensate for shaft thermal expansion (ΔT > 50°C).",
        toleranceRange: `+0.00${lowerDev} to +0.0${upperDev} mm`,
      };
    }

    return {
      fitClass,
      lowerDev,
      upperDev,
      recommendation: "Recommended for standard rotating inner ring applications (pumps, blowers, electric motors).",
      toleranceRange: `+0.00${lowerDev} to +0.0${upperDev} mm`,
    };
  };

  const calculateHousingFit = () => {
    let fitClass = "H7";
    let lowerDev = 0;
    let upperDev = 21;

    if (loadCondition === "heavy") {
      fitClass = "J7";
      lowerDev = -8;
      upperDev = 13;
    }

    return {
      fitClass,
      toleranceRange: `${lowerDev >= 0 ? "+" : ""}${lowerDev / 1000} to +${upperDev / 1000} mm`,
      recommendation: "Stationary outer ring allows smooth axial float for non-locating bearing positions.",
    };
  };

  const shaftResult = calculateShaftFit();
  const housingResult = calculateHousingFit();

  return (
    <section id="engineering-tools" className="tools-section">
      <div className="tools-container">
        <div className="tools-header">
          <span className="section-eyebrow s-mono">ENGINEERING UTILITY · ISO 286 FIT SYSTEM</span>
          <h2 className="section-title">Shaft & Housing Tolerance Calculator</h2>
          <p className="section-desc">
            Calculate precision machining shaft tolerance classes and housing bore allowances for rotating radial bearings to prevent fretting corrosion and ring slippage.
          </p>
        </div>

        <div className="calculator-card">
          <div className="calc-inputs-grid">
            {/* Bore Selection */}
            <div className="calc-field">
              <label htmlFor="calc-bore" className="calc-label">
                Bearing Bore Diameter ($d$ mm):
              </label>
              <div className="calc-input-row">
                <input
                  id="calc-bore"
                  type="number"
                  min="10"
                  max="120"
                  step="5"
                  value={boreSize}
                  onChange={(e) => setBoreSize(Number(e.target.value) || 25)}
                  className="calc-num-input"
                />
                <span className="calc-unit">mm</span>
              </div>
              <div className="quick-bore-chips">
                {[15, 20, 25, 30, 40, 50, 60].map((b) => (
                  <button
                    key={b}
                    type="button"
                    className={`bore-chip ${boreSize === b ? "active" : ""}`}
                    onClick={() => setBoreSize(b)}
                  >
                    Ø{b}
                  </button>
                ))}
              </div>
            </div>

            {/* Load Condition */}
            <div className="calc-field">
              <label className="calc-label">Radial Load Severity:</label>
              <div className="calc-radio-group">
                <button
                  type="button"
                  className={`calc-radio-btn ${loadCondition === "normal" ? "active" : ""}`}
                  onClick={() => setLoadCondition("normal")}
                >
                  <span className="radio-title">Normal Load</span>
                  <span className="radio-sub">P ≤ 0.08 C (General Duty)</span>
                </button>
                <button
                  type="button"
                  className={`calc-radio-btn ${loadCondition === "heavy" ? "active" : ""}`}
                  onClick={() => setLoadCondition("heavy")}
                >
                  <span className="radio-title">Heavy / Shock Load</span>
                  <span className="radio-sub">P &gt; 0.12 C (Crushers, Mills)</span>
                </button>
                <button
                  type="button"
                  className={`calc-radio-btn ${loadCondition === "light" ? "active" : ""}`}
                  onClick={() => setLoadCondition("light")}
                >
                  <span className="radio-title">Light / Free Slide</span>
                  <span className="radio-sub">Easy assembly / Disassembly</span>
                </button>
              </div>
            </div>

            {/* Thermal Operating Gradient */}
            <div className="calc-field">
              <label className="calc-label">Operating Temperature:</label>
              <div className="calc-radio-group">
                <button
                  type="button"
                  className={`calc-radio-btn ${temperature === "standard" ? "active" : ""}`}
                  onClick={() => setTemperature("standard")}
                >
                  <span className="radio-title">Standard Ambient</span>
                  <span className="radio-sub">Ambient to 70°C</span>
                </button>
                <button
                  type="button"
                  className={`calc-radio-btn ${temperature === "high" ? "active" : ""}`}
                  onClick={() => setTemperature("high")}
                >
                  <span className="radio-title">Elevated Thermal</span>
                  <span className="radio-sub">&gt; 70°C to 150°C (Requires C3)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="calc-results-panel">
            <div className="result-column">
              <div className="result-badge-tag">RECOMMENDED SHAFT FIT</div>
              <div className="result-fit-grade s-mono">ISO {shaftResult.fitClass}</div>
              <div className="result-machining-range s-mono">Machining Deviation: {shaftResult.toleranceRange}</div>
              <p className="result-note">{shaftResult.recommendation}</p>
            </div>

            <div className="result-divider" />

            <div className="result-column">
              <div className="result-badge-tag">RECOMMENDED HOUSING FIT</div>
              <div className="result-fit-grade s-mono">ISO {housingResult.fitClass}</div>
              <div className="result-machining-range s-mono">Bore Deviation: {housingResult.toleranceRange}</div>
              <p className="result-note">{housingResult.recommendation}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
