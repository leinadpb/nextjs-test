import Heading from "../heading/Heading";
import LogoutButton from "../logout-btn/LogoutButton";
import { cookies } from "next/headers";
import { delay } from "@/lib/async";
import { getUserFromCookie } from "@/lib/auth";
import Link from "next/link";

const getUserInfo = async () => {
  await delay(2);

  const user = await getUserFromCookie(cookies());

  if (!user) {
    throw new Error("User was not found.");
  }

  return user;
};

const AppHeader = async () => {
  const userData = await getUserInfo();

  return (
    <>
      <Link
        href={"/"}
        className="h-full text-center flex items-center justify-center"
      >
        <Heading>Business Warriors APPS</Heading>
      </Link>
      <LogoutButton
        firstname={userData.firstName}
        lastname={userData.lastName}
      />
    </>
  );
};

export default AppHeader;
