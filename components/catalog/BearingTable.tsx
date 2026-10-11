"use client";

import React from "react";
import { BearingItem } from "@/types/bearing";

interface BearingTableProps {
  items: BearingItem[];
  isItemInRfq: (item: BearingItem) => boolean;
  onInspect: (item: BearingItem) => void;
  onToggleRfq: (item: BearingItem) => void;
}

export default function BearingTable({
  items,
  isItemInRfq,
  onInspect,
  onToggleRfq,
}: BearingTableProps) {
  return (
    <div className="catalog-table-wrap">
      <table className="catalog-table">
        <thead>
          <tr>
            <th>Part Designation</th>
            <th>Category</th>
            <th>Bore (d)</th>
            <th>OD (D)</th>
            <th>Width (B)</th>
            <th>Dyn. Cr (kN)</th>
            <th>Stat. C0r (kN)</th>
            <th>Limiting RPM</th>
            <th>Seals</th>
            <th>Clearance</th>
            <th>SKF Equivalent</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const inRfq = isItemInRfq(item);
            return (
              <tr key={item.id} className="catalog-table-row">
                <td className="cell-designation s-mono" onClick={() => onInspect(item)}>
                  <strong>{item.designation}</strong>
                </td>
                <td className="cell-muted">{item.category}</td>
                <td className="s-mono cell-num">{item.bore} mm</td>
                <td className="s-mono cell-num">{item.od} mm</td>
                <td className="s-mono cell-num">{item.width} mm</td>
                <td className="s-mono cell-num text-cyan">{item.dynamicLoadCr}</td>
                <td className="s-mono cell-num text-cyan">{item.staticLoadCor}</td>
                <td className="s-mono cell-num text-amber">
                  {item.limitingSpeedGrease.toLocaleString()}
                </td>
                <td>
                  <span className="badge-table-seal">{item.sealType.split(" ")[0]}</span>
                </td>
                <td className="s-mono">{item.clearance}</td>
                <td className="s-mono cell-muted">{item.crossRef.skf}</td>
                <td>
                  <div className="table-actions-cell">
                    <button
                      type="button"
                      className="btn-table-view"
                      onClick={() => onInspect(item)}
                    >
                      Details
                    </button>
                    <button
                      type="button"
                      className={`btn-table-rfq ${inRfq ? "active" : ""}`}
                      onClick={() => onToggleRfq(item)}
                    >
                      {inRfq ? "✓" : "+ RFQ"}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
