import React from "react";
import { Box, Typography, Grid, Paper, Avatar, Button } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { motion } from "framer-motion";
import "./styles/TestimonialsSection.css";

const testimonials = [
  {
    name: "Noa Levi",
    role: "Small Business Owner",
    feedback:
      "Freelance4U helped me find a reliable designer within a day. I finally feel my business has a visual identity I'm proud of!",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Daniel Cohen",
    role: "Full Stack Developer",
    feedback:
      "Through Freelance4U I found long-term clients. Now I work on my own terms with people who value my work.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Maya Shapira",
    role: "Marketing Specialist",
    feedback:
      "What amazed me the most is how quickly I found top-tier talent. The support team made me feel like family.",
    image: "https://randomuser.me/api/portraits/women/88.jpg",
  },
];

export default function TestimonialsSection() {
  return (
    <Box className="ts section">
      <div className="container">
        <Typography
          variant="h2"
          align="center"
          className="ts__title gradient-text"
        >
          ❤️ They Loved It — So Will You
        </Typography>
        <div className="ts__rule" />
        <Typography align="center" className="ts__subtitle">
          Hear from creators, dreamers, and doers who turned their passion into
          progress with Freelance4U.
        </Typography>

        <Grid
          container
          spacing={4}
          justifyContent="center"
          className="ts__grid"
        >
          {testimonials.map((t, i) => (
            <Grid item xs={12} sm={6} md={4} key={t.name}>
              <motion.div
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <div className="ts__outer">
                  <Paper elevation={0} className="ts__card">
                    <span className="ts__shine" />
                    <FormatQuoteIcon className="ts__quoteIcon" />
                    <div className="ts__header">
                      <div className="ts__avatarWrap">
                        <Avatar
                          src={t.image}
                          alt={t.name}
                          className="ts__avatar"
                        />
                      </div>
                      <Typography variant="subtitle1" className="ts__name">
                        {t.name}
                      </Typography>
                      <Typography variant="caption" className="ts__role">
                        {t.role}
                      </Typography>
                    </div>

                    <Typography variant="body1" className="ts__feedback">
                      “{t.feedback}”
                    </Typography>
                  </Paper>
                </div>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Box className="ts__ctaWrap">
          <Button variant="contained" className="ts__ctaBtn">
            Be the Next Success Story
          </Button>
        </Box>
      </div>
    </Box>
  );
}
