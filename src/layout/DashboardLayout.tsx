import Nav from "@/components/dashboard/Nav";
import { useAuth } from "@/hooks/useAuth";
import { useMoments } from "@/hooks/useMoments";
import { auth, onAuthStateChanged } from "@/services/firebase";
import { useStore } from "@/store/Store";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function DashboardLayout() {
  const { signout } = useAuth();
  const { getAllDates, getUserNotifications } = useMoments();
  const { currentUser } = useStore();

  const navigate = useNavigate();

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      await signout();
      navigate("/");
    }
  });

  const handlefetch = async () => {
    if (!currentUser?.userid) return;

    await getAllDates();
    getUserNotifications();
  };

  useEffect(() => {
    handlefetch();
  }, [currentUser?.userid]);

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
