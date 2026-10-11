"use client";

import React, { useState, useEffect } from "react";

const CRITICAL_ASSETS = [
  "/products/bearing.png",
  "/products/tapper-roller-bearing.png",
  "/products/spherical-roller-bearing.png",
  "/products/cylindrical-roller-bearing.png",
  "/products/thrust-roller-bearing.png",
  "/products/thrust-middle-bearing.png",
  "/products/oil-seal.png",
  "/products/ball screw.png",
  "/products/linear-rail-guide.png",
  "/products/linear-guide-rail-block.png",
  "/products/solid-shaft.png",
];

export default function SitePreloader() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phaseText, setPhaseText] = useState("CALIBRATING PRECISION SPINDLE METROLOGY (ISO 286)...");
  const [loadedAssetCount, setLoadedAssetCount] = useState(0);
  const [isOpening, setIsOpening] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Lock body scroll while opening animation is active
    document.body.style.overflow = "hidden";

    // Pre-cache all 11 critical image assets
    let loadedCount = 0;
    CRITICAL_ASSETS.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount += 1;
        setLoadedAssetCount(loadedCount);
      };
      img.onerror = () => {
        loadedCount += 1;
        setLoadedAssetCount(loadedCount);
      };
    });

    // Full 5-second smooth calibration countdown (5000ms)
    let animationFrameId: number;
    const startTime = performance.now();
    const duration = 5000; // 5 full seconds guaranteed to load and show properly

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawRatio = Math.min(1, elapsed / duration);

      // Linear-to-smooth pacing across the 5 seconds
      let easedRatio: number;
      if (rawRatio < 0.85) {
        easedRatio = (rawRatio / 0.85) * 0.88;
      } else {
        const subRatio = (rawRatio - 0.85) / 0.15;
        easedRatio = 0.88 + (1 - Math.pow(1 - subRatio, 2)) * 0.12;
      }

      const currentPercent = Math.min(100, Math.round(easedRatio * 100));
      setProgress(currentPercent);

      // 5-second live kinematic telemetry readout
      if (currentPercent < 20) {
        setPhaseText("CALIBRATING PRECISION SPINDLE METROLOGY (ISO 286)...");
      } else if (currentPercent < 40) {
        setPhaseText("INITIALIZING HERTZIAN ELASTIC OIL FILM DYNAMICS (Λ)...");
      } else if (currentPercent < 60) {
        setPhaseText("PRE-CACHING 11 INDUSTRIAL PRODUCT CATALOG ENVELOPES...");
      } else if (currentPercent < 80) {
        setPhaseText("VERIFYING DIN 620 P0/P6 MICROMETER RUNOUT TOLERANCE...");
      } else if (currentPercent < 100) {
        setPhaseText("PRE-COMPILING 3D KINEMATICS, MESH & SHADERS...");
      } else {
        setPhaseText("ALL SYSTEMS SYNCHRONIZED · OPENING APERTURE...");
      }

      if (rawRatio < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        // Hold at 100% for 500ms so user clearly sees 100% complete, then smoothly part shutters
        setTimeout(() => {
          setIsOpening(true);

          // Allow the 1-second physical shutter parting animation to finish before removing from DOM
          setTimeout(() => {
            setIsFinished(true);
            document.body.style.overflow = "";
          }, 1050);
        }, 500);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.body.style.overflow = "";
    };
  }, []);

  const handleSkipOrOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      setIsFinished(true);
      document.body.style.overflow = "";
    }, 1000);
  };

  if (!mounted || isFinished) return null;

  return (
    <div
      className={`evo-opening-wrapper ${isOpening ? "evo-opening-active" : ""}`}
      role="status"
      aria-label="Opening EVO Bearings Experience"
    >
      {/* Top Shutter Half (Slides Up on Open) */}
      <div className="evo-shutter evo-shutter-top">
        <div className="shutter-noise-overlay" />
        <div className="shutter-top-bar">
          <span className="shutter-badge">GERMAN ADAPTED BEARING TECH · ISO 9001:2015</span>
          <button
            type="button"
            className="shutter-enter-btn"
            onClick={handleSkipOrOpen}
            aria-label="Open website immediately"
          >
            Enter Now →
          </button>
        </div>
      </div>

      {/* Bottom Shutter Half (Slides Down on Open) */}
      <div className="evo-shutter evo-shutter-bottom">
        <div className="shutter-noise-overlay" />
        <div className="shutter-bottom-bar">
          <span>CALIBRATION PROTOCOL: ISO 492 / DIN 620-2</span>
          <span>•</span>
          <span>SUPER-FINISH RACETRACK Ra &lt; 0.08 μm</span>
          <span>•</span>
          <span>EMQ GRADE V2/V3 LOW-VIBRATION</span>
        </div>
      </div>

      {/* Horizontal Seam Laser Track (Splits open with shutters) */}
      <div className="evo-shutter-seam">
        <div className="seam-line" />
        <div className="seam-glow-pulse" />
      </div>

      {/* Center Mechanical Spindle Assembly & Telemetry Core */}
      <div className="evo-opening-core">
        {/* Revolving Bearing Mechanical Graphic */}
        <div className="bearing-opening-graphic">
          <svg
            viewBox="0 0 200 200"
            className="bearing-opening-svg"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer calibration graduation ticks */}
            <g className="bearing-outer-ticks">
              {Array.from({ length: 24 }).map((_, i) => {
                const angle = (i * 360) / 24;
                const rad = (angle * Math.PI) / 180;
                const x1 = (100 + Math.cos(rad) * 92).toFixed(2);
                const y1 = (100 + Math.sin(rad) * 92).toFixed(2);
                const x2 = (100 + Math.cos(rad) * (i % 6 === 0 ? 82 : 87)).toFixed(2);
                const y2 = (100 + Math.sin(rad) * (i % 6 === 0 ? 82 : 87)).toFixed(2);
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={i % 6 === 0 ? "#0071E3" : "rgba(0, 0, 0, 0.16)"}
                    strokeWidth={i % 6 === 0 ? "2.2" : "1.2"}
                  />
                );
              })}
            </g>

            {/* Outer Raceway Base Ring */}
            <circle
              cx="100"
              cy="100"
              r="80"
              stroke="#E5E5EA"
              strokeWidth="5"
            />
            {/* Dynamic Circumferential Progress Ring */}
            <circle
              cx="100"
              cy="100"
              r="74"
              stroke="#0071E3"
              strokeWidth="3"
              strokeDasharray="465"
              strokeDashoffset={Math.round(465 - (465 * progress) / 100)}
              strokeLinecap="round"
              className="bearing-progress-ring"
            />

            {/* Revolving Laser Scan Sector Beam */}
            <g className="bearing-laser-scan">
              <path
                d="M100 100 L100 25 A75 75 0 0 1 153 47 Z"
                fill="url(#openingLaserGradient)"
                opacity="0.35"
              />
            </g>

            {/* Pitch Circle Guide */}
            <circle
              cx="100"
              cy="100"
              r="54"
              stroke="rgba(0, 113, 227, 0.22)"
              strokeWidth="1.2"
              strokeDasharray="4 3"
            />

            {/* Orbiting Precision Rolling Elements (8 Specular Chrome Balls) */}
            <g className="bearing-orbiting-elements">
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * 360) / 8;
                const rad = (angle * Math.PI) / 180;
                const cx = (100 + Math.cos(rad) * 54).toFixed(2);
                const cy = (100 + Math.sin(rad) * 54).toFixed(2);
                const glintX = (Number(cx) - 2.8).toFixed(2);
                const glintY = (Number(cy) - 2.8).toFixed(2);
                return (
                  <g key={i}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r="10"
                      fill="rgba(0, 113, 227, 0.1)"
                    />
                    <circle
                      cx={cx}
                      cy={cy}
                      r="8.5"
                      fill="url(#openingBallGradient)"
                      stroke="#0071E3"
                      strokeWidth="1.8"
                    />
                    <circle
                      cx={glintX}
                      cy={glintY}
                      r="2.2"
                      fill="#FFFFFF"
                      opacity="0.9"
                    />
                  </g>
                );
              })}
            </g>

            {/* Inner Raceway Outer Shoulder */}
            <circle
              cx="100"
              cy="100"
              r="34"
              stroke="#1D1D1F"
              strokeWidth="3.2"
            />
            {/* Inner Bore */}
            <circle
              cx="100"
              cy="100"
              r="24"
              fill="#FFFFFF"
              stroke="#E5E5EA"
              strokeWidth="2"
            />

            {/* Centered EVO Monogram */}
            <text
              x="100"
              y="105"
              textAnchor="middle"
              fill="#1D1D1F"
              fontSize="16"
              fontWeight="800"
              fontFamily="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif"
              letterSpacing="0.8px"
            >
              EVO
            </text>

            <defs>
              <linearGradient id="openingLaserGradient" x1="100" y1="100" x2="160" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0071E3" stopOpacity="0" />
                <stop offset="100%" stopColor="#0071E3" stopOpacity="0.85" />
              </linearGradient>
              <radialGradient id="openingBallGradient" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#E5E5EA" />
                <stop offset="100%" stopColor="#D1D1D6" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* Brand Wordmark & Tagline */}
        <div className="opening-text-block">
          <div className="opening-brand-title">
            <span className="brand-evo-accent">EVO</span> BEARINGS & MACHINERIES
          </div>
          <p className="opening-sub-tag">PRECISION INDUSTRIAL SOLUTIONS · ESTD. KOLKATA</p>
        </div>

        {/* Live 5-Second Telemetry Counter & Apple Progress Bar */}
        <div className="opening-meter-box">
          <div className="opening-progress-track">
            <div
              className="opening-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="opening-metrics-row">
            <span className="opening-phase-indicator s-mono">{phaseText}</span>
            <span className="opening-percent-num s-mono">{progress}%</span>
          </div>

          {/* Sub-telemetry status badge */}
          <div className="opening-sub-telemetry s-mono">
            <span>ASSETS LOADED: {loadedAssetCount} / {CRITICAL_ASSETS.length}</span>
            <span className="telemetry-sep">·</span>
            <span>DIN 620 P0/P6 CONFIRMED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
