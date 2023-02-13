"use client";
import { RotateCw } from "react-feather";
import { refetch } from "@/lib/api";
import { FC, useState } from "react";
import Button from "../button/Button";
import { Kpi } from "@prisma/client";

type RefetchButtonProps = {
  appName: string;
  onSuccess: (kpis: Kpi[]) => void;
  onError: (e: any) => void;
};
const RefetchButton: FC<RefetchButtonProps> = ({
  appName,
  onError,
  onSuccess,
}) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleRefetch = async () => {
    setLoading(true);
    try {
      const resp = await refetch(appName);
      console.log("resp", resp);
      onSuccess(resp as Kpi[]);
    } catch (e: any) {
      console.log(e);
      onError(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      intent={"text"}
      onClick={handleRefetch}
      loading={isLoading}
      disabled={isLoading}
    >
      <div className="flex items-center justify-center">
        <span className="text-xs mr-1">Refetch</span>
        <RotateCw size={12} className={isLoading ? "animate-spin" : ""} />
      </div>
    </Button>
  );
};

export default RefetchButton;
