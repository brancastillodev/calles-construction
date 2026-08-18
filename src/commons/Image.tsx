import { useSelector } from "react-redux";
import trash from "../assets/trash.svg";
import ReactLoading from "react-loading";

interface GalleryImage {
  id: number;
  image: string;
  category: string;
}

interface ImageProps {
  image: GalleryImage;
  handleDelete: (id: number | string) => void;
  handleUpdate: (id: number | string) => void;
  processing: number | string | null;
}

function Image({ image, handleDelete, handleUpdate, processing }: ImageProps) {
  const user = useSelector((state: { user: { id?: string } }) => state.user);

  return (
    <div className="image-card">
      <div className="gallery-image">
        <figure>
          <img src={image.image} className="job-img" />
        </figure>
        {user.id && (
          <div className="gallery-edit-button">
            <button onClick={() => handleUpdate(image.id)}>Edit image</button>
            <figure
              onClick={() => {
                handleDelete(image.id);
              }}
            >
              <img src={trash} alt="trash-icon" />
            </figure>
          </div>
        )}
        {processing == image.id && (
          <ReactLoading
            type="spin"
            color="#0f4c61"
            height={50}
            width={50}
          />
        )}
      </div>
    </div>
  );
}

export default Image;