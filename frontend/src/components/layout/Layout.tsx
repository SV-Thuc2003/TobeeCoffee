import { Header } from "./Header";
import { Footer } from "./Footer";
// import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";

// interface LayoutProps {
//   children: ReactNode;
// }

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* <main className="flex-1 px-4 py-6 max-w-5xl mx-auto w-full">{children}</main> */}
      {/* <main className="flex-1 px-4 py-6 max-w-5xl mx-auto w-full">
        <Outlet /> 
      </main> */}
      <main className="flex-grow">
        <Outlet /> {/* Route con sẽ render ở đây */}
      </main>
      <Footer />
    </div>
  );
};
