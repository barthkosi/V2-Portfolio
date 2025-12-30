import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

export default function HomePageLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Nav />
            <main className="flex-1 mx-auto max-w-[1440px] w-full min-h-screen">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
