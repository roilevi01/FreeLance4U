import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { Code, DesignServices, SupportAgent } from "@mui/icons-material";
import "./styles/FeaturesShowcase.css";

const features = [
  {
    title: "Custom Development",
    description: "Tailored software solutions crafted exactly for your needs.",
    icon: Code,
    variant: "blue",
  },
  {
    title: "Creative Design",
    description: "Modern, engaging and user-focused visual experiences.",
    icon: DesignServices,
    variant: "rose",
  },
  {
    title: "Ongoing Support",
    description:
      "We’re here for you 24/7 to ensure your project runs smoothly.",
    icon: SupportAgent,
    variant: "mint",
  },
];

const FeaturesShowcase = () => {
  return (
    <Box className="fs section">
      <div className="container">
        <Typography
          variant="h3"
          align="center"
          className="fs__title gradient-text"
        >
          What We Offer
        </Typography>
        <div className="fs__rule" />
        <Typography align="center" className="fs__subtitle">
          A full-stack experience crafted for excellence.
        </Typography>

        <Grid container spacing={3} className="fs__grid">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Grid item xs={12} md={4} key={f.title}>
                <div className="fs__outer">
                  <div className={`fs__card fs__card--${f.variant}`}>
                    <div className="fs__shine" />
                    <div className="fs__watermark">
                      <Icon className="fs__wmIcon" />
                    </div>

                    <div className={`fs__icon fs__icon--${f.variant}`}>
                      <div className="fs__iconCircle">
                        <Icon className="fs__iconSymbol" />
                      </div>
                    </div>

                    <h3 className="fs__heading">{f.title}</h3>
                    <p className="fs__desc">{f.description}</p>
                  </div>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </Box>
  );
};

export default FeaturesShowcase;
