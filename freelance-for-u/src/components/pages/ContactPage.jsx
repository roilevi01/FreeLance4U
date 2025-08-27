import { Box, Typography } from "@mui/material";
import NavBar from "../../Header/NavBar";
import SectionContact from "../SectionContactPage.jsx/SectionContact";
import SectionInContactPage from "../SectionContactPage.jsx/SectionInContactPage";
import FooterBar from "../../Footer/FooterBar";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <NavBar />

      <Box component="main" sx={{ flex: 1 }}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: "300px", sm: "400px", md: "500px" },
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="assets/ContactPicture.png"
            alt="Contact Us"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              position: "relative",
              zIndex: 2,
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(255, 165, 0, 0.3)",
              borderRadius: "20px",
              padding: "20px 40px",
              textAlign: "center",
              boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "34px", sm: "48px", md: "60px" },
                fontWeight: 800,
                fontFamily: "'Poppins', sans-serif",
                background: "linear-gradient(90deg, #ff8c00, #ff6f00)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textTransform: "uppercase",
                letterSpacing: "3px",
              }}
            >
              Contact Us
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "16px", sm: "18px", md: "20px" },
                color: "white",
                mt: 1.5,
                fontWeight: 300,
                fontFamily: "'Open Sans', sans-serif",
              }}
            >
              Let's make something amazing together.
            </Typography>
          </motion.div>
        </Box>

        <Box sx={{ px: 2, mb: { xs: 6, md: 8 } }}>
          <SectionInContactPage />
          <SectionContact />
        </Box>
      </Box>

      <FooterBar />
    </Box>
  );
}
