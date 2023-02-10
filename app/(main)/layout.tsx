import "../globals.css";
import AppHeader from "@/components/app-header/AppHeader";
import { Suspense } from "react";
import AppHeaderSkeleton from "@/components/app-header/AppHeaderSkeleton";
import AppItemsSkeleton from "@/components/app-list/AppItemSkeleton";

const MainLayout: React.FC<any> = ({ children }) => {
  return (
    <html lang="en">
      <head />
      <body className="bg-slate-50">
        <div className="w-screen h-screen flex flex-col overflow-hidden">
          <div className="bg-white p-4 shadow w-full flex justify-between z-10">
            <Suspense fallback={<AppHeaderSkeleton />}>
              {/* @ts-expect-error Server Component https://beta.nextjs.org/docs/data-fetching/fetching */}
              <AppHeader />
            </Suspense>
          </div>
          <div className="p-24 w-full h-full overflow-y-auto">
            <Suspense fallback={<AppItemsSkeleton />}>{children}</Suspense>
          </div>
        </div>
      </body>
    </html>
  );
};

export default MainLayout;
