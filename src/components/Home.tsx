import image from "../assets/home-image.jpg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { tlink } from "../utils/tenant";
import { useLang } from "../utils/i18n";

function Home() {
  const navigate = useNavigate();
  const user = useSelector((state: { user: { id?: string } }) => state.user);
  const nombre = useSelector(
    (state: { tenant: { nombre: string } }) => state.tenant.nombre
  );
  const { t } = useLang();
  const brand = nombre || "Calle'$ Construcction";

  const goEstimate = () => navigate(tlink("/estimate"));

  return (
    <section className="home">
      <div className="home-mobile">
        <figure>
          <img src={image} alt="home-image" />
        </figure>
        <h1> {brand}</h1>
        <p>
          {t("home.subtitle")} <span className="admin-badge">{user.id && "Admin"}</span>
        </p>
        <button onClick={goEstimate} className="button">
          {t("home.estimate")}
        </button>
      </div>

      <div className="home-desktop">
        <div className="home-desktop-title">
          <h1>
            {brand.split(" ")[0]} <br />
            {brand.split(" ").slice(1).join(" ") || ""}
          </h1>
          <p>
            {t("home.subtitle")}
            {user.id && <span className="admin-badge"> Admin</span>}
          </p>
          <button onClick={goEstimate} className="button">
            {t("home.estimate")}
          </button>
        </div>
        <figure>
          <img src={image} alt="home-image" />
        </figure>
      </div>
    </section>
  );
}

export default Home;