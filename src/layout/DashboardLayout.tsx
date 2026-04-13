import SidePanel from "@/components/base/SidePanel";
import TopNavBar from "@/components/base/TopNavBar";
import Nav from "@/components/dashboard/Nav";
import NotificationTab from "@/components/dashboard/NotificationTab";
import { useAuth } from "@/hooks/useAuth";
import { useIdeas } from "@/hooks/useIdeas";
import { useMails } from "@/hooks/useMails";
import { useMoments } from "@/hooks/useMoments";
import { auth, onAuthStateChanged } from "@/services/firebase";
import { useStore } from "@/store/Store";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function DashboardLayout() {
  const { signout } = useAuth();
  const { getAllDates, getUserNotifications } = useMoments();
  const { fetchMails } = useMails();
  const { getSavedIdeas } = useIdeas();
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
    await fetchMails();

    getUserNotifications();
    await getSavedIdeas();
  };

  useEffect(() => {
    handlefetch();
  }, [currentUser?.userid]);
  const [showNotification, setShowNotification] = useState(false);

  return (
    <main className="bg-background min-h-screen">
      <div className="md:hidden mb-14">
        <TopNavBar
          setShowNotification={setShowNotification}
          showNotification={showNotification}
        />
      </div>
      <SidePanel
        className="bg-background"
        onClose={() => setShowNotification(false)}
        open={showNotification}
      >
        <NotificationTab />
      </SidePanel>

      <div className="grid grid-cols-4">
        <div className="md:col-span-1 col-span-4">
          <Nav />
        </div>

        <div className="md:col-span-3 col-span-4 p-8 md:mb-0 mb-20">
          <Outlet />
        </div>
      </div>
    </main>
  );
}

export default DashboardLayout;
