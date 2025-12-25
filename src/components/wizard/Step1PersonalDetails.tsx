import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { User, Clock, Mail, ArrowRight } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  updatePersonalDetails,
  goToNextStep,
} from "../../features/policyWizard/policyWizardSlice";

import { personalDetailsSchema } from "../../utils/validationSchemas";
import type { PersonalDetailsFormData } from "../../utils/validationSchemas";

import Input from "../common/Input/Input";
import { Button } from "../common/Button/Button";

const Step1PersonalDetails = () => {
  const dispatch = useAppDispatch();
  const { personalDetails } = useAppSelector((state) => state.policyWizard);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<PersonalDetailsFormData>({
    resolver: yupResolver(personalDetailsSchema),
    mode: "onChange",
    defaultValues: personalDetails,
  });

  useEffect(() => {
    reset(personalDetails);
  }, [personalDetails, reset]);

  const onSubmit = (data: PersonalDetailsFormData) => {
    dispatch(updatePersonalDetails(data));
    dispatch(goToNextStep());
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Personal Details</h2>
        <p className="text-gray-600 mt-3">
          Let's start with your basic information. All fields are required.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Input
              label="Full Name"
              placeholder="Name"
              {...register("name")}
              error={errors.name?.message}
              required
              leftIcon={<User className="w-5 h-5" />}
            />

            <Input
              label="Age"
              type="number"
              placeholder="25"
              {...register("age", { valueAsNumber: true })}
              error={errors.age?.message}
              required
              min={18}
              max={90}
              hint="Must be between 18 and 90"
              leftIcon={<Clock className="w-5 h-5" />}
            />
          </div>

          <div>
            <Input
              label="Email Address"
              type="email"
              placeholder="xyz@example.com"
              {...register("email")}
              error={errors.email?.message}
              required
              leftIcon={<Mail className="w-5 h-5" />}
            />
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <div className="flex justify-end">
            <Button
              type="submit"
              size="lg"
              className="min-w-[200px] flex items-center justify-center gap-2"
              disabled={!isValid || !isDirty}
            >
              Continue to Plan Selection
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Step1PersonalDetails;
