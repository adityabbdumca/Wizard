import * as yup from "yup";

export const personalDetailsSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .matches(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"),

  age: yup
    .number()
    .typeError("Age must be a number")
    .required("Age is required")
    .min(18, "You must be at least 18 years old")
    .max(90, "Maximum age is 90")
    .integer("Age must be a whole number"),

  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Invalid email format"
    ),
});

export const planSelectionSchema = yup.object({
  planType: yup
    .string()
    .required("Please select a plan")
    .oneOf(["GOLD", "SILVER", "BRONZE"], "Invalid plan selected"),
});

export type PersonalDetailsFormData = yup.InferType<
  typeof personalDetailsSchema
>;
export type PlanSelectionFormData = yup.InferType<typeof planSelectionSchema>;
