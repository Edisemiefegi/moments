import Nav from "@/components/dashboard/Nav"
import { Outlet } from "react-router-dom"

function DashboardLayout() {


  return (
    <main className="bg-background ">
        <Nav/>
        <Outlet/>
    </main>
  )
}

export default DashboardLayout