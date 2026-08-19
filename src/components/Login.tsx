import { useState } from "react";
import { alerts } from "../utils/alerts";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../state/userState";
import { setToken, setStoredUser } from "../utils/auth";
import { apiSegura } from "../utils/utils";
import { API_URL } from "../utils/api";
import ReactLoading from "react-loading";
import eyeOpen from "../assets/eye-outline.svg";
import eyeClose from "../assets/eye-off-outline.svg";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state: { user: { id?: string | null } }) => state.user);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [peak, setPeak] = useState<boolean>(false);

  if (user.id) {
    return <Navigate to="/" replace />;
  }

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();
    apiSegura
      .post(`${API_URL}/api/user/login`, {
        email,
        password,
      })
      .then((resp) => {
        const { token, user } = resp.data;
        setToken(token);
        setStoredUser(user);
        dispatch(setUser(user));
        alerts("Hello!", `Logged in successfully`, "success");
        const from = (location.state as { from?: { pathname: string } })?.from
          ?.pathname;
        navigate(from || "/admin", { replace: true });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alerts("Sorry!", "Email or password are not correct!", "warning");
        setLoading(false);
      });
  }

  return (
    <section className="estimate-compo login-compo home">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            maxLength={40}
            placeholder="email"
          />
        </div>
        <div className="field">
          <div className="peak-line">
            <label>Password</label>
            <figure onClick={() => setPeak(!peak)}>
              <img src={peak ? eyeClose : eyeOpen}></img>
            </figure>
          </div>
          <input
            type={peak ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            maxLength={20}
            placeholder="password"
          />
        </div>
        {loading ? (
          <div style={{ margin: "1rem auto 0 auto" }}>
            <ReactLoading
              type="spin"
              color="#0f4c61"
              height={50}
              width={50}
            />
          </div>
        ) : (
          <button type="submit">Send</button>
        )}
      </form>
    </section>
  );
}

export default Login;