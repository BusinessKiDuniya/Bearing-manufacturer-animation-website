import React from "react";
import { SITE_CONFIG } from "@/data/siteConfig";

export default function ContactInfoCard() {
  return (
    <div className="rfq-info-column">
      {/* Direct Engineering Desk Card */}
      <div className="info-card">
        <span className="badge-tech">IMMEDIATE APPLICATION SUPPORT</span>
        <h3 className="info-card-title">EVO Direct Engineering Hotlines</h3>
        <p className="info-card-desc">
          Speak directly with our mechanical application engineers for bearing numbers, load ratings, clearance recommendations, or emergency plant shutdowns.
        </p>

        <div className="hotline-block">
          <div className="hotline-item">
            <span className="hotline-lbl">National Customer Hotline</span>
            <a href={SITE_CONFIG.contact.phoneTel} className="hotline-num s-mono">
              {SITE_CONFIG.contact.phoneDisplay}
            </a>
            <span className="hotline-sub">{SITE_CONFIG.contact.workingHours}</span>
          </div>

          <div className="hotline-item">
            <span className="hotline-lbl">Direct WhatsApp Desk</span>
            <a
              href={SITE_CONFIG.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hotline-num s-mono text-amber"
            >
              {SITE_CONFIG.contact.whatsappDisplay} (Chat Available)
            </a>
            <span className="hotline-sub">{SITE_CONFIG.contact.rfqResponseTime} Rapid Acknowledgment</span>
          </div>
        </div>

        <div className="email-block">
          <div className="email-row">
            <span className="email-lbl">Technical Inquiries &amp; RFQs:</span>
            <a href={SITE_CONFIG.contact.emailMailto} className="email-val s-mono">
              {SITE_CONFIG.contact.email}
            </a>
          </div>
        </div>
      </div>

      {/* Central Distribution Hubs Card */}
      <div className="info-card">
        <span className="badge-sub">PAN INDIA SUPPLY INFRASTRUCTURE</span>
        <h3 className="info-card-title">Central Distribution Hubs</h3>

        <div className="hubs-list">
          <div className="hub-item">
            <div className="hub-flag">🇮🇳</div>
            <div className="hub-details">
              <strong>{SITE_CONFIG.locations.headOffice.name}</strong>
              <span className="hub-addr">{SITE_CONFIG.locations.headOffice.address}</span>
              <span className="hub-meta s-mono">
                {SITE_CONFIG.locations.headOffice.region}
              </span>
            </div>
          </div>

          <div className="hub-item">
            <div className="hub-flag">🇮🇳</div>
            <div className="hub-details">
              <strong>{SITE_CONFIG.locations.delhiHub.name}</strong>
              <span className="hub-addr">{SITE_CONFIG.locations.delhiHub.address}</span>
              <span className="hub-meta s-mono">
                {SITE_CONFIG.locations.delhiHub.region}
              </span>
            </div>
          </div>

          <div className="hub-item">
            <div className="hub-flag">🇩🇪</div>
            <div className="hub-details">
              <strong>{SITE_CONFIG.locations.germanTech.name}</strong>
              <span className="hub-addr">{SITE_CONFIG.locations.germanTech.description}</span>
              <span className="hub-meta s-mono">
                {SITE_CONFIG.locations.germanTech.standard}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
