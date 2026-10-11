"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

type VisualMode = "standard" | "fea" | "exploded" | "superfinish";
type LoadType = "radial" | "thrust" | "combined";

interface ComponentMaterialInfo {
  name: string;
  role: string;
  alloy: string;
  hardness: string;
  surfaceFinish: string;
  manufacturing: string;
}

const COMPONENT_DETAILS: Record<string, ComponentMaterialInfo> = {
  outerRace: {
    name: "Outer Ring (Raceway)",
    role: "Rigid housing interface & stationary load transfer",
    alloy: "Vacuum-Degassed 100Cr6 / AISI 52100 Chrome Steel",
    hardness: "62 – 64 HRC Through-Hardened",
    surfaceFinish: "Ra < 0.08 µm Super-Finished",
    manufacturing: "Precision CNC turned, salt-bath martempered, sub-micron CNC honed",
  },
  rollingElements: {
    name: "Precision Spheres (Balls)",
    role: "Rotating dynamic load transmission elements",
    alloy: "Ultra-High Purity 100Cr6 (Grade 10 DIN 5401)",
    hardness: "63 – 66 HRC Cryogenically Stabilized",
    surfaceFinish: "Ra < 0.02 µm Mirror Lapped",
    manufacturing: "Cold header heading, spherical lapping, 100% Eddy Current surface scan",
  },
  cage: {
    name: "Machined Separator Cage",
    role: "Prevents rolling element collision & optimizes lubricant circulation",
    alloy: "Solid Machined Brass CW614N (CuZn39Pb3)",
    hardness: "140 – 170 HB High-Tensile Ductility",
    surfaceFinish: "Smooth precision-milled ball pockets",
    manufacturing: "Centrifugally cast brass tube, 5-axis precision CNC pocket milling",
  },
  innerRace: {
    name: "Inner Ring (Bore)",
    role: "High-precision shaft interface & rotational torque transfer",
    alloy: "100Cr6 Vacuum Arc Remelted (VAR)",
    hardness: "61 – 64 HRC Induction & Martempered",
    surfaceFinish: "Ra < 0.06 µm Cylindrically Ground",
    manufacturing: "Precision bore honed to ISO Normal / C3 clearance class",
  },
};

