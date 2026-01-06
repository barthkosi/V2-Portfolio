import { Outlet } from "react-router-dom";
import Nav from "./Nav";

export default function PageLayoutFull() {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div className="absolute top-0 left-0 w-full z-10">
                <Nav />
            </div>
            <main className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                <Outlet />
            </main>
        </div>
    );
}



