/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { alerts } from "../utils/alerts";
import { apiSegura } from "../utils/utils";
import { API_URL } from "../utils/api";
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
      .catch((err) => {
        console.log(err);
        setLoading2(false);
        alerts("Connection Error", "Could not load images, try again", "danger");
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
        console.log(allImages[i]);
        const link = await uploadImages(allImages[i]);
        console.log(link);
        await imagesDb(link, category, 0);
      }

      setAllImages([]);
      setMore(false);
      setMoreImages(1);
      setEstado(!estado);
      alerts(
        "Image Uploaded",
        "The image(s) have been uploaded successfully.",
        "success"
      );
    } catch (e) {
      alerts("Upload Error", "The image(s) could not be uploaded.", "warning");
      console.log(e);
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
      alerts(
        "Image Deleted",
        "The image has been deleted successfully.",
        "success"
      );
    } catch (e) {
      console.log(e);
      alerts("Deletion Error", "The image could not be deleted.", "warning");
    }
    setProcessing(0);
  };

  const handleUpdate = (id: number | string) => {
    setId(id);
    imgUpdater.current?.click();
  };

  const handleNewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const s = e.target.files?.[0];
    console.log("archivo recibido para mod", s);
    setNewImg(s as File);
    console.log("archivo newImg", newImg);
  };

useEffect(() => {
    console.log("newImg dentro del useEffect", newImg);

    if (newImg) {
      handleChangeImage();
    }
  }, [newImg]);

  const handleChangeImage = async () => {
    setProcessing(id);
    try {
      console.log("cuando lega la img en handleChangeImage", newImg);
      const link = await uploadImages(newImg as File);
      await apiSegura.put(
        `${API_URL}/api/images/update/${id}`,
        { link }
      );

      setEstado(!estado);
      alerts(
        "Image Modified",
        "The image has been modified successfully.",
        "success"
      );
      setProcessing(0);
    } catch (e) {
      alerts(
        "Modification Error",
        "The image could not be modified.",
        "warning"
      );
      console.log(e);
      setProcessing(0);
    }
  };

  console.log("gallery", gallery);
  console.log("final", finalJobs);

  return (
    <section id="gallery" className="home">
      <h2>Gallery</h2>
      <p
        style={{
          fontWeight: "600",
          fontSize: "1.2rem",
          marginBottom: "-0.5rem",
          color: "#0f4c61",
        }}
      >
        Select a category
      </p>

      <div className="botonera">
        {["Drywall", "Painting", "Electrical", "Carpentry", "Plumbing", "Utilities"].map(
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
              {cat}
            </a>
          )
        )}
      </div>

      {rubro && <h3>{rubro}</h3>}

      {loading2 ? (
        <div>
          <ReactLoading
            type="spin"
            color="#0f4c61"
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
                  <label htmlFor="cat">Category</label>
                  <select
                    id="cat"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="drywall">Drywall</option>
                    <option value="painting">Painting</option>
                    <option value="electrical">Electrical</option>
                    <option value="carpentry">Carpentry</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="utilities">Utilities</option>
                  </select>
                </div>

                {divs.map((_, index) => (
                  <div key={index} className="field">
                    <label htmlFor={`image-${index}`}>Image {index + 1}</label>
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
                      color="#0f4c61"
                      height={50}
                      width={50}
                    />
                  </div>
                ) : (
                  <button type="submit">Send</button>
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