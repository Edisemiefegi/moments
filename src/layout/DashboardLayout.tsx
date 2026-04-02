import Nav from "@/components/dashboard/Nav";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <main className="bg-background grid grid-cols-4">
      <div className="md:col-span-1  col-span-4">
        <Nav />
      </div>
      <div className=" w-full md:col-span-3 col-span-4 p-8 md:mb-0 mb-20">
        <Outlet />
      </div>
    </main>
  );
}

export default DashboardLayout;
