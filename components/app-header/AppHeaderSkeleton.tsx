import { FC } from "react";
import Card from "../card/Card";

const AppHeaderSkeleton: FC = () => {
  return (
    <div className="w-full py-4">
      <div className="animate-pulse w-full flex justify-between items-center">
        <div className="m-3 h-1 w-32 rounded bg-gray-300"></div>
        <div className="m-3 h-1 w-32 rounded bg-gray-300"></div>
      </div>
    </div>
  );
};

export default AppHeaderSkeleton;
