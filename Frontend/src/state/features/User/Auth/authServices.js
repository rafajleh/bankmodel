import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://production-url.com/api/users/"
    : "http://localhost:5011/api/users/";

//Login User
const login = async (userData) => {
  console.log(userData);
  const res = await axios.post(API_URL + "login", userData, {
    headers: {
      "content-type": "application/json",
    },
  });
  const data = res.data;

  return data;
};

//Register User
const register = async (userData) => {
  const res = await axios.post(API_URL, userData, {
    headers: {
      "content-type": "application/json",
    },
  });

  const data = res.data;
  console.log(29, data)
  return data;
};

//Logout
const logout = () => {
  return;
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
