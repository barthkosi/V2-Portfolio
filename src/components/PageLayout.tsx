import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

export default function PageLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-1 mx-auto max-w-[1440px] px-4 md:px-8 py-4 md:py-8 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
