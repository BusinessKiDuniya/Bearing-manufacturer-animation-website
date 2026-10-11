import React from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="evo-container" style={{ padding: "120px 24px", textAlign: "center", minHeight: "60vh" }}>
        <span className="badge-tech">ERROR 404</span>
        <h1 style={{ fontSize: "48px", fontWeight: 700, margin: "20px 0 12px", color: "var(--text-primary)" }}>
          Page Not Found
        </h1>
        <p style={{ color: "var(--text-secondary)", maxWidth: "500px", margin: "0 auto 32px", fontSize: "16px" }}>
          The requested engineering page or specification reference does not exist or has been relocated.
        </p>
        <Link href="/" className="evo-btn-primary">
          Return to Home Overview →
        </Link>
      </main>
      <Footer />
    </>
  );
}
