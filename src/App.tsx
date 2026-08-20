import { useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import Hidden from "./components/Hidden";
import Footer from "./components/Footer";
import AppRoutes from "./components/AppRoutes";
import ScrollToTop from "./components/ScrollToTop";
import { LangProvider } from "./utils/i18n";
import "./styles/app.sass";

function App() {
  const [hamburger, setHamburger] = useState(false);

  function handleOpen(state: React.SetStateAction<boolean>) {
    setHamburger(state);
  }

  return (
    <LangProvider>
      <div className="app-container">
        <Analytics />
        <Navbar open={hamburger} setOpen={handleOpen} />
        <Hidden isOpen={hamburger} onNavigate={() => setHamburger(false)} />
        <ScrollToTop />
        <AppRoutes />
        <Footer />
      </div>
    </LangProvider>
  );
}

export default App;
