"use client";

import Card from "../card/Card";
import Heading from "../heading/Heading";
import { Activity } from "react-feather";
import Link from "next/link";

type AppListItemProps = {
  name: string;
};
const AppListItem: React.FC<AppListItemProps> = ({ name }) => {
  return (
    <Link href={`/${name?.toLocaleLowerCase()?.trim()}`}>
      <Card
        className={
          "p-2 m-4 transform transition duration-200 hover:scale-110 hover:cursor-pointer"
        }
      >
        <div className="w-full flex justify-between items-center">
          <Heading type={"h4"} className={"font-semibold"}>
            {name}
          </Heading>
          <Activity />
        </div>
        <div className="mt-4">
          <span className={"font-thin font-mono from-neutral-400 text-xs"}>
            Last refresh: 2023-06-09
          </span>
        </div>
      </Card>
    </Link>
  );
};

export default AppListItem;
