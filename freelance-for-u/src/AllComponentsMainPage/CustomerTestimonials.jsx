// src/components/CustomerTestimonials.jsx
import { Box, Typography, Avatar, Grid, Paper } from "@mui/material";

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
    <Box sx={{ my: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>
        What Our Clients Say
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {testimonials.map((t, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
              <Avatar
                src={t.image}
                alt={t.name}
                sx={{ width: 70, height: 70, margin: "0 auto" }}
              />
              <Typography variant="h6" mt={2}>
                {t.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {t.role}
              </Typography>
              <Typography mt={2} variant="body1">
                "{t.quote}"
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
