import React from "react";

interface BrandMarkProps {
  className?: string;
}

export default function BrandMark({ className }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 160 50"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer raceway badge */}
      <circle cx="25" cy="25" r="22" stroke="#0071E3" strokeWidth="2.5" />
      <circle cx="25" cy="25" r="11" stroke="#1D1D1F" strokeWidth="1.8" />
      {/* 6 precision rolling elements in refined Apple blue */}
      <circle cx="41.5" cy="25" r="3" fill="#0071E3" />
      <circle cx="33.25" cy="39.29" r="3" fill="#0071E3" />
      <circle cx="16.75" cy="39.29" r="3" fill="#0071E3" />
      <circle cx="8.5" cy="25" r="3" fill="#0071E3" />
      <circle cx="16.75" cy="10.71" r="3" fill="#0071E3" />
      <circle cx="33.25" cy="10.71" r="3" fill="#0071E3" />

      {/* EVO Bold Wordmark in Apple dark charcoal */}
      <text
        x="55"
        y="32"
        fill="#1D1D1F"
        fontSize="26"
        fontWeight="700"
        fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif"
        letterSpacing="0.5px"
      >
        EVO
      </text>

      {/* Blue dot accent */}
      <circle cx="118" cy="18" r="3.5" fill="#0071E3" />

      {/* Subtitle */}
      <text
        x="56"
        y="44"
        fill="#6E6E73"
        fontSize="7.5"
        fontWeight="600"
        fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif"
        letterSpacing="1.8px"
      >
        BEARINGS & MACHINERIES
      </text>
    </svg>
  );
}
