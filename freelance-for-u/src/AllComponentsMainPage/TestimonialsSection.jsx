import { Box, Typography, Grid, Paper, Avatar } from "@mui/material";

const testimonials = [
  {
    name: "Noa Levi",
    role: "Small Business Owner",
    feedback:
      "Freelance4U helped me find a reliable designer within a day. Amazing platform!",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Daniel Cohen",
    role: "Full Stack Developer",
    feedback:
      "Through Freelance4U I found long-term clients. It really elevated my freelance career!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Maya Shapira",
    role: "Marketing Specialist",
    feedback:
      "The process is smooth, and the support team is responsive and helpful!",
    image: "https://randomuser.me/api/portraits/women/88.jpg",
  },
];

export default function TestimonialsSection() {
  return (
    <Box sx={{ py: 6, px: 4, backgroundColor: "#f4f6f8", mt: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>
        What Our Users Say
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {testimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3, height: "100%" }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar
                  src={testimonial.image}
                  alt={testimonial.name}
                  sx={{ width: 56, height: 56, mr: 2 }}
                />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {testimonial.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {testimonial.role}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                “{testimonial.feedback}”
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
