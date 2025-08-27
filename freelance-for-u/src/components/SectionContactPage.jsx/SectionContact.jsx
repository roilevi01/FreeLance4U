import { Box, Button, TextField, Typography, Container } from "@mui/material";
import { motion } from "framer-motion";

export default function SectionContact({ withWave = false }) {
  return (
    <Box
      sx={{
        position: "relative", 
        width: "100%",
        bgcolor: "#dc6601",
        py: 6,
        overflow: "hidden", 
      }}
    >
      <Container
        maxWidth="xl"
        sx={{ maxWidth: "1300px", mx: "auto", px: { xs: 2, sm: 3 } }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 4,
            color: "white",
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ flex: 1 }}
          >
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Poppins",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Our <span style={{ color: "black" }}>Newsletters</span>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 2,
                fontFamily: "Poppins",
                color: "#fff",
                opacity: 0.9,
              }}
            >
              Join us for professional, fast, and reliable service. We're here
              to help grow your business, connect with new clients, and deliver
              real results. Our platform is easy to use, and our team is always
              available for support. Start today and feel the difference!
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ flex: 1 }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                gap: 2,
              }}
            >
              <TextField
                variant="outlined"
                placeholder="Enter your email"
                fullWidth
                sx={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  fontFamily: "Poppins",
                  "& input": { fontSize: "16px" },
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  textTransform: "uppercase",
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  px: 4,
                  height: "56px",
                  borderRadius: "10px",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
                  transition: "all 0.3s",
                  "&:hover": {
                    backgroundColor: "#333",
                    transform: "translateY(-2px)",
                  },
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                Submit
              </Button>
            </Box>
          </motion.div>
        </Box>
      </Container>

      {withWave && (
        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: -1,
            height: { xs: 50, md: 80 },
            lineHeight: 0,
          }}
        >
          <svg
            viewBox="0 0 1200 80"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "100%" }}
          >
            <path
              d="M0,0 C300,100 900,-100 1200,0 L1200,80 L0,80 Z"
              style={{ fill: "#1a1a1a" }} 
            />
          </svg>
        </Box>
      )}
    </Box>
  );
}
