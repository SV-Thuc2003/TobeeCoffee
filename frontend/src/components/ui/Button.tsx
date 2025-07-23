import React from "react";

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: "primary" | "outline" | "social" | "secondary";
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  variant = "primary",
  fullWidth = false,
}) => {
  const baseStyles =
    "text-xl font-medium rounded-lg flex items-center justify-center cursor-pointer transition duration-200 disabled:cursor-not-allowed disabled:opacity-50";

  const variantStyles: Record<string, string> = {
    primary: "bg-[#4B2E2B] text-[#FBEEC1] border border-[#4B2E2B] hover:bg-[#3a211e]",
    outline: "border border-[#d9d9d9] text-[#4B2E2B] bg-white hover:bg-[#FBEEC1]",
    social: "border border-[#d9d9d9] text-black bg-white hover:bg-[#f3f3f3]",
    secondary: "bg-[#FFD580] text-black hover:bg-[#fcd267]",
  };

  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
