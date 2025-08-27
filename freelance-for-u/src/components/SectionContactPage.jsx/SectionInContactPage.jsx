import { Box, Typography, IconButton, Container } from "@mui/material";
import { Email, LocationOn, PhoneCallback } from "@mui/icons-material";
import FormLeftSide from "./FormLeftSide";
import { motion } from "framer-motion";

const contactInfoRow = {
  display: "flex",
  alignItems: "center",
  marginBottom: 3,
};

const textStyle = {
  fontFamily: "Poppins",
  color: "#2b2b2b",
};

export default function SectionInContactPage() {
  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #fefefe, #f9f9f9)",
        py: { xs: 6, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
            gap: { xs: 0, md: 25 },
          }}
        >
          {/* Left Side – Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ flex: 1, display: "flex" }}
          >
            <Box
              sx={{
                background: "#ffffff",
                p: { xs: 3, md: 5 },
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FormLeftSide />
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ flex: 1, display: "flex" }}
          >
            <Box
              sx={{
                background: "#f5f5f5",
                p: { xs: 3, md: 5 },
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 700,
                  color: "#dc6601",
                  textAlign: "center",
                  mb: 2,
                }}
              >
                Let's Connect
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  ...textStyle,
                  textAlign: "center",
                  mb: 4,
                  maxWidth: "90%",
                  margin: "0 auto",
                  color: "#555",
                }}
              >
                Reach out to us directly or leave your message in the form –
                we're always here to help.
              </Typography>

              <Box sx={contactInfoRow}>
                <IconButton sx={{ color: "#dc6601", mr: 1 }}>
                  <PhoneCallback />
                </IconButton>
                <Typography sx={textStyle}>052-705-1756</Typography>
              </Box>

              <Box sx={contactInfoRow}>
                <IconButton sx={{ color: "#dc6601", mr: 1 }}>
                  <Email />
                </IconButton>
                <Typography sx={textStyle}>Freelance4U@email.com</Typography>
              </Box>

              <Box sx={contactInfoRow}>
                <IconButton sx={{ color: "#dc6601", mr: 1 }}>
                  <LocationOn />
                </IconButton>
                <Typography sx={textStyle}>
                  Rehovot, Levi Eshkol 6, Israel
                </Typography>
              </Box>

              <Box sx={{ mt: 3 }}>
                <iframe
                  width="100%"
                  height="230"
                  style={{ borderRadius: "12px", border: "none" }}
                  src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=levi%20eshkol%206%20rehovot+(Freelance4U)&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                  title="Google Map"
                  loading="lazy"
                ></iframe>
              </Box>
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
