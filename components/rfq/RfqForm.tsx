"use client";

import React from "react";

interface RfqFormProps {
  isCartEmpty: boolean;
  isSubmitting: boolean;
  fileName: string | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function RfqForm({
  isCartEmpty,
  isSubmitting,
  fileName,
  onFileChange,
  onSubmit,
}: RfqFormProps) {
  return (
    <form onSubmit={onSubmit} className="rfq-actual-form">
      <div className="form-row-2">
        <div className="form-group">
          <label htmlFor="rfq-name">Contact Person *</label>
          <input
            id="rfq-name"
            name="name"
            required
            placeholder="e.g. Marcus Vance, Chief Mechanical Engineer"
            className="input-tech"
          />
        </div>
        <div className="form-group">
          <label htmlFor="rfq-company">Company / Plant *</label>
          <input
            id="rfq-company"
            name="company"
            required
            placeholder="e.g. Apex Industrial Automation"
            className="input-tech"
          />
        </div>
      </div>

      <div className="form-row-2">
        <div className="form-group">
          <label htmlFor="rfq-email">Corporate Email *</label>
          <input
            id="rfq-email"
            name="email"
            type="email"
            required
            placeholder="e.g. engineering@apex-industrial.com"
            className="input-tech"
          />
        </div>
        <div className="form-group">
          <label htmlFor="rfq-phone">Direct Phone / Mobile *</label>
          <input
            id="rfq-phone"
            name="phone"
            type="tel"
            required
            placeholder="e.g. +1 (312) 555-0199"
            className="input-tech"
          />
        </div>
      </div>

      <div className="form-row-2">
        <div className="form-group">
          <label htmlFor="rfq-region">Delivery Region / Destination</label>
          <select
            id="rfq-region"
            name="region"
            className="select-tech"
            defaultValue="West Bengal & Kolkata Metro"
          >
            <option>West Bengal & Kolkata Metro</option>
            <option>Delhi NCR, Haryana & Punjab</option>
            <option>Uttar Pradesh & Bihar</option>
            <option>Maharashtra, Gujarat & Western Hub</option>
            <option>Tamil Nadu, Karnataka & South India</option>
            <option>Odisha, Jharkhand & Central Mining Zone</option>
            <option>International Export / Overseas</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="rfq-cert">Required Certification</label>
          <select
            id="rfq-cert"
            name="certType"
            className="select-tech"
            defaultValue="EN 10204 3.1 Mill Test Report"
          >
            <option>EN 10204 3.1 Mill Test Report</option>
            <option>Standard Certificate of Conformity (CoC)</option>
            <option>PPAP Level 3 (Automotive IATF 16949)</option>
            <option>Full CMM Formscan Inspection Report</option>
          </select>
        </div>
      </div>

      {/* If cart is empty, allow quick single part entry */}
      {isCartEmpty && (
        <div className="form-row-2">
          <div className="form-group">
            <label htmlFor="singlePart">Primary Bearing Part / Size</label>
            <input
              id="singlePart"
              name="singlePart"
              placeholder="e.g. 6205-2RS or 25x52x15 mm"
              className="input-tech"
            />
          </div>
          <div className="form-group">
            <label htmlFor="singleQty">Estimated Quantity</label>
            <input
              id="singleQty"
              name="singleQty"
              type="number"
              defaultValue="100"
              className="input-tech"
            />
          </div>
        </div>
      )}

      <div className="form-group">
        <label htmlFor="operatingNotes">
          Operating Conditions (Max RPM, Radial/Axial Loads, Operating Temp, Lubrication preferences)
        </label>
        <textarea
          id="operatingNotes"
          name="operatingNotes"
          rows={3}
          placeholder="e.g. Operating speed 4,200 RPM, continuous radial load 8.5 kN, temperature ~85°C. Requires low-vibration electric motor quality (EMQ)."
          className="textarea-tech"
        />
      </div>

      {/* CAD File Attachment Simulator */}
      <div className="file-upload-box">
        <label htmlFor="file-upload" className="file-upload-label">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="2"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <span>
            {fileName ? (
              <strong className="text-cyan">Attached: {fileName}</strong>
            ) : (
              "Upload CAD Blueprint or Specification (.step, .stp, .dxf, .pdf, .dwg)"
            )}
          </span>
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={onFileChange}
          className="sr-only"
          accept=".step,.stp,.dxf,.pdf,.dwg,.txt"
        />
      </div>

      {/* Urgent Checkbox */}
      <div className="form-checkbox-row">
        <input
          type="checkbox"
          id="urgency"
          name="urgency"
          className="checkbox-tech"
        />
        <label htmlFor="urgency" className="checkbox-label">
          <strong>Critical breakdown / expedited turnaround required:</strong> Request 60-minute priority routing.
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-submit-rfq"
      >
        {isSubmitting ? "Transmitting RFQ Package..." : "Submit Technical RFQ →"}
      </button>
    </form>
  );
}
