import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import AOS from "aos";
import "aos/dist/aos.css";
import Auth from "./pages/Auth";
import DashboardLayout from "./layout/DashboardLayout";
import Index from "./pages/dashboard/Index";
import Ideas from "./pages/dashboard/Ideas";
import TimeLine from "./pages/dashboard/TimeLine";
import LoveLetter from "./pages/dashboard/loveMail/LoveLetter";
import DateDetails from "./pages/dates/DateDetails";
import Dates from "./pages/dates/Dates";
import ProtectedRoute from "./route/ProtectedRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [location]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="!w-auto max-w-[90vw] sm:max-w-sm right-2 left-auto"
        toastClassName={() =>
          "rounded-xl px-4 py-3 text-sm w-fit max-w-xs bg-neutral-900 text-white shadow-lg border border-white/10"
        }
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Index />} />
            <Route path="dates" element={<Dates />} />
            <Route path="dates/:id" element={<DateDetails />} />

            <Route path="ideas" element={<Ideas />} />
            <Route path="timeline" element={<TimeLine />} />
            <Route path="loveletters" element={<LoveLetter />} />
          </Route>
        </Route>

        <Route
          path="*"
          element={
            <div className="bg-background text-7xl flex items-center h-screen justify-center">
              404 Page does not exist
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
