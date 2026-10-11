"use client";

import React from "react";
import { BearingItem } from "@/types/bearing";

interface CatalogControlsProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedClearance: string;
  onClearanceChange: (clearance: string) => void;
  selectedSeal: string;
  onSealChange: (seal: string) => void;
  viewMode: "grid" | "table";
  onViewModeChange: (mode: "grid" | "table") => void;
  categories: string[];
  allBearings: BearingItem[];
}

export default function CatalogControls({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedClearance,
  onClearanceChange,
  selectedSeal,
  onSealChange,
  viewMode,
  onViewModeChange,
  categories,
  allBearings,
}: CatalogControlsProps) {
  return (
    <div className="catalog-controls">
      {/* Search bar */}
      <div className="search-box">
        <svg
          className="search-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search by part number (e.g. 6205, 7208), dimensions (25x52), or SKF cross-reference..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        {searchQuery && (
          <button
            className="search-clear"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Additional Filter Row */}
      <div className="filter-options-row">
        {/* Clearance filter */}
        <div className="filter-dropdown-group">
          <label htmlFor="clearance-select">Radial Clearance:</label>
          <select
            id="clearance-select"
            value={selectedClearance}
            onChange={(e) => onClearanceChange(e.target.value)}
            className="select-tech"
          >
            <option value="All">All Clearances</option>
            <option value="CN">CN (Standard Normal)</option>
            <option value="C3">C3 (Expanded High-Speed)</option>
            <option value="C4">C4 (Elevated Thermal Expansion)</option>
          </select>
        </div>

        {/* Seal type filter */}
        <div className="filter-dropdown-group">
          <label htmlFor="seal-select">Sealing:</label>
          <select
            id="seal-select"
            value={selectedSeal}
            onChange={(e) => onSealChange(e.target.value)}
            className="select-tech"
          >
            <option value="All">All Types</option>
            <option value="2RS">2RS (Contact Rubber Seals)</option>
            <option value="2Z">2Z (Low-Drag Metal Shields)</option>
            <option value="Open">Open (Lubrication Oil Flow)</option>
          </select>
        </div>

        {/* View Mode Toggle */}
        <div className="view-toggle-group">
          <button
            className={`view-toggle-btn ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => onViewModeChange("grid")}
            title="Grid Card View"
            aria-label="Grid Card View"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 4h7v7H4V4zm0 9h7v7H4v-7zm9-9h7v7h-7V4zm0 9h7v7h-7v-7z" />
            </svg>
            <span>Cards</span>
          </button>
          <button
            className={`view-toggle-btn ${viewMode === "table" ? "active" : ""}`}
            onClick={() => onViewModeChange("table")}
            title="Engineering Data Table View"
            aria-label="Engineering Data Table View"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
            </svg>
            <span>Spec Table</span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="category-tabs-scroll">
        {categories.map((cat) => {
          const count =
            cat === "All"
              ? allBearings.length
              : allBearings.filter((b) => b.category === cat).length;
          return (
            <button
              key={cat}
              className={`category-tab-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => onCategoryChange(cat)}
            >
              {cat}
              <span className="cat-count">{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
