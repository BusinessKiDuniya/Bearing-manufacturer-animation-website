# Bearing Scroll Experience

A premium, dark industrial landing page with a procedural Three.js radial ball bearing and a GSAP ScrollTrigger exploded-view sequence.

## Requirements

- Node.js 20.9+ (Next.js 15 requirement)
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm run start
```

## How the animation works

- The bearing is built from real Three.js geometry at runtime; no GLB model or image sequence is required.
- ScrollTrigger pins the assembly section while the outer race, inner race, balls, and cage move apart.
- Component cards and progress markers animate along the same scrubbed timeline.
- Scroll back up to reverse the animation.
- The canvas resizes with the viewport and has a reduced-complexity mobile camera framing.

## Customize

- `components/BearingExperience.tsx`: geometry, lighting, camera, component positions, and scroll timing.
- `app/globals.css`: typography, color, spacing, and responsive behavior.
- Replace `engineering@example.com` in the contact CTA with your real email.
- Replace the AXIOM placeholder brand and the example `AX-6208` size with your own brand and bearing specifications.

## Important model note

This is a procedural, stylized 3D visualization for a web concept—not a manufacturing-accurate CAD model. The reference image was used as visual direction; individual parts are recreated as editable Three.js meshes. For a product-accurate presentation, replace the procedural geometry with a CAD-derived GLB/GLTF model that has separate named meshes for each component.

## Notes

- Internet access is required on first load for the Google Fonts stylesheet; remove the `@import` in `app/globals.css` if you prefer system fonts.
- ScrollTrigger pinning depends on a scrollable page and works best on current desktop and mobile browsers.
