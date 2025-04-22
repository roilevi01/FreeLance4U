// src/services/ContactApiService.js
import axios from "axios";

const API_URL = "/api/contact"; // שים לב להתאים לנתיב האמיתי ב־backend שלך

const sendContactMessage = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export default {
  sendContactMessage,
};
