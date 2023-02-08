"use client";

import { signout } from "@/lib/api";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { LogOut } from "react-feather";
import Button from "../button/Button";

const LogoutButton: FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signout();
    setTimeout(() => {
      router.replace("/auth");
    }, 100);
  };

  return (
    <Button intent={"text"} onClick={handleLogout}>
      <div className="p-2 flex flex-nowrap">
        <span className="mr-4">Daniel Pena</span>
        <LogOut />
      </div>
    </Button>
  );
};

export default LogoutButton;
