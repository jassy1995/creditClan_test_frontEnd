import axios from "axios";
const token = localStorage.getItem("accessToken");
let accessToken = token ? token : "";
export const customAxios = axios.create({
  baseURL: "http://localhost:3007/",
  headers: { "x-access-token": accessToken },
});
