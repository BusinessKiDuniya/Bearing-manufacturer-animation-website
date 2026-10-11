export type BearingCategory =
  | "Deep Groove"
  | "Angular Contact"
  | "Tapered Roller"
  | "Cylindrical Roller"
  | "Spherical Roller"
  | "Thrust Bearing"
  | "Ceramic Hybrid"
  | "Pillow Block"
  | "Linear Rail Guide"
  | "Linear Guide Block"
  | "Ball Screw"
  | "Solid Shaft"
  | "Oil Seal";

export type BearingSealType =
  | "Open"
  | "2RS (Rubber Seal)"
  | "2Z (Metal Shield)"
  | "Contact Viton";

export type BearingCageType =
  | "Pressed Steel"
  | "Machined Brass (M)"
  | "Polyamide PA66 (TVP)"
  | "Silicon Nitride";

export type BearingClearance = "CN" | "C3" | "C4";

export type BearingPrecisionGrade =
  | "ABEC-1 (P0)"
  | "ABEC-3 (P6)"
  | "ABEC-5 (P5)"
  | "ABEC-7 (P4)";

export interface BearingCrossRef {
  skf: string;
  fag: string;
  nsk: string;
  timken: string;
}

export interface BearingItem {
  id: string;
  designation: string;
  category: BearingCategory;
  series: string;
  bore: number; // mm
  od: number; // mm
  width: number; // mm
  dynamicLoadCr: number; // kN
  staticLoadCor: number; // kN
  fatigueLimitPu: number; // kN
  limitingSpeedGrease: number; // RPM
  limitingSpeedOil: number; // RPM
  weightKg: number;
  sealType: BearingSealType;
  cageType: BearingCageType;
  clearance: BearingClearance;
  precisionGrade: BearingPrecisionGrade;
  inStock: boolean;
  stockQty: number;
  leadTime: string;
  lubrication: string;
  tempRange: string;
  crossRef: BearingCrossRef;
  description: string;
  applications: string[];
  customImage?: string;
}
