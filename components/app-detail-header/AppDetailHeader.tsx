"use client";
import { formatDate } from "@/lib/common";
import { Kpi } from "@prisma/client";
import { FC, useState } from "react";
import Card from "../card/Card";
import Heading from "../heading/Heading";
import RefetchButton from "../refetch-button/RefetchButton";

type AppDetailHeaderProps = {
  appName: string;
  lastRefresh?: string;
  mainUrl: string;
};
const AppDetailHeader: FC<AppDetailHeaderProps> = ({
  appName,
  lastRefresh,
  mainUrl,
}) => {
  const [error, setError] = useState<string>();

  return (
    <Card>
      <div className="flex justify-between items-center">
        <div className="p-2">
          <Heading className={error ? "text-red-600" : ""}>{appName}</Heading>
        </div>
        <div className="flex flex-col p-2 items-center justify-center">
          <span className="text-xs font-thin font-mono text-gray-700">
            Last Refresh
          </span>
          <span className="text-xs font-thin font-mono italic text-gray-400">
            {lastRefresh ? <span>{formatDate(lastRefresh)}</span> : "N/A"}
          </span>
        </div>
        <div className="p-2">
          <RefetchButton
            appName={appName}
            onError={(e: any) =>
              setError(e.message ?? "Ups, an error has occurred.")
            }
            onSuccess={(kpis: Kpi[]) => {
              setError(undefined);
            }}
          />
        </div>
      </div>
      <div className="p-2">
        <span className="italic text-sm">GET - {mainUrl}</span>
      </div>
      {error && (
        <div className="p-2 border-t-2 border-t-red-500">
          <span className="italic text-sm">{error}</span>
        </div>
      )}
    </Card>
  );
};

export default AppDetailHeader;
