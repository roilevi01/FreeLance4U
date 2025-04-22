import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Alert,
  Switch,
  FormControlLabel,
  Link,
} from "@mui/material";
import { motion } from "framer-motion";
import ROUTES from "../../routes/routesModel";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5244/api/user/login",
        formData
      );
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        alert("Login successful!");
        navigate(ROUTES.ROOT);
      } else {
        setError("No token received from server");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.style.backgroundColor = !darkMode ? "#121212" : "#fff";
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: darkMode ? "#1e1e1e" : "#fff",
            color: darkMode ? "#fff" : "#000",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h4" gutterBottom>
              Login
            </Typography>
            <FormControlLabel
              control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
              label="Dark Mode"
            />
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              required
              InputProps={{ sx: { color: darkMode ? "#fff" : "#000" } }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              required
              InputProps={{ sx: { color: darkMode ? "#fff" : "#000" } }}
            />

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Login
            </Button>
          </Box>

          {/* קישורים */}
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Link
              href="#"
              underline="hover"
              sx={{
                color: darkMode ? "#90caf9" : "#1976d2",
                cursor: "pointer",
              }}
              onClick={() => alert("Forgot Password coming soon...")}
            >
              Forgot Password?
            </Link>
            <Link
              underline="hover"
              sx={{
                color: darkMode ? "#90caf9" : "#1976d2",
                cursor: "pointer",
              }}
              onClick={() => navigate(ROUTES.SIGNUP)}
            >
              Don't have an account? Sign Up
            </Link>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default LoginPage;
