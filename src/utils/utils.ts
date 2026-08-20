import axios from "axios";
import { getToken, clearSession } from "./auth";
import store from "../state/store";
import { setUser } from "../state/userState";
import { API_URL } from "./api";
import { getCurrentSlug } from "./tenant";

export const apiSegura = axios.create({
  timeout: 10000,
  maxContentLength: 50 * 1024 * 1024,
  maxBodyLength: 50 * 1024 * 1024,
});

apiSegura.interceptors.request.use((config) => {
  const slug = getCurrentSlug();
  if (slug) {
    config.headers["x-tenant-slug"] = slug;
  }
  return config;
});

const isBackendCall = (url?: string): boolean =>
  !!url && url.includes(API_URL);

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
      store.dispatch(setUser({ id: null, email: null }));
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
    throw new Error("Failed to upload image to the cloud");
  }
};

export const imagesDb = async (link: string, category: string, jid: number): Promise<boolean> => {
  try {
    await apiSegura.post(
      `${API_URL}/api/images/create`,
      {
        image: link,
        category,
        jid,
      }
    );

    return true;
  } catch (e) {
    throw new Error("Failed to upload image to the database");
  }
};