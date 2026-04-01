import Nav from "@/components/dashboard/Nav";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <main className="bg-background grid grid-cols-3">
      <div className="col-span-1  ">
        <Nav />
      </div>
      <div className=" w-full md:col-span-2 col-span-3">
        <Outlet />
      </div>
    </main>
  );
}

export default DashboardLayout;
