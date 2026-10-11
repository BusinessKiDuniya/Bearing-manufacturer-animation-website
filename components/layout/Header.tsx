"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandMark from "./BrandMark";
import { useRfq } from "@/context/RfqContext";
import { SITE_CONFIG } from "@/data/siteConfig";

export const BRAND_NAME = SITE_CONFIG.company.brandTitle;

export const NAVIGATION_LINKS: Array<[string, string]> = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Products", "/products"],
  ["3D Anatomy", "/anatomy"],
  ["Interchange", "/interchange"],
  ["Engineering Tools", "/tools"],
  ["Industries", "/industries"],
  ["Metrology Lab", "/quality"],
  ["Contact & RFQ", "/contact"],
];

interface HeaderProps {
  rfqCount?: number;
}

export default function Header({ rfqCount }: HeaderProps) {
  const { rfqCount: contextCount } = useRfq();
  const activeCount = rfqCount ?? contextCount;
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top utility ticker - NOT sticky, scrolls away naturally */}
      <div className="evo-topbar">
        <div className="evo-container evo-topbar-flex">
          <div className="evo-topbar-left">
            <span className="evo-topbar-badge">
              <span className="evo-badge-icon">★</span> LEADING PROVIDER OF INDUSTRIAL SOLUTIONS
            </span>
            <span className="evo-topbar-sep">|</span>
            <span className="evo-topbar-sub">{SITE_CONFIG.company.technologyCollaboration}</span>
          </div>

          <div className="evo-topbar-right">
            <div className="evo-topbar-hotlines">
              <span className="evo-hotline-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a href={SITE_CONFIG.contact.phoneTel}>{SITE_CONFIG.contact.phoneDisplay}</a>
              </span>
              <span className="evo-hotline-time">{SITE_CONFIG.contact.workingHours}</span>
            </div>
            <div className="evo-topbar-socials">
              <a href={SITE_CONFIG.contact.whatsappUrl} target="_blank" rel="noopener noreferrer" title="WhatsApp Support">WA</a>
              <a href={SITE_CONFIG.contact.emailMailto} title="Email Desk">MAIL</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Single Navigation Bar - Sticky Apple Header */}
      <header className={`evo-header ${scrolled ? "scrolled" : ""}`} id="top">
        <div className="evo-navbar">
        <div className="evo-container evo-navbar-flex">
          <Link href="/" className="evo-logo-link" aria-label="EVO Machinery Homepage">
            <BrandMark className="evo-logo-svg" />
          </Link>

          <nav className="evo-nav-menu" aria-label="Primary Navigation">
            {NAVIGATION_LINKS.map(([label, href]) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`evo-nav-link ${isActive ? "active" : ""}`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="evo-header-actions">
            <Link href="/contact#quote" className="evo-btn-quote">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span>Get a Quote</span>
              <span className="evo-rfq-count">{activeCount}</span>
            </Link>

            <button
              type="button"
              className="evo-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="evo-mobile-drawer">
          {NAVIGATION_LINKS.map(([label, href]) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`evo-mobile-link ${isActive ? "active" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </Link>
            );
          })}
          <div className="evo-mobile-hotline">
            <span className="evo-widget-title">Direct Customer Care:</span>
            <a href={SITE_CONFIG.contact.phoneTel} className="evo-widget-val">
              {SITE_CONFIG.contact.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </header>
  </>
  );
}
