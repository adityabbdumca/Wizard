import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { WizardState, PersonalDetails, PlanSelection } from "./types";
import { calculatePremium } from "../../utils/priceCalculations";

const initialState: WizardState = {
  currentStep: 1,
  personalDetails: {
    name: "",
    age: 0,
    email: "",
  },
  planSelection: {
    planType: null,
    estimatedPrice: 0,
  },
  isSubmitted: false,
  isLoading: false,
};

const policyWizardSlice = createSlice({
  name: "policyWizard",
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    updatePersonalDetails: (
      state,
      action: PayloadAction<Partial<PersonalDetails>>
    ) => {
      state.personalDetails = { ...state.personalDetails, ...action.payload };

      if (state.planSelection.planType && state.personalDetails.age > 0) {
        state.planSelection.estimatedPrice = calculatePremium(
          state.planSelection.planType,
          state.personalDetails.age
        );
      }
    },
    updatePlanSelection: (
      state,
      action: PayloadAction<Partial<PlanSelection>>
    ) => {
      const { planType } = action.payload;

      if (planType !== undefined) {
        state.planSelection.planType = planType;

        if (planType && state.personalDetails.age > 0) {
          state.planSelection.estimatedPrice = calculatePremium(
            planType,
            state.personalDetails.age
          );
        } else {
          state.planSelection.estimatedPrice = 0;
        }
      }
    },
    startSubmission: (state) => {
      state.isLoading = true;
    },
    submitFormSuccess: (state) => {
      state.isLoading = false;
      state.isSubmitted = true;
    },
    submitFormFailure: (state) => {
      state.isLoading = false;
    },
    resetForm: () => initialState,
    goToNextStep: (state) => {
      if (state.currentStep < 3) {
        state.currentStep += 1;
      }
    },
    goToPreviousStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
  },
});

export const {
  setCurrentStep,
  updatePersonalDetails,
  updatePlanSelection,
  startSubmission,
  submitFormSuccess,
  submitFormFailure,
  resetForm,
  goToNextStep,
  goToPreviousStep,
} = policyWizardSlice.actions;

export default policyWizardSlice.reducer;
