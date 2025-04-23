import { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await api.get(`/user/profile/${currentUser.id}`);
        setFormData((prev) => ({
          ...prev,
          username: res.data.username,
          email: res.data.email,
          profilePicture: res.data.profilePicture || "",
        }));
      } catch (err) {
        setSnackbar({
          open: true,
          message: "Failed to load user data",
          severity: "error",
        });
      }
    };

    if (currentUser?.id) fetchUserDetails();
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (base64Image) => {
    setFormData((prev) => ({ ...prev, profilePicture: base64Image }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/user/update/${currentUser.id}`, formData);
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
