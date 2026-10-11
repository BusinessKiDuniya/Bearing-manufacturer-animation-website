"use client";

/**
 * BearingExplodedSection
 * Scroll-scrubbed 3D exploded view of a procedural radial ball bearing.
 * Stack: React + TypeScript, Three.js, GSAP + ScrollTrigger (no other animation libs).
 *
 * The 3D model is PROCEDURAL and illustrative. It is not a CAD-accurate or
 * manufacturing-accurate model. Replace buildBearing() with a GLB whose four
 * groups are separate nodes if a real model becomes available.
 */

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface BearingExplodedSectionProps {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

interface PartInfo {
  name: string;
  title: string;
  body: string;
  meta: string;
}

const PARTS: PartInfo[] = [
  {
    name: "OUTER RACE",
    title: "100Cr6 Through-Hardened Raceway",
    body: "The outer ring provides extreme dimensional stability and micro-ground raceways ensuring radial runout below 1.5 µm under heavy industrial loads.",
    meta: "DIN EN ISO 683-17 / 60-64 HRC",
  },
  {
    name: "ROLLING ELEMENTS",
    title: "Grade 10 Precision Spheres",
    body: "High-sphericity rolling elements engineered to transfer multi-directional dynamic loads with minimal frictional coefficient and reduced heat build-up.",
    meta: "SUPER-FINISHED / DIN 5401 GRADE 10",
  },
  {
    name: "SEPARATOR CAGE",
    title: "Solid Machined Brass / Reinforced Separator",
    body: "Evenly guides and spaces the rolling elements to prevent collision and ensure high-speed operation up to 58,000 RPM in severe duty.",
    meta: "HIGH TENSILE BRASS (M) / TVP POLYAMIDE",
  },
  {
    name: "INNER RACE",
    title: "High-Tolerance Shaft Interface",
    body: "Micro-honed inner bore offering tight ISO 286 tolerance fitting on drive shafts to completely eliminate fretting corrosion and ring slippage.",
    meta: "CYLINDRICAL BORE / CLASS P6 & P5",
  },
];

/* ---- timeline layout (abstract units; ScrollTrigger scrubs 0..TOTAL) ---- */
const STEP_START = 1; // first separation begins
const STEP_LEN = 2.4; // per-component step
const TOTAL = 15.5;
const OVERVIEW_AT = 9.4;
const REASSEMBLY_AT = 10.8;

const AXIS = { outer: 3.8, cage: 1.3, balls: -1.5, inner: -3.8 }; // Z offsets at full explosion
const BALL_COUNT = 9;
const PITCH_R = 1.34;
const BALL_R = 0.27;

interface TimelineState {
  outer: number;
  balls: number;
  cage: number;
  inner: number;
  cam: number;
  card: number;
  head: number; // heading opacity (dims while parts are spread out)
}
const KEYS: (keyof TimelineState)[] = ["outer", "balls", "cage", "inner", "cam", "card", "head"];
/** Frame-rate independent exponential smoothing. */
const damp = (cur: number, target: number, lambda: number, dt: number) =>
  cur + (target - cur) * (1 - Math.exp(-lambda * dt));

const STYLES = `
.bx-root{position:relative;height:100vh;height:100svh;overflow:hidden;background:#FBFBFD;color:#1D1D1F;
  font-family:var(--font-sans,-apple-system,BlinkMacSystemFont,"SF Pro Display","Inter","Helvetica Neue",sans-serif)}
.bx-mono{font-family:var(--font-mono,ui-monospace,SFMono-Regular,Menlo,Consolas,monospace);letter-spacing:.06em}
.bx-bg{position:absolute;inset:0;background:radial-gradient(65% 60% at 50% 50%,#FFFFFF 0%,#F5F5F7 80%)}
.bx-stage{position:absolute;inset:0}
.bx-stage canvas{display:block;width:100%;height:100%;opacity:0;transition:opacity .9s ease}
.bx-svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.bx-head{position:absolute;z-index:3;left:clamp(20px,5vw,72px);top:clamp(72px,11vh,120px);max-width:min(460px,86vw)}
.bx-eyebrow{font-size:13px;font-weight:600;color:#0071E3;margin:0 0 12px;letter-spacing:.04em;text-transform:uppercase}
.bx-h{font-size:clamp(36px,5.2vw,62px);line-height:1.06;font-weight:700;letter-spacing:-.025em;color:#1D1D1F;margin:0 0 16px}
.bx-p{font-size:clamp(15px,1.3vw,17.5px);line-height:1.55;color:#6E6E73;margin:0;max-width:36ch}
.bx-cta{display:inline-block;margin-top:24px;padding:12px 24px;background:#0071E3;color:#FFFFFF;font-weight:500;
  text-decoration:none;font-size:14px;border-radius:980px;box-shadow:0 4px 14px rgba(0,113,227,.25);transition:all .2s cubic-bezier(0.16,1,0.3,1)}
.bx-cta:hover,.bx-cta:focus-visible{background:#0077ED;transform:scale(1.02);outline:none;box-shadow:0 6px 20px rgba(0,113,227,.35)}
.bx-card{position:absolute;z-index:3;opacity:0;right:clamp(20px,5vw,72px);bottom:100px;will-change:opacity,transform;width:min(360px,calc(100vw - 40px));padding:22px 24px;
  background:rgba(255,255,255,.88);border:1px solid rgba(0,0,0,.08);backdrop-filter:blur(25px);border-radius:20px;box-shadow:0 16px 40px rgba(0,0,0,.08);color:#1D1D1F}
.bx-card-n{font-size:12px;font-weight:600;color:#0071E3;margin:0 0 8px;letter-spacing:.05em}
.bx-card-t{font-size:21px;font-weight:700;color:#1D1D1F;margin:0 0 8px;letter-spacing:-.015em}
.bx-card-b{font-size:14px;line-height:1.55;color:#6E6E73;margin:0 0 12px}
.bx-card-m{font-size:11.5px;font-weight:600;color:#86868B;background:#F5F5F7;padding:5px 10px;border-radius:6px;display:inline-block;margin:0}
.bx-hud{position:absolute;z-index:3;left:clamp(20px,5vw,72px);right:clamp(20px,5vw,72px);bottom:max(20px,env(safe-area-inset-bottom));
  display:flex;flex-direction:column;gap:10px;font-size:12px;color:#86868B}
.bx-row{display:flex;justify-content:space-between;gap:12px}
.bx-bar{height:2px;background:rgba(0,0,0,.08);position:relative;margin:6px 0;border-radius:2px}
.bx-tick{position:absolute;top:-13px;width:28px;height:28px;margin-left:-14px;background:none;border:0;padding:0;cursor:pointer;border-radius:50%}
.bx-tick::after{content:"";position:absolute;left:12px;top:12px;width:5px;height:5px;border-radius:50%;background:#A1A1A6;transition:all .2s ease}
.bx-tick:hover::after,.bx-tick:focus-visible::after,.bx-tick[data-on="1"]::after{background:#0071E3;transform:scale(2)}
.bx-tick:focus-visible{outline:2px solid #0071E3;outline-offset:2px}
.bx-skip{background:none;border:0;padding:6px 0;color:#86868B;font:inherit;letter-spacing:inherit;cursor:pointer}
.bx-skip:hover,.bx-skip:focus-visible{color:#1D1D1F;outline:none;text-decoration:underline}
.bx-cue{display:inline-block;width:1.5px;height:14px;background:#0071E3;vertical-align:middle;margin-right:10px;transform-origin:top;animation:bx-cue 1.8s ease-in-out infinite}
@keyframes bx-cue{0%{transform:scaleY(0)}50%{transform:scaleY(1)}100%{transform:scaleY(1);opacity:0}}
.bx-fill{position:absolute;left:0;top:-0.5px;height:3px;width:0;background:#0071E3;border-radius:2px}
.bx-note{opacity:0;transition:opacity .3s;color:#0071E3;font-weight:600}
.bx-scroll{transition:opacity .3s}
.bx-static{display:none}
.bx-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
@media (max-width:899px){
  .bx-card{left:20px;right:20px;width:auto;bottom:92px;padding:16px 20px;border-radius:16px}
  .bx-card-b{font-size:13px}
  .bx-head{top:72px}
}
@media (prefers-reduced-motion:reduce){
  .bx-root{height:auto;min-height:100vh;overflow:visible}
  .bx-stage{position:relative;height:60vh;margin-top:220px}
  .bx-card,.bx-hud,.bx-svg{display:none}
  .bx-stage canvas{opacity:1}
  .bx-cue{animation:none}
  .bx-head{position:relative;left:auto;top:auto;padding:96px 24px 0}
  .bx-static{display:block;position:relative;z-index:3;padding:24px;max-width:720px}
  .bx-static h3{font-size:18px;font-weight:600;margin:20px 0 4px;color:#1D1D1F}
  .bx-static p{color:#6E6E73;margin:0 0 4px;font-size:14px;line-height:1.5}
  .bx-sr{position:static;width:auto;height:auto;clip:auto}
}
`;

/* ------------------------------ model ------------------------------ */

interface BearingModel {
  root: THREE.Group; // orientation (set by timeline)
  idle: THREE.Group; // idle + pointer parallax, kept separate from timeline transforms
  groups: {
    outerRace: THREE.Group;
    rollingElements: THREE.Group;
    separatorCage: THREE.Group;
    innerRace: THREE.Group;
  };
  anchors: THREE.Object3D[]; // same order as PARTS
  partMats: THREE.MeshStandardMaterial[]; // same order as PARTS (used for the active-part glow)
  dispose: () => void;
}

function buildBearing(): BearingModel {
  const geos: THREE.BufferGeometry[] = [];
  const mats: THREE.Material[] = [];
  const geo = <T extends THREE.BufferGeometry>(g: T) => (geos.push(g), g);
  const mat = (m: THREE.Material) => (mats.push(m), m);

  const steel = (color: number, rough: number) =>
    mat(new THREE.MeshStandardMaterial({
      color, metalness: 0.95, roughness: rough, side: THREE.DoubleSide, emissive: 0x221a02, emissiveIntensity: 0,
    })) as THREE.MeshStandardMaterial;
  const outerMat = steel(0xc9ced3, 0.28);
  const innerMat = steel(0xb4bac0, 0.24);
  const ballMat = steel(0xf3f4f6, 0.06);
  const cageMat = steel(0xd4af37, 0.38); // Solid machined brass cage

  // Lathe profile (radius, axial) -> axis is Y, rotate so axis becomes Z.
  const lathe = (pts: [number, number][]) => {
    const g = new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), 112);
    g.rotateX(Math.PI / 2);
    return geo(g);
  };

  const outerRace = new THREE.Group();
  outerRace.name = "outerRace";
  outerRace.add(
    new THREE.Mesh(
      lathe([
        [1.66, -0.45], [2.04, -0.45], [2.1, -0.39], [2.1, 0.39], [2.04, 0.45], [1.66, 0.45],
        [1.6, 0.39], [1.6, 0.2], [1.64, 0], [1.6, -0.2], [1.6, -0.39], [1.66, -0.45],
      ]),
      outerMat
    )
  );

  const innerRace = new THREE.Group();
  innerRace.name = "innerRace";
  innerRace.add(
    new THREE.Mesh(
      lathe([
        [0.66, -0.45], [1.0, -0.45], [1.06, -0.39], [1.06, -0.2], [1.03, 0], [1.06, 0.2],
        [1.06, 0.39], [1.0, 0.45], [0.66, 0.45], [0.6, 0.39], [0.6, -0.39], [0.66, -0.45],
      ]),
      innerMat
    )
  );

  // Rolling elements: one instanced sphere mesh
  const rollingElements = new THREE.Group();
  rollingElements.name = "rollingElements";
  const balls = new THREE.InstancedMesh(geo(new THREE.SphereGeometry(BALL_R, 48, 32)), ballMat, BALL_COUNT);
  const d = new THREE.Object3D();
  for (let i = 0; i < BALL_COUNT; i++) {
    const a = (i / BALL_COUNT) * Math.PI * 2;
    d.position.set(Math.cos(a) * PITCH_R, Math.sin(a) * PITCH_R, 0);
    d.updateMatrix();
    balls.setMatrixAt(i, d.matrix);
  }
  rollingElements.add(balls);

  // Separator cage: rear ring + bridges between balls (kept on +Z so balls can slide out toward -Z)
  const separatorCage = new THREE.Group();
  separatorCage.name = "separatorCage";
  const ring = new THREE.Mesh(geo(new THREE.TorusGeometry(PITCH_R, 0.05, 14, 112)), cageMat);
  ring.position.z = 0.24;
  const bridges = new THREE.InstancedMesh(geo(new THREE.BoxGeometry(0.1, 0.14, 0.52)), cageMat, BALL_COUNT);
  for (let i = 0; i < BALL_COUNT; i++) {
    const a = ((i + 0.5) / BALL_COUNT) * Math.PI * 2;
    d.position.set(Math.cos(a) * PITCH_R, Math.sin(a) * PITCH_R, 0);
    d.rotation.set(0, 0, a);
    d.updateMatrix();
    bridges.setMatrixAt(i, d.matrix);
  }
  separatorCage.add(ring, bridges);

  // Annotation anchors (local to each group so projection follows motion)
  const anchor = (parent: THREE.Object3D, x: number, y: number, z: number) => {
    const o = new THREE.Object3D();
    o.position.set(x, y, z);
    parent.add(o);
    return o;
  };
  const anchors = [
    anchor(outerRace, 1.48, 1.48, 0.45),
    anchor(rollingElements, 1.26, 0.46, 0.2),
    anchor(separatorCage, 0.95, -0.95, 0.24),
    anchor(innerRace, 0.7, -0.7, 0.45),
  ];

  const root = new THREE.Group();
  const idle = new THREE.Group();
  idle.add(outerRace, rollingElements, separatorCage, innerRace);
  root.add(idle);

  return {
    root,
    idle,
    groups: { outerRace, rollingElements, separatorCage, innerRace },
    anchors,
    partMats: [outerMat, ballMat, cageMat, innerMat],
    dispose: () => {
      geos.forEach((g) => g.dispose());
      mats.forEach((m) => m.dispose());
      balls.dispose();
      bridges.dispose();
    },
  };
}

/* ---------------------------- component ---------------------------- */

export default function BearingExplodedSection({
  eyebrow = "PRECISION ENGINEERING / 001",
  heading = "Every part has a purpose.",
  intro = "Explore the precision components that transform friction into controlled motion.",
  ctaLabel,
  ctaHref = "#",
}: BearingExplodedSectionProps) {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardN = useRef<HTMLParagraphElement>(null);
  const cardT = useRef<HTMLHeadingElement>(null);
  const cardB = useRef<HTMLParagraphElement>(null);
  const cardM = useRef<HTMLParagraphElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const stageLabel = useRef<HTMLSpanElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const noteRef = useRef<HTMLSpanElement>(null);
  const hintRef = useRef<HTMLSpanElement>(null);
  const headRef = useRef<HTMLElement>(null);
  const tickRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const stRef = useRef<ScrollTrigger | null>(null);

  /** Scroll to a point on the timeline (0..1). Native smooth scroll; the damped renderer glides to it. */
  const jumpTo = (frac: number) => {
    const st = stRef.current;
    if (!st) return;
    window.scrollTo({ top: st.start + frac * (st.end - st.start), behavior: "smooth" });
  };
  const skip = () => {
    const st = stRef.current;
    if (st) window.scrollTo({ top: st.end + 4, behavior: "smooth" });
  };

  useEffect(() => {
    const rootEl = rootRef.current;
    const stage = stageRef.current;
    if (!rootEl || !stage) return;

    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---- renderer / scene (created once per mount) ---- */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    stage.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    scene.environmentIntensity = 0.9;

    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(4, 6, 6);
    const rim = new THREE.DirectionalLight(0xb8d0e0, 2.6);
    rim.position.set(-6, 2, -5);
    scene.add(key, rim);

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    const model = buildBearing();
    scene.add(model.root);

    /* ---- state: `s` = what scroll asks for (written by GSAP), `d` = what is shown (damped) ---- */
    const s: TimelineState = { outer: 0, balls: 0, cage: 0, inner: 0, cam: 0, card: 0, head: 1 };
    const d: TimelineState = { ...s };
    const glow = [0, 0, 0, 0];
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let snap = true; // jump `d` to `s` (first frame, refresh, reduced motion)
    let desktop = true;
    let activeIdx = 0;
    let visible = true;
    let raf = 0;
    let last = 0;
    let slowFrames = 0;
    let prCap = 1.75;
    let revealed = false;
    const tmp = new THREE.Vector3();

    const size = () => {
      const w = Math.max(1, stage.clientWidth);
      const h = Math.max(1, stage.clientHeight);
      desktop = w >= 900;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, desktop ? prCap : Math.min(prCap, 1.5)));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.clearViewOffset();
      camera.updateProjectionMatrix();
    };

    const draw = (time: number, dt: number) => {
      const { groups, root, idle, anchors, partMats } = model;
      if (snap) { KEYS.forEach((k) => (d[k] = s[k])); snap = false; }
      else {
        // spatial values glide (lambda ~6 = ~0.3s settle), card/heading react a little quicker
        for (const k of ["outer", "balls", "cage", "inner", "cam"] as const) d[k] = damp(d[k], s[k], 6, dt);
        d.card = damp(d.card, s.card, 10, dt);
        d.head = damp(d.head, s.head, 5, dt);
      }

      groups.outerRace.position.z = d.outer * AXIS.outer;
      groups.separatorCage.position.z = d.cage * AXIS.cage;
      groups.rollingElements.position.z = d.balls * AXIS.balls;
      groups.rollingElements.rotation.z = d.balls * 0.5; // small coordinated twist
      groups.innerRace.position.z = d.inner * AXIS.inner;

      root.rotation.set(0.38 - 0.13 * d.cam, -0.55 - 0.65 * d.cam, 0);
      const fit = Math.min(1, camera.aspect / 1.25);
      camera.position.set(0, 0, (9.8 + 7.4 * d.cam) / fit);
      camera.lookAt(0, 0, 0);

      // idle + parallax live on a separate group so they never fight the timeline
      pointer.x = damp(pointer.x, pointer.tx, 4, dt);
      pointer.y = damp(pointer.y, pointer.ty, 4, dt);
      const calm = reduced ? 0 : 1;
      idle.rotation.y = calm * (Math.sin(time * 0.0004) * 0.04 + pointer.x * 0.08);
      idle.rotation.x = calm * (Math.cos(time * 0.0003) * 0.02 + pointer.y * 0.05);

      // the part being explained gets a faint cool glow, so card and object read as one thing
      for (let i = 0; i < 4; i++) {
        glow[i] = damp(glow[i], i === activeIdx && s.card > 0.5 ? 1 : 0, 8, dt);
        partMats[i].emissiveIntensity = 0.45 * glow[i];
      }

      renderer.render(scene, camera);
      if (!revealed) { revealed = true; renderer.domElement.style.opacity = "1"; }

      if (headRef.current) headRef.current.style.opacity = String(0.28 + 0.72 * d.head);

      const card = cardRef.current, line = lineRef.current, dot = dotRef.current;
      if (card && line && dot) {
        card.style.opacity = String(d.card);
        card.style.transform = `translateY(${(1 - d.card) * 14}px)`;
        card.style.pointerEvents = d.card > 0.5 ? "auto" : "none";
        const w = stage.clientWidth, h = stage.clientHeight;
        anchors[activeIdx].getWorldPosition(tmp).project(camera);
        const px = Math.min(w - 8, Math.max(8, (tmp.x * 0.5 + 0.5) * w));
        const py = Math.min(h - 8, Math.max(8, (-tmp.y * 0.5 + 0.5) * h));
        const sx = desktop ? card.offsetLeft : card.offsetLeft + card.offsetWidth / 2;
        const sy = desktop ? card.offsetTop + 28 : card.offsetTop;
        // connector "draws" out from the card as it fades in
        const k = d.card;
        line.setAttribute("x1", String(sx)); line.setAttribute("y1", String(sy));
        line.setAttribute("x2", String(sx + (px - sx) * k)); line.setAttribute("y2", String(sy + (py - sy) * k));
        dot.setAttribute("cx", String(px)); dot.setAttribute("cy", String(py));
        line.style.opacity = String(k); dot.style.opacity = String(Math.max(0, k * 2 - 1));
      }
    };

    const loop = (time: number) => {
      raf = 0;
      if (!visible) return;
      const dt = last ? Math.min(0.05, (time - last) / 1000) : 0.016;
      last = time;
      draw(time, dt);
      // adaptive resolution: if the device cannot hold ~40fps, step the pixel ratio down once or twice
      slowFrames = dt > 0.026 ? slowFrames + 1 : Math.max(0, slowFrames - 1);
      if (slowFrames > 40 && prCap > 1) { prCap = Math.max(1, prCap - 0.25); slowFrames = 0; size(); }
      raf = requestAnimationFrame(loop);
    };
    const start = () => { if (!raf && visible && !reduced) { last = 0; raf = requestAnimationFrame(loop); } };
    const stop = () => { if (raf) cancelAnimationFrame(raf); raf = 0; };

    /* ---- HUD updates driven by timeline position (DOM only, on change) ---- */
    let lastLabel = "";
    const hud = (p: number) => {
      const t = p * TOTAL;
      let label = "00 / ASSEMBLED";
      let idx = -1;
      if (t >= STEP_START && t < OVERVIEW_AT) {
        idx = Math.min(3, Math.floor((t - STEP_START) / STEP_LEN));
        label = `0${idx + 1} / ${PARTS[idx].name}`;
      } else if (t >= OVERVIEW_AT && t < REASSEMBLY_AT) {
        idx = 3; label = "05 / EXPLODED ASSEMBLY";
      } else if (t >= REASSEMBLY_AT && t < TOTAL - 0.8) {
        idx = 3; label = "06 / REASSEMBLY";
      }
      if (label !== lastLabel) {
        lastLabel = label;
        if (stageLabel.current) stageLabel.current.textContent = label;
        if (counter.current) counter.current.textContent = idx >= 0 ? `0${idx + 1} / 04` : "00 / 04";
        if (noteRef.current) noteRef.current.style.opacity = label.startsWith("05") ? "1" : "0";
        if (hintRef.current) hintRef.current.style.opacity = label.startsWith("00") && t < 0.4 ? "1" : "0";
        if (idx >= 0 && idx !== activeIdx) activeIdx = idx;
        const part = PARTS[activeIdx];
        if (cardN.current) cardN.current.textContent = `0${activeIdx + 1} / ${part.name}`;
        if (cardT.current) cardT.current.textContent = part.title;
        if (cardB.current) cardB.current.textContent = part.body;
        if (cardM.current) cardM.current.textContent = part.meta;
      }
      if (fillRef.current) fillRef.current.style.width = `${p * 100}%`;
      tickRefs.current.forEach((el, i) => el && el.setAttribute("data-on", idx === i && t < REASSEMBLY_AT ? "1" : "0"));
    };

    size();
    const ro = new ResizeObserver(() => { size(); if (!raf) { snap = true; draw(performance.now(), 0.016); }; });
    ro.observe(stage);

    const onPointer = (e: PointerEvent) => {
      if (!desktop || e.pointerType === "touch") return;
      const r = stage.getBoundingClientRect();
      pointer.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      pointer.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    stage.addEventListener("pointermove", onPointer);

    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      visible ? start() : stop();
    });
    io.observe(rootEl);

    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    /* ---- master timeline (one timeline, one ScrollTrigger) ---- */
    ScrollTrigger.config({ ignoreMobileResize: true }); // mobile URL-bar show/hide must not re-pin
    const ctx = gsap.context(() => {
      if (reduced) { draw(0, 0.016); return; }
      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut", duration: 1.4 },
        scrollTrigger: {
          trigger: rootEl,
          start: "top top",
          end: () => `+=${Math.round(Math.min(3000, Math.max(2200, window.innerHeight * 3)))}`,
          pin: true,
          scrub: true, // 1:1 with scroll; smoothing is done once, in the render loop (no double-lag)
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: () => { snap = true; },
          onUpdate: (self) => hud(self.progress),
        },
      });
      stRef.current = tl.scrollTrigger ?? null;
      const keys = ["outer", "balls", "cage", "inner"] as const;
      const camAt = [0.4, 0.62, 0.82, 1];
      keys.forEach((k, i) => {
        const at = STEP_START + i * STEP_LEN;
        tl.addLabel(`step${i + 1}`, at);
        tl.to(s, { [k]: 1, cam: camAt[i] }, at);
        if (i === 0) tl.to(s, { head: 0, duration: 1.2, ease: "none" }, at);
        tl.to(s, { card: 1, duration: 0.4, ease: "none" }, at + 0.8);
        tl.to(s, { card: 0, duration: 0.4, ease: "none" }, i === 3 ? 10.2 : at + 1.9);
      });
      tl.addLabel("exploded", OVERVIEW_AT);
      tl.addLabel("reassembly", REASSEMBLY_AT);
      // reassembly overlaps slightly so it flows as one gesture rather than four separate moves
      tl.to(s, { inner: 0, duration: 1.2 }, REASSEMBLY_AT);
      tl.to(s, { cage: 0, duration: 1.2 }, REASSEMBLY_AT + 0.95);
      tl.to(s, { balls: 0, duration: 1.2 }, REASSEMBLY_AT + 1.9);
      tl.to(s, { outer: 0, duration: 1.2 }, REASSEMBLY_AT + 2.85);
      tl.to(s, { cam: 0, duration: TOTAL - (REASSEMBLY_AT + 2.85) }, REASSEMBLY_AT + 2.85);
      tl.to(s, { head: 1, duration: 1.2, ease: "none" }, TOTAL - 1.2);
      hud(0);
    }, rootEl);

    if (reduced) draw(0, 0.016);
    start();

    return () => {
      stop();
      stRef.current = null;
      ctx.revert(); // kills timeline + ScrollTrigger, restores pin DOM
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      stage.removeEventListener("pointermove", onPointer);
      model.dispose();
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <section ref={rootRef} id="anatomy" className="bx-root" aria-labelledby="bx-heading">
      <style>{STYLES}</style>
      <div className="bx-bg" aria-hidden="true" />
      <div
        ref={stageRef}
        className="bx-stage"
        role="img"
        aria-label="Interactive 3D ball bearing that separates into outer race, rolling elements, separator cage and inner race as you scroll."
      />
      <svg ref={svgRef} className="bx-svg" aria-hidden="true">
        <line ref={lineRef} stroke="#0071E3" strokeOpacity="0.8" strokeWidth="1.2" strokeDasharray="3 3" style={{ opacity: 0 }} />
        <circle ref={dotRef} r="4" fill="#0071E3" style={{ opacity: 0 }} />
      </svg>

      <div ref={cardRef} className="bx-card" aria-live="polite">
        <p ref={cardN} className="bx-card-n bx-mono" />
        <h3 ref={cardT} className="bx-card-t" />
        <p ref={cardB} className="bx-card-b" />
        <p ref={cardM} className="bx-card-m bx-mono" />
      </div>

      <div className="bx-hud bx-mono">
        <div className="bx-row" aria-hidden="true">
          <span ref={stageLabel}>00 / ASSEMBLED</span>
          <span ref={noteRef} className="bx-note">4 PRIMARY COMPONENT GROUPS</span>
          <span ref={counter}>00 / 04</span>
        </div>
        <div className="bx-bar">
          <div ref={fillRef} className="bx-fill" aria-hidden="true" />
          {PARTS.map((p, i) => (
            <button
              key={p.name}
              ref={(el) => { tickRefs.current[i] = el; }}
              type="button"
              className="bx-tick"
              style={{ left: `${((STEP_START + i * STEP_LEN + 1.4) / TOTAL) * 100}%` }}
              aria-label={`Jump to ${p.name.toLowerCase()}`}
              onClick={() => jumpTo((STEP_START + i * STEP_LEN + 1.4) / TOTAL)}
            />
          ))}
        </div>
        <div className="bx-row">
          <span ref={hintRef} className="bx-scroll" aria-hidden="true"><i className="bx-cue" />SCROLL TO EXPLORE</span>
          <button type="button" className="bx-skip" onClick={skip}>SKIP ANIMATION</button>
        </div>
      </div>

      {/* All copy stays in the DOM: screen readers always get it; reduced-motion users see it. */}
      <div className="bx-static bx-sr">
        {PARTS.map((p, i) => (
          <div key={p.name}>
            <h3>{`0${i + 1} ${p.name}: ${p.title}`}</h3>
            <p>{p.body}</p>
            <p className="bx-mono" style={{ fontSize: 12, color: "#B8D0E0" }}>{p.meta}</p>
          </div>
        ))}
      </div>
    </section>
  );
}