import SidePanel from "@/components/base/SidePanel";
import TopNavBar from "@/components/base/TopNavBar";
import Nav from "@/components/dashboard/Nav";
import NotificationTab from "@/components/dashboard/NotificationTab";
import { useIdeas } from "@/hooks/useIdeas";
import { useMails } from "@/hooks/useMails";
import { useMoments } from "@/hooks/useMoments";
import { auth, onAuthStateChanged } from "@/services/firebase";
import { useStore } from "@/store/Store";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function DashboardLayout() {
  const { getAllDates, getUserNotifications } = useMoments();
  const { fetchMails } = useMails();
  const { getSavedIdeas } = useIdeas();
  const { currentUser, resetUser } = useStore();

  const navigate = useNavigate();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (!user || user.uid !== currentUser?.userid) {
        resetUser();
        navigate("/");
      }
    });
  }, [currentUser?.userid]);

  useEffect(() => {
    if (!currentUser?.userid) return;

    const unsubscribers = [
      getAllDates(),
      fetchMails(),
      getUserNotifications(),
      getSavedIdeas(),
    ];

    return () => unsubscribers.forEach((unsubscribe) => unsubscribe());
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

        <div className="md:col-span-3 col-span-4 sm:p-8 p-4 md:mb-0 mb-20">
          <Outlet />
        </div>
      </div>
    </main>
  );
}

export default DashboardLayout;
