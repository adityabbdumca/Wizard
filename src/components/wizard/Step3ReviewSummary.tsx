import { toast, ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  goToPreviousStep,
  resetForm,
} from "../../features/policyWizard/policyWizardSlice";
import { PlanType, PLANS } from "../../features/policyWizard/types";
import { calculateAgeFactor } from "../../utils/priceCalculations";
import { Button } from "../common/Button/Button";
import { User, ShieldCheck, CheckCircle, ArrowLeft, Check } from "lucide-react";

const Step3ReviewSummary = () => {
  const dispatch = useAppDispatch();
  const { personalDetails, planSelection, isLoading } = useAppSelector(
    (state) => state.policyWizard
  );

  const handleSubmit = () => {
    console.log("Personal Details:", personalDetails);
    console.log("Selected Plan:", planSelection);

    toast.success(
      "Application submitted successfully! Check console for details."
    );
    setTimeout(() => {
      dispatch(resetForm());
    }, 1000);
  };

  const handleBack = () => {
    dispatch(goToPreviousStep());
  };

  const handleStartOver = () => {
    if (
      window.confirm(
        "Are you sure you want to start over? All data will be lost."
      )
    ) {
      dispatch(resetForm());
    }
  };

  if (!planSelection.planType) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          No Plan Selected
        </h2>
        <p className="text-gray-600 mb-8">
          Please go back and select a plan to continue.
        </p>
        <Button onClick={handleBack} variant="outline">
          Go Back
        </Button>
      </div>
    );
  }

  const selectedPlan = PLANS[planSelection.planType as PlanType];
  const ageFactor = calculateAgeFactor(personalDetails.age);

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Review Your Application
        </h2>
        <p className="text-gray-600 mt-3">
          Please review all the information below before submitting your
          application.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <User className="w-6 h-6 mr-3 text-blue-600" />
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="text-sm text-gray-500">Full Name</div>
                <div className="text-lg font-semibold text-gray-900">
                  {personalDetails.name}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-gray-500">Age</div>
                <div className="text-lg font-semibold text-gray-900">
                  {personalDetails.age} years
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <div className="text-sm text-gray-500">Email Address</div>
                <div className="text-lg font-semibold text-gray-900">
                  {personalDetails.email}
                </div>
              </div>
            </div>
          </div>

          {/* Plan Details Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <ShieldCheck className="w-6 h-6 mr-3 text-blue-600" />
              Selected Plan
            </h3>

            <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                  <h4 className="text-2xl font-bold text-gray-900">
                    {selectedPlan.label}
                  </h4>
                  <p className="text-gray-600">{selectedPlan.description}</p>
                </div>
                <div className="mt-4 md:mt-0 text-center">
                  <div className="text-4xl font-bold text-blue-700">
                    ${planSelection.estimatedPrice.toFixed(2)}
                  </div>
                  <div className="text-gray-600">per month</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-500 mb-1">Base Price</div>
                  <div className="font-semibold">${selectedPlan.basePrice}</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-500 mb-1">Age Factor</div>
                  <div className="font-semibold">{ageFactor}x</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-500 mb-1">Plan Type</div>
                  <div className="font-semibold">{selectedPlan.type}</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-500 mb-1">Status</div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Ready
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          <div className="bg-linear-to-b from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-bold mb-6">Premium Summary</h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-blue-500/30">
                <span>Base Premium</span>
                <span className="font-semibold">${selectedPlan.basePrice}</span>
              </div>

              <div className="flex justify-between items-center pb-4 border-b border-blue-500/30">
                <span>Age Adjustment ({ageFactor}x)</span>
                <span className="font-semibold">
                  +${(selectedPlan.basePrice * (ageFactor - 1)).toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-blue-500/30">
                <span className="text-lg">Monthly Total</span>
                <span className="text-2xl font-bold">
                  ${planSelection.estimatedPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h4 className="font-semibold text-gray-900 mb-4">
              Important Notes
            </h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 text-green-500 mt-0.5 shrink-0" />
                Premium is calculated based on your current age
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 text-green-500 mt-0.5 shrink-0" />
                Coverage begins immediately after submission
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 text-green-500 mt-0.5 shrink-0" />
                30-day money-back guarantee
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              type="button"
              variant="ghost"
              onClick={handleStartOver}
              className="cursor-pointer"
            >
              Start Over
            </Button>
            <Button
              type="button"
              className="cursor-pointer"
              variant="outline"
              onClick={handleBack}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Plan Selection
            </Button>
          </div>

          <Button
            type="button"
            size="xl"
            className="min-w-[240px] cursor-pointer"
            onClick={handleSubmit}
            loading={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Application"}
            {!isLoading && <Check className="ml-2 w-5 h-5" />}
          </Button>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Step3ReviewSummary;
