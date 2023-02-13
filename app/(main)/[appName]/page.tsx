import AppDetailHeader from "@/components/app-detail-header/AppDetailHeader";
import Heading from "@/components/heading/Heading";
import KpiList from "@/components/kpi-list/KpiList";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

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

  if (!app) {
    return (
      <div>
        <Heading type={"h3"}>APP was not found</Heading>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-12">
        <AppDetailHeader
          appName={app.name}
          lastRefresh={app.lastRefresh?.toString()}
          mainUrl={app.mainUrl}
        />
        <div className="p-2">
          <Heading>KPI's</Heading>
          <KpiList appName={app.name} />
        </div>
      </div>
    </>
  );
};

export default AppDetailPage;
