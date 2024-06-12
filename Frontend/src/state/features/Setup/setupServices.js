import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://production-url.com/api/setup/"
    : "http://localhost:5555/api/setup/";

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
