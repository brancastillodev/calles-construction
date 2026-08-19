import { Link } from "react-router-dom";
import { setUser } from "../state/userState";
import { useDispatch, useSelector } from "react-redux";
import { clearSession } from "../utils/auth";
import { alerts } from "../utils/alerts";
import one from "../assets/1.svg";
import two from "../assets/2.svg";
import three from "../assets/3.svg";
import fourth from "../assets/5.svg";
import five from "../assets/4.svg";
import six from "../assets/6.svg";

export default function Footer() {
  const dispatch = useDispatch();
  const user = useSelector((state: { user: { id?: string } }) => state.user);

  function handleLogout() {
    const noUser = {
      id: null,
      email: null,
    };
    clearSession();
    dispatch(setUser(noUser));
    alerts("Bye!", `You logout successfully`, "info");
  }

  return (
    <footer id="contact">
      <div className="credits">
        <div className="contact">
          <div className="line">
            <img src={one} />
            <p>Contact</p>
          </div>
          <div className="line">
            <img src={two} />
            <a href="tel:3476242525">
              <p>3476242525</p>
            </a>
          </div>
          <div className="line">
            <img src={three} />
            <a href="mailto:callesconstruction86@gmail.com">
              <p>callesconstruction86@gmail.com</p>
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
            <p>Manhattan, New York City</p>
          </div>
          <div className="line">
            <img src={six} />
            <p>
              Powered by Vercel -
              {!user.id ? (
                <Link to={"/login"}> Admin Mode</Link>
              ) : (
                <Link to={"/login"} onClick={handleLogout}> Logout</Link>
              )}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}