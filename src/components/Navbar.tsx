/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import defaultLogo from "../assets/nav-logo.png";
import { alerts } from "../utils/alerts";
import { uploadImages } from "../utils/utils";
import { apiSegura } from "../utils/utils";
import { API_URL } from "../utils/api";
import { tlink } from "../utils/tenant";
import { useLang } from "../utils/i18n";
import { setTenantInfo } from "../state/tenantState";

function Navbar({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const user = useSelector((state: { user: { id?: string } }) => state.user);
  const tenant = useSelector((state: { tenant: { logo: string } }) => state.tenant);
  const dispatch = useDispatch();
  const { t, lang, toggle: toggleLang } = useLang();
  const [newLogo, setNewLogo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const imgUpdater = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (newLogo) {
      handleChangeImage();
    }
  }, [newLogo]);

  const handleNewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLogo(e.target.files?.[0] ?? null);
  };

  const handleChangeImage = async () => {
    if (!newLogo) return;
    setLoading(true);

    try {
      const link = await uploadImages(newLogo);

      await apiSegura.post(`${API_URL}/api/descriptions/create`, { link });

      dispatch(setTenantInfo({ logo: link }));
      alerts("Ok!", "Logo updated successfully", "success");
    } catch {
      alerts("Sorry!", "Logo couldn't be updated, try again", "danger");
    }

    setLoading(false);
    setNewLogo(null);
  };

  return (
    <nav id="navbar">
      <div className="logo-section">
        <Link to={tlink("/")}>
          <figure className="nav-logo">
            <img src={tenant.logo || defaultLogo} alt="logo" />
          </figure>
        </Link>
        {user.id && (
          <button id="logo-button" onClick={() => imgUpdater.current?.click()}>
            Change
          </button>
        )}
        {loading && (
          <ReactLoading type="spin" color="var(--principal)" height={30} width={30} />
        )}
      </div>
      <ul className="desktop-navbar">
        <Link to={tlink("/services")}>{t("nav.services")}</Link>
        <Link to={tlink("/jobs")}>{t("nav.jobs")}</Link>
        <Link to={tlink("/gallery")}>{t("nav.gallery")}</Link>
        <Link to={tlink("/location")}>{t("nav.location")}</Link>
        <li>
          <button className="lang-toggle" onClick={toggleLang} title="Switch language">
            {lang === "es" ? "EN" : "ES"}
          </button>
        </li>
      </ul>
      <div className="hamburger">
        <Hamburger toggled={open} toggle={setOpen} />
      </div>
      <input
        ref={imgUpdater}
        id="imagen-updater"
        type="file"
        onChange={(e) => handleNewImage(e)}
        style={{ display: "none" }}
      />
    </nav>
  );
}

export default Navbar;