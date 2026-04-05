import Nav from "@/components/dashboard/Nav";
import { useAuth } from "@/hooks/useAuth";
import { auth, onAuthStateChanged } from "@/services/firebase";
import { Outlet, useNavigate } from "react-router-dom";

function DashboardLayout() {
  const { signout } = useAuth();
  const navigate = useNavigate();
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      await signout();
      navigate("/");
    }
  });
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
