import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { tlink } from "../utils/tenant";
import { useLang } from "../utils/i18n";

function AdminPanel() {
  const { t } = useLang();
  const user = useSelector(
    (state: { user: { email?: string | null } }) => state.user
  );

  return (
    <section className="home admin-panel">
      <h2>{t("admin.title")}</h2>
      <p className="admin-panel__user">Logged in as: {user.email}</p>
      <div className="admin-panel__links">
        <Link to={tlink("/jobs")} className="button">
          {t("admin.jobs")}
        </Link>
        <Link to={tlink("/gallery")} className="button">
          {t("admin.gallery")}
        </Link>
      </div>
    </section>
  );
}

export default AdminPanel;