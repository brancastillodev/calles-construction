/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { alerts } from "../utils/alerts";
import { apiSegura } from "../utils/utils";
import { API_URL } from "../utils/api";
import { useLang } from "../utils/i18n";
import Image from "../commons/Image";
import lessButton from "../assets/lessButton.svg";
import moreButton from "../assets/moreButton.svg";
import plus from "../assets/plus.svg";
import minus from "../assets/minus.svg";
import UserModals from "../modals/UserModals";
import ReactLoading from "react-loading";
import TopButton from "../commons/TopButton";
import { uploadImages, imagesDb } from "../utils/utils";

interface GalleryImage {
  id: number;
  image: string;
  category: string;
}

function Gallery() {
  const user = useSelector((state: { user: { id?: string } }) => state.user);
  const { t } = useLang();
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [rubro, setRubro] = useState<string>("Drywall");
  const [finalJobs, setFinalJobs] = useState<GalleryImage[]>([]);
  const [estado, setEstado] = useState<boolean>(false);
  const [more, setMore] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("Drywall");
  const [allImages, setAllImages] = useState<File[]>([]);
  const [moreImages, setMoreImages] = useState<number>(1);
  const divs = Array.from({ length: moreImages });
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmBox, setConfirmBox] = useState<boolean>(false);
  const [id, setId] = useState<number | string>(0);
  const [processing, setProcessing] = useState<number | string | null>(null);
  const imgUpdater = useRef<HTMLInputElement | null>(null);
  const [newImg, setNewImg] = useState<File | string>("");
  const openBox = () => setConfirmBox(true);
  const closeBox = () => setConfirmBox(false);
  const [loading2, setLoading2] = useState<boolean>(true);

  useEffect(() => {
    apiSegura
      .get(`${API_URL}/api/images/`)
      .then((resp) => {
        setGallery(resp.data);
        setLoading2(false);
      })
      .catch(() => {
        setLoading2(false);
        alerts(t("jobs.connection"), t("gallery.connectionMsg"), "danger");
      });
  }, [estado]);

  useEffect(() => {
    if (gallery.length > 0) {
      setFinalJobs(
        gallery.filter(
          (ele) => ele.category.toLowerCase() == rubro.toLowerCase()
        )
      );
    }
  }, [rubro, gallery]);

  useEffect(() => {
    if (rubro) {
      setCategory(rubro.toLowerCase());
      setMore(false);
      setMoreImages(1);
    }
  }, [rubro]);

  const createImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      for (let i = 0; i < allImages.length; i++) {
        const link = await uploadImages(allImages[i]);
        await imagesDb(link, category, 0);
      }

      setAllImages([]);
      setMore(false);
      setMoreImages(1);
      setEstado(!estado);
      alerts(t("gallery.uploaded"), t("gallery.uploadedMsg"), "success");
    } catch (e) {
      alerts(t("gallery.uploadError"), t("gallery.uploadErrorMsg"), "warning");
    }

    setLoading(false);
  };

  const handleDelete = (id: number | string) => {
    setId(id);
    openBox();
  };

  const confirmDelete = async () => {
    closeBox();
    setProcessing(id);
    try {
      await apiSegura.delete(
        `${API_URL}/api/images/delete/${id}`
      );

      setEstado(!estado);
      alerts(t("gallery.deleted"), t("gallery.deletedMsg"), "success");
    } catch (e) {
      alerts(t("gallery.deleteError"), t("gallery.deleteErrorMsg"), "warning");
    }
    setProcessing(0);
  };

  const handleUpdate = (id: number | string) => {
    setId(id);
    imgUpdater.current?.click();
  };

  const handleNewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const s = e.target.files?.[0];
    setNewImg(s as File);
  };

useEffect(() => {

    if (newImg) {
      handleChangeImage();
    }
  }, [newImg]);

  const handleChangeImage = async () => {
    setProcessing(id);
    try {
      const link = await uploadImages(newImg as File);
      await apiSegura.put(
        `${API_URL}/api/images/update/${id}`,
        { link }
      );

      setEstado(!estado);
      alerts(t("gallery.modified"), t("gallery.modifiedMsg"), "success");
      setProcessing(0);
    } catch (e) {
      alerts(t("gallery.modifyError"), t("gallery.modifyErrorMsg"), "warning");
      setProcessing(0);
    }
  };


  return (
    <section id="gallery" className="home">
      <h2>{t("nav.gallery")}</h2>
      <p
        style={{
          fontWeight: "600",
          fontSize: "1.2rem",
          marginBottom: "-0.5rem",
          color: "var(--principal)",
        }}
      >
        {t("gallery.select")}
      </p>

      <div className="botonera">
        {["drywall", "painting", "electrical", "carpentry", "plumbing", "utilities"].map(
          (cat) => (
            <a
              key={cat}
              tabIndex={0}
              onClick={() => setRubro(cat)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setRubro(cat);
                }
              }}
            >
              {t(`services.${cat}`)}
            </a>
          )
        )}
      </div>

      {rubro && <h3>{t(`services.${rubro.toLowerCase()}`)}</h3>}

      {loading2 ? (
        <div>
          <ReactLoading
            type="spin"
            color="var(--principal)"
            height={50}
            width={50}
          />
        </div>
      ) : (
        finalJobs.length > 0 &&
        finalJobs.map((img) => (
          <Image
            key={img.id}
            image={img}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            processing={processing}
          />
        ))
      )}

      {user.id && (
        <>
          <figure onClick={() => setMore(!more)} className="more-button">
            <img src={more ? lessButton : moreButton} alt="less-button" />
          </figure>
          {more && (
            <div className="form-job">
              <form onSubmit={createImage}>
                <div className="field">
                  <label htmlFor="cat">{t("jobs.category")}</label>
                  <select
                    id="cat"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    required
                  >
                    <option value="">{t("jobs.select")}</option>
                    <option value="drywall">{t("services.drywall")}</option>
                    <option value="painting">{t("services.painting")}</option>
                    <option value="electrical">{t("services.electrical")}</option>
                    <option value="carpentry">{t("services.carpentry")}</option>
                    <option value="plumbing">{t("services.plumbing")}</option>
                    <option value="utilities">{t("services.utilities")}</option>
                  </select>
                </div>

                {divs.map((_, index) => (
                  <div key={index} className="field">
                    <label htmlFor={`image-${index}`}>{t("gallery.image")} {index + 1}</label>
                    <input
                      id={`image-${index}`}
                      type="file"
                      onChange={(e) => {
                        const updatedImages = [...allImages];
                        updatedImages[index] = e.target.files?.[0] as File;
                        setAllImages(updatedImages);
                      }}
                      required
                    />
                  </div>
                ))}

                <div className="moreLessImages">
                  {moreImages > 1 && (
                    <figure
                      onClick={() =>
                        setMoreImages(
                          moreImages > 1 ? moreImages - 1 : moreImages
                        )
                      }
                      className="more-button"
                    >
                      <img src={minus} alt="more-button" />
                    </figure>
                  )}

                  {moreImages < 15 && (
                    <figure
                      onClick={() =>
                        setMoreImages(
                          moreImages < 15 ? moreImages + 1 : moreImages
                        )
                      }
                      className="more-button"
                    >
                      <img src={plus} alt="more-button" />
                    </figure>
                  )}
                </div>

                {loading ? (
                  <div style={{ margin: "0 auto" }}>
                    <ReactLoading
                      type="spin"
                      color="var(--principal)"
                      height={50}
                      width={50}
                    />
                  </div>
                ) : (
                  <button type="submit">{t("jobs.send")}</button>
                )}
              </form>
            </div>
          )}
        </>
      )}

      {rubro && <TopButton />}

      <input
        ref={imgUpdater}
        id="imagen-updater"
        type="file"
        onChange={(e) => handleNewImage(e)}
        style={{ display: "none" }}
      />

      <UserModals
        isOpen={confirmBox}
        onClose={closeBox}
        onConfirm={confirmDelete}
        text={"Are you sure you want to delete this image?"}
      />
    </section>
  );
}

export default Gallery;