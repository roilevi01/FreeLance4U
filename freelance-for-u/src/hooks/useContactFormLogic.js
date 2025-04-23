import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import ContactApiService from "../Services/ContactApiService";

const validationSchema = yup.object({
  name: yup.string().required("Name is required").min(3, "Name is too short"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .required("Phone number is required"),
  message: yup
    .string()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters"),
});

const useContactFormLogic = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        await ContactApiService.sendMessage(values);
        setSuccess(true);
        resetForm();
      } catch (error) {
        console.error("Failed to send message", error);
      } finally {
        setLoading(false);
      }
    },
  });

  return { formik, loading, success, setSuccess };
};

export default useContactFormLogic;
