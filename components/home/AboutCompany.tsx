import React from "react";

export default function AboutCompany() {
  return (
    <section className="evo-about-section" id="about">
      <div className="evo-container">
        {/* Intro Banner */}
        <div className="evo-about-intro-grid">
          <div className="evo-about-left">
            <span className="evo-sec-tag">WELCOME TO</span>
            <h2 className="evo-sec-title">
              EVO Bearings and Machineries Pvt. Ltd.
            </h2>
            <div className="evo-sec-divider" />
            <p className="evo-about-p">
              <strong>EVO Bearings and Machineries Pvt. Ltd.</strong> is based in Kolkata, West Bengal, India. It is well known as the premier <strong>Industrial Bearings Manufacturer &amp; Supplier In India</strong>, serving clients across West Bengal, Uttar Pradesh, Delhi, Haryana, Bihar, and nationwide.
            </p>
            <p className="evo-about-p">
              EVO Bearings utilizes technology adapted by German manufacturing standards. It matches and qualifies with all the factors of specification that smoothens the life and dynamic performance of the machine.
            </p>
            <p className="evo-about-p">
              With super-finished raceways, vacuum-degassed 100Cr6 steel, and controlled internal clearances (CN, C3, C4), our engineering design helps ensure consistent zero-defect operation under severe duty.
            </p>

            <div className="evo-about-factory-img-box">
              <img
                src="/images/factory/bearing-assemblies.jpg"
                alt="EVO Bearings Heavy Industrial Assembly"
                className="evo-about-factory-img"
              />
              <div className="evo-factory-badge-overlay">
                <span>ISO 9001:2015 Certified Plant</span>
                <span>German Standard Metrology</span>
              </div>
            </div>

            <div className="evo-director-card">
              <div className="evo-director-avatar">LJ</div>
              <div className="evo-director-info">
                <span className="evo-director-name">Lakshyya Jaiswal</span>
                <span className="evo-director-role">Managing Director · EVO Bearings &amp; Machineries Pvt. Ltd.</span>
              </div>
              <div className="evo-director-badge">
                <span className="evo-badge-pill">24+ YEARS TRUST</span>
              </div>
            </div>
          </div>

          {/* 4 Feature Pillars Grid */}
          <div className="evo-about-right">
            <div className="evo-pillars-grid">
              {/* Pillar 1 */}
              <div className="evo-pillar-card">
                <div className="evo-pillar-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F7C02D" strokeWidth="2">
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <h3 className="evo-pillar-title">Punctual Delivery Time</h3>
                <p className="evo-pillar-desc">
                  Our bearing products are widely stocked for same-day dispatch to agricultural machinery, automotive OEMs, and steel plants across PAN India.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="evo-pillar-card">
                <div className="evo-pillar-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F7C02D" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="evo-pillar-title">Team Of Professionals</h3>
                <p className="evo-pillar-desc">
                  Seasoned application engineers providing personalized bearing selection, ISO fit calculations, and emergency shutdown troubleshooting.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="evo-pillar-card">
                <div className="evo-pillar-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F7C02D" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                </div>
                <h3 className="evo-pillar-title">Smart Technology</h3>
                <p className="evo-pillar-desc">
                  German adapted production techniques, micro-finished raceways, and laser CMM form-scan verification ensure maximum operating longevity.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="evo-pillar-card">
                <div className="evo-pillar-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F7C02D" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <h3 className="evo-pillar-title">Easy &amp; Affordable</h3>
                <p className="evo-pillar-desc">
                  Direct manufacturing and bulk master stocking eliminate middlemen markups, delivering premium quality at competitive pricing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
