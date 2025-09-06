import axios from "axios";
import { Decrypt } from "../utils/encryption";

const baseURL = "http://127.0.0.1:8000/api";

const client = axios.create({ baseURL });

export const request = async (options) => {
  const token = localStorage.getItem("cartoken");

  if (token) {
    client.defaults.headers.common.Authorization = `Bearer ${Decrypt(token)}`;
  } else {
    delete client.defaults.headers.common.Authorization;
  }

  return client(options);
};
