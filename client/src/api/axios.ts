import axios from "axios";

const BASE_URL = "https://leetclone-server.vercel.app/api/v1";
// const BASE_URL = "https://leetclone-kappa.vercel.app/api/v1";
export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
