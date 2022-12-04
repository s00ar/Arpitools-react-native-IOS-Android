import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import config from "../config";

// const BASE_URL = "https://3254-119-157-76-84.in.ngrok.io/api";
// const BASE_URL = "http://82.180.130.53:1337/api";
// const BASE_URL = "http://localhost:1337/api";
// console.log(BASE_URL);
const api = axios.create({
  baseURL: `${config.api.endpoint}`,
  // timeout: 60 * 2 * 1000,
  headers: {
    "Content-Type": "application/json",
    // 'Authorization': "BEARER " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY0NTgxNTgzLCJleHAiOjE2NjcxNzM1ODN9.8NjLIdsFVHXn17eB64DPfaZWw5pD4g62ooGAzYYBnhk",
  },
});

export const unAuthApi = axios.create({
  baseURL: `${config.api.endpoint}`,
  timeout: 60 * 2 * 1000,
  headers: {
    "Content-Type": "application/json",
    // 'Authorization': "BEARER " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY0NTgxNTgzLCJleHAiOjE2NjcxNzM1ODN9.8NjLIdsFVHXn17eB64DPfaZWw5pD4g62ooGAzYYBnhk",
  },
});

export const setSession = (accessToken) => {
  if (accessToken) {
    // AsyncStorage.setItem("accessToken", JSON.stringify(accessToken));
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    // AsyncStorage.removeItem("accessToken");
    delete api.defaults.headers.common.Authorization;
  }
};

// export const getSessionToken = (accessToken) => {
//   if (accessToken) {
//     AsyncStorage.setItem("accessToken", JSON.stringify(accessToken));
//     axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//   } else {
//     AsyncStorage.removeItem("accessToken");
//     delete axios.defaults.headers.common.Authorization;
//   }
// };

export default api;
