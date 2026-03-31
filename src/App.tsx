import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import AOS from "aos";
import "aos/dist/aos.css";
import Auth from "./pages/Auth";

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
      <Route path="/auth" element={<Auth/>}/>
    </Routes>
  );
}

export default App;