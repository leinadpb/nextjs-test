import { FC } from "react";

const Card: FC<any> = ({ children }) => {
  return (
    <div className="rounded bg-white shadow-sm p-4 min-w-middle">
      {children}
    </div>
  );
};

export default Card;
