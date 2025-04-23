import { Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#1e293b",
        color: "#fff",
        py: 6,
        px: { xs: 3, md: 8 },
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Stay in the Loop
      </Typography>
      <Typography variant="subtitle1" color="#cbd5e1" mb={3}>
        Subscribe to our newsletter and never miss an update!
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubscribe}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          maxWidth: 600,
          mx: "auto",
        }}
      >
        <TextField
          type="email"
          label="Your email"
          variant="filled"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ backgroundColor: "#fff", borderRadius: 1 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ minWidth: 150 }}
        >
          Subscribe
        </Button>
      </Box>

      {submitted && (
        <Typography mt={2} color="lightgreen">
          🎉 Thanks for subscribing!
        </Typography>
      )}
    </Box>
  );
}
