import api from "./api";

const ContactApiService = {
  sendMessage: async (data) => {
    const response = await api.post("/contact", data);
    return response.data;
  },
};

export default ContactApiService;
