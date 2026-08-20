import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { tlink } from "../utils/tenant";

function RequireAuth({ children }: { children: JSX.Element }) {
  const user = useSelector(
    (state: { user: { id?: string | null } }) => state.user
  );
  const location = useLocation();

  if (!user.id) {
    return <Navigate to={tlink("/login")} state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;