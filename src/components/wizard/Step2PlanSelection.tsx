import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  updatePlanSelection,
  goToNextStep,
  goToPreviousStep,
} from "../../features/policyWizard/policyWizardSlice";
import { calculatePremium } from "../../utils/priceCalculations";

import { planSelectionSchema } from "../../utils/validationSchemas";
import type { PlanSelectionFormData } from "../../utils/validationSchemas";

import { PlanType, PLANS } from "../../features/policyWizard/types";
import { isGoldPlanAvailable } from "../../utils/priceCalculations";

import Select from "../common/Select/Select";
import { Button } from "../common/Button/Button";

const Step2PlanSelection = () => {
  const dispatch = useAppDispatch();
  const { personalDetails, planSelection } = useAppSelector(
    (state) => state.policyWizard
  );

  const isGoldDisabled = !isGoldPlanAvailable(personalDetails.age);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<PlanSelectionFormData>({
    resolver: yupResolver(planSelectionSchema),
    mode: "onChange",
    defaultValues: {
      planType: planSelection.planType || undefined,
    },
  });

  const selectedPlanType = watch("planType") as PlanType | undefined;
  const selectedPlan = selectedPlanType ? PLANS[selectedPlanType] : null;

  useEffect(() => {
    if (selectedPlanType) {
      const premium = calculatePremium(selectedPlanType, personalDetails.age);

      dispatch(
        updatePlanSelection({
          planType: selectedPlanType,
          estimatedPrice: premium,
        })
      );
    }
  }, [selectedPlanType, personalDetails.age, dispatch]);

  useEffect(() => {
    if (isGoldDisabled && planSelection.planType === PlanType.GOLD) {
      setValue("planType", undefined, { shouldValidate: true });
      dispatch(updatePlanSelection({ planType: null }));
    }
  }, [isGoldDisabled, planSelection.planType, setValue, dispatch]);

  const onSubmit = (data: PlanSelectionFormData) => {
    dispatch(updatePlanSelection({ planType: data.planType as PlanType }));
    dispatch(goToNextStep());
  };

  const planOptions = Object.values(PlanType).map((type) => ({
    value: type,
    label: PLANS[type].label,
    description: PLANS[type].description,
    disabled: type === PlanType.GOLD && isGoldDisabled,
  }));

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Select Your Plan</h2>
        <p className="text-gray-600 mt-3">
          Choose the insurance plan that best fits your needs.
        </p>

        {isGoldDisabled && (
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800">
            Gold plan is available only for age 30+. Your age:{" "}
            <strong>{personalDetails.age}</strong>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Select
              label="Choose a Plan"
              options={planOptions}
              {...register("planType")}
              error={errors.planType?.message}
              required
              placeholder="Select your insurance plan"
            />

            {selectedPlan && (
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-semibold text-blue-900 mb-3">
                  Plan Features
                </h4>
                <ul className="list-disc list-inside text-blue-800 space-y-2">
                  <li>Comprehensive medical coverage</li>
                  <li>24/7 customer support</li>
                  <li>Cashless hospital network</li>
                </ul>
              </div>
            )}
          </div>

          {selectedPlan && (
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-2 text-center">
                {selectedPlan.label}
              </h3>
              <p className="text-blue-200 text-center mb-6">
                {selectedPlan.description}
              </p>

              <div className="text-center mb-6">
                <div className="text-5xl font-bold">
                  ${planSelection.estimatedPrice.toFixed(2)}
                </div>
                <div className="text-blue-200">per month</div>
              </div>

              <div className="bg-blue-500/20 rounded-xl p-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-blue-200">Base Price</div>
                  <div className="font-semibold">${selectedPlan.basePrice}</div>
                </div>
                <div>
                  <div className="text-blue-200">Age Factor</div>
                  <div className="font-semibold">
                    {personalDetails.age <= 25
                      ? "1.0x"
                      : personalDetails.age <= 40
                      ? "1.2x"
                      : personalDetails.age <= 60
                      ? "1.5x"
                      : "2.0x"}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-gray-200 flex justify-between">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => dispatch(goToPreviousStep())}
          >
            Back
          </Button>

          <Button type="submit" size="lg" disabled={!isValid}>
            Continue to Review
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Step2PlanSelection;
