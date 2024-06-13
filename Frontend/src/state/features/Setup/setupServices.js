import axios from "axios";
import BASE_URL from "../../../config/config";

const API_URL = BASE_URL + "/api/setup/";

//orginfo
const orginfo = async (userData) => {
  const res = await axios.post(API_URL + "orginfo", userData, {
    headers: {
      "content-type": "application/json",
    },
  });
  const data = res.data;

  return data;
};

export default orginfo;
