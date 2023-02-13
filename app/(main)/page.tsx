import AppList from "@/components/app-list/AppList";
import Heading from "@/components/heading/Heading";
import { delay } from "@/lib/async";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

const getAppListItems = async () => {
  await delay(2);
  const user = await getUserFromCookie(cookies());
  if (!user) {
    // @todo logout
    throw new Error("Invalid user token.");
  }

  return await db.app.findMany();
};

const DashboardPage = async () => {
  const apps = await getAppListItems();

  console.log("apps", apps);

  if (!apps.length) {
    return (
      <div>
        <Heading type={"h3"}>No apps to show.</Heading>
      </div>
    );
  }

  return (
    <AppList
      items={apps.map((app) => ({
        id: app.id,
        name: app.name,
        lastRefresh: app.lastRefresh,
      }))}
    />
  );
};

export default DashboardPage;
