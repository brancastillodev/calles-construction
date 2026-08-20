/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { alerts } from "../utils/alerts";
import { texts } from "../utilities/text";
import Text from "../commons/Text";
import Job from "../commons/Job";
import TopButton from "../commons/TopButton";
import UserModals from "../modals/UserModals";
import portadaJobs from "../assets/jobs-img.jpg";
import moreButton from "../assets/moreButton.svg";
import lessButton from "../assets/lessButton.svg";
import ReactLoading from "react-loading";
import plus from "../assets/plus.svg";
import minus from "../assets/minus.svg";
import { uploadImages, imagesDb } from "../utils/utils";
import { apiSegura } from "../utils/utils";
import { API_URL } from "../utils/api";
import { useLang } from "../utils/i18n";

interface JobsData {
  id: number | string;
  title: string;
  description: string;
  category: string;
  side?: string;
  date: string;
  images?: { id: number | string; image: string }[];
}

function Jobs({ serv }: { serv?: string }) {
  const user = useSelector((state: { user: { id?: string } }) => state.user);
  const { t } = useLang();
  const [jobs, setJobs] = useState<JobsData[]>([]);
  const [rubro, setRubro] = useState<string>(serv || "Drywall");
  const [finalJobs, setFinalJobs] = useState<JobsData[]>([]);
  const [estado, setEstado] = useState<boolean>(false);
  const [more, setMore] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [allImages, setAllImages] = useState<File[]>([]);
  const [moreImages, setMoreImages] = useState<number>(1);
  const divs = Array.from({ length: moreImages });
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmBox, setConfirmBox] = useState<boolean>(false);
  const [id, setId] = useState<number | string>("");
  const [processing, setProcessing] = useState<number | string | null>(null);
  const imgUpdater = useRef<HTMLInputElement | null>(null);
  const [newImg, setNewImg] = useState<File | string>("");
  const [loading2, setLoading2] = useState<boolean>(true);
  const openBox = () => setConfirmBox(true);
  const closeBox = () => setConfirmBox(false);

  //get all jobs
  useEffect(() => {
    let cancelled = false;
    setLoading2(true);

    apiSegura
      .get(`${API_URL}/api/jobs`)
      .then(async (resp) => {
        const jobsData: JobsData[] = resp.data;

        const results = await Promise.allSettled(
          jobsData.map(async (job: JobsData) => {
            try {
              const imagesResp = await apiSegura.get(
                `${API_URL}/api/images/job/${job.id}`
              );
              return { ...job, images: imagesResp.data };
            } catch {
              return { ...job, images: [] };
            }
          })
        );

        if (cancelled) return;

        setJobs(
          results.flatMap((r) =>
            r.status === "fulfilled" && r.value ? [r.value] : []
          )
        );
        setLoading2(false);
      })
      .catch(() => {
        if (cancelled) return;
        setLoading2(false);
        alerts(t("jobs.connection"), t("jobs.connectionMsg"), "danger");
      });

    return () => {
      cancelled = true;
    };
  }, [estado]);

  //filtrar
  useEffect(() => {
    if (jobs.length > 0) {
      setFinalJobs(
        jobs.filter((ele: JobsData) => ele.category.toLowerCase() == rubro.toLowerCase())
      );
    }
  }, [rubro, jobs]);

  //select default value for category with rubro
  useEffect(() => {
    if (rubro) {
      setCategory(rubro.toLowerCase());
      setTitle("");
      setDesc("");
      setDate("");
      setAllImages([]);
      setMoreImages(1);
      setMore(false);
    }
  }, [rubro]);

  //create job
  const createJobs = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newJob = { title, description: desc, date, category };

      const { data } = await apiSegura.post(
        `${API_URL}/api/jobs/create`,
        { newJob }
      );


      for (let i = 0; i < allImages.length; i++) {
        const link = await uploadImages(allImages[i]);
        await imagesDb(link, category, data[0].id);
      }

      setEstado(!estado);
      alerts(t("jobs.uploaded"), t("jobs.uploadedMsg"), "success");
      setMore(false);
      setMoreImages(1);
      setTitle("");
      setDesc("");
      setDate("");
      setAllImages([]);
    } catch (e: unknown) {
      alerts(t("jobs.uploadError"), t("jobs.uploadErrorMsg"), "warning");
    }

    setLoading(false);
  };

  //delete job
  function handleDelete(id: number | string) {
    setId(id);
    openBox();
  }

  const confirmDelete = async () => {
    closeBox();
    setProcessing(id);
    try {
      await apiSegura.delete(
        `${API_URL}/api/jobs/delete/${id}`
      );

      setEstado(!estado);
      alerts(t("jobs.deleted"), t("jobs.deletedMsg"), "success");
    } catch (e: unknown) {
      alerts(t("jobs.deleteError"), t("jobs.deleteErrorMsg"), "warning");
    }
    setProcessing(0);
  };

  //update job
  const updateData = async (
    id: number | string,
    data: { title: string; description: string; date: string }
  ) => {
    setProcessing(id);
    try {
      await apiSegura.put(
        `${API_URL}/api/jobs/update/${id}`,
        { data }
      );

      setEstado(!estado);
      alerts(t("jobs.modified"), t("jobs.modifiedMsg"), "success");
    } catch (e: unknown) {
      alerts(t("jobs.modifyError"), t("jobs.modifyErrorMsg"), "warning");
    }
    setProcessing(0);
  };

  //update image
  const updateImages = (id: number | string, sid: number | string) => {
    setProcessing(sid);
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
    try {
      const link = await uploadImages(newImg as File);
      await apiSegura.put(
        `${API_URL}/api/images/update/${id}`,
        { link }
      );

      setEstado(!estado);
      alerts(t("jobs.imageModified"), t("jobs.imageModifiedMsg"), "success");
    } catch (e: unknown) {
      alerts(t("jobs.imageError"), t("jobs.imageErrorMsg"), "warning");
    }
    setProcessing(0);
  };

  return (
    <section id="jobs" className="home">
      <h2>{t("nav.jobs")}</h2>
      <figure className="jobs-img">
        <img src={portadaJobs} alt="jobs-img" />
      </figure>

      <Text text={texts[0]} />

      <p
        style={{
          fontWeight: "600",
          color: "var(--principal)",
        }}
        className="category-title"
      >
        {t("jobs.select")}
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

      {rubro && <h2 className="rubro-title">{t(`services.${rubro.toLowerCase()}`)}</h2>}
       
      {loading2 ? (
         <div style={{ margin: "0 auto" }}>
            <ReactLoading
              type={"spin"}
              color="var(--principal)"
              height={50}
              width={50}
            />
          </div>
      ) : (
        finalJobs.length > 0 &&
        finalJobs.map((job, i) => (
          <Job
            key={job.id}
            indice={i}
            service={job}
            deleteFun={handleDelete}
            updateData={updateData}
            processing={processing}
            updateImages={updateImages}
          />
        ))
      )}
      {user.id && (
        <>
          <div className="more-button">
            <figure onClick={() => setMore(!more)} className="more-button">
              <img src={more ? lessButton : moreButton} alt="less-button"></img>
            </figure>
          </div>
          {more && (
            <div className="form-job">
              <form onSubmit={createJobs}>
                <div className="field">
                  <label htmlFor="title">{t("jobs.title")}</label>
                  <input
                    id="title"
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    required
                    maxLength={25}
                    placeholder="title"
                  />
                </div>
                <div className="field">
                  <label htmlFor="date">{t("jobs.date")}</label>
                  <input
                    id="date"
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="desc">{t("jobs.description")}</label>
                  <textarea
                    id="desc"
                    onChange={(e) => setDesc(e.target.value)}
                    value={desc}
                    required
                    rows={5}
                    maxLength={240}
                    placeholder="description"
                  />
                </div>
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
                    <label htmlFor="image">{t("jobs.imageN")} {index + 1}</label>
                    <input
                      id="image"
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const updatedImages = [...allImages];
                          updatedImages[index] = file;
                          setAllImages(updatedImages);
                        }
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
                      <img src={minus} alt="more-button"></img>
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
                      <img src={plus} alt="more-button"></img>
                    </figure>
                  )}
                </div>

                {loading ? (
                  <div className="job-loading">
                    <ReactLoading
                      type={"spin"}
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

      <UserModals
        isOpen={confirmBox}
        onClose={closeBox}
        onConfirm={confirmDelete}
        text={"Are you sure you want to delete this job?"}
      />

      <input
        ref={imgUpdater}
        id="imagen-updater"
        type="file"
        onChange={(e) => handleNewImage(e)}
        style={{ display: "none" }}
      ></input>
    </section>
  );
}

export default Jobs;
