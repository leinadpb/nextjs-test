import clsx from "clsx";
import { FC } from "react";

type CardProps = {
  className?: string;
  children: React.ReactNode;
};
const Card: FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={clsx("rounded bg-white shadow-sm p-4 min-w-middle", className)}
    >
      {children}
    </div>
  );
};

export default Card;
