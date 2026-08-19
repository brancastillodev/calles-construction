/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import defaultLogo from "../assets/nav-logo.png";
import { alerts } from "../utils/alerts";
import { uploadImages } from "../utils/utils";
import { apiSegura } from "../utils/utils";

interface Logo {
  link: string;
}

function Navbar({ open, setOpen }: { open: boolean; setOpen: (state: boolean) => void }) {
  const user = useSelector((state: { user: { id?: string } }) => state.user);
  const [logo, setLogo] = useState<Logo>({ link: defaultLogo });
  const [newLogo, setNewLogo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [estado, setEstado] = useState(false);
  const imgUpdater = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const getLogo = async () => {
      try {
        const resp = await apiSegura.get(
          `${API_URL}/api/descriptions/`
        );

        if (resp.data.length > 0) {
          setLogo(resp.data[resp.data.length - 1]);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getLogo();
  }, [estado]);

  const handleNewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLogo(e.target.files?.[0] ?? null);
  };

useEffect(() => {
    if (newLogo) {
      handleChangeImage();
    }
  }, [newLogo]);

  const handleChangeImage = async () => {
    setLoading(true);

    try {
      const link = await uploadImages(newLogo);

      await apiSegura.post(
        `${API_URL}/api/descriptions/create`,
        { link }
      );

      setEstado(!estado);
      alerts("Okey!", "Logo updated successfuly", "success");
    } catch (e) {
      console.log("error de cliente", e);
      alerts("Sorry!", "Logo couldn't be updated, try again", "danger");
    }

    setLoading(false);
  };

  return (
    <nav id="navbar">
      <div className="logo-section">
        <Link to="/">
          <figure className="nav-logo">
            {logo.link && <img src={logo.link} alt="calles-logo" />}
          </figure>
        </Link>
        {user.id && (
          <button id="logo-button" onClick={() => imgUpdater.current?.click()}>
            Change
          </button>
        )}
        {loading && (
          <ReactLoading type="spin" color="#0f4c61" height={30} width={30} />
        )}
      </div>
      <ul className="desktop-navbar">
        <Link to="/services">Services</Link>
        <Link to="/jobs">Jobs</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/location">Location</Link>
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