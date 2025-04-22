import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";

function HomePage() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          textAlign: "center",
          mt: 8,
        }}
      >
        <Typography component="h1" variant="h3" gutterBottom>
          Welcome to Our Platform
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Manage and share your business cards effortlessly with our intuitive
          platform.
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Get Started
        </Button>
      </Box>
    </Container>
  );
}

export default HomePage;
