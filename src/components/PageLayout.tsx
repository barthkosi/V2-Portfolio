import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

export default function PageLayout() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <Nav />
      <main className="flex-1 mx-auto max-w-[1440px] p-4 md:p-8 w-full min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
