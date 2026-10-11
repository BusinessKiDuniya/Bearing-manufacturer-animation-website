"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { BEARING_CATALOG } from "@/data/bearings";
import { BearingItem } from "@/types/bearing";
import CatalogControls from "./CatalogControls";
import BearingCard from "./BearingCard";
import BearingTable from "./BearingTable";
import ItemDetailModal from "./ItemDetailModal";

import { useRfq } from "@/context/RfqContext";

interface BearingCatalogProps {
  onAddToRfq?: (item: BearingItem) => void;
  rfqItems?: BearingItem[];
}

export default function BearingCatalog({ onAddToRfq, rfqItems }: BearingCatalogProps) {
  const rfqContext = useRfq();
  const searchParams = useSearchParams();
  const activeToggleRfq = onAddToRfq ?? rfqContext.toggleRfq;
  const activeRfqItems = rfqItems ?? rfqContext.rfqItems;

  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const cat = searchParams?.get("cat");
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [selectedClearance, setSelectedClearance] = useState<string>("All");
  const [selectedSeal, setSelectedSeal] = useState<string>("All");
  const [activeItem, setActiveItem] = useState<BearingItem | null>(null);

  const categories = useMemo(() => {
    return [
      "All",
      "Deep Groove",
      "Tapered Roller",
      "Cylindrical Roller",
      "Spherical Roller",
      "Thrust Bearing",
      "Angular Contact",
      "Linear Rail Guide",
      "Linear Guide Block",
      "Ball Screw",
      "Solid Shaft",
      "Oil Seal",
      "Pillow Block",
    ];
  }, []);

  const filteredBearings = useMemo(() => {
    return BEARING_CATALOG.filter((item) => {
      // Category match
      if (selectedCategory !== "All" && item.category !== selectedCategory) {
        return false;
      }

      // Clearance match
      if (selectedClearance !== "All" && item.clearance !== selectedClearance) {
        return false;
      }

      // Seal match
      if (selectedSeal !== "All") {
        if (selectedSeal === "2RS" && !item.sealType.includes("2RS")) return false;
        if (selectedSeal === "2Z" && !item.sealType.includes("2Z")) return false;
        if (selectedSeal === "Open" && item.sealType !== "Open") return false;
      }

      // Search match
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase().trim();
        const designationMatch = item.designation.toLowerCase().includes(query);
        const categoryMatch = item.category.toLowerCase().includes(query);
        const seriesMatch = item.series.toLowerCase().includes(query);
        const sizeMatch =
          `${item.bore}x${item.od}x${item.width}`.includes(query) ||
          `${item.bore} ${item.od} ${item.width}`.includes(query);
        const crossRefMatch =
          item.crossRef.skf.toLowerCase().includes(query) ||
          item.crossRef.fag.toLowerCase().includes(query) ||
          item.crossRef.nsk.toLowerCase().includes(query) ||
          item.crossRef.timken.toLowerCase().includes(query);

        return designationMatch || categoryMatch || seriesMatch || sizeMatch || crossRefMatch;
      }

      return true;
    });
  }, [selectedCategory, searchQuery, selectedClearance, selectedSeal]);

  const isItemInRfq = (item: BearingItem) => {
    return activeRfqItems.some((r) => r.id === item.id);
  };

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setSelectedClearance("All");
    setSelectedSeal("All");
  };

  return (
    <section id="products" className="catalog-section">
      <div className="catalog-container">
        {/* Section Header */}
        <div className="catalog-header-block">
          <div className="catalog-title-wrapper">
            <span className="section-eyebrow s-mono">EVO BEARINGS & MACHINERIES · GERMAN ADAPTED RANGE</span>
            <h2 className="section-title">Parametric Industrial Bearing Catalog</h2>
            <p className="section-desc">
              Search and inspect industrial radial ball, spherical roller, tapered roller, cylindrical, and angular contact bearings.
              View complete dimensional blueprints, dynamic load ratings (Cr), and SKF / FAG brand cross-references.
            </p>
          </div>

          <div className="catalog-metrics-pill">
            <div className="pill-item">
              <span className="pill-num">14+</span>
              <span className="pill-label">Standard Series</span>
            </div>
            <div className="pill-divider" />
            <div className="pill-item">
              <span className="pill-num">100%</span>
              <span className="pill-label">100Cr6 Degassed</span>
            </div>
            <div className="pill-divider" />
            <div className="pill-item">
              <span className="pill-num">24h</span>
              <span className="pill-label">Dispatch Guarantee</span>
            </div>
          </div>
        </div>

        {/* Filter & Search Control Panel */}
        <CatalogControls
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedClearance={selectedClearance}
          onClearanceChange={setSelectedClearance}
          selectedSeal={selectedSeal}
          onSealChange={setSelectedSeal}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          categories={categories}
          allBearings={BEARING_CATALOG}
        />

        {/* Results summary bar */}
        <div className="catalog-status-bar">
          <span className="results-count">
            Showing <strong>{filteredBearings.length}</strong> precision bearing reference
            {filteredBearings.length === 1 ? "" : "s"}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </span>
          {activeRfqItems.length > 0 && (
            <a href="/contact#quote" className="rfq-summary-pill">
              <span className="rfq-bullet" />
              <span>
                {activeRfqItems.length} Part{activeRfqItems.length === 1 ? "" : "s"} In RFQ List
              </span>
              <span className="rfq-arrow">→</span>
            </a>
          )}
        </div>

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="bearings-grid">
            {filteredBearings.map((item) => (
              <BearingCard
                key={item.id}
                item={item}
                inRfq={isItemInRfq(item)}
                onInspect={setActiveItem}
                onToggleRfq={activeToggleRfq}
              />
            ))}
          </div>
        )}

        {/* Engineering Data Table View */}
        {viewMode === "table" && (
          <BearingTable
            items={filteredBearings}
            isItemInRfq={isItemInRfq}
            onInspect={setActiveItem}
            onToggleRfq={activeToggleRfq}
          />
        )}

        {/* Empty State */}
        {filteredBearings.length === 0 && (
          <div className="no-results-box">
            <p className="no-results-title">No bearing matched your filter parameters.</p>
            <p className="no-results-sub">
              Try broadening your search or resetting the clearance / seal filters.
            </p>
            <button className="btn-reset-filters" onClick={handleResetFilters}>
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Item Detail Modal */}
      <ItemDetailModal
        item={activeItem}
        onClose={() => setActiveItem(null)}
        onAddToRfq={activeToggleRfq}
        isAddedToRfq={activeItem ? isItemInRfq(activeItem) : false}
      />
    </section>
  );
}
