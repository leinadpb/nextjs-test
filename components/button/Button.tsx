import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { FC } from "react";
import { Loader } from "react-feather";

const buttonClasses = cva(
  [
    "rounded",
    "font-semibold",
    "transition",
    "duration-200",
    "ease-in-out",
    "mt-1",
    "mb-1",
  ],
  {
    variants: {
      intent: {
        primary: [
          "bg-sky-700",
          "text-white",
          "border-transparent",
          "hover:bg-sky-600",
        ],
        secondary: [
          "bg-white",
          "text-black",
          "border-gray-400",
          "hover:bg-gray-100",
          "border-solid",
          "border-2",
          "border-gray-800",
        ],
        text: ["bg-transparent", "text-black", "hover:bg-gray-100"],
      },
      size: {
        small: ["text-md", "py-1", "px-2"],
        medium: ["text-lg", "px-6", "py-2"],
        large: ["text-xlg", "px-8", "py-4"],
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "medium",
    },
  }
);

export interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonClasses> {
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  avoidLoading?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  fullWidth = false,
  loading = false,
  disabled = false,
  avoidLoading = false,
  ...other
}) => {
  let className = clsx(
    fullWidth ? "w-full" : "",
    loading ? "animate-pulse" : ""
  );

  return (
    <button
      className={buttonClasses({ className })}
      disabled={disabled || (loading && !avoidLoading)}
      {...other}
    >
      {children}
    </button>
  );
};

export default Button;
