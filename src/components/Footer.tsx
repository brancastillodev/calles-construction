import { Link } from "react-router-dom";
import { setUser } from "../state/userState";
import { useDispatch, useSelector } from "react-redux";
import { clearSession } from "../utils/auth";
import { alerts } from "../utils/alerts";
import { tlink } from "../utils/tenant";
import { useLang } from "../utils/i18n";
import one from "../assets/1.svg";
import two from "../assets/2.svg";
import three from "../assets/3.svg";
import fourth from "../assets/5.svg";
import five from "../assets/4.svg";
import six from "../assets/6.svg";

export default function Footer() {
  const dispatch = useDispatch();
  const { t } = useLang();
  const user = useSelector((state: { user: { id?: string } }) => state.user);
  const tenant = useSelector(
    (state: {
      tenant: { telefono: string; email: string; nombre: string };
    }) => state.tenant
  );

  const telefono = tenant.telefono || "3476242525";
  const email = tenant.email || "callesconstruction86@gmail.com";
  const nombre = tenant.nombre || "Calle'$ Construction";

  function handleLogout() {
    const noUser = {
      id: null,
      email: null,
    };
    clearSession();
    dispatch(setUser(noUser));
    alerts("Bye!", "You logged out successfully", "info");
  }

  return (
    <footer id="contact">
      <div className="credits">
        <div className="contact">
          <div className="line">
            <img src={one} />
            <p>{t("footer.contact")}</p>
          </div>
          <div className="line">
            <img src={two} />
            <a href={`tel:${telefono}`}>
              <p>{telefono}</p>
            </a>
          </div>
          <div className="line">
            <img src={three} />
            <a href={`mailto:${email}`}>
              <p>{email}</p>
            </a>
          </div>
        </div>
        <div className="contact">
          <div className="line">
            <img src={fourth} />
            <p>Jan, 2025</p>
          </div>
          <div className="line">
            <img src={five} />
            <p>{nombre}</p>
          </div>
          <div className="line">
            <img src={six} />
            <p>
              powered by Vercel -
              {!user.id ? (
                <Link to={tlink("/login")}> {t("footer.admin")}</Link>
              ) : (
                <button className="logout-link" onClick={handleLogout}>
                  {" "}
                  Logout
                </button>
              )}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}