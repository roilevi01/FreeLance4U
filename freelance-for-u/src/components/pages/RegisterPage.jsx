import { useMemo, useState } from "react";
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
  InputAdornment,
  IconButton,
  Snackbar,
  LinearProgress,
  Avatar,
  Stack,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import PersonOutlineTwoToneIcon from "@mui/icons-material/PersonOutlineTwoTone";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import LockTwoToneIcon from "@mui/icons-material/LockTwoTone";
import ImageTwoToneIcon from "@mui/icons-material/ImageTwoTone";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import LeftAd from "../../AdsComponents/LeftAd";
import RightAd from "../../AdsComponents/RightAd";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    passwordHash: "",
    profilePicture: "",
    role: "User",
  });

  const [error, setError] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const emailError =
    formData.email.length > 0 &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  const passwordStrength = useMemo(() => {
    const pwd = formData.passwordHash || "";
    const rules = [
      /.{8,}/.test(pwd),
      /[A-Z]/.test(pwd),
      /[a-z]/.test(pwd),
      /[0-9]/.test(pwd),
      /[^A-Za-z0-9]/.test(pwd),
    ];
    const score = rules.filter(Boolean).length;
    return {
      score,
      label:
        score <= 2
          ? "Weak"
          : score === 3
          ? "Medium"
          : score === 4
          ? "Strong"
          : "Very strong",
      value: (score / 5) * 100,
    };
  }, [formData.passwordHash]);

  const validImage = useMemo(() => {
    if (!formData.profilePicture) return false;
    try {
      new URL(formData.profilePicture);
      return true;
    } catch {
      return false;
    }
  }, [formData.profilePicture]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailError) {
      setError("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    try {
      await axios.post("https://localhost:7012/api/user/register", formData);
      setSuccessOpen(true);
      setTimeout(() => navigate(ROUTES.LOGIN), 900);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        (typeof err.response?.data === "string" ? err.response.data : "") ||
        "An error occurred";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(135deg, #f7f9fc 0%, #e8eef6 50%, #f7faff 100%)",
      }}
    >
      <Container maxWidth="lg" sx={{ flex: 1, py: { xs: 4, md: 6 } }}>
        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} md={3} sx={{ order: { xs: 2, md: 1 } }}>
            <Box
              sx={{
                position: { md: "sticky" },
                top: { md: 24 },
                height: "100%",
              }}
            >
              <LeftAd />
            </Box>
          </Grid>

          <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
            <Container maxWidth="sm" disableGutters>
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Paper
                  elevation={8}
                  sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: 3,
                    backdropFilter: "blur(6px)",
                    backgroundColor: "rgba(255,255,255,0.92)",
                    boxShadow:
                      "0 10px 28px rgba(2,6,23,0.10), 0 2px 10px rgba(2,6,23,0.06)",
                    position: "relative",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 900, letterSpacing: "-0.02em", mb: 0.5 }}
                  >
                    Create Your Account
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Join the community and start showcasing your work.
                  </Typography>

                  {error && (
                    <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                      {error}
                    </Alert>
                  )}

                  <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                      fullWidth
                      label="Username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      margin="normal"
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonOutlineTwoToneIcon />
                          </InputAdornment>
                        ),
                      }}
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
                      error={!!emailError}
                      helperText={emailError ? "Invalid email format" : " "}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailTwoToneIcon />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Password"
                      name="passwordHash"
                      type={showPwd ? "text" : "password"}
                      value={formData.passwordHash}
                      onChange={handleChange}
                      margin="normal"
                      required
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

                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      sx={{ mt: 1, mb: 1 }}
                    >
                      <LinearProgress
                        variant="determinate"
                        value={passwordStrength.value}
                        sx={{
                          flex: 1,
                          height: 8,
                          borderRadius: 999,
                          backgroundColor: "#e5e7eb",
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 999,
                            background:
                              passwordStrength.score <= 2
                                ? "linear-gradient(90deg,#ef4444,#f59e0b)"
                                : passwordStrength.score === 3
                                ? "linear-gradient(90deg,#f59e0b,#10b981)"
                                : "linear-gradient(90deg,#10b981,#2563eb)",
                          },
                        }}
                      />
                      <Typography
                        variant="caption"
                        color={
                          passwordStrength.score <= 2
                            ? "error.main"
                            : passwordStrength.score === 3
                            ? "warning.main"
                            : "success.main"
                        }
                        sx={{
                          fontWeight: 700,
                          minWidth: 86,
                          textAlign: "right",
                        }}
                      >
                        {passwordStrength.label}
                      </Typography>
                    </Stack>

                    <TextField
                      fullWidth
                      label="Profile Picture URL (optional)"
                      name="profilePicture"
                      value={formData.profilePicture}
                      onChange={handleChange}
                      margin="normal"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ImageTwoToneIcon />
                          </InputAdornment>
                        ),
                      }}
                    />

                    {validImage && (
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1.5}
                        sx={{ mt: 0.5 }}
                      >
                        <Avatar
                          alt="Preview"
                          src={formData.profilePicture}
                          sx={{
                            width: 40,
                            height: 40,
                            border: "2px solid #e2e8f0",
                          }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          Preview loaded from URL
                        </Typography>
                      </Stack>
                    )}

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={submitting}
                      sx={{
                        mt: 3,
                        py: 1.4,
                        fontWeight: 800,
                        letterSpacing: ".2px",
                        borderRadius: 999,
                        textTransform: "none",
                        boxShadow: "0 14px 30px rgba(37,99,235,0.25)",
                        background:
                          "linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)",
                        "&:hover": {
                          boxShadow: "0 18px 42px rgba(37,99,235,0.35)",
                          transform: "translateY(-1px)",
                          background:
                            "linear-gradient(180deg, #2563eb 0%, #1e40af 100%)",
                        },
                      }}
                    >
                      {submitting ? "Creating account…" : "Register"}
                    </Button>

                    <Stack
                      direction="row"
                      justifyContent="center"
                      spacing={1}
                      sx={{ mt: 2 }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Already have an account?
                      </Typography>
                      <Button
                        variant="text"
                        onClick={() => navigate(ROUTES.LOGIN)}
                        sx={{
                          textTransform: "none",
                          fontWeight: 800,
                          p: 0,
                          minWidth: 0,
                        }}
                      >
                        Log in
                      </Button>
                    </Stack>
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  <Stack direction="row" spacing={1} alignItems="center">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Yes_Check_Circle.svg"
                      alt=""
                      width={16}
                      height={16}
                      style={{ opacity: 0.8 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      We protect your data with industry-standard encryption.
                    </Typography>
                  </Stack>
                </Paper>
              </motion.div>
            </Container>
          </Grid>

          <Grid item xs={12} md={3} sx={{ order: { xs: 3, md: 3 } }}>
            <Box
              sx={{
                position: { md: "sticky" },
                top: { md: 24 },
                height: "100%",
              }}
            >
              <RightAd />
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        message="Registration successful! Redirecting to login…"
        autoHideDuration={1500}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
};

export default RegisterPage;
