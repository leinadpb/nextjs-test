import { FC } from "react";
import AppItemsSkeleton from "./AppItemSkeleton";

const AppList: FC = () => {
  return (
    <div className="flex flex-wrap">
      <AppItemsSkeleton />
    </div>
  );
};

export default AppList;
