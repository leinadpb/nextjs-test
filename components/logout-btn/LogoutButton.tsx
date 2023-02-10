"use client";

import { signout } from "@/lib/api";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { Loader, LogOut } from "react-feather";
import Button from "../button/Button";

type LogoutButtonProps = {
  firstname: string;
  lastname: string;
};
const LogoutButton: FC<LogoutButtonProps> = ({ firstname, lastname }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signout();
      setTimeout(() => {
        router.replace("/auth");
      }, 100);
    } catch (e: any) {
      console.error(e);
    }
  };

  return (
    <Button intent={"text"} onClick={handleLogout} loading={loading}>
      <div className="p-2 flex flex-nowrap">
        <span className="mr-4">{`${firstname} ${lastname}`}</span>
        <LogOut />
      </div>
    </Button>
  );
};

export default LogoutButton;
