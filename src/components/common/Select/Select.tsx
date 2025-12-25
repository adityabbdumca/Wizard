import { forwardRef } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { cva, type VariantProps } from "class-variance-authority";

const selectVariants = cva(
  "w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed appearance-none bg-no-repeat bg-[right_1rem_center] bg-[length:1.5em_1.5em]",
  {
    variants: {
      variant: {
        default:
          "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
        error:
          "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: SelectOption[];
  registration?: Partial<UseFormRegisterReturn>;
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, options, registration, ...props }, ref) => {
    const variant = error ? "error" : "default";

    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-900">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <select
          className={`
            ${selectVariants({ variant, className })}
            placeholder:text-gray-400
          `}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          }}
          ref={ref}
          {...registration}
          {...props}
        >
          <option value="" className="text-gray-400">
            {props.placeholder || "Select an option"}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className={
                option.disabled ? "text-gray-400 bg-gray-50" : "text-gray-900"
              }
              title={option.description}
            >
              {option.label}
            </option>
          ))}
        </select>

        {(error || hint) && (
          <p className={`text-sm ${error ? "text-red-600" : "text-gray-500"}`}>
            {error || hint}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
