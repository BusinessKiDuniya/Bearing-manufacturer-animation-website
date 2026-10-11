import React from "react";
import Link from "next/link";

interface PageBannerProps {
  badge: string;
  title: string;
  description: string;
  breadcrumb: string;
}

export default function PageBanner({
  badge,
  title,
  description,
  breadcrumb,
}: PageBannerProps) {
  return (
    <div className="evo-page-hero">
      <div className="evo-container">
        <div className="evo-page-breadcrumb">
          <Link href="/" className="evo-crumb-link">Home</Link>
          <span className="evo-crumb-sep">/</span>
          <span className="evo-crumb-current">{breadcrumb}</span>
        </div>
        <div className="evo-page-hero-content">
          <span className="badge-tech">{badge}</span>
          <h1 className="evo-page-title">{title}</h1>
          <p className="evo-page-subtitle">{description}</p>
        </div>
      </div>
    </div>
  );
}
