import React from "react";
import "./styles/CustomerTestimonials.css";
import { Box, Typography, Avatar, Grid, Paper, Divider } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

const testimonials = [
  {
    name: "Noa Levi",
    role: "Entrepreneur",
    quote:
      "Freelance4U helped me build my vision into reality with precision and care!",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "David Cohen",
    role: "Startup CTO",
    quote:
      "Highly professional team that delivers top-notch web solutions. Recommended!",
    image: "https://randomuser.me/api/portraits/men/42.jpg",
  },
  {
    name: "Maya Bar",
    role: "Marketing Director",
    quote:
      "Creative, reliable, and fast! Freelance4U took our brand to the next level.",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
  },
];

export default function CustomerTestimonials() {
  return (
    <section className="ct">
      <div className="ct__bg" aria-hidden />
      <div className="ct__container">
        <Typography className="ct__title" variant="h2" component="h2">
          Our Clients Speak From Experience
        </Typography>

        <Typography className="ct__subtitle" variant="subtitle1">
          Hear directly from professionals who’ve worked with us — their trust
          is our proof.
        </Typography>

        <Grid
          container
          spacing={4}
          justifyContent="center"
          className="ct__grid"
        >
          {testimonials.map((t, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              {/* מסגרת קוניק־גרדיאנט */}
              <div className="ct__outer">
                <Paper className="ct__card" elevation={0}>
                  <div className="ct__shine" aria-hidden />

                  <Box className="ct__header" textAlign="center">
                    <div className="ct__avatar-wrap">
                      <Avatar
                        src={t.image}
                        alt={t.name}
                        className="ct__avatar"
                      />
                    </div>
                    <Typography
                      className="ct__name"
                      variant="h6"
                      component="h3"
                    >
                      {t.name}
                    </Typography>
                    <Typography className="ct__role" variant="subtitle2">
                      {t.role}
                    </Typography>
                  </Box>

                  <Divider className="ct__divider" />

                  <Box className="ct__quote" textAlign="center">
                    <FormatQuoteIcon className="ct__quoteIcon" />
                    <Typography className="ct__quoteText" variant="body1">
                      “{t.quote}”
                    </Typography>
                  </Box>
                </Paper>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </section>
  );
}
