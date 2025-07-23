import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      placeholder,
      type = "text",
      error,
      required = false,
      className = "",
      ...rest
    },
    ref
  ) => {
    return (
      <div className={`flex flex-col gap-y-1 ${className}`}>
        {label && (
          <label
            htmlFor={rest.name}
            className="text-lg font-medium text-[#4B2E2B] mb-1"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          id={rest.name}
          type={type}
          placeholder={placeholder}
          ref={ref}
          required={required}
          autoComplete={rest.autoComplete || "off"}
          className={`w-full h-[40px] px-3 py-2 text-lg text-[#4B2E2B] border ${
            error ? "border-red-500" : "border-[#d9d9d9]"
          } rounded-md focus:outline-none focus:border-[#4B2E2B] focus:ring-1 focus:ring-[#FFD580] transition-all duration-200`}
          aria-invalid={!!error}
          aria-describedby={error ? `${rest.name}-error` : undefined}
          {...rest}
        />
        {error && (
          <p id={`${rest.name}-error`} className="mt-1 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;


// import React from "react";

// interface InputFieldProps {
//   label?: string;
//   placeholder: string;
//   type?: string;
//   value?: string;
//   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   required?: boolean;
//   name?: string;
//   className?: string;
//   error?: string;
//   onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
//   autoComplete?: string;
// }

// const InputField: React.FC<InputFieldProps> = ({
//   label,
//   placeholder,
//   type = "text",
//   value,
//   onChange,
//   required = false,
//   name,
//   className = "",
//   error,
//   onKeyDown,
//   autoComplete = "off",
// }) => {
//   return (
//     <div className={`flex flex-col gap-y-1 ${className}`}>
//       {label && (
//         <label htmlFor={name} className="text-lg font-medium text-[#4B2E2B] mb-1">
//           {label}
//           {required && <span className="text-red-500 ml-1">*</span>}
//         </label>
//       )}
//       <input
//         id={name}
//         type={type}
//         name={name}
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//         onKeyDown={onKeyDown}
//         required={required}
//         autoComplete={autoComplete}
//         className={`w-full h-[40px] px-3 py-2 text-lg text-[#4B2E2B] border ${
//           error ? "border-red-500" : "border-[#d9d9d9]"
//         } rounded-md focus:outline-none focus:border-[#4B2E2B] focus:ring-1 focus:ring-[#FFD580] transition-all duration-200`}
//         aria-invalid={!!error}
//         aria-describedby={error ? `${name}-error` : undefined}
//       />
//       {error && (
//         <p id={`${name}-error`} className="mt-1 text-sm text-red-500">
//           {error}
//         </p>
//       )}
//     </div>
//   );
// };

// export default InputField;

