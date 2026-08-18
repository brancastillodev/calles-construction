import axios from "axios";
import { getToken, clearSession } from "./auth";

export const apiSegura = axios.create({
  timeout: 10000,
  maxContentLength: 50 * 1024 * 1024,
  maxBodyLength: 50 * 1024 * 1024,
});

const isBackendCall = (url?: string): boolean =>
  !!url && url.includes("calles-construction-back.onrender.com");

apiSegura.interceptors.request.use((config) => {
  const token = getToken();
  if (token && isBackendCall(config.url)) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiSegura.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      isBackendCall(error.config?.url)
    ) {
      clearSession();
    }
    throw error;
  }
);

export const uploadImages = async (pic: File): Promise<string> => {
  const f = new FormData();
  f.append("file", pic);
  f.append("upload_preset", "calles_preset_images");
  f.append("api_key", import.meta.env.VITE_API_KEY);

  try {
    const { data } = await apiSegura.post(
      "https://api.cloudinary.com/v1_1/daynclfo8/image/upload",
      f
    );
    return data.secure_url;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to upload image to the cloud");
  }
};

export const imagesDb = async (link: string, category: string, jid: number): Promise<boolean> => {
  try {
    await apiSegura.post(
      "https://calles-construction-back.onrender.com/api/images/create",
      {
        image: link,
        category,
        jid,
      }
    );

    return true;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to upload image to the database");
  }
};