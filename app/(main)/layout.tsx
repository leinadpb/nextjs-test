import "../globals.css";
import Heading from "@/components/heading/Heading";
import LogoutButton from "@/components/logout-btn/LogoutButton";

const MainLayout: React.FC<any> = ({ children }) => {
  return (
    <html lang="en">
      <head />
      <body className="bg-slate-50">
        <div className="w-screen h-screen flex flex-col overflow-hidden">
          <div className="bg-white p-4 shadow w-full flex justify-between">
            <div className="h-full text-center flex items-center justify-center">
              <Heading>DANIEL Warriors APPS</Heading>
            </div>
            <LogoutButton />
          </div>
          <div className="p-24 w-full h-full">{children}</div>
        </div>
      </body>
    </html>
  );
};

export default MainLayout;
