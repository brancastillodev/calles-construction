import { Link } from "react-router-dom";

function Hidden({ isOpen }: { isOpen: boolean }) {
  return (
    <div>
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <Link to="/services">Services</Link>
        <Link to="/jobs">Jobs</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/location">Location</Link>
      </ul>
    </div>
  );
}

export default Hidden;