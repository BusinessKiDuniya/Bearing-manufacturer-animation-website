"use client";

import React, { useState } from "react";
import { BearingItem } from "@/types/bearing";
import { SubmittedRfqData } from "@/types/rfq";
import RfqSuccessCard from "./RfqSuccessCard";
import RfqCartPreview from "./RfqCartPreview";
import RfqForm from "./RfqForm";
import ContactInfoCard from "./ContactInfoCard";
import ProformaQuotationModal from "./ProformaQuotationModal";

import { useRfq } from "@/context/RfqContext";

interface RfqAndContactProps {
  rfqItems?: BearingItem[];
  onRemoveItem?: (id: string) => void;
  onClearRfq?: () => void;
}

export default function RfqAndContact({
  rfqItems,
  onRemoveItem,
  onClearRfq,
}: RfqAndContactProps) {
  const rfqContext = useRfq();
  const activeItems = rfqItems ?? rfqContext.rfqItems;
  const activeRemoveItem = onRemoveItem ?? rfqContext.removeFromRfq;
  const activeClearRfq = onClearRfq ?? rfqContext.clearRfq;
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [customPartsList, setCustomPartsList] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<SubmittedRfqData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProformaOpen, setIsProformaOpen] = useState(false);

  const getQty = (id: string) => quantities[id] || 100;

  const handleQtyChange = (id: string, delta: number) => {
    setQuantities((prev) => {
      const cur = prev[id] || 100;
      const next = Math.max(1, cur + delta);
      return { ...prev, [id]: next };
    });
  };

  const handleAddCustomPart = (part: string) => {
    setCustomPartsList((prev) => [...prev, part]);
  };

  const handleRemoveCustomPart = (index: number) => {
    setCustomPartsList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleClearAll = () => {
    activeClearRfq();
    setCustomPartsList([]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const itemsSummary = [
      ...activeItems.map((item) => ({
        code: item.designation,
        qty: getQty(item.id),
      })),
      ...customPartsList.map((cp) => ({
        code: cp,
        qty: 50,
      })),
    ];

    if (itemsSummary.length === 0) {
      const singleDesignation =
        (formData.get("singlePart") as string) || "6205-2RS Standard";
      itemsSummary.push({
        code: singleDesignation,
        qty: Number(formData.get("singleQty")) || 100,
      });
    }

    const rfqNumber = `RFQ-EVO-${Math.floor(100000 + Math.random() * 900000)}`;

    setTimeout(() => {
      setSubmittedData({
        rfqId: rfqNumber,
        name: (formData.get("name") as string) || "Engineering Lead",
        company: (formData.get("company") as string) || "Manufacturing Plant",
        email: (formData.get("email") as string) || "purchasing@client.com",
        phone: (formData.get("phone") as string) || "+91 98300 12345",
        region: (formData.get("region") as string) || "India & Global",
        items: itemsSummary,
        operatingNotes:
          (formData.get("operatingNotes") as string) ||
          "Standard industrial operating envelope.",
        urgency: formData.get("urgency") === "on",
        certType: (formData.get("certType") as string) || "EN 10204 3.1",
        fileName: fileName || undefined,
      });
      setIsSubmitting(false);
      activeClearRfq();
      setCustomPartsList([]);
    }, 600);
  };

  const isCartEmpty = activeItems.length === 0 && customPartsList.length === 0;

  return (
    <section id="quote" className="rfq-contact-section">
      <div className="rfq-container">
        {/* Header */}
        <div className="rfq-header-block">
          <span className="section-eyebrow s-mono">DIRECT APPLICATION DESK & PROCUREMENT</span>
          <h2 className="section-title">Request for Quotation & Pro-Forma Invoice</h2>
          <p className="section-desc">
            Submit your designated bearing parts, operational RPM/loads, or custom drawing files.
            Generate an official GST pro-forma invoice with 1 click or request factory pricing from our mechanical engineers.
          </p>
        </div>

        {submittedData ? (
          <RfqSuccessCard
            data={submittedData}
            onReset={() => setSubmittedData(null)}
            onOpenProforma={() => setIsProformaOpen(true)}
          />
        ) : (
          <div className="rfq-layout-grid">
            <div className="rfq-form-card">
              <h3 className="card-title">Technical Specification & RFQ Form</h3>

              <RfqCartPreview
                rfqItems={activeItems}
                customPartsList={customPartsList}
                getQty={getQty}
                onQtyChange={handleQtyChange}
                onRemoveItem={activeRemoveItem}
                onRemoveCustomPart={handleRemoveCustomPart}
                onAddCustomPart={handleAddCustomPart}
                onClearAll={handleClearAll}
                onOpenProforma={() => setIsProformaOpen(true)}
              />

              <RfqForm
                isCartEmpty={isCartEmpty}
                isSubmitting={isSubmitting}
                fileName={fileName}
                onFileChange={handleFileChange}
                onSubmit={handleSubmit}
              />
            </div>

            <ContactInfoCard />
          </div>
        )}

        <ProformaQuotationModal
          isOpen={isProformaOpen}
          onClose={() => setIsProformaOpen(false)}
          catalogItems={activeItems}
          customParts={customPartsList}
          quantities={quantities}
          initialBuyerInfo={
            submittedData
              ? {
                  buyerName: submittedData.name,
                  company: submittedData.company,
                  email: submittedData.email,
                  phone: submittedData.phone,
                  deliveryCity: submittedData.region,
                }
              : undefined
          }
        />
      </div>
    </section>
  );
}
