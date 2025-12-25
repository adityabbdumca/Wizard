import React from "react";
import { useAppSelector } from "../../app/hooks";
import Stepper from "../common/Stepper/stepper";
import Step1PersonalDetails from "./Step1PersonalDetails";
import Step2PlanSelection from "./Step2PlanSelection";
import Step3ReviewSummary from "./Step3ReviewSummary";

const steps = [
  { number: 1, title: "Personal Details", description: "Basic information" },
  { number: 2, title: "Plan Selection", description: "Choose your plan" },
  { number: 3, title: "Review", description: "Confirm details" },
];

const PolicyWizard: React.FC = () => {
  const { currentStep } = useAppSelector((state) => state.policyWizard);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1PersonalDetails />;
      case 2:
        return <Step2PlanSelection />;
      case 3:
        return <Step3ReviewSummary />;
      default:
        return <Step1PersonalDetails />;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Dynamic Policy Wizard
          </h1>
          <p className="text-lg text-gray-600">
            Get your personalized insurance quote in just 3 simple steps
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-200">
            <Stepper steps={steps} currentStep={currentStep} />
          </div>

          <div className="p-8">{renderStep()}</div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>
            Your information is securely stored and never shared with third
            parties.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PolicyWizard;
