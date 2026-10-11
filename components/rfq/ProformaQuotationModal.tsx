"use client";

import React, { useState, useId } from "react";
import { BearingItem } from "@/types/bearing";
import { ProformaInvoiceItem, ProformaBuyerInfo } from "@/types/rfq";
import { getWhatsAppUrl } from "@/data/siteConfig";

interface ProformaQuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  catalogItems?: BearingItem[];
  customParts?: string[];
  quantities?: Record<string, number>;
  initialBuyerInfo?: Partial<ProformaBuyerInfo>;
}

// Helper to determine realistic industrial reference pricing in INR
function getEstimatedUnitRate(code: string, category?: string, bore?: number): number {
  if (category === "Deep Groove") {
    if (!bore || bore <= 25) return 185;
    if (bore <= 50) return 420;
    return 890;
  }
  if (category === "Tapered Roller") {
    if (!bore || bore <= 35) return 460;
    if (bore <= 60) return 1180;
    return 2450;
  }
  if (category === "Spherical Roller") {
    if (!bore || bore <= 60) return 2850;
    if (bore <= 120) return 6400;
    return 14500;
  }
  if (category === "Cylindrical Roller") {
    if (!bore || bore <= 50) return 920;
    return 2250;
  }
  if (category === "Ball Screw") return 6800;
  if (category === "Linear Rail Guide") return 4200;
  if (category === "Linear Guide Block") return 1650;
  if (category === "Solid Shaft") return 1850;
  if (category === "Oil Seal") return 95;
  if (category === "Ceramic Hybrid") return 1950;

  // Fallback heuristic based on part code
  if (code.startsWith("62") || code.startsWith("63")) return 240;
  if (code.startsWith("22") || code.startsWith("23")) return 3600;
  if (code.startsWith("32") || code.startsWith("30")) return 780;
  return 550;
}

function getHsnCode(category?: string, code?: string): string {
  if (category === "Ball Screw" || category === "Linear Rail Guide" || category === "Linear Guide Block" || category === "Solid Shaft") {
    return "8483.40.00";
  }
  if (category === "Oil Seal") {
    return "8487.90.00";
  }
  if (category === "Tapered Roller" || code?.startsWith("3")) {
    return "8482.20.00";
  }
  if (category === "Spherical Roller" || code?.startsWith("2")) {
    return "8482.30.00";
  }
  if (category === "Cylindrical Roller" || code?.startsWith("NU") || code?.startsWith("NJ")) {
    return "8482.50.00";
  }
  return "8482.10.00"; // Deep groove / standard ball
}

