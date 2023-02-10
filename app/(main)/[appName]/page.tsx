import Button from "@/components/button/Button";
import Card from "@/components/card/Card";
import Heading from "@/components/heading/Heading";
import { getUserFromCookie } from "@/lib/auth";
import { parseValueBaseOnType } from "@/lib/common";
import { db } from "@/lib/db";
import { KpiType } from "@prisma/client";
import { cookies } from "next/headers";
import { RotateCw } from "react-feather";

const getAppDetails = async (appName: string) => {
  const user = await getUserFromCookie(cookies());
  if (!user) {
    // @todo logout
    throw new Error("Invalid user token.");
  }

  const app = await db.app.findUnique({
    where: {
      name: appName,
    },
  });
  const kpis = await db.kpi.findMany({
    where: {
      appName: app?.name,
    },
  });

  return {
    app,
    kpis,
  };
};

const AppDetailPage = async ({ params }: any) => {
  const resp = await getAppDetails(
    params?.appName?.toUpperCase()?.trim() ?? ""
  );

  const app = resp.app;
  const kpis = resp.kpis;

  if (!app) {
    return (
      <div>
        <Heading type={"h3"}>APP was not found</Heading>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12">
      <Card className="flex justify-between items-center">
        <div className="p-2">
          <Heading>{app.name}</Heading>
        </div>
        <div className="flex flex-col p-2 items-center justify-center">
          <span className="text-xs font-thin font-mono text-gray-700">
            Last Refresh
          </span>
          <span className="text-xs font-thin font-mono italic text-gray-400">
            2023-01-01
          </span>
        </div>
        <div className="p-2">
          <Button intent={"text"}>
            <div className="flex items-center justify-center">
              <span className="text-xs mr-1">Refetch</span>
              <RotateCw size={12} />
            </div>
          </Button>
        </div>
      </Card>
      <div className="p-2">
        <Heading>KPI's</Heading>
        <div className="flex flex-col gap-4 mt-4">
          {!kpis?.length && (
            <span className="text-gray-500 italic">No KPIs to show.</span>
          )}
          {kpis.map((kpi) => {
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
      </div>
    </div>
  );
};

export default AppDetailPage;
