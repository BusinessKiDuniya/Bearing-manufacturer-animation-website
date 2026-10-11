export interface RfqItemSummary {
  code: string;
  qty: number;
  hsnCode?: string;
  unitPriceEstimate?: number;
  description?: string;
}

export interface SubmittedRfqData {
  rfqId: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  region: string;
  items: RfqItemSummary[];
  operatingNotes: string;
  urgency: boolean;
  certType: string;
  fileName?: string;
}

export interface ProformaInvoiceItem {
  id: string;
  code: string;
  description: string;
  hsn: string;
  qty: number;
  unitRate: number;
}

export interface ProformaBuyerInfo {
  buyerName: string;
  company: string;
  gstin: string;
  email: string;
  phone: string;
  billingAddress: string;
  deliveryCity: string;
}
