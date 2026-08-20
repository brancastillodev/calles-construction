import { useState } from "react";
import { alerts } from "../utils/alerts";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../state/userState";
import { setToken, setStoredUser } from "../utils/auth";
import { apiSegura } from "../utils/utils";
import { API_URL } from "../utils/api";
import { tlink } from "../utils/tenant";
import { useLang } from "../utils/i18n";
import ReactLoading from "react-loading";
import eyeOpen from "../assets/eye-outline.svg";
import eyeClose from "../assets/eye-off-outline.svg";

function Login() {
  const { t } = useLang();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state: { user: { id?: string | null } }) => state.user);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [peak, setPeak] = useState<boolean>(false);

  if (user.id) {
    return <Navigate to={tlink("/")} replace />;
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
        alerts(t("login.hello"), t("login.helloMsg"), "success");
        const from = (location.state as { from?: { pathname: string } })?.from
          ?.pathname;
        navigate(from || tlink("/admin"), { replace: true });
        setLoading(false);
      })
      .catch(() => {
        alerts(t("login.wrong"), "", "warning");
        setLoading(false);
      });
  }

  return (
    <section className="estimate-compo login-compo home">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="field">
          <label htmlFor="email">{t("login.email")}</label>
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
            <label>{t("login.password")}</label>
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
              color="var(--principal)"
              height={50}
              width={50}
            />
          </div>
        ) : (
          <button type="submit">{t("login.submit")}</button>
        )}
      </form>
    </section>
  );
}

export default Login;