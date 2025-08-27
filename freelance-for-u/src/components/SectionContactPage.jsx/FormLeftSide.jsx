import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  CircularProgress,
  Tooltip,
  InputAdornment,
} from "@mui/material";
import { Send, Email, Phone, Person } from "@mui/icons-material";
import useContactFormLogic from "../../hooks/useContactFormLogic";
import { motion } from "framer-motion";

export default function FormLeftSide() {
  const { formik, loading, success, setSuccess } = useContactFormLogic();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 800,
          padding: { xs: "30px", sm: "50px" },
          margin: "auto",
          borderRadius: "20px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
          background: "linear-gradient(145deg, #ffffff, #f9f9f9)",
          border: "1px solid #eee",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontFamily: "Poppins",
            textAlign: "center",
            fontWeight: 800,
            color: "#dc6601",
            textTransform: "uppercase",
            letterSpacing: "2px",
            mb: 4,
          }}
        >
          Let's Talk
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Box display="flex" flexDirection="column" gap={3}>
            {[
              {
                name: "name",
                label: "Full Name",
                type: "text",
                placeholder: "John Doe",
                icon: <Person sx={{ color: "#dc6601" }} />,
                tooltip: "Enter your full name",
              },
              {
                name: "email",
                label: "Email",
                type: "email",
                placeholder: "you@email.com",
                icon: <Email sx={{ color: "#dc6601" }} />,
                tooltip: "Enter a valid email address",
              },
              {
                name: "phone",
                label: "Phone",
                type: "tel",
                placeholder: "052-1234567",
                icon: <Phone sx={{ color: "#dc6601" }} />,
                tooltip: "Enter your phone number",
              },
            ].map(({ name, label, type, placeholder, icon, tooltip }) => (
              <Tooltip title={tooltip} arrow key={name}>
                <TextField
                  label={label}
                  name={name}
                  type={type}
                  fullWidth
                  variant="outlined"
                  placeholder={placeholder}
                  value={formik.values[name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched[name] && Boolean(formik.errors[name])}
                  helperText={formik.touched[name] && formik.errors[name]}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">{icon}</InputAdornment>
                    ),
                  }}
                  sx={{
                    "& input": { fontFamily: "Poppins", fontSize: "16px" },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "14px",
                      transition: "0.3s",
                      "&:hover": {
                        boxShadow: "0 0 5px rgba(220,102,1,0.4)",
                      },
                      "&.Mui-focused": {
                        borderColor: "#dc6601",
                        boxShadow: "0 0 10px rgba(220,102,1,0.6)",
                      },
                    },
                  }}
                />
              </Tooltip>
            ))}

            <Tooltip title="Write your message here" arrow>
              <TextField
                label="Message"
                name="message"
                multiline
                rows={5}
                fullWidth
                variant="outlined"
                placeholder="Tell us what's on your mind..."
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={formik.touched.message && formik.errors.message}
                sx={{
                  "& textarea": { fontFamily: "Poppins", fontSize: "15px" },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    transition: "0.3s",
                    "&:hover": {
                      boxShadow: "0 0 5px rgba(220,102,1,0.4)",
                    },
                    "&.Mui-focused": {
                      borderColor: "#dc6601",
                      boxShadow: "0 0 10px rgba(220,102,1,0.6)",
                    },
                  },
                }}
              />
            </Tooltip>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              startIcon={<Send />}
              sx={{
                fontFamily: "Poppins",
                fontSize: "17px",
                fontWeight: 600,
                height: "55px",
                borderRadius: "14px",
                background: "linear-gradient(90deg, #dc6601, #f29300)",
                color: "#fff",
                boxShadow: "0 8px 20px rgba(220,102,1,0.3)",
                "&:hover": {
                  background: "linear-gradient(90deg, #c45300, #e07c00)",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Send Message"
              )}
            </Button>
          </Box>
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
              fontFamily: "Poppins",
              fontSize: "15px",
              fontWeight: "bold",
            },
          }}
        />
      </Box>
    </motion.div>
  );
}
