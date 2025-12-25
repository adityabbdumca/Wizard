import { PlanType, PLANS } from "../features/policyWizard/types";

export const calculateAgeFactor = (age: number): number => {
  if (age <= 25) return 1.0;
  if (age <= 40) return 1.2;
  if (age <= 60) return 1.5;
  return 2.0;
};

export const calculatePremium = (planType: PlanType, age: number): number => {
  const basePrice = PLANS[planType].basePrice;
  const ageFactor = calculateAgeFactor(age);
  return basePrice * ageFactor;
};

export const isGoldPlanAvailable = (age: number): boolean => {
  return age >= 30;
};
