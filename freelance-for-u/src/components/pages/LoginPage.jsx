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
  InputAdornment,
  IconButton,
  Snackbar,
  Divider,
  CircularProgress,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import ROUTES from "../../routes/routesModel";
import GoogleLoginButton from "../../GoogleLogin/GoogleLoginButton";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import LockTwoToneIcon from "@mui/icons-material/LockTwoTone";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const toggleDarkMode = () => setDarkMode((v) => !v);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await axios.post(
        "https://localhost:7012/api/user/login",
        formData
      );
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setSnackOpen(true);
        setTimeout(() => navigate(ROUTES.ROOT), 900);
      } else {
        setError("No token received from server");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setSubmitting(false);
    }
  };

  const bgLight =
    "linear-gradient(135deg, #f7f9fc 0%, #e8eef6 50%, #f7faff 100%)";
  const bgDark =
    "radial-gradient(120% 120% at 0% 0%, #0b1220 0%, #0f172a 55%, #111827 100%)";

  const titleGradientLight =
    "linear-gradient(90deg, #0ea5e9, #a78bfa 50%, #22d3ee)";
  const titleGradientDark =
    "linear-gradient(90deg, #93c5fd, #c084fc 50%, #67e8f9)";

  const getFieldSx = (dm) => ({
    "& .MuiInputLabel-root": {
      color: dm ? "#cbd5e1" : "#475569",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: dm ? "#93c5fd" : "#2563eb",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      color: dm ? "#ffffff" : "#0f172a",
      backgroundColor: dm ? "#1f2937" : "#f3f4f6",
      "& fieldset": {
        borderColor: dm ? "#334155" : "#cbd5e1",
      },
      "&:hover fieldset": {
        borderColor: dm ? "#60a5fa" : "#2563eb",
      },
      "&.Mui-focused fieldset": {
        borderColor: dm ? "#0ea5e9" : "#2563eb",
        borderWidth: 1.5,
      },
      "& .MuiInputAdornment-root svg": {
        color: dm ? "#93c5fd" : "#475569",
      },
    },
    "& input": {
      color: dm ? "#ffffff" : "#0f172a",
    },
    "& input::placeholder": {
      color: dm ? "rgba(255,255,255,0.7)" : "rgba(71,85,105,0.8)",
      opacity: 1,
    },

    "& input:-webkit-autofill": {
      WebkitBoxShadow: `0 0 0 1000px ${
        dm ? "#1f2937" : "#f3f4f6"
      } inset !important`,
      WebkitTextFillColor: dm ? "#ffffff" : "#0f172a",
      caretColor: dm ? "#ffffff" : "#0f172a",
      transition: "background-color 5000s ease-in-out 0s",
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: darkMode ? bgDark : bgLight,
        py: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 38 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Box
            sx={{
              p: "2px",
              borderRadius: 3.5,
              background: darkMode
                ? "conic-gradient(from 180deg at 50% 50%, #1e3a8a, #0ea5e9, #a78bfa, #1e3a8a)"
                : "conic-gradient(from 180deg at 50% 50%, #60a5fa, #a78bfa, #22d3ee, #60a5fa)",
              boxShadow: darkMode
                ? "0 20px 48px rgba(0,0,0,0.35)"
                : "0 20px 48px rgba(2,6,23,0.16)",
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                background: darkMode
                  ? "linear-gradient(180deg, rgba(17,24,39,0.85), rgba(15,23,42,0.75))"
                  : "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.86))",
                color: darkMode ? "#fff" : "#0f172a",
                backdropFilter: "blur(10px)",
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto",
                  alignItems: "center",
                  columnGap: 1.5,
                  rowGap: 1,
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    background: darkMode
                      ? "linear-gradient(180deg, #1e3a8a, #0ea5e9)"
                      : "linear-gradient(180deg, #60a5fa, #22d3ee)",
                    boxShadow: darkMode
                      ? "0 8px 20px rgba(14,165,233,0.35)"
                      : "0 8px 20px rgba(37,99,235,0.25)",
                  }}
                >
                  <LockRoundedIcon sx={{ color: "#fff" }} />
                </Box>

                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 900,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                      backgroundImage: darkMode
                        ? titleGradientDark
                        : titleGradientLight,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Login
                  </Typography>
                  <Typography
                    variant="body2"
                    color={darkMode ? "grey.300" : "text.secondary"}
                  >
                    Welcome back — sign in to continue.
                  </Typography>
                </Box>

                <FormControlLabel
                  sx={{ justifySelf: "end" }}
                  control={
                    <Switch checked={darkMode} onChange={toggleDarkMode} />
                  }
                  label="Dark Mode"
                />
              </Box>

              <Box
                sx={{
                  width: 56,
                  height: 4,
                  borderRadius: 999,
                  background: darkMode
                    ? "linear-gradient(90deg,#0ea5e9,#1d4ed8)"
                    : "linear-gradient(90deg,#3b82f6,#22d3ee)",
                  mb: 2,
                }}
              />

              {error && (
                <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  fullWidth
                  margin="normal"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  sx={getFieldSx(darkMode)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailTwoToneIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="Password"
                  name="password"
                  type={showPwd ? "text" : "password"}
                  fullWidth
                  margin="normal"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  sx={getFieldSx(darkMode)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockTwoToneIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPwd ? "Hide password" : "Show password"
                          }
                          onClick={() => setShowPwd((v) => !v)}
                          edge="end"
                          size="small"
                        >
                          {showPwd ? (
                            <VisibilityOffRoundedIcon />
                          ) : (
                            <VisibilityRoundedIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={submitting}
                  sx={{
                    mt: 3,
                    py: 1.4,
                    fontWeight: 800,
                    letterSpacing: ".2px",
                    borderRadius: 999,
                    textTransform: "none",
                    boxShadow: darkMode
                      ? "0 14px 30px rgba(14,165,233,0.25)"
                      : "0 14px 30px rgba(37,99,235,0.25)",
                    background: darkMode
                      ? "linear-gradient(180deg, #0ea5e9 0%, #1d4ed8 100%)"
                      : "linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)",
                    "&:hover": {
                      transform: "translateY(-1px)",
                      boxShadow: darkMode
                        ? "0 18px 42px rgba(14,165,233,0.35)"
                        : "0 18px 42px rgba(37,99,235,0.35)",
                      background: darkMode
                        ? "linear-gradient(180deg, #1d4ed8 0%, #1e3a8a 100%)"
                        : "linear-gradient(180deg, #2563eb 0%, #1e40af 100%)",
                    },
                  }}
                >
                  {submitting ? (
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <CircularProgress size={20} sx={{ color: "#fff" }} />
                      <span>Signing in…</span>
                    </Stack>
                  ) : (
                    "Login"
                  )}
                </Button>
              </Box>

              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{ my: 3 }}
              >
                <Divider sx={{ flex: 1 }} />
                <Typography
                  variant="caption"
                  color={darkMode ? "grey.300" : "text.secondary"}
                >
                  OR
                </Typography>
                <Divider sx={{ flex: 1 }} />
              </Stack>

              <Box display="flex" justifyContent="center" mb={2}>
                <GoogleLoginButton />
              </Box>

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mt={2}
              >
                <Link
                  underline="hover"
                  sx={{ cursor: "pointer" }}
                  color={darkMode ? "primary.light" : "primary.main"}
                  onClick={() => alert("Forgot Password coming soon...")}
                >
                  Forgot Password?
                </Link>
                <Link
                  underline="hover"
                  sx={{ cursor: "pointer" }}
                  color={darkMode ? "primary.light" : "primary.main"}
                  onClick={() => navigate(ROUTES.SIGNUP)}
                >
                  Don’t have an account? Sign Up
                </Link>
              </Box>
            </Paper>
          </Box>
        </motion.div>
      </Container>

      <Snackbar
        open={snackOpen}
        onClose={() => setSnackOpen(false)}
        message="Login successful! Redirecting…"
        autoHideDuration={1500}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
};

export default LoginPage;
