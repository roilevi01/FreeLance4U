import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const LeftAd = () => {
  return (
    <Box
      component={motion.div}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      sx={{
        background: "linear-gradient(135deg, #2193b0, #6dd5ed)",
        height: "100%",
        padding: 4,
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Showcase Your Business
      </Typography>
      <Typography>
        Create stunning digital cards and attract more clients effortlessly.
      </Typography>
    </Box>
  );
};

export default LeftAd;
