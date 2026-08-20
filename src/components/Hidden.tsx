import { Link } from "react-router-dom";
import { tlink } from "../utils/tenant";
import { useLang } from "../utils/i18n";

function Hidden({
  isOpen,
  onNavigate,
}: {
  isOpen: boolean;
  onNavigate: () => void;
}) {
  const { t } = useLang();

  return (
    <div className="menu">
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <Link to={tlink("/services")} onClick={onNavigate}>
          {t("nav.services")}
        </Link>
        <Link to={tlink("/jobs")} onClick={onNavigate}>
          {t("nav.jobs")}
        </Link>
        <Link to={tlink("/gallery")} onClick={onNavigate}>
          {t("nav.gallery")}
        </Link>
        <Link to={tlink("/location")} onClick={onNavigate}>
          {t("nav.location")}
        </Link>
      </ul>
    </div>
  );
}

export default Hidden;