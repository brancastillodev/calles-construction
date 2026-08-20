import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { alerts } from "../utils/alerts";
import { apiSegura } from "../utils/utils";
import { API_URL } from "../utils/api";
import { useLang } from "../utils/i18n";

function Register() {
  const { t } = useLang();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [slug, setSlug] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await apiSegura.post(`${API_URL}/api/tenant/register`, {
        nombre,
        slug,
        email,
        telefono,
        password,
      });
      alerts(t("register.done"), t("register.doneMsg"), "success");
      navigate(`/${slug.toLowerCase()}`);
    } catch (err) {
      alerts(t("register.error"), t("register.errorMsg"), "warning");
    }
  };

  return (
    <section className="estimate-compo login-compo home">
      <h2>{t("register.title")}</h2>
      <p className="register-intro">{t("register.intro")}</p>
      <form onSubmit={handleRegister}>
        <div className="field">
          <label htmlFor="reg-name">{t("register.name")}</label>
          <input
            id="reg-name"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            maxLength={60}
          />
        </div>
        <div className="field">
          <label htmlFor="reg-slug">{t("register.slug")}</label>
          <input
            id="reg-slug"
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase())}
            required
            pattern="[a-z0-9-]+"
            maxLength={30}
          />
        </div>
        <div className="field">
          <label htmlFor="reg-email">{t("register.email")}</label>
          <input
            id="reg-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            maxLength={40}
          />
        </div>
        <div className="field">
          <label htmlFor="reg-phone">{t("register.phone")}</label>
          <input
            id="reg-phone"
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            maxLength={30}
          />
        </div>
        <div className="field">
          <label htmlFor="reg-password">{t("register.password")}</label>
          <input
            id="reg-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            maxLength={30}
          />
        </div>
        <button type="submit" className="button">
          {t("register.submit")}
        </button>
      </form>
    </section>
  );
}

export default Register;