import axios from "axios";

const axiosInstace = axios.create({
  baseURL: "https://dns-manager-server-five.vercel.app",
});
const useAxios = () => {
  return axiosInstace;
};

export default useAxios;
