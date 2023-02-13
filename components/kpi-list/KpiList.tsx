"use client";

import { getKpis } from "@/lib/api";
import { parseValueBaseOnType } from "@/lib/common";
import { Kpi } from "@prisma/client";
import { FC, useEffect, useState } from "react";
import Card from "../card/Card";
import Heading from "../heading/Heading";

type KpiListProps = {
  appName: string;
};
const KpiList: FC<KpiListProps> = ({ appName }) => {
  const [kpis, setKpis] = useState<Kpi[]>();

  const onGet = async () => {
    const resp = await getKpis(appName);
    setKpis(resp);
  };

  useEffect(() => {
    onGet();
  }, []);

  return (
    <div className="flex flex-col gap-4 mt-4">
      {!kpis ? (
        <span className="text-gray-500 italic">Loading...</span>
      ) : (
        !kpis?.length && (
          <span className="text-gray-500 italic">No KPIs to show.</span>
        )
      )}
      {(kpis ?? []).map((kpi) => {
        return (
          <div
            key={kpi.id}
            className={"flex justify-between items-center gap-2"}
          >
            <Card className={"w-8/12"}>
              <Heading>{kpi.desc}</Heading>
            </Card>
            <Card className={"w-4/12"}>
              <Heading type={"h5"}>
                {parseValueBaseOnType(kpi.value, kpi.type)}
              </Heading>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default KpiList;
