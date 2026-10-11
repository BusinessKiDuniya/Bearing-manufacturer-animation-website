"use client";

import React from "react";
import { SubmittedRfqData } from "@/types/rfq";
import { getWhatsAppUrl } from "@/data/siteConfig";

interface RfqSuccessCardProps {
  data: SubmittedRfqData;
  onReset: () => void;
  onOpenProforma?: () => void;
}

export default function RfqSuccessCard({ data, onReset, onOpenProforma }: RfqSuccessCardProps) {
  const handleWhatsAppShare = () => {
    const lines = [
      `*FORMAL BEARING INQUIRY TRANSMITTED*`,
      `*Reference:* ${data.rfqId}`,
      `*Company:* ${data.company} (${data.name})`,
      `*Contact:* ${data.email} | ${data.phone}`,
      `*Region:* ${data.region}`,
      `---------------------------------`,
      ...data.items.map((it, idx) => `${idx + 1}. *${it.code}* - Qty: ${it.qty} pcs`),
      `---------------------------------`,
      `*Cert Required:* ${data.certType}`,
      `*Notes:* ${data.operatingNotes}`,
      data.urgency ? `⚡ *URGENT 24H DISPATCH REQUIRED*` : `Standard dispatch requested.`,
      `Please acknowledge receipt and advise formal delivery timeline.`,
    ];
    window.open(getWhatsAppUrl(lines.join("\n")), "_blank");
  };

  return (
    <div className="rfq-success-card" role="status">
      <div className="success-icon-wrap">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0071E3"
          strokeWidth="2.5"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <span className="badge-tech">RFQ TRANSMITTED · {data.rfqId}</span>
      <h3 className="success-title">Quotation Request Logged Successfully</h3>
      <p className="success-desc">
        Thank you, <strong>{data.name}</strong> from <strong>{data.company}</strong>.
        A priority engineering quotation has been queued with our application engineering desk.
        Formal pricing and mill availability will be dispatched to <strong>{data.email}</strong>.
      </p>

      <div className="success-summary-box">
        <h4 className="summary-title s-mono">ITEMIZED QUOTATION BREAKDOWN:</h4>
        <ul className="summary-items-list">
          {data.items.map((it, idx) => (
            <li key={idx} className="summary-item">
              <span className="s-mono font-bold">{it.code}</span>
              <span className="s-mono text-cyan">
                Quantity: {it.qty.toLocaleString()} pcs
              </span>
              <span className="s-mono text-amber">Est. Dispatch: 24h</span>
            </li>
          ))}
        </ul>
        {data.fileName && (
          <div className="summary-attachment s-mono">
            Attached Technical Drawing: <strong>{data.fileName}</strong>
          </div>
        )}
        {data.urgency && (
          <div className="summary-urgent s-mono">
            ⚡ HIGH PRIORITY: Expedited 60-minute turnaround flagged.
          </div>
        )}
      </div>

      <div className="success-actions" style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
        {onOpenProforma && (
          <button
            type="button"
            className="evo-btn-primary"
            onClick={onOpenProforma}
            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            🖨️ View & Print Pro-Forma Invoice (PDF)
          </button>
        )}
        <button
          type="button"
          className="evo-btn-secondary"
          onClick={handleWhatsAppShare}
          style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
        >
          💬 Forward to WhatsApp Desk
        </button>
        <button
          type="button"
          className="cart-clear-btn"
          onClick={onReset}
          style={{ padding: "10px 16px", borderRadius: "980px" }}
        >
          Submit Another Inquiry
        </button>
      </div>
    </div>
  );
}

