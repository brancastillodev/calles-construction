import { useState } from "react";
import trash from "../assets/trash.svg";
import edit from "../assets/edit.svg";
import { useSelector } from "react-redux";
import ReactLoading from "react-loading";
import { useLang } from "../utils/i18n";

interface ServiceData {
  id: number | string;
  title: string;
  description: string;
  date: string;
  category: string;
  side?: string;
  images?: { id: number | string; image: string }[];
}

interface JobProps {
  service: ServiceData;
  deleteFun: (id: number | string) => void;
  updateData: (
    id: number | string,
    data: { title: string; description: string; date: string }
  ) => void;
  updateImages: (imageId: number | string, jobId: number | string) => void;
  indice: number;
  processing: number | string | null;
}

function Job({
  service,
  deleteFun,
  updateData,
  updateImages,
  indice,
  processing,
}: JobProps) {
  const user = useSelector((state: { user: { id?: string } }) => state.user);
  const { t } = useLang();
  const [editMode, setEditMode] = useState(false);
  const [desc, setDesc] = useState(service.description);
  const [title, setTitle] = useState(service.title);
  const [dat, setDat] = useState(service.date.split("T")[0]);

  const side = indice % 2 === 0 ? "l" : "r";

  const fecha = service.date.split("T")[0].split("-");

  const meses = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = meses[Number(fecha[1]) - 1] + " " + fecha[2];

  return (
    <div className="job-card">
      <div className={`pencil-line ${side}`}>
        {editMode ? (
          <>
            <input
              className="input-job"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="input-job"
              type="date"
              value={dat}
              onChange={(e) => setDat(e.target.value)}
            />
          </>
        ) : (
          <>
            <h3>{service.title}</h3>
            <p className="job-date">{date}</p>
          </>
        )}
        {user.id &&
          (editMode ? (
            <></>
          ) : (
            <>
              <figure
                onClick={() => setEditMode(!editMode)}
                className="job-button"
                title={t("jobs.exitEdit")}
              >
                <img src={edit} alt="edit-icon" />
              </figure>
              <figure
                onClick={() => deleteFun(service.id)}
                className="job-button"
                title={t("jobs.deleteJob")}
              >
                <img src={trash} alt="trash-icon" />
              </figure>
            </>
          ))}
      </div>

      <section className={side}>
        {editMode ? (
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="input-job"
            rows={3}
            maxLength={250}
          />
        ) : (
          <p>{service.description}</p>
        )}
      </section>

      <div className="last-row">
        {editMode && (
          <>
            <div className="edit-buttons">
              <button
                onClick={() =>
                  updateData(service.id, {
                    title,
                    description: desc,
                    date: dat,
                  })
                }
                title={t("jobs.submit")}
              >
                {t("jobs.submit")}
              </button>
              <figure
                onClick={() => setEditMode(!editMode)}
                className="edit-button"
              >
                <img src={edit} alt="edit-icon" title={t("jobs.exitEdit")} />
              </figure>
              <figure
                onClick={() => deleteFun(service.id)}
                className="edit-button"
              >
                <img src={trash} alt="trash-icon" title={t("jobs.deleteJob")} />
              </figure>
            </div>
            {processing === service.id && (
              <>
                <ReactLoading
                  type="spin"
                  color="var(--principal)"
                  height={50}
                  width={50}
                />
              </>
            )}
          </>
        )}
      </div>

      <div className="job-images">
        {service.images && service.images.length > 0 ? (
          service.images.map((image) => (
            <div key={image.id} className="job-image">
              <figure>
                <img
                  src={image.image}
                  alt={service.title}
                  className="job-img"
                />
              </figure>
              {user.id && editMode && (
                <button onClick={() => updateImages(image.id, service.id)}>
                  {t("jobs.editImage")}
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>
    </div>
  );
}

export default Job;