/**
 * Legacy re-export module for backward compatibility.
 * All components have been modularized into domain directories:
 * - Header, Footer, BrandMark -> @/components/layout/
 * - Hero, Industries         -> @/components/home/
 */

export { default as Header } from "./layout/Header";
export { default as Footer } from "./layout/Footer";
export { default as BrandMark } from "./layout/BrandMark";
export { default as Hero } from "./home/Hero";
export { default as Industries } from "./home/Industries";
