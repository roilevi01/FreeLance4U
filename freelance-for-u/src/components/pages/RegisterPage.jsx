// src/pages/RegisterPage.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  Alert,
  Container,
} from "@mui/material";
import { motion } from "framer-motion";
import LeftAd from "../../Ads Components/LeftAd";
import RightAd from "../../Ads Components/RightAd";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    passwordHash: "",
    profilePicture: "",
    role: "User",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5244/api/user/register", formData);
      alert("Registration successful! Redirecting to login...");
      navigate(ROUTES.LOGIN);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      setError(errorMessage);
    }
  };

  return (
    <Grid container spacing={2} sx={{ mt: 4 }}>
      <Grid item xs={0} md={2}>
        <LeftAd />
      </Grid>

      <Grid item xs={12} md={8}>
        <Container maxWidth="sm">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h4" align="center" gutterBottom>
                Create Your Account
              </Typography>
              {error && <Alert severity="error">{error}</Alert>}
              <Box component="form" onSubmit={handleSubmit} mt={2}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Password"
                  name="passwordHash"
                  type="password"
                  value={formData.passwordHash}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Profile Picture URL (optional)"
                  name="profilePicture"
                  value={formData.profilePicture}
                  onChange={handleChange}
                  margin="normal"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  Register
                </Button>
              </Box>
            </Paper>
          </motion.div>
        </Container>
      </Grid>

      <Grid item xs={0} md={2}>
        <RightAd />
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
