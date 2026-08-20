import calles from "../assets/new-calles.png";
import map from "../assets/map.png";
import { useLang } from "../utils/i18n";

function Location() {
  const { t } = useLang();

  return (
    <section id="location" className="home">
      <h2>{t("location.title")}</h2>
      <figure className="map-image">
        <img src={calles} alt="calle-location" />
      </figure>
      <a
        className="maps-link"
        href="https://maps.app.goo.gl/tHyUwPbXhedwkKnK7"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="maps-text">{t("location.maps")}</span>
      </a>
      <figure className="google-maps">
        <img src={map} alt="google-maps" />
      </figure>
    </section>
  );
}

export default Location;