import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../Services/api";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Stack,
  Alert,
  Snackbar,
  CircularProgress,
  InputAdornment,
  IconButton,
  Divider,
  Chip,
  Card,
  CardMedia,
  Avatar,
} from "@mui/material";
import { motion } from "framer-motion";
import ROUTES from "../../../routes/routesModel";
import NavBar from "../../../Header/NavBar";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import PhoneIphoneRoundedIcon from "@mui/icons-material/PhoneIphoneRounded";
import InsertPhotoRoundedIcon from "@mui/icons-material/InsertPhotoRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

const MotionBox = motion(Box);

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");

const isUrl = (val = "") => {
  try {
    new URL(val);
    return true;
  } catch {
    return false;
  }
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?[\d-.\s]{5,}$/; 

const EditCardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [card, setCard] = useState(null);
  const [original, setOriginal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [snack, setSnack] = useState({
    open: false,
    msg: "",
    severity: "success",
  });

  
  const [touched, setTouched] = useState({});

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const res = await api.get(`/businesscards/${id}`);
        setCard(res.data);
        setOriginal(res.data);
      } catch (err) {
        setError("Failed to fetch card. Please try again.");
        console.error("Failed to fetch card:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCard();
  }, [id]);

  const handleChange = (e) => {
    setCard((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const markTouched = (name) =>
    setTouched((t) => (t[name] ? t : { ...t, [name]: true }));

  const validations = useMemo(() => {
    const v = {
      businessName:
        card?.businessName && card.businessName.trim().length >= 2
          ? ""
          : "Please enter a business name (min 2 characters).",
      description:
        card?.description && card.description.trim().length >= 10
          ? ""
          : "Please enter a description (min 10 characters).",
      contactInfo:
        card?.contactInfo && emailRegex.test(card.contactInfo)
          ? ""
          : "Please enter a valid email address.",
      phoneNumber:
        !card?.phoneNumber || phoneRegex.test(card.phoneNumber)
          ? ""
          : "Please enter a valid phone number.",
      businessImage:
        !card?.businessImage || isUrl(card.businessImage)
          ? ""
          : "Please enter a valid image URL (http/https).",
    };
    return v;
  }, [card]);

  const hasErrors = Object.values(validations).some((msg) => !!msg);

  const isDirty =
    original &&
    card &&
    [
      "businessName",
      "description",
      "contactInfo",
      "phoneNumber",
      "businessImage",
    ].some((k) => (original[k] || "") !== (card[k] || ""));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      businessName: true,
      description: true,
      contactInfo: true,
      phoneNumber: true,
      businessImage: true,
    });
    if (hasErrors) return;

    try {
      setSaving(true);
      await api.put(`/businesscards/update/${id}`, card);
      setOriginal(card);
      setSnack({
        open: true,
        msg: "Card updated successfully!",
        severity: "success",
      });
      
      setTimeout(() => navigate(ROUTES.USER_CARDS), 800);
    } catch (err) {
      console.error("Update failed:", err);
      setSnack({
        open: true,
        msg: "Update failed. Please try again.",
        severity: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <Box
          sx={{
            minHeight: "60vh",
            display: "grid",
            placeItems: "center",
            background:
              "radial-gradient(120% 120% at 0% 0%, #f1f5f9 0%, #eef2ff 55%, #ffffff 100%)",
          }}
        >
          <Stack alignItems="center" spacing={2}>
            <CircularProgress />
            <Typography color="text.secondary">Loading card…</Typography>
          </Stack>
        </Box>
      </>
    );
  }

  if (!card) {
    return (
      <>
        <NavBar />
        <Container sx={{ mt: 6 }}>
          <Alert severity="error">Could not load the card.</Alert>
        </Container>
      </>
    );
  }

  const initials = getInitials(card.businessName);
  const validImage = isUrl(card.businessImage);

  return (
    <>
      <NavBar />

    
      <Box
        sx={{
          background:
            "radial-gradient(120% 120% at 0% 0%, #f1f5f9 0%, #eef2ff 55%, #ffffff 100%)",
          pb: 8,
        }}
      >
        <Container maxWidth="md" sx={{ pt: 6 }}>
          <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              startIcon={<ArrowBackRoundedIcon />}
              onClick={() => navigate(-1)}
              sx={{ textTransform: "none" }}
            >
              Back
            </Button>
          </Box>

          <Box sx={{ textAlign: "center", position: "relative", mb: 4 }}>
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                zIndex: 0,
                pointerEvents: "none",
                "&::before, &::after": {
                  content: '""',
                  position: "absolute",
                  filter: "blur(60px)",
                  opacity: 0.6,
                  borderRadius: "50%",
                },
                "&::before": {
                  width: 240,
                  height: 240,
                  left: -40,
                  top: -30,
                  background: "linear-gradient(180deg, #60a5fa, #a78bfa)",
                },
                "&::after": {
                  width: 240,
                  height: 240,
                  right: -40,
                  bottom: -40,
                  background: "linear-gradient(180deg, #22d3ee, #60a5fa)",
                },
              }}
            />
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                position: "relative",
                zIndex: 1,
                fontWeight: 900,
                letterSpacing: "-.02em",
                lineHeight: 1.1,
                backgroundImage:
                  "linear-gradient(90deg,#0ea5e9,#a78bfa 50%,#22d3ee)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <BusinessCenterRoundedIcon sx={{ color: "#3b82f6" }} />
              Edit Business Card
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ position: "relative", zIndex: 1 }}
            >
              Update your service details and image preview in real time.
            </Typography>
            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                width: 80,
                height: 4,
                mx: "auto",
                mt: 2,
                borderRadius: 999,
                background: "linear-gradient(90deg,#3b82f6,#22d3ee)",
              }}
            />
          </Box>

          <MotionBox
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <Grid container spacing={3} alignItems="stretch">
          
              <Grid item xs={12} md={7}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2, md: 3 },
                    borderRadius: 3,
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,255,255,0.9))",
                    border: "1px solid rgba(2,6,23,0.06)",
                    boxShadow: "0 16px 36px rgba(2,6,23,0.06)",
                    position: "relative",
                  }}
                >
                  {error && (
                    <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                      {error}
                    </Alert>
                  )}

                  <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                      fullWidth
                      name="businessName"
                      label="Business Name"
                      value={card.businessName || ""}
                      onChange={handleChange}
                      onBlur={() => markTouched("businessName")}
                      error={touched.businessName && !!validations.businessName}
                      helperText={
                        touched.businessName ? validations.businessName : " "
                      }
                      margin="normal"
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <BusinessCenterRoundedIcon />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      fullWidth
                      name="description"
                      label="Description"
                      value={card.description || ""}
                      onChange={handleChange}
                      onBlur={() => markTouched("description")}
                      error={touched.description && !!validations.description}
                      helperText={
                        touched.description ? validations.description : " "
                      }
                      margin="normal"
                      multiline
                      rows={4}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <DescriptionRoundedIcon />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      fullWidth
                      name="contactInfo"
                      label="Contact Email"
                      value={card.contactInfo || ""}
                      onChange={handleChange}
                      onBlur={() => markTouched("contactInfo")}
                      error={touched.contactInfo && !!validations.contactInfo}
                      helperText={
                        touched.contactInfo ? validations.contactInfo : " "
                      }
                      margin="normal"
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MailOutlineRoundedIcon />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      fullWidth
                      name="phoneNumber"
                      label="Phone Number"
                      value={card.phoneNumber || ""}
                      onChange={handleChange}
                      onBlur={() => markTouched("phoneNumber")}
                      error={touched.phoneNumber && !!validations.phoneNumber}
                      helperText={
                        touched.phoneNumber ? validations.phoneNumber : " "
                      }
                      margin="normal"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIphoneRoundedIcon />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      fullWidth
                      name="businessImage"
                      label="Business Image URL"
                      value={card.businessImage || ""}
                      onChange={handleChange}
                      onBlur={() => markTouched("businessImage")}
                      error={
                        touched.businessImage && !!validations.businessImage
                      }
                      helperText={
                        touched.businessImage ? validations.businessImage : " "
                      }
                      margin="normal"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <InsertPhotoRoundedIcon />
                          </InputAdornment>
                        ),
                        endAdornment: card.businessImage ? (
                          <InputAdornment position="end">
                            <IconButton
                              size="small"
                              onClick={() =>
                                setCard((prev) => ({
                                  ...prev,
                                  businessImage: "",
                                }))
                              }
                              aria-label="Clear image"
                            >
                              ✕
                            </IconButton>
                          </InputAdornment>
                        ) : null,
                      }}
                    />

                    <Divider sx={{ my: 2 }} />

                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={1.5}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Chip
                        label={
                          isDirty ? "Unsaved changes" : "All changes saved"
                        }
                        color={isDirty ? "warning" : "success"}
                        variant="outlined"
                        sx={{ fontWeight: 700 }}
                      />

                      <Box sx={{ position: "relative" }}>
                        <Button
                          type="submit"
                          variant="contained"
                          startIcon={<SaveRoundedIcon />}
                          disabled={saving || !isDirty || hasErrors}
                          sx={{
                            px: 3,
                            py: 1.25,
                            borderRadius: 999,
                            textTransform: "none",
                            fontWeight: 800,
                            background:
                              "linear-gradient(180deg,#3b82f6 0%,#2563eb 100%)",
                            boxShadow: "0 12px 28px rgba(37,99,235,0.25)",
                            "&:hover": {
                              transform: "translateY(-1px)",
                              background:
                                "linear-gradient(180deg,#2563eb 0%,#1e40af 100%)",
                              boxShadow: "0 16px 40px rgba(37,99,235,0.35)",
                            },
                          }}
                        >
                          Save Changes
                        </Button>
                        {saving && (
                          <CircularProgress
                            size={26}
                            sx={{
                              color: "#fff",
                              position: "absolute",
                              right: -36,
                              top: "50%",
                              transform: "translateY(-50%)",
                            }}
                          />
                        )}
                      </Box>
                    </Stack>
                  </Box>
                </Paper>
              </Grid>

              
              <Grid item xs={12} md={5}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2, md: 2.5 },
                    borderRadius: 3,
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,255,255,0.9))",
                    border: "1px solid rgba(2,6,23,0.06)",
                    boxShadow: "0 16px 36px rgba(2,6,23,0.06)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={800} gutterBottom>
                    Live Preview
                  </Typography>

                  <Card
                    sx={{
                      borderRadius: 3,
                      overflow: "hidden",
                      boxShadow: "0 10px 24px rgba(2,6,23,0.10)",
                    }}
                  >
                    <Box sx={{ position: "relative", overflow: "hidden" }}>
                      {validImage ? (
                        <CardMedia
                          component="img"
                          image={card.businessImage}
                          alt={card.businessName}
                          sx={{
                            aspectRatio: "16/9",
                            objectFit: "cover",
                            transition: "transform .6s ease",
                            "&:hover": { transform: "scale(1.04)" },
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            aspectRatio: "16/9",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background:
                              "radial-gradient(120% 120% at 0% 0%, #e0f2fe 0%, #dbeafe 60%, #ffffff 120%)",
                          }}
                        >
                          <Stack alignItems="center" spacing={1}>
                            <Avatar
                              sx={{
                                width: 64,
                                height: 64,
                                fontWeight: 900,
                                bgcolor: "#3b82f6",
                                color: "#fff",
                              }}
                            >
                              {initials || "?"}
                            </Avatar>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Image preview unavailable
                            </Typography>
                          </Stack>
                        </Box>
                      )}
                      <Chip
                        size="small"
                        label={card.businessName || "Business"}
                        sx={{
                          position: "absolute",
                          left: 10,
                          bottom: 10,
                          bgcolor: "rgba(255,255,255,0.9)",
                          fontWeight: 700,
                        }}
                      />
                    </Box>

                    <Box sx={{ p: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 900, mb: 0.5 }}
                      >
                        {card.businessName || "Business Name"}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          mb: 1.5,
                        }}
                      >
                        {card.description ||
                          "Short description of your service…"}
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={1}
                        useFlexGap
                        flexWrap="wrap"
                      >
                        {card.contactInfo && (
                          <Chip
                            icon={<MailOutlineRoundedIcon />}
                            label={card.contactInfo}
                            variant="outlined"
                            sx={{ borderRadius: 999 }}
                          />
                        )}
                        {card.phoneNumber && (
                          <Chip
                            icon={<PhoneIphoneRoundedIcon />}
                            label={card.phoneNumber}
                            variant="outlined"
                            sx={{ borderRadius: 999 }}
                          />
                        )}
                      </Stack>
                    </Box>
                  </Card>
                </Paper>
              </Grid>
            </Grid>
          </MotionBox>
        </Container>
      </Box>

      <Snackbar
        open={snack.open}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        message={snack.msg}
        autoHideDuration={1600}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
};

export default EditCardPage;
