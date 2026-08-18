import { Link } from "react-router-dom";

function Hidden({
  isOpen,
  onNavigate,
}: {
  isOpen: boolean;
  onNavigate: () => void;
}) {
  return (
    <div>
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <Link to="/services" onClick={onNavigate}>
          Services
        </Link>
        <Link to="/jobs" onClick={onNavigate}>
          Jobs
        </Link>
        <Link to="/gallery" onClick={onNavigate}>
          Gallery
        </Link>
        <Link to="/location" onClick={onNavigate}>
          Location
        </Link>
      </ul>
    </div>
  );
}

export default Hidden;