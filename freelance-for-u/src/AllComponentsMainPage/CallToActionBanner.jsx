import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ROUTES from "../routes/routesModel";

export default function CallToActionBanner() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
        overflow: "hidden",
        py: { xs: 8, md: 10 },
        px: 4,
        textAlign: "center",
        borderRadius: 4,
        mt: 8,
        mx: "auto",
        maxWidth: "1000px",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -50,
          left: -50,
          width: 200,
          height: 200,
          background: "radial-gradient(circle, #3b82f6, transparent 70%)",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -60,
          right: -60,
          width: 200,
          height: 200,
          background: "radial-gradient(circle, #38bdf8, transparent 70%)",
          zIndex: 0,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{ position: "relative", zIndex: 1 }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(to right, #60a5fa, #38bdf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: { xs: "2rem", md: "2.8rem" },
          }}
        >
          Ready to Boost Your Business?
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "#cbd5e1",
            maxWidth: 650,
            mx: "auto",
            mb: 4,
          }}
        >
          Join Freelance4U today and showcase your talent to the world, or find
          top-rated professionals to bring your vision to life.
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate(ROUTES.SIGNUP)}
          sx={{
            fontWeight: "bold",
            px: 5,
            py: 1.5,
            fontSize: "1rem",
            borderRadius: "50px",
            background: "linear-gradient(to right, #3b82f6, #60a5fa)",
            boxShadow: "0 6px 20px rgba(59,130,246,0.5)",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              transform: "translateY(-3px)",
              background: "linear-gradient(to right, #60a5fa, #3b82f6)",
              boxShadow: "0 10px 30px rgba(59,130,246,0.6)",
            },
          }}
        >
          Get Started
        </Button>
      </motion.div>
    </Box>
  );
}