export default function ProformaQuotationModal({
  isOpen,
  onClose,
  catalogItems = [],
  customParts = [],
  quantities = {},
  initialBuyerInfo,
}: ProformaQuotationModalProps) {
  const [invoiceNumber] = useState(
    () => `PI-EVO-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`
  );
  const [currentDate] = useState(() => new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }));
  const [validUntil] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  });

  const [buyerInfo, setBuyerInfo] = useState<ProformaBuyerInfo>({
    buyerName: initialBuyerInfo?.buyerName || "Procurement Manager",
    company: initialBuyerInfo?.company || "Precision Engineering Works",
    gstin: initialBuyerInfo?.gstin || "27AABCP1234F1Z8",
    email: initialBuyerInfo?.email || "purchase@clientmfg.com",
    phone: initialBuyerInfo?.phone || "+91 98300 00000",
    billingAddress: initialBuyerInfo?.billingAddress || "Plot 42, Industrial Development Area, Phase II",
    deliveryCity: initialBuyerInfo?.deliveryCity || "Mumbai / Pune Hub",
  });

  const [isEditingBuyer, setIsEditingBuyer] = useState(false);
  const [isInterState, setIsInterState] = useState(true); // IGST 18% vs CGST 9% + SGST 9%
  const [copySuccess, setCopySuccess] = useState(false);

  // Build items list
  const [customRates, setCustomRates] = useState<Record<string, number>>({});
  const [customQuantities, setCustomQuantities] = useState<Record<string, number>>({});

  if (!isOpen) return null;

  const invoiceItems: ProformaInvoiceItem[] = [
    ...catalogItems.map((item) => ({
      id: item.id,
      code: item.designation,
      description: `${item.category} Bearing (${item.bore}×${item.od}×${item.width} mm), ${item.clearance} clearance, ${item.sealType}`,
      hsn: getHsnCode(item.category, item.designation),
      qty: customQuantities[item.id] ?? (quantities[item.id] || 100),
      unitRate: customRates[item.id] ?? getEstimatedUnitRate(item.designation, item.category, item.bore),
    })),
    ...customParts.map((part, idx) => ({
      id: `custom-${idx}`,
      code: part,
      description: `Custom Machinery Bearing / Transmission Component Designation (${part})`,
      hsn: getHsnCode("Custom", part),
      qty: customQuantities[`custom-${idx}`] ?? 50,
      unitRate: customRates[`custom-${idx}`] ?? getEstimatedUnitRate(part),
    })),
  ];

  // If no items at all, supply an exemplary line
  if (invoiceItems.length === 0) {
    invoiceItems.push({
      id: "demo-item",
      code: "6205-2RSH/C3",
      description: "Deep Groove Radial Ball Bearing (25×52×15 mm) C3 Internal Clearance",
      hsn: "8482.10.00",
      qty: 100,
      unitRate: 185,
    });
  }

  const taxableSubtotal = invoiceItems.reduce((acc, item) => acc + item.qty * item.unitRate, 0);
  const gstRate = 0.18;
  const totalGst = taxableSubtotal * gstRate;
  const grandTotal = taxableSubtotal + totalGst;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppExport = () => {
    const lines = [
      `*OFFICIAL PRO-FORMA QUOTATION INQUIRY*`,
      `*Ref No:* ${invoiceNumber}`,
      `*Client:* ${buyerInfo.company} (${buyerInfo.buyerName})`,
      `*Destination:* ${buyerInfo.deliveryCity}`,
      `*Date:* ${currentDate}`,
      `---------------------------------`,
      ...invoiceItems.map(
        (it, idx) =>
          `${idx + 1}. *${it.code}* - Qty: ${it.qty} pcs @ ₹${it.unitRate} | HSN: ${it.hsn}`
      ),
      `---------------------------------`,
      `*Taxable Subtotal:* ₹${taxableSubtotal.toLocaleString("en-IN")}`,
      `*GST (18%):* ₹${Math.round(totalGst).toLocaleString("en-IN")}`,
      `*Estimated Grand Total:* ₹${Math.round(grandTotal).toLocaleString("en-IN")}`,
      `*MTC Required:* EN 10204 3.1`,
      `---------------------------------`,
      `Please confirm stock availability and dispatch schedule from Kolkata warehouse.`,
    ];

    const whatsappLink = getWhatsAppUrl(lines.join("\n"));
    window.open(whatsappLink, "_blank");
  };

  const handleCopySummary = () => {
    const text = `PRO-FORMA QUOTATION (${invoiceNumber})\nDate: ${currentDate}\nCompany: ${buyerInfo.company}\n\n` +
      invoiceItems.map((i, idx) => `${idx + 1}. ${i.code} | Qty: ${i.qty} | Rate: ₹${i.unitRate} | Total: ₹${i.qty * i.unitRate}`).join("\n") +
      `\n\nSubtotal: ₹${taxableSubtotal.toLocaleString("en-IN")}\nGST 18%: ₹${Math.round(totalGst).toLocaleString("en-IN")}\nGrand Total: ₹${Math.round(grandTotal).toLocaleString("en-IN")}`;
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  return (
    <div className="proforma-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="proforma-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Top Control Bar (Hidden in Print) */}
        <div className="proforma-top-actions no-print">
          <div className="proforma-actions-left">
            <span className="proforma-pill-badge">COMMERCIAL PRO-FORMA SUITE</span>
            <span className="proforma-ref-display">{invoiceNumber}</span>
          </div>

          <div className="proforma-actions-right">
            <button
              type="button"
              className="proforma-btn-action"
              onClick={handleCopySummary}
              title="Copy Summary to Clipboard"
            >
              {copySuccess ? "✓ Copied" : "📋 Copy"}
            </button>
            <button
              type="button"
              className="proforma-btn-action proforma-btn-whatsapp"
              onClick={handleWhatsAppExport}
            >
              💬 WhatsApp Desk
            </button>
            <button
              type="button"
              className="proforma-btn-action proforma-btn-print"
              onClick={handlePrint}
            >
              🖨️ Print / Save PDF
            </button>
            <button
              type="button"
              className="proforma-close-btn"
              onClick={onClose}
              aria-label="Close Pro-Forma Modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Printable Official Invoice Body */}
        <div className="proforma-sheet" id="printable-proforma">
          {/* Header Block with Watermark & Logo */}
          <div className="proforma-header-row">
            <div className="proforma-company-block">
              <div className="proforma-brand-header">
                <span className="proforma-brand-evo">EVO</span>
                <span className="proforma-brand-sub">BEARINGS & MACHINERIES PVT. LTD.</span>
              </div>
              <p className="proforma-address-line">
                <strong>Regd. Office:</strong> 13, Brabourne Road, 4th Floor, Kolkata - 700001, West Bengal, India
              </p>
              <p className="proforma-meta-line">
                <span><strong>GSTIN:</strong> 19AAACE4581M1Z4</span>
                <span><strong>CIN:</strong> U29259WB2018PTC224890</span>
                <span><strong>PAN:</strong> AAACE4581M</span>
              </p>
              <p className="proforma-contact-line">
                <span><strong>Desk:</strong> +91 90883 63391 / +91 98310 23412</span>
                <span><strong>Email:</strong> info@evomachinery.in</span>
              </p>
            </div>

            <div className="proforma-doc-title-block">
              <div className="proforma-stamp">PRO-FORMA INVOICE</div>
              <div className="proforma-doc-specs">
                <div className="spec-item">
                  <span className="spec-label">INVOICE REF:</span>
                  <span className="spec-val s-mono font-bold">{invoiceNumber}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">ISSUE DATE:</span>
                  <span className="spec-val s-mono">{currentDate}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">VALID THRU:</span>
                  <span className="spec-val s-mono">{validUntil}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">QUALITY STD:</span>
                  <span className="spec-val s-mono text-blue">ISO 9001:2015</span>
                </div>
              </div>
            </div>
          </div>

          <div className="proforma-divider" />

          {/* Buyer Details Row */}
          <div className="proforma-entities-grid">
            <div className="entity-box">
              <div className="entity-heading-row">
                <span className="entity-heading">CONSIGNEE / BUYER DETAILS</span>
                <button
                  type="button"
                  className="entity-edit-link no-print"
                  onClick={() => setIsEditingBuyer(!isEditingBuyer)}
                >
                  {isEditingBuyer ? "Done" : "Edit Buyer Info"}
                </button>
              </div>

              {isEditingBuyer ? (
                <div className="buyer-edit-form no-print">
                  <input
                    type="text"
                    value={buyerInfo.company}
                    onChange={(e) => setBuyerInfo({ ...buyerInfo, company: e.target.value })}
                    placeholder="Company Name"
                    className="buyer-input"
                  />
                  <input
                    type="text"
                    value={buyerInfo.buyerName}
                    onChange={(e) => setBuyerInfo({ ...buyerInfo, buyerName: e.target.value })}
                    placeholder="Contact Person / Designation"
                    className="buyer-input"
                  />
                  <input
                    type="text"
                    value={buyerInfo.gstin}
                    onChange={(e) => setBuyerInfo({ ...buyerInfo, gstin: e.target.value })}
                    placeholder="Buyer GSTIN (e.g. 27AAAAA0000A1Z5)"
                    className="buyer-input"
                  />
                  <input
                    type="text"
                    value={buyerInfo.deliveryCity}
                    onChange={(e) => setBuyerInfo({ ...buyerInfo, deliveryCity: e.target.value })}
                    placeholder="Delivery Destination / Hub"
                    className="buyer-input"
                  />
                  <input
                    type="text"
                    value={buyerInfo.billingAddress}
                    onChange={(e) => setBuyerInfo({ ...buyerInfo, billingAddress: e.target.value })}
                    placeholder="Billing / Works Address"
                    className="buyer-input"
                  />
                </div>
              ) : (
                <div className="entity-content">
                  <p className="entity-name">{buyerInfo.company}</p>
                  <p className="entity-sub">Attn: {buyerInfo.buyerName}</p>
                  <p className="entity-address">{buyerInfo.billingAddress}</p>
                  <p className="entity-tax"><strong>Buyer GSTIN:</strong> {buyerInfo.gstin}</p>
                  <p className="entity-dest"><strong>Place of Supply / Destination:</strong> {buyerInfo.deliveryCity}</p>
                </div>
              )}
            </div>

            <div className="entity-box dispatch-terms-box">
              <div className="entity-heading">DISPATCH & COMMERCIAL TERMS</div>
              <div className="entity-content">
                <div className="term-row">
                  <span className="term-label">Mode of Dispatch:</span>
                  <span className="term-val">Express Road Cargo / Door Air (TCI/VRL/BlueDart)</span>
                </div>
                <div className="term-row">
                  <span className="term-label">Delivery Terms:</span>
                  <span className="term-val">Ex-Works Central Warehouse (Kolkata)</span>
                </div>
                <div className="term-row">
                  <span className="term-label">Test Certificates:</span>
                  <span className="term-val">EN 10204 Type 3.1 Mill Inspection Cert</span>
                </div>
                <div className="term-row">
                  <span className="term-label">Payment Terms:</span>
                  <span className="term-val">Net 30 Days (Existing Accounts) / Advance on PO</span>
                </div>
                <div className="term-row no-print" style={{ marginTop: "6px" }}>
                  <label className="gst-toggle-label">
                    <input
                      type="checkbox"
                      checked={isInterState}
                      onChange={(e) => setIsInterState(e.target.checked)}
                    />
                    <span>Inter-State Supply (18% IGST) vs Intra-State (9% CGST + 9% SGST)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="proforma-table-wrap">
            <table className="proforma-table">
              <thead>
                <tr>
                  <th style={{ width: "40px" }}>#</th>
                  <th>Item Code / Designation</th>
                  <th style={{ width: "100px" }}>HSN Code</th>
                  <th style={{ width: "80px", textAlign: "right" }}>Qty (pcs)</th>
                  <th style={{ width: "120px", textAlign: "right" }}>Indicative Rate (₹)</th>
                  <th style={{ width: "130px", textAlign: "right" }}>Total Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {invoiceItems.map((item, index) => {
                  const lineTotal = item.qty * item.unitRate;
                  return (
                    <tr key={item.id}>
                      <td className="s-mono" style={{ textAlign: "center" }}>{index + 1}</td>
                      <td>
                        <div className="table-code-row">
                          <strong className="table-code-name s-mono">{item.code}</strong>
                        </div>
                        <div className="table-code-desc">{item.description}</div>
                      </td>
                      <td className="s-mono text-muted">{item.hsn}</td>
                      <td style={{ textAlign: "right" }}>
                        <span className="s-mono font-bold">{item.qty}</span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <span className="s-mono">₹{item.unitRate.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <strong className="s-mono">₹{lineTotal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Totals & Financials Block */}
          <div className="proforma-totals-grid">
            <div className="proforma-bank-block">
              <div className="proforma-box-title">REMITTANCE & BANK PARTICULARS</div>
              <div className="bank-details-content s-mono">
                <div><strong>Account Name:</strong> EVO BEARINGS & MACHINERIES PVT. LTD.</div>
                <div><strong>Bank Name:</strong> HDFC Bank Ltd.</div>
                <div><strong>Current A/c No:</strong> 50200038921849</div>
                <div><strong>IFSC Code:</strong> HDFC0000008 (Brabourne Road Branch)</div>
                <div><strong>UPI VPA:</strong> evomachinery@hdfcbank</div>
              </div>
              <div className="proforma-hsn-note">
                Bearings conform strictly to DIN 620 / ISO 492 standard tolerances. All dimensions in millimeters (mm).
              </div>
            </div>

            <div className="proforma-calc-block">
              <div className="calc-row">
                <span className="calc-label">Total Taxable Amount:</span>
                <span className="calc-val s-mono">₹{taxableSubtotal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>

              {isInterState ? (
                <div className="calc-row">
                  <span className="calc-label">Integrated GST (IGST @ 18%):</span>
                  <span className="calc-val s-mono">₹{totalGst.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              ) : (
                <>
                  <div className="calc-row">
                    <span className="calc-label">Central GST (CGST @ 9%):</span>
                    <span className="calc-val s-mono">₹{(totalGst / 2).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="calc-row">
                    <span className="calc-label">State GST (SGST @ 9%):</span>
                    <span className="calc-val s-mono">₹{(totalGst / 2).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </>
              )}

              <div className="calc-row">
                <span className="calc-label">Packing, Forwarding & Insurance:</span>
                <span className="calc-val s-mono text-green">F.O.R (INCLUDED)</span>
              </div>

              <div className="calc-row grand-total-row">
                <span className="calc-label font-bold">ESTIMATED PRO-FORMA TOTAL:</span>
                <span className="calc-val s-mono grand-total-val">
                  ₹{grandTotal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="proforma-round-note">
                Inclusive of 18% GST. Final invoice issued against purchase order with exact freight dispatch schedule.
              </div>
            </div>
          </div>

          {/* Signatures & Certification Seal */}
          <div className="proforma-signatures-row">
            <div className="signature-terms">
              <strong>General Conditions:</strong>
              <ol>
                <li>Rates quoted are indicative ex-works Kolkata warehouse and valid for 30 calendar days.</li>
                <li>Bearings supplied undergo 100% laser micrometer dimensional and vibration checking.</li>
                <li>Manufacturer test certificates (EN 10204 3.1) accompany the consignment.</li>
              </ol>
            </div>

            <div className="signature-stamp-box">
              <div className="stamp-company">For EVO BEARINGS & MACHINERIES PVT. LTD.</div>
              <div className="stamp-seal-wrap">
                <div className="digital-seal">
                  <span>EVO BEARINGS</span>
                  <span className="seal-center">CERTIFIED</span>
                  <span>WORKS KOLKATA</span>
                </div>
              </div>
              <div className="stamp-signatory">Authorized Commercial Signatory</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
