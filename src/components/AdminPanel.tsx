import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminPanel() {
  const user = useSelector(
    (state: { user: { email?: string | null } }) => state.user
  );

  return (
    <section className="home admin-panel">
      <h2>Admin Panel</h2>
      <p className="admin-panel__user">Logged in as: {user.email}</p>
      <div className="admin-panel__links">
        <Link to="/jobs" className="button">
          Manage Jobs
        </Link>
        <Link to="/gallery" className="button">
          Manage Gallery
        </Link>
      </div>
    </section>
  );
}

export default AdminPanel;