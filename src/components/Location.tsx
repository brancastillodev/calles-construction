import calles from "../assets/new-calles.png";
import map from "../assets/map.png";

function Location() {
  return (
    <section id="location" className="home">
      <h2>Location</h2>
      <figure className="map-image">
        <img src={calles} alt="calle-location" />
      </figure>
      <p>
        <i>Orchard Dr, Clifton, New Jersey </i>
      </p>
      <figure className="google-maps">
        <a
          href="https://maps.app.goo.gl/tHyUwPbXhedwkKnK7"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={map} alt="google-maps" />
        </a>
      </figure>
    </section>
  );
}

export default Location;