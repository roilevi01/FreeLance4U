import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../Services/api";
import ROUTES from "../../../routes/routesModel";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  InputAdornment,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";
import BusinessTwoToneIcon from "@mui/icons-material/BusinessTwoTone";
import DescriptionTwoToneIcon from "@mui/icons-material/DescriptionTwoTone";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import PhoneIphoneTwoToneIcon from "@mui/icons-material/PhoneIphoneTwoTone";
import ImageTwoToneIcon from "@mui/icons-material/ImageTwoTone";
import NavBar from "../../../Header/NavBar";
import FooterBar from "../../../Footer/FooterBar";

const CreateBusinessCardPage = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    description: "",
    contactInfo: "",
    businessImage: "",
    phoneNumber: "",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/businesscards/create", formData);
      
      alert("Business card created successfully!");
      navigate(ROUTES.USER_CARDS);
    } catch (err) {
      setError(err.response?.data || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <NavBar />

      
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          
          background:
            "linear-gradient(135deg, #f7f9fc 0%, #e8eef6 45%, #f7faff 100%)",
        }}
      >
        <Container
          component="main"
          maxWidth="sm"
          sx={{ flex: 1, py: { xs: 6, md: 10 } }}
        >
          <Paper
            elevation={8}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              backdropFilter: "blur(6px)",
              backgroundColor: "rgba(255,255,255,0.9)",
              boxShadow:
                "0 8px 22px rgba(2,6,23,0.08), 0 2px 6px rgba(2,6,23,0.05)",
            }}
          >
            <Box sx={{ mb: 2, textAlign: "center" }}>
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 800,
                  letterSpacing: "-0.5px",
                }}
              >
                Create Business Card
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                Fill in the details below to publish your business card.
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {error && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                fullWidth
                label="Business Name"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                margin="normal"
                required
                placeholder="e.g., Skyline Studio"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessTwoToneIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                margin="normal"
                required
                multiline
                rows={3}
                placeholder="A short paragraph about your services and value"
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ alignSelf: "flex-start", pt: 1 }}
                    >
                      <DescriptionTwoToneIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Contact Info (Email)"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                margin="normal"
                required
                placeholder="you@company.com"
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
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                margin="normal"
                required
                placeholder="+972 50-000-0000"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIphoneTwoToneIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Business Image URL"
                name="businessImage"
                value={formData.businessImage}
                onChange={handleChange}
                margin="normal"
                placeholder="https://example.com/logo.png"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ImageTwoToneIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={submitting}
                fullWidth
                sx={{
                  mt: 3,
                  py: 1.4,
                  fontWeight: 700,
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
                {submitting ? (
                  <>
                    <CircularProgress size={22} sx={{ mr: 1, color: "#fff" }} />
                    Creating...
                  </>
                ) : (
                  "Create Card"
                )}
              </Button>
            </Box>
          </Paper>
        </Container>

        
        <FooterBar />
      </Box>
    </>
  );
};

export default CreateBusinessCardPage;
