import clsx from "clsx";
import { HTMLInputTypeAttribute } from "react";

type InputProps = {
  label: string;
  id: string;
  required?: boolean;
  disabled?: boolean;
  type?: HTMLInputTypeAttribute;
};

const Input: React.FC<InputProps> = ({
  required = false,
  label,
  id,
  disabled = false,
  type = "text",
}) => {
  const _id = id;

  return (
    <div className="flex flex-col justify-start items-start p-0 w-full mt-4 mb-4">
      <label
        htmlFor={_id}
        className={clsx("w-full", required ? "required" : "")}
      >
        {label}
      </label>
      <input
        className={clsx("border bg-transparent rounded p-1 text-sm w-full")}
        id={_id}
        name={_id}
        disabled={disabled}
        type={type}
      />
    </div>
  );
};

export default Input;
