import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import AOS from "aos";
import "aos/dist/aos.css";
import Auth from "./pages/Auth";
import DashboardLayout from "./layout/DashboardLayout";
import Index from "./pages/dashboard/Index";
import Dates from "./pages/dashboard/Dates";
import Ideas from "./pages/dashboard/Ideas";
import TimeLine from "./pages/dashboard/TimeLine";
import LoveLetter from "./pages/dashboard/LoveLetter";

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
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Index />} />
        <Route path="dates" element={<Dates />} />
        <Route path="ideas" element={<Ideas />} />
        <Route path="timeline" element={<TimeLine />} />
        <Route path="loveletters" element={<LoveLetter />} />
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
  );
}

export default App;
