import React from "react";
import Image from "next/image";

const PARTNERS = [
  {
    name: "JK FENNER",
    type: "Power Transmission & V-Belts",
    logo: "/images/distributors/jk-fenner.png",
    desc: "Authorized distributor of high-torque industrial V-belts, pulleys, couplings, and power transmission drives.",
  },
  {
    name: "KING TIGER",
    type: "Heavy Industrial Bearings",
    logo: "/images/distributors/king-tiger.png",
    desc: "Premium spherical roller bearings and heavy equipment housing units engineered for mining & crushers.",
  },
  {
    name: "MAX SPARE",
    type: "Oil Seals & Hydraulic Packing",
    logo: "/images/distributors/max-spare.png",
    desc: "Precision rotary shaft seals, O-rings, and hydraulic seals ensuring zero leakage in harsh environments.",
  },
  {
    name: "REYNOLD",
    type: "Precision Roller & Drive Chains",
    logo: "/images/distributors/reynold.png",
    desc: "High-fatigue British & ANSI standard roller chains for cement elevators, steel plants, and conveyors.",
  },
  {
    name: "TOYOPOWER",
    type: "Automotive & Industrial Belting",
    logo: "/images/distributors/toyopower.png",
    desc: "Japanese technology cogged raw edge belts, ribbed belts, and timing drive solutions.",
  },
];

export default function DistributorPartners() {
  return (
    <section className="evo-partners-section">
      <div className="evo-container">
        <div className="evo-partners-header">
          <span className="evo-sec-tag">AUTHORISED SUPPLY NETWORK &amp; ALLIANCES</span>
          <h2 className="evo-sec-title">Authorised Distributor &amp; Partners</h2>
          <p className="evo-sec-sub">
            In addition to manufacturing EVO brand precision bearings, we are official channel partners for world-leading power transmission and sealing brands — delivering 100% genuine products with manufacturer test certificates.
          </p>
        </div>

        <div className="evo-partners-grid">
          {PARTNERS.map((p, idx) => (
            <div key={idx} className="evo-partner-card">
              <div className="evo-partner-logo-box">
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={140}
                  height={56}
                  className="evo-partner-img"
                  style={{ objectFit: "contain", height: "auto", maxWidth: "100%", maxHeight: "56px" }}
                />
              </div>
              <div className="evo-partner-details">
                <div className="evo-partner-badge-row">
                  <span className="evo-partner-auth-badge">Authorized Channel</span>
                </div>
                <h3 className="evo-partner-name">{p.name}</h3>
                <p className="evo-partner-type">{p.type}</p>
                <p className="evo-partner-desc-text">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

