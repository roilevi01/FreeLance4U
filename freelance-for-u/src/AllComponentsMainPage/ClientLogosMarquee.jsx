// src/components/ClientLogosMarquee.jsx
import { Box, Typography } from "@mui/material";
import Marquee from "react-fast-marquee";

const clientLogos = [
  "https://upload.wikimedia.org/wikipedia/commons/0/02/Google_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta_Platforms_Logo_2021.svg",
  "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
];

export default function ClientLogosMarquee() {
  return (
    <Box sx={{ py: 5, backgroundColor: "#fff" }}>
      <Typography variant="h5" align="center" gutterBottom>
        Trusted by Leading Companies
      </Typography>
      <Marquee pauseOnHover gradient={false} speed={40}>
        {clientLogos.map((logo, index) => (
          <Box
            key={index}
            component="img"
            src={logo}
            alt={`Client ${index}`}
            sx={{
              height: 40,
              mx: 4,
              filter: "grayscale(100%)",
              opacity: 0.7,
            }}
          />
        ))}
      </Marquee>
    </Box>
  );
}
