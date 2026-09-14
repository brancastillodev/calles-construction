import { Link } from "react-router-dom";
import { tlink } from "../utils/tenant";
import { useLang } from "../utils/i18n";

// Página de venta del producto multi-tenant:
// - Hero con el pitch + 2 CTAs: /register (alta autoservicio) y WhatsApp (demo asistida).
// - 3 beneficios clave y el bloque de precios (landing.price* en i18n).
// Los precios son textos editables en i18n.tsx ("landing.priceValue"/"landing.priceDetail"),
// puestos como placeholders ("Setup + mensualidad") hasta definir el valor final.
const WHATSAPP = "https://wa.me/543476242525";

function Landing() {
  const { t } = useLang();

  return (
    <section id="landing" className="landing home">
      <div className="landing-hero">
        <h1>{t("landing.title")}</h1>
        <p>{t("landing.subtitle")}</p>
        <div className="landing-cta">
          <Link to={tlink("/register")} className="button">
            {t("landing.ctaPrimary")}
          </Link>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="button button-secondary"
          >
            {t("landing.ctaDemo")}
          </a>
        </div>
      </div>

      <div className="landing-features">
        {/* Beneficios principales que se venden: todo junto, con tu marca, sin fricción */}
        <div className="landing-card">
          <h3>{t("landing.f1Title")}</h3>
          <p>{t("landing.f1Desc")}</p>
        </div>
        <div className="landing-card">
          <h3>{t("landing.f2Title")}</h3>
          <p>{t("landing.f2Desc")}</p>
        </div>
        <div className="landing-card">
          <h3>{t("landing.f3Title")}</h3>
          <p>{t("landing.f3Desc")}</p>
        </div>
      </div>

      <div className="landing-price">
        {/* Bloque de precios: acá se muestra el plan (setup + mensualidad).
            Actualizar landing.priceValue y landing.priceDetail en i18n.tsx
            cuando definas el valor concreto. */}
        <h2>{t("landing.priceTitle")}</h2>
        <p className="landing-price-value">{t("landing.priceValue")}</p>
        <p>{t("landing.priceDetail")}</p>
        <Link to={tlink("/register")} className="button">
          {t("landing.ctaPrimary")}
        </Link>
      </div>
    </section>
  );
}

export default Landing;