import axios from "axios";
const BASE_URL = "http://192.168.7.60:3001";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const APIManager = {
  getChargers: async () => {
    try {
      const res = await api.get("/charger");
      return res.data;
    } catch (error: any) {
      console.error("error fetching chargers", error.message);
      throw error;
    }
  },
  addCharger: async (data: any) => {
    try {
      const res = await api.post("/charger/add", data);
      return res.data;
    } catch (error: any) {
      console.error("error fetching chargers", error.message);
      throw error;
    }
  },
};
export default APIManager;
