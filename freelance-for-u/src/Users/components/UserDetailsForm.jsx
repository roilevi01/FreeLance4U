import { Box, Grid, TextField, Typography, Button } from "@mui/material";

export default function UserDetailsForm({ formData, onChange, onSubmit }) {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      p={4}
      boxShadow={3}
      borderRadius={3}
    >
      <Typography variant="h6" gutterBottom>
        Account Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Username"
            name="username"
            fullWidth
            value={formData.username}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email address"
            name="email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={onChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Change Password
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Current Password"
            name="currentPassword"
            type="password"
            fullWidth
            value={formData.currentPassword}
            onChange={onChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="New Password"
            name="newPassword"
            type="password"
            fullWidth
            value={formData.newPassword}
            onChange={onChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Confirm New Password"
            name="confirmPassword"
            type="password"
            fullWidth
            value={formData.confirmPassword}
            onChange={onChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Save changes
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
