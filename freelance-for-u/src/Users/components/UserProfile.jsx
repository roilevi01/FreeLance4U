import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Grid } from "@mui/material";
import ProfileImageUpload from "./ProfileImageUpload";
import UserDetailsForm from "./UserDetailsForm";
import CustomSnackbar from "./CustomSnackbar";
import api from "../../Services/api";
import { getCurrentUser } from "../../Services/authHelper";
import FooterBar from "../../Footer/FooterBar";
import NavBar from "../../Header/NavBar";

export default function UserProfile() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    profilePicture: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const currentUser = getCurrentUser();
  const userId = currentUser?.id || null; 
  const didInit = useRef(false);
  const abortRef = useRef(null);

  const fetchUserDetails = useCallback(async () => {
    if (!userId) return;
    try {
      abortRef.current?.abort();
      abortRef.current = new AbortController();

      const res = await api.get(`/user/profile/${userId}`, {
        signal: abortRef.current.signal,
      });

      setFormData((prev) => ({
        ...prev,
        username: res.data.username || "",
        email: res.data.email || "",
        profilePicture: res.data.profilePicture || "",
      }));
    } catch (err) {
      if (err.name === "CanceledError" || err.code === "ERR_CANCELED") return;
      setSnackbar({
        open: true,
        message: "Failed to load user data",
        severity: "error",
      });
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    if (didInit.current && abortRef.current) {
      return;
    }
    didInit.current = true;
    fetchUserDetails();
    return () => abortRef.current?.abort();
  }, [userId, fetchUserDetails]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = (base64Image) => {
    setFormData((prev) => ({ ...prev, profilePicture: base64Image }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/user/update/${userId}`, formData);
      setSnackbar({
        open: true,
        message: "Profile updated successfully",
        severity: "success",
      });
    } catch (err) {
      const msg = err.response?.data || "Failed to update profile";
      setSnackbar({ open: true, message: msg, severity: "error" });
    }
  };

  return (
    <>
      <NavBar />
      <Grid container spacing={4} p={4}>
        <Grid item xs={12} md={4}>
          <ProfileImageUpload
            profilePicture={formData.profilePicture}
            onImageChange={handleImageUpload}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <UserDetailsForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </Grid>
      </Grid>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
      <FooterBar />
    </>
  );
}
