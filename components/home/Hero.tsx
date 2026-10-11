"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  sub: string;
  desc: string;
  image: string;
  imageAlt: string;
  primaryBtnText: string;
  primaryBtnHref: string;
  secondaryBtnText: string;
  secondaryBtnHref: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "renewable-energy",
    eyebrow: "SAVE THE PLANET BY",
    title: "USING RENEWABLE",
    sub: "ENERGY",
    desc: "Our Company has consistently embraced innovation to provide a superior level of excellence for our customers.",
    image: "/products/tapper-roller-bearing.png",
    imageAlt: "Heavy Duty Tapered Roller Bearing for Renewable Energy & Industrial Drives",
    primaryBtnText: "Our Solutions",
    primaryBtnHref: "/products",
    secondaryBtnText: "Read More",
    secondaryBtnHref: "/about",
  },
  {
    id: "welcome-evo",
    eyebrow: "WELCOME TO LEADING",
    title: "EVO BEARING",
    sub: "& MACHINERIES",
    desc: "Technology adapted by German engineering standards. Matches and qualifies with all mechanical factors of specification that smoothen the life and performance of machines across PAN India.",
    image: "/products/bearing.png",
    imageAlt: "Precision Deep Groove Ball Bearing for High-Speed Applications",
    primaryBtnText: "Our Solutions",
    primaryBtnHref: "/products",
    secondaryBtnText: "Read More",
    secondaryBtnHref: "/about",
  },
  {
    id: "superior-quality",
    eyebrow: "WE ARE COMMITTED TO",
    title: "SUPERIOR QUALITY",
    sub: "& RESULTS",
    desc: "Supplying precision deep groove, spherical, cylindrical, and taper roller bearings manufactured from vacuum-degassed 100Cr6 steel with controlled raceway runout below 1.5 µm.",
    image: "/products/spherical-roller-bearing.png",
    imageAlt: "High-Capacity Self-Aligning Spherical Roller Bearing",
    primaryBtnText: "Our Solutions",
    primaryBtnHref: "/products",
    secondaryBtnText: "Read More",
    secondaryBtnHref: "/quality",
  },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-advance every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[activeSlide];

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section className="evo-hero-wrapper evo-hero-silos-theme" id="home">
      {/* Dark Industrial Silos & Facility Background Overlay */}
      <div className="evo-hero-silos-bg" />
      <div className="evo-hero-dark-vignette" />

      {/* Left Navigation Carousel Arrow */}
      <button
        type="button"
        className="evo-hero-nav-arrow evo-hero-arrow-left"
        onClick={handlePrev}
        aria-label="Previous slide"
      >
        <span>‹</span>
      </button>

      {/* Right Navigation Carousel Arrow */}
      <button
        type="button"
        className="evo-hero-nav-arrow evo-hero-arrow-right"
        onClick={handleNext}
        aria-label="Next slide"
      >
        <span>›</span>
      </button>

      {/* Main Content Flex Grid */}
      <div className="evo-container evo-hero-layout-grid">
        {/* Left Side: Angled Parallelogram Card showing ONE single prominent image per slide */}
        <div className="evo-hero-visual-col">
          <div className="evo-tilted-showcase-card">
            <div className="evo-tilted-inner">
              <div className="showcase-single-bearing-wrap">
                <Image
                  key={slide.id}
                  src={slide.image}
                  alt={slide.imageAlt}
                  width={340}
                  height={340}
                  priority
                  className="showcase-single-img"
                />
              </div>
            </div>

            {/* Circular Embossed "CERTIFIED" Stamp Badge */}
            <div className="evo-certified-stamp">
              <svg width="68" height="68" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="36" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeDasharray="4 2" />
                <circle cx="40" cy="40" r="30" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
                <polyline points="28 41 36 49 52 32" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path id="stampText" d="M 16 40 A 24 24 0 0 1 64 40" fill="none" />
                <text fill="rgba(255,255,255,0.85)" fontSize="9" fontWeight="800" letterSpacing="2">
                  <textPath href="#stampText" startOffset="10%">CERTIFIED</textPath>
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* Right Side: Headline, Description & Action Buttons */}
        <div className="evo-hero-text-col">
          <div className="evo-hero-eyebrow-text">{slide.eyebrow}</div>

          <h1 className="evo-hero-main-title">
            <span className="title-white-line">{slide.title}</span>
            <span className="title-white-line sub-line">{slide.sub}</span>
          </h1>

          <p className="evo-hero-para-desc">{slide.desc}</p>

          <div className="evo-hero-btn-group">
            <Link href={slide.primaryBtnHref} className="evo-btn-solutions-gold">
              {slide.primaryBtnText}
            </Link>

            <Link href={slide.secondaryBtnHref} className="evo-btn-readmore-outline">
              {slide.secondaryBtnText}
            </Link>
          </div>

          {/* Carousel Slide Dots */}
          <div className="evo-hero-dots-row">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`evo-hero-slider-dot ${activeSlide === idx ? "active" : ""}`}
                onClick={() => setActiveSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 3 Industrial Feature Banners below Hero (Certified Plant / Best Leading / German High Tech) */}
      <div className="evo-hero-ribbon-bar">
        <div className="evo-container evo-ribbon-grid">
          <div className="evo-ribbon-item">
            <div className="ribbon-icon-circle">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F7C02D" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className="ribbon-text-block">
              <h4 className="ribbon-title">We Are Certified Company</h4>
              <p className="ribbon-sub">An ISO 9001:2015 Registered Plant</p>
            </div>
          </div>

          <div className="evo-ribbon-item ribbon-highlighted">
            <div className="ribbon-icon-circle highlight">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1D1D1F" strokeWidth="2.5">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div className="ribbon-text-block">
              <h4 className="ribbon-title">Best & Leading Industrial</h4>
              <p className="ribbon-sub">Solution Provider Across PAN India</p>
            </div>
          </div>

          <div className="evo-ribbon-item">
            <div className="ribbon-icon-circle">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F7C02D" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <div className="ribbon-text-block">
              <h4 className="ribbon-title">High Technology Factory</h4>
              <p className="ribbon-sub">German Standards & Precision Metrology</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
