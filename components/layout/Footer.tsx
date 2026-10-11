import React from "react";
import Link from "next/link";
import BrandMark from "./BrandMark";
import { SITE_CONFIG } from "@/data/siteConfig";

export default function Footer() {
  return (
    <footer className="evo-footer" id="contact">
      <div className="evo-container">
        <div className="evo-footer-grid">
          {/* Col 1: Company Profile */}
          <div className="evo-footer-col brand-col">
            <Link href="/" className="evo-footer-logo-wrap">
              <BrandMark className="evo-footer-logo-svg" />
            </Link>
            <p className="evo-footer-p">
              {SITE_CONFIG.company.name} is a technology adapted by German engineering standards. It matches and qualifies with all mechanical factors of specification that smoothen the life of the machine. Quality of EVO is our foremost priority.
            </p>
            <div className="evo-footer-badges">
              <span className="evo-cert-tag">ISO 9001:2015</span>
              <span className="evo-cert-tag">GERMAN TECH ADAPTED</span>
              <span className="evo-cert-tag">PAN INDIA DISPATCH</span>
            </div>
            <Link href="/about" className="evo-btn-primary small">
              More About Us →
            </Link>
          </div>

          {/* Col 2: Useful Links */}
          <div className="evo-footer-col">
            <h4 className="evo-footer-title">USEFUL LINKS</h4>
            <ul className="evo-footer-links">
              <li><Link href="/about">About Company</Link></li>
              <li><Link href="/products">Parametric Bearing Catalog</Link></li>
              <li><Link href="/anatomy">3D Exploded Anatomy</Link></li>
              <li><Link href="/tools">ISO 286 Shaft Fit Calculator</Link></li>
              <li><Link href="/quality">Metrology &amp; Quality Lab</Link></li>
              <li><Link href="/industries">Industries We Serve</Link></li>
              <li><Link href="/contact">Request Engineering Quote</Link></li>
            </ul>
          </div>

          {/* Col 3: Product Range */}
          <div className="evo-footer-col">
            <h4 className="evo-footer-title">BEARING RANGES</h4>
            <ul className="evo-footer-links">
              <li><Link href="/products?cat=deep-groove">Deep Groove Radial Ball Bearings</Link></li>
              <li><Link href="/products?cat=taper-roller">Taper Roller Bearings (Metric ISO)</Link></li>
              <li><Link href="/products?cat=cylindrical">Cylindrical Roller Bearings (NU &amp; NJ)</Link></li>
              <li><Link href="/products?cat=spherical">Spherical Roller Bearings (22200 &amp; 22300)</Link></li>
              <li><Link href="/products?cat=thrust">Thrust Ball &amp; Roller Bearings</Link></li>
              <li><Link href="/products?cat=needle">Needle Motion Bearings &amp; Cam Followers</Link></li>
              <li><Link href="/products?cat=ceramic">Ceramic Hybrid High-Speed Bearings</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact Details */}
          <div className="evo-footer-col contact-col">
            <h4 className="evo-footer-title">HEAD OFFICE &amp; CONTACT</h4>
            <div className="evo-footer-contact-item">
              <span className="evo-contact-label">Head Office Address:</span>
              <span className="evo-contact-text">
                {SITE_CONFIG.locations.headOffice.address}
              </span>
            </div>
            <div className="evo-footer-contact-item">
              <span className="evo-contact-label">North India Logistics Desk:</span>
              <span className="evo-contact-text">
                {SITE_CONFIG.locations.delhiHub.address}
              </span>
            </div>
            <div className="evo-footer-contact-item">
              <span className="evo-contact-label">Direct Application Hotline:</span>
              <div className="evo-contact-phones">
                <a href={SITE_CONFIG.contact.phoneTel}>{SITE_CONFIG.contact.phoneDisplay}</a>
              </div>
            </div>
            <div className="evo-footer-contact-item">
              <span className="evo-contact-label">Email Inquiries:</span>
              <a href={SITE_CONFIG.contact.emailMailto} className="evo-contact-email">
                {SITE_CONFIG.contact.email}
              </a>
            </div>
            <div className="evo-footer-contact-item">
              <span className="evo-contact-label">Operating Hours:</span>
              <span className="evo-contact-text">{SITE_CONFIG.contact.workingHours}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="evo-footer-bottom">
          <p className="evo-footer-copy">
            Copyright © {new Date().getFullYear()} All Rights Reserved by <strong>{SITE_CONFIG.company.name}</strong>
          </p>
          <div className="evo-footer-social-links">
            <a href={SITE_CONFIG.contact.whatsappUrl} target="_blank" rel="noopener noreferrer" title="WhatsApp">WhatsApp</a>
            <span>·</span>
            <a href={SITE_CONFIG.contact.emailMailto} title="Email Desk">Email Us</a>
            <span>·</span>
            <a href={SITE_CONFIG.contact.phoneTel} title="Call Us">Toll Hotline</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