export default function BearingStressSimulator() {
  const mountRef = useRef<HTMLDivElement>(null);

  // User state
  const [mode, setMode] = useState<VisualMode>("fea");
  const [loadType, setLoadType] = useState<LoadType>("radial");
  const [loadValueKn, setLoadValueKn] = useState<number>(28); // kN
  const [speedRpm, setSpeedRpm] = useState<number>(3600); // RPM
  const [explodeRatio, setExplodeRatio] = useState<number>(0); // 0 to 1
  const [selectedPart, setSelectedPart] = useState<string>("rollingElements");
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [roughnessCompare, setRoughnessCompare] = useState<number>(85); // 0 = standard Ra 0.4, 100 = EVO super-finish Ra 0.05

  // Three.js object refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const partsGroupRef = useRef<{
    outerRace?: THREE.Mesh;
    innerRace?: THREE.Mesh;
    cage?: THREE.Mesh;
    balls?: THREE.Group;
  }>({});

  // Physics Calculations
  const telemetry = useMemo(() => {
    // Hertzian Contact Stress approximation (MPa)
    const factor = loadType === "radial" ? 1.0 : loadType === "thrust" ? 1.25 : 1.15;
    const peakHertzMpa = Math.round(950 * Math.pow(loadValueKn / 10, 0.333) * factor);

    // Max Shear Stress at depth z0 (typically 0.31 * p0)
    const maxShearMpa = Math.round(peakHertzMpa * 0.31);
    const shearDepthMm = (0.18 * Math.pow(loadValueKn / 10, 0.333)).toFixed(2);

    // EHD Lubrication Film Thickness Lambda
    // Standard finish yields lower Lambda, superfinish boosts Lambda above 3.5
    const baseLambda = (speedRpm / 1500) * 1.8 * (roughnessCompare / 50);
    const lambda = Math.min(5.2, Math.max(0.8, baseLambda)).toFixed(2);

    // Estimated L10h Fatigue Life (hours) = (C / P)^3 * (10^6 / (60 * n))
    const dynamicCapacityCr = 62.0; // kN for this representative medium bearing
    const equivalentLoadP = Math.max(1, loadValueKn * factor);
    const lifeHours = Math.round(
      Math.pow(dynamicCapacityCr / equivalentLoadP, 3) * ((1000000 / (60 * Math.max(100, speedRpm)))))
    ;

    return {
      peakHertzMpa,
      maxShearMpa,
      shearDepthMm,
      lambda,
      lifeHours: lifeHours > 200000 ? "> 200,000" : lifeHours.toLocaleString(),
    };
  }, [loadType, loadValueKn, speedRpm, roughnessCompare]);

  // Three.js Scene Setup & Loop
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 480;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color("#F8FAFC");

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 4.2);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = true;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2.0;
    controls.maxDistance = 8.0;
    controls.maxPolarAngle = Math.PI * 0.85;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight1.position.set(4, 6, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x0071e3, 1.2);
    dirLight2.position.set(-4, -2, -3);
    scene.add(dirLight2);

    // 5. Procedural Geometry Construction
    const partsGroup: typeof partsGroupRef.current = {};

    // Outer Ring
    const outerRadius = 1.5;
    const outerInnerRadius = 1.22;
    const outerDepth = 0.55;
    const outerShape = new THREE.Shape();
    outerShape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);
    const outerHole = new THREE.Path();
    outerHole.absarc(0, 0, outerInnerRadius, 0, Math.PI * 2, true);
    outerShape.holes.push(outerHole);

    const outerGeo = new THREE.ExtrudeGeometry(outerShape, {
      depth: outerDepth,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
      curveSegments: 48,
    });
    outerGeo.center();

    const outerMat = new THREE.MeshStandardMaterial({
      metalness: 0.85,
      roughness: 0.2,
      color: 0xe2e8f0,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    scene.add(outerMesh);
    partsGroup.outerRace = outerMesh;

    // Inner Ring
    const innerRadius = 0.85;
    const innerHoleRadius = 0.55;
    const innerShape = new THREE.Shape();
    innerShape.absarc(0, 0, innerRadius, 0, Math.PI * 2, false);
    const innerHole = new THREE.Path();
    innerHole.absarc(0, 0, innerHoleRadius, 0, Math.PI * 2, true);
    innerShape.holes.push(innerHole);

    const innerGeo = new THREE.ExtrudeGeometry(innerShape, {
      depth: outerDepth,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.03,
      bevelThickness: 0.03,
      curveSegments: 48,
    });
    innerGeo.center();

    const innerMat = new THREE.MeshStandardMaterial({
      metalness: 0.88,
      roughness: 0.18,
      color: 0xdde3ea,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);
    partsGroup.innerRace = innerMesh;

    // Brass Cage Separator (Ring with pockets)
    const cageRadius = 1.08;
    const cageGeo = new THREE.TorusGeometry(cageRadius, 0.06, 16, 64);
    const cageMat = new THREE.MeshStandardMaterial({
      metalness: 0.75,
      roughness: 0.32,
      color: 0xd4af37, // Brass golden alloy
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    scene.add(cageMesh);
    partsGroup.cage = cageMesh;

    // Rolling Elements (Balls)
    const ballsGroup = new THREE.Group();
    const ballCount = 9;
    const ballRadius = 0.18;
    const orbitRadius = 1.04;
    const ballGeo = new THREE.SphereGeometry(ballRadius, 32, 32);

    for (let i = 0; i < ballCount; i++) {
      const angle = (i / ballCount) * Math.PI * 2;
      const ballMat = new THREE.MeshStandardMaterial({
        metalness: 0.95,
        roughness: 0.08,
        color: 0xf1f5f9,
      });
      const ballMesh = new THREE.Mesh(ballGeo, ballMat);
      ballMesh.position.set(Math.cos(angle) * orbitRadius, Math.sin(angle) * orbitRadius, 0);
      ballsGroup.add(ballMesh);
    }
    scene.add(ballsGroup);
    partsGroup.balls = ballsGroup;

    partsGroupRef.current = partsGroup;

    // 6. Animation Frame Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (isRotating) {
        // Slow rotation when idle
        outerMesh.rotation.z += delta * 0.15;
        innerMesh.rotation.z += delta * 0.3;
        ballsGroup.rotation.z += delta * 0.22;
        cageMesh.rotation.z += delta * 0.22;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 480;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, []);

  // Update Materials / Shaders on Mode / Stress Changes
  useEffect(() => {
    const parts = partsGroupRef.current;
    if (!parts.outerRace || !parts.innerRace || !parts.cage || !parts.balls) return;

    if (mode === "fea") {
      // FEA Contact Stress Gradient
      // Outer Race shows load zone heat (stress gradient at lower quadrant)
      (parts.outerRace.material as THREE.MeshStandardMaterial).color.set(
        loadType === "radial" ? 0x2563eb : loadType === "thrust" ? 0x9333ea : 0x0284c7
      );
      (parts.innerRace.material as THREE.MeshStandardMaterial).color.set(0x0284c7);
      (parts.cage.material as THREE.MeshStandardMaterial).color.set(0x10b981); // Low nominal stress

      // Balls receive dynamic color gradient based on load intensity
      const balls = parts.balls.children as THREE.Mesh[];
      balls.forEach((ball, idx) => {
        // Balls in the loaded zone get heated crimson/orange
        const angle = (idx / balls.length) * Math.PI * 2;
        const inLoadedZone = Math.sin(angle) < -0.2;
        const mat = ball.material as THREE.MeshStandardMaterial;

        if (inLoadedZone) {
          if (loadValueKn > 45) {
            mat.color.set(0xef4444); // Peak critical stress red
          } else if (loadValueKn > 25) {
            mat.color.set(0xf97316); // High contact stress orange
          } else {
            mat.color.set(0xeab308); // Moderate stress yellow
          }
          mat.roughness = 0.15;
          mat.metalness = 0.8;
        } else {
          mat.color.set(0x06b6d4); // Lightly loaded zone cyan
        }
      });
    } else if (mode === "superfinish") {
      // Superfinish inspection view
      (parts.outerRace.material as THREE.MeshStandardMaterial).color.set(0xf1f5f9);
      (parts.outerRace.material as THREE.MeshStandardMaterial).roughness = 1 - roughnessCompare / 100;
      (parts.innerRace.material as THREE.MeshStandardMaterial).color.set(0xf1f5f9);
      (parts.innerRace.material as THREE.MeshStandardMaterial).roughness = 1 - roughnessCompare / 100;
      (parts.cage.material as THREE.MeshStandardMaterial).color.set(0xd4af37);

      parts.balls.children.forEach((b) => {
        const mat = (b as THREE.Mesh).material as THREE.MeshStandardMaterial;
        mat.color.set(0xffffff);
        mat.roughness = 0.04;
      });
    } else {
      // Standard CAD Mode
      (parts.outerRace.material as THREE.MeshStandardMaterial).color.set(0xe2e8f0);
      (parts.outerRace.material as THREE.MeshStandardMaterial).roughness = 0.2;
      (parts.innerRace.material as THREE.MeshStandardMaterial).color.set(0xdde3ea);
      (parts.innerRace.material as THREE.MeshStandardMaterial).roughness = 0.18;
      (parts.cage.material as THREE.MeshStandardMaterial).color.set(0xd4af37);

      parts.balls.children.forEach((b) => {
        const mat = (b as THREE.Mesh).material as THREE.MeshStandardMaterial;
        mat.color.set(0xf8fafc);
        mat.roughness = 0.08;
      });
    }
  }, [mode, loadType, loadValueKn, roughnessCompare]);

  // Handle Explosion Displacement
  useEffect(() => {
    const parts = partsGroupRef.current;
    if (!parts.outerRace || !parts.innerRace || !parts.cage || !parts.balls) return;

    const zFactor = explodeRatio * 1.6;
    parts.outerRace.position.z = zFactor * 1.0;
    parts.cage.position.z = zFactor * 0.4;
    parts.innerRace.position.z = -zFactor * 1.0;

    // Expand balls slightly radially during explosion
    parts.balls.children.forEach((b, idx) => {
      const baseAngle = (idx / parts.balls!.children.length) * Math.PI * 2;
      const baseRadius = 1.04 + explodeRatio * 0.35;
      b.position.x = Math.cos(baseAngle) * baseRadius;
      b.position.y = Math.sin(baseAngle) * baseRadius;
      b.position.z = 0;
    });
  }, [explodeRatio]);

  const currentComponent = COMPONENT_DETAILS[selectedPart] || COMPONENT_DETAILS.outerRace;

  return (
    <section className="evo-stress-simulator-section">
      <div className="evo-container">
        {/* Header */}
        <div className="sim-header">
          <div className="sim-tag-row">
            <span className="badge-tech">INTERACTIVE 3D CAD &amp; FEA SUITE</span>
            <span className="sim-badge-iso">ISO 76 &amp; ISO 281 KINEMATIC SOLVER</span>
          </div>
          <h2 className="sim-title">360° Exploded &amp; Contact Stress Simulator</h2>
          <p className="sim-subtitle">
            Orbit the procedural 3D assembly, examine subsurface shear stress distribution under extreme radial and thrust loads, and observe how German-adapted raceway super-finishing prevents premature fatigue spalling.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="sim-main-grid">
          {/* Left Canvas Panel */}
          <div className="sim-canvas-panel">
            {/* Viewport Control Bar */}
            <div className="sim-viewport-bar">
              <div className="sim-mode-pills">
                <button
                  type="button"
                  className={`sim-mode-btn ${mode === "fea" ? "active" : ""}`}
                  onClick={() => setMode("fea")}
                >
                  <span className="dot-fea" /> FEA Stress X-Ray
                </button>
                <button
                  type="button"
                  className={`sim-mode-btn ${mode === "exploded" ? "active" : ""}`}
                  onClick={() => {
                    setMode("exploded");
                    if (explodeRatio === 0) setExplodeRatio(0.65);
                  }}
                >
                  Exploded Assembly
                </button>
                <button
                  type="button"
                  className={`sim-mode-btn ${mode === "superfinish" ? "active" : ""}`}
                  onClick={() => setMode("superfinish")}
                >
                  Raceway Super-Finish
                </button>
                <button
                  type="button"
                  className={`sim-mode-btn ${mode === "standard" ? "active" : ""}`}
                  onClick={() => {
                    setMode("standard");
                    setExplodeRatio(0);
                  }}
                >
                  Clean CAD
                </button>
              </div>

              <button
                type="button"
                className="sim-rot-btn"
                onClick={() => setIsRotating(!isRotating)}
                title="Toggle rotation"
              >
                {isRotating ? "⏸ Pause Rotation" : "▶ Resume Auto-Orbit"}
              </button>
            </div>

            {/* Canvas Container */}
            <div className="sim-canvas-viewport" ref={mountRef}>
              {/* Overlay Hint */}
              <div className="sim-drag-hint">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
                <span>Click &amp; Drag to Orbit · Scroll to Zoom</span>
              </div>

              {/* Stress Color Legend (When in FEA mode) */}
              {mode === "fea" && (
                <div className="sim-fea-legend">
                  <span className="legend-label">Contact Stress (p₀)</span>
                  <div className="legend-bar">
                    <span className="leg-blue">&lt;600 MPa</span>
                    <span className="leg-cyan">1,200</span>
                    <span className="leg-orange">1,800</span>
                    <span className="leg-red">&gt;2,200 MPa</span>
                  </div>
                </div>
              )}
            </div>

            {/* Interactive Physical Sliders */}
            <div className="sim-controls-card">
              <div className="sim-slider-row">
                <div className="slider-group">
                  <div className="slider-label-row">
                    <span>Applied Operating Load (P)</span>
                    <strong>{loadValueKn} kN ({Math.round(loadValueKn * 101.97)} kgf)</strong>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="75"
                    step="1"
                    value={loadValueKn}
                    onChange={(e) => setLoadValueKn(Number(e.target.value))}
                    className="sim-slider"
                  />
                </div>

                <div className="slider-group">
                  <div className="slider-label-row">
                    <span>Rotational Velocity (n)</span>
                    <strong>{speedRpm.toLocaleString()} RPM</strong>
                  </div>
                  <input
                    type="range"
                    min="600"
                    max="12000"
                    step="200"
                    value={speedRpm}
                    onChange={(e) => setSpeedRpm(Number(e.target.value))}
                    className="sim-slider"
                  />
                </div>
              </div>

              {/* Secondary Controls (Explosion & Roughness) */}
              <div className="sim-secondary-controls">
                <div className="sec-control-col">
                  <label>Load Vector Type:</label>
                  <div className="load-btn-group">
                    <button
                      type="button"
                      className={`load-btn ${loadType === "radial" ? "active" : ""}`}
                      onClick={() => setLoadType("radial")}
                    >
                      Pure Radial Load
                    </button>
                    <button
                      type="button"
                      className={`load-btn ${loadType === "thrust" ? "active" : ""}`}
                      onClick={() => setLoadType("thrust")}
                    >
                      Axial Thrust Load
                    </button>
                    <button
                      type="button"
                      className={`load-btn ${loadType === "combined" ? "active" : ""}`}
                      onClick={() => setLoadType("combined")}
                    >
                      Combined (45°)
                    </button>
                  </div>
                </div>

                <div className="sec-control-col">
                  <div className="slider-label-row">
                    <span>Exploded Assembly Offset</span>
                    <strong>{Math.round(explodeRatio * 100)}%</strong>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.02"
                    value={explodeRatio}
                    onChange={(e) => {
                      setExplodeRatio(Number(e.target.value));
                      if (mode !== "exploded") setMode("exploded");
                    }}
                    className="sim-slider"
                  />
                </div>
              </div>

              {mode === "superfinish" && (
                <div className="superfinish-control-box">
                  <div className="slider-label-row">
                    <span>Raceway Super-Finish Level:</span>
                    <strong>
                      {roughnessCompare > 70
                        ? `EVO German Super-Finish (Ra = ${(0.4 - (roughnessCompare / 100) * 0.35).toFixed(2)} µm)`
                        : `Commercial Turning (Ra = ${(0.4 - (roughnessCompare / 100) * 0.35).toFixed(2)} µm)`}
                    </strong>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={roughnessCompare}
                    onChange={(e) => setRoughnessCompare(Number(e.target.value))}
                    className="sim-slider"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right Live Telemetry & Metallurgy Panel */}
          <div className="sim-data-panel">
            {/* Live Engineering Telemetry */}
            <div className="telemetry-card">
              <h3 className="panel-title">Real-Time Kinematic Solvers</h3>
              <div className="telemetry-grid">
                <div className="tel-cell">
                  <span className="tel-lbl">Peak Hertzian Stress (p₀)</span>
                  <span className="tel-val text-cyan">{telemetry.peakHertzMpa} MPa</span>
                  <span className="tel-hint">DIN ISO 76 Static Safety</span>
                </div>
                <div className="tel-cell">
                  <span className="tel-lbl">Max Subsurface Shear (τ₀)</span>
                  <span className="tel-val">{telemetry.maxShearMpa} MPa</span>
                  <span className="tel-hint">at depth z₀ = {telemetry.shearDepthMm} mm</span>
                </div>
                <div className="tel-cell">
                  <span className="tel-lbl">EHD Oil Film Parameter (Λ)</span>
                  <span className={`tel-val ${Number(telemetry.lambda) > 3.0 ? "text-green" : "text-amber"}`}>
                    {telemetry.lambda}
                  </span>
                  <span className="tel-hint">
                    {Number(telemetry.lambda) > 3.0 ? "✓ Full fluid separation" : "⚠ Mixed boundary friction"}
                  </span>
                </div>
                <div className="tel-cell">
                  <span className="tel-lbl">Computed L10h Rating Life</span>
                  <span className="tel-val text-blue">{telemetry.lifeHours} Hrs</span>
                  <span className="tel-hint">90% survival reliability</span>
                </div>
              </div>
            </div>

            {/* Interactive Metallurgy & Layer Inspector */}
            <div className="inspector-card">
              <h3 className="panel-title">Constituent Metallurgy &amp; Standards</h3>
              <div className="part-selector-tabs">
                <button
                  type="button"
                  className={`part-tab ${selectedPart === "outerRace" ? "active" : ""}`}
                  onClick={() => setSelectedPart("outerRace")}
                >
                  Outer Race
                </button>
                <button
                  type="button"
                  className={`part-tab ${selectedPart === "rollingElements" ? "active" : ""}`}
                  onClick={() => setSelectedPart("rollingElements")}
                >
                  Rolling Elements
                </button>
                <button
                  type="button"
                  className={`part-tab ${selectedPart === "cage" ? "active" : ""}`}
                  onClick={() => setSelectedPart("cage")}
                >
                  Brass Cage
                </button>
                <button
                  type="button"
                  className={`part-tab ${selectedPart === "innerRace" ? "active" : ""}`}
                  onClick={() => setSelectedPart("innerRace")}
                >
                  Inner Race
                </button>
              </div>

              <div className="inspector-details-box">
                <h4 className="detail-name">{currentComponent.name}</h4>
                <p className="detail-role">{currentComponent.role}</p>

                <div className="detail-specs-table">
                  <div className="d-row">
                    <span className="d-label">Steel Metallurgy:</span>
                    <span className="d-val s-mono">{currentComponent.alloy}</span>
                  </div>
                  <div className="d-row">
                    <span className="d-label">Heat Treatment:</span>
                    <span className="d-val s-mono">{currentComponent.hardness}</span>
                  </div>
                  <div className="d-row">
                    <span className="d-label">Raceway Polish:</span>
                    <span className="d-val s-mono text-cyan">{currentComponent.surfaceFinish}</span>
                  </div>
                  <div className="d-row">
                    <span className="d-label">Production Process:</span>
                    <span className="d-val">{currentComponent.manufacturing}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Engineering Desk CTA */}
            <div className="sim-cta-card">
              <div className="cta-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0071E3" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <h4 className="cta-heading">Need Application FEA Verification?</h4>
                <p className="cta-sub">
                  Our application engineers in Kolkata and Delhi can run custom boundary element contact simulations for non-standard housing deflections.
                </p>
                <a href="/contact#quote" className="evo-btn-primary small">
                  Consult Application Engineering →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
