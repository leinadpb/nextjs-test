import { AppDto } from "@/lib/types";
import { FC } from "react";
import AppListItem from "./AppListItem";

type AppListProps = {
  items: AppDto[];
};
const AppList: FC<AppListProps> = ({ items }) => {
  return (
    <div className="flex flex-wrap">
      {items.map((item: AppDto) => (
        <AppListItem key={item.id} name={item.name} />
      ))}
    </div>
  );
};

export default AppList;
