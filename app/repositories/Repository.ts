import axios from "axios";

const baseDomain: string = "http://localhost:3000";
const Repository = axios.create({
  baseURL: baseDomain,
  withCredentials: true,
});

export default Repository;