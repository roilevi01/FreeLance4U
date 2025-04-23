import axios from "axios";

const API_URL = "/api/contact";

const sendContactMessage = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export default {
  sendContactMessage,
};
