import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import { Send, Email, Phone, Person } from "@mui/icons-material";
import { Grid2 } from "@mui/material";

import useContactFormLogic from "../../hooks/useContactFormLogic";

export default function FormLeftSide() {
  const { formik, loading, success, setSuccess } = useContactFormLogic();

  return (
    <Box
      sx={{
        padding: "25px",
        maxWidth: "450px",
        margin: "auto",
        maxHeight: "550px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: "7px",
          textAlign: "center",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        Contact Us
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Grid2 container direction="column" spacing={3}>
          <Grid2 item>
            <Tooltip title="Enter your full name" arrow>
              <TextField
                fullWidth
                label="Your Name"
                name="name"
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                InputProps={{
                  startAdornment: <Person sx={{ color: "gray", mr: 1 }} />,
                }}
                sx={{ "& .MuiInputBase-root": { height: "50px" } }}
              />
            </Tooltip>
          </Grid2>

          <Grid2 item>
            <Tooltip title="Enter a valid email address" arrow>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputProps={{
                  startAdornment: <Email sx={{ color: "gray", mr: 1 }} />,
                }}
                sx={{ "& .MuiInputBase-root": { height: "50px" } }}
              />
            </Tooltip>
          </Grid2>

          <Grid2 item>
            <Tooltip title="Enter your phone number" arrow>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                type="tel"
                variant="outlined"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                InputProps={{
                  startAdornment: <Phone sx={{ color: "gray", mr: 1 }} />,
                }}
                sx={{ "& .MuiInputBase-root": { height: "50px" } }}
              />
            </Tooltip>
          </Grid2>

          <Grid2 item>
            <Tooltip title="Enter your message (minimum 10 characters)" arrow>
              <TextField
                fullWidth
                label="Message"
                name="message"
                multiline
                rows={4}
                variant="outlined"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={formik.touched.message && formik.errors.message}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
              />
            </Tooltip>
          </Grid2>

          <Grid2 item>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<Send />}
              disabled={loading}
              sx={{
                fontWeight: "bold",
                fontSize: "16px",
                height: "50px",
                borderRadius: "8px",
                backgroundColor: "#007BFF",
                "&:hover": { backgroundColor: "#0056b3" },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Send"
              )}
            </Button>
          </Grid2>
        </Grid2>
      </form>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        message="Message sent successfully!"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: "#4caf50",
            color: "#fff",
          },
        }}
      />
    </Box>
  );
}
