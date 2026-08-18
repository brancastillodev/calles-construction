import calles from "../assets/new-calles.png";
import map from "../assets/map.png";

function Location() {
  return (
    <section id="location" className="home">
      <h2>Location</h2>
      <figure className="map-image">
        <img src={calles} alt="calle-location" />
      </figure>
      <a
        className="maps-link"
        href="https://maps.app.goo.gl/tHyUwPbXhedwkKnK7"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="maps-text">Orchard Dr, Clifton, New Jersey</span>
        <figure className="google-maps">
          <img src={map} alt="google-maps" />
        </figure>
      </a>
    </section>
  );
}

export default Location;