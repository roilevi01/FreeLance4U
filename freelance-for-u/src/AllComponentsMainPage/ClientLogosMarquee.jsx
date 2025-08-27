import React from "react";
import { Box, Typography } from "@mui/material";
import Marquee from "react-fast-marquee";
import "./styles/ClientLogosMarquee.css";

const clientLogos = [
  {
    src: "https://logos-world.net/wp-content/uploads/2020/09/Google-Logo.png",
    alt: "Google",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    alt: "Apple",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png",
    alt: "Microsoft",
  },
  {
    src: "https://cdn.worldvectorlogo.com/logos/facebook-3.svg",
    alt: "Meta (Facebook)",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    alt: "IBM",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
    alt: "Slack",
  },
];

export default function ClientLogosMarquee() {
  return (
    <Box className="clm section">
      <div className="container">
        <Typography
          variant="h4"
          align="center"
          className="clm__title gradient-text"
        >
          🏆 Powering Ambitions Worldwide
        </Typography>
        <div className="clm__rule" />
        <Typography align="center" className="clm__subtitle">
          The biggest names in tech trust Freelance4U — and so can you.
        </Typography>

        <div className="clm__marqueeWrap">
          <Marquee pauseOnHover gradient={false} speed={48}>
            {clientLogos.map((logo, index) => (
              <Box
                key={index}
                component="img"
                src={logo.src}
                alt={logo.alt}
                title={logo.alt}
                className="clm__logo"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ))}
          </Marquee>
        </div>
      </div>
    </Box>
  );
}
