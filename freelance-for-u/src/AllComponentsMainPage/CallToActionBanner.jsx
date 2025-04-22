// src/components/CallToActionBanner.jsx
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";

export default function CallToActionBanner() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #1976d2, #42a5f5)",
        color: "#fff",
        py: 6,
        px: 4,
        textAlign: "center",
        borderRadius: 3,
        mt: 6,
        mx: "auto",
        maxWidth: "900px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Ready to Boost Your Business?
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Join Freelance4U today and showcase your talent to the world or find
        top-rated professionals to get your job done.
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate(ROUTES.SIGNUP)}
        sx={{ fontWeight: "bold", px: 4, py: 1.5, borderRadius: 5 }}
      >
        Get Started
      </Button>
    </Box>
  );
}
