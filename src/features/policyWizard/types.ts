export const PlanType = {
  GOLD: "GOLD",
  SILVER: "SILVER",
  BRONZE: "BRONZE",
} as const;

export type PlanType = (typeof PlanType)[keyof typeof PlanType];

export interface Plan {
  type: PlanType;
  label: string;
  basePrice: number;
  description: string;
  disabled?: boolean;
}

export interface PersonalDetails {
  name: string;
  age: number;
  email: string;
}

export interface PlanSelection {
  planType: PlanType | null;
  estimatedPrice: number;
}

export interface FormData {
  personalDetails: PersonalDetails;
  planSelection: PlanSelection;
}

export interface WizardState extends FormData {
  currentStep: number;
  isSubmitted: boolean;
  isLoading: boolean;
}

export const PLANS: Record<PlanType, Plan> = {
  [PlanType.GOLD]: {
    type: PlanType.GOLD,
    label: "Gold Plan",
    basePrice: 200,
    description: "Comprehensive coverage with premium benefits",
  },
  [PlanType.SILVER]: {
    type: PlanType.SILVER,
    label: "Silver Plan",
    basePrice: 150,
    description: "Balanced coverage for most needs",
  },
  [PlanType.BRONZE]: {
    type: PlanType.BRONZE,
    label: "Bronze Plan",
    basePrice: 100,
    description: "Essential coverage at an affordable price",
  },
};

export type Step = 1 | 2 | 3;
