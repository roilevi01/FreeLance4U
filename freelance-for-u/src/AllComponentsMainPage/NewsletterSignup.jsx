import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Fade,
  Zoom,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./styles/NewsletterSignup.css";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
    setEmail("");
  };

  return (
    <Box className="nl section">
      <div className="container">
        <Zoom in timeout={800}>
          <Typography variant="h3" align="center" className="nl__title">
            Stay in the Loop 📬
          </Typography>
        </Zoom>

        <Typography align="center" className="nl__subtitle">
          Join thousands getting the latest freelance insights delivered
          monthly.
        </Typography>

        <Box component="form" onSubmit={handleSubscribe} className="nl__form">
          <TextField
            type="email"
            label="Your email"
            variant="outlined"
            required
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="nl__field"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon className="nl__icon" />
                </InputAdornment>
              ),
            }}
          />

          <Button type="submit" size="large" className="nl__btn">
            Subscribe
          </Button>
        </Box>

        <Fade in={submitted} timeout={400} unmountOnExit>
          <Typography align="center" className="nl__success">
            <CheckCircleIcon className="nl__successIcon" />
            You’re now subscribed!
          </Typography>
        </Fade>
      </div>
    </Box>
  );
}
