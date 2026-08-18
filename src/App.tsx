import { useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import Hidden from "./components/Hidden";
import Footer from "./components/Footer";
import AppRoutes from "./components/AppRoutes";
import ScrollToTop from "./components/ScrollToTop";
import "./styles/app.css";

function App() {
  const [hamburger, setHamburger] = useState(false);

  function handleOpen(state: boolean) {
    setHamburger(state);
  }

  return (
    <div className="app-container">
      <Analytics />
      <Navbar openFunc={handleOpen} />
      <Hidden isOpen={hamburger} />
      <ScrollToTop />
      <AppRoutes />
      <Footer />
    </div>
  );
}

export default App;
