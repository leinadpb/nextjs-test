import "../globals.css";

const AuthLayout: React.FC<any> = ({ children }) => {
  return (
    <html lang="en">
      <head />
      <body className="bg-slate-50">
        <div className="w-screen h-screen flex items-center justify-center ">
          {children}
        </div>
      </body>
    </html>
  );
};

export default AuthLayout;
