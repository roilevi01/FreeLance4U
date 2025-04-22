// src/components/Contact/SnackbarFeedback.jsx
import { Snackbar, Alert } from "@mui/material";

const SnackbarFeedback = ({ open, message, severity = "success", onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        severity={severity}
        onClose={onClose}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarFeedback;
