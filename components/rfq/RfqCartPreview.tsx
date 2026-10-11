"use client";

import React, { useState } from "react";
import { BearingItem } from "@/types/bearing";

interface RfqCartPreviewProps {
  rfqItems: BearingItem[];
  customPartsList: string[];
  getQty: (id: string) => number;
  onQtyChange: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onRemoveCustomPart: (index: number) => void;
  onAddCustomPart: (part: string) => void;
  onClearAll: () => void;
  onOpenProforma?: () => void;
}

export default function RfqCartPreview({
  rfqItems,
  customPartsList,
  getQty,
  onQtyChange,
  onRemoveItem,
  onRemoveCustomPart,
  onAddCustomPart,
  onClearAll,
  onOpenProforma,
}: RfqCartPreviewProps) {
  const [customPartInput, setCustomPartInput] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPartInput.trim()) return;
    onAddCustomPart(customPartInput.trim().toUpperCase());
    setCustomPartInput("");
  };

  const totalCount = rfqItems.length + customPartsList.length;

  return (
    <div className="rfq-cart-preview">
      <div className="cart-header">
        <span className="cart-title s-mono">
          CATALOG ITEMS IN RFQ ({totalCount})
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {onOpenProforma && totalCount > 0 && (
            <button
              type="button"
              className="cart-proforma-btn"
              onClick={onOpenProforma}
              title="Generate Instant Commercial Pro-Forma Invoice"
            >
              ⚡ Instant Pro-Forma & PDF
            </button>
          )}
          {totalCount > 0 && (
            <button
              type="button"
              className="cart-clear-btn"
              onClick={onClearAll}
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {totalCount === 0 ? (
        <div className="cart-empty-prompt">
          <p className="cart-empty-text">
            No bearings selected from catalog yet. You can browse and click &quot;+ Add to RFQ&quot; above, or specify your custom designation below.
          </p>
        </div>
      ) : (
        <ul className="cart-items-list">
          {rfqItems.map((item) => (
            <li key={item.id} className="cart-item-row">
              <div className="cart-item-info">
                <span className="cart-item-code s-mono">{item.designation}</span>
                <span className="cart-item-sub">
                  {item.series} · {item.bore}×{item.od}×{item.width} mm
                </span>
              </div>
              <div className="cart-qty-picker">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => onQtyChange(item.id, -25)}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="qty-val s-mono">{getQty(item.id)} pcs</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => onQtyChange(item.id, 25)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="cart-remove-btn"
                onClick={() => onRemoveItem(item.id)}
                aria-label={`Remove ${item.designation}`}
              >
                ✕
              </button>
            </li>
          ))}

          {customPartsList.map((cp, idx) => (
            <li key={idx} className="cart-item-row custom">
              <div className="cart-item-info">
                <span className="cart-item-code s-mono">{cp}</span>
                <span className="cart-item-sub">Custom Machine Designation</span>
              </div>
              <span className="qty-val s-mono">50 pcs</span>
              <button
                type="button"
                className="cart-remove-btn"
                onClick={() => onRemoveCustomPart(idx)}
                aria-label={`Remove custom part ${cp}`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Add custom part input */}
      <div className="add-custom-row">
        <input
          type="text"
          placeholder="Add custom part # (e.g. 6308-2RS-C3, NU212, or dimensions)..."
          value={customPartInput}
          onChange={(e) => setCustomPartInput(e.target.value)}
          className="custom-part-input"
        />
        <button
          type="button"
          className="custom-part-add-btn"
          onClick={handleAdd}
        >
          + Add Part
        </button>
      </div>
    </div>
  );
}
