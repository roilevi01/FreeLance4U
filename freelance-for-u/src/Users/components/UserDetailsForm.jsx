import React, { useMemo, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Stack,
  Divider,
  InputAdornment,
  IconButton,
  LinearProgress,
  Chip,
} from "@mui/material";
import PersonOutlineTwoToneIcon from "@mui/icons-material/PersonOutlineTwoTone";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import LockTwoToneIcon from "@mui/icons-material/LockTwoTone";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";

const fieldSx = {
  "& .MuiInputLabel-root": { color: "#475569" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#2563eb" },
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    backgroundColor: "#f3f4f6",
    "& fieldset": { borderColor: "#cbd5e1" },
    "&:hover fieldset": { borderColor: "#2563eb" },
    "&.Mui-focused fieldset": { borderColor: "#2563eb", borderWidth: 1.5 },
    "& .MuiInputAdornment-root svg": { color: "#64748b" },
  },
};

export default function UserDetailsForm({ formData, onChange, onSubmit }) {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const emailError =
    formData.email?.length > 0 &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email || "");

  const pwd = formData.newPassword || "";
  const rules = useMemo(
    () => ({
      length: /.{8,}/.test(pwd),
      upper: /[A-Z]/.test(pwd),
      lower: /[a-z]/.test(pwd),
      digit: /[0-9]/.test(pwd),
      symbol: /[^A-Za-z0-9]/.test(pwd),
    }),
    [pwd]
  );

  const strengthScore = Object.values(rules).filter(Boolean).length;
  const strengthValue = (strengthScore / 5) * 100;
  const strengthLabel =
    strengthScore <= 2
      ? "Weak"
      : strengthScore === 3
      ? "Medium"
      : strengthScore === 4
      ? "Strong"
      : "Very strong";

  const confirmMismatch =
    (formData.newPassword?.length || 0) > 0 &&
    formData.confirmPassword !== formData.newPassword;

  const disableSubmit =
    !!emailError ||
    ((formData.newPassword?.length ||
      formData.confirmPassword?.length ||
      formData.currentPassword?.length) &&
      (confirmMismatch || !rules.length));

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 3,
        boxShadow: "0 16px 36px rgba(2,6,23,0.08)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,255,255,0.92))",
        border: "1px solid rgba(2,6,23,0.06)",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 900,
          letterSpacing: "-.02em",
          mb: 0.5,
          backgroundImage: "linear-gradient(90deg,#0ea5e9,#a78bfa 50%,#22d3ee)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        Account Details
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Update your profile info or change your password. Leave password fields
        empty to keep your current password.
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            autoComplete="username"
            label="Username"
            name="username"
            fullWidth
            value={formData.username}
            onChange={onChange}
            sx={fieldSx}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineTwoToneIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            autoComplete="email"
            label="Email address"
            name="email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={onChange}
            error={!!emailError}
            helperText={emailError ? "Invalid email format" : " "}
            sx={fieldSx}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailTwoToneIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 0.5 }} />
          <Typography variant="h6" sx={{ mt: 1, fontWeight: 800 }}>
            Change Password
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Use at least 8 characters, including upper/lowercase, a number and a
            symbol.
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            autoComplete="current-password"
            label="Current Password"
            name="currentPassword"
            type={showCurrent ? "text" : "password"}
            fullWidth
            value={formData.currentPassword}
            onChange={onChange}
            sx={fieldSx}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockTwoToneIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showCurrent ? "Hide password" : "Show password"}
                    onClick={() => setShowCurrent((v) => !v)}
                    edge="end"
                  >
                    {showCurrent ? (
                      <VisibilityOffRoundedIcon />
                    ) : (
                      <VisibilityRoundedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            autoComplete="new-password"
            label="New Password"
            name="newPassword"
            type={showNew ? "text" : "password"}
            fullWidth
            value={formData.newPassword}
            onChange={onChange}
            sx={fieldSx}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockTwoToneIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showNew ? "Hide password" : "Show password"}
                    onClick={() => setShowNew((v) => !v)}
                    edge="end"
                  >
                    {showNew ? (
                      <VisibilityOffRoundedIcon />
                    ) : (
                      <VisibilityRoundedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
            <LinearProgress
              variant="determinate"
              value={strengthValue}
              sx={{
                flex: 1,
                height: 8,
                borderRadius: 999,
                backgroundColor: "#e5e7eb",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 999,
                  background:
                    strengthScore <= 2
                      ? "linear-gradient(90deg,#ef4444,#f59e0b)"
                      : strengthScore === 3
                      ? "linear-gradient(90deg,#f59e0b,#10b981)"
                      : "linear-gradient(90deg,#10b981,#2563eb)",
                },
              }}
            />
            <Typography
              variant="caption"
              color={
                strengthScore <= 2
                  ? "error.main"
                  : strengthScore === 3
                  ? "warning.main"
                  : "success.main"
              }
              sx={{ fontWeight: 700, minWidth: 92, textAlign: "right" }}
            >
              {strengthLabel}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
            <Chip
              size="small"
              icon={
                rules.length ? (
                  <CheckCircleRoundedIcon color="success" />
                ) : (
                  <ErrorOutlineRoundedIcon color="error" />
                )
              }
              label="8+ chars"
              variant={rules.length ? "filled" : "outlined"}
              color={rules.length ? "success" : "default"}
            />
            <Chip
              size="small"
              icon={
                rules.upper ? (
                  <CheckCircleRoundedIcon color="success" />
                ) : (
                  <ErrorOutlineRoundedIcon color="error" />
                )
              }
              label="Uppercase"
              variant={rules.upper ? "filled" : "outlined"}
              color={rules.upper ? "success" : "default"}
            />
            <Chip
              size="small"
              icon={
                rules.lower ? (
                  <CheckCircleRoundedIcon color="success" />
                ) : (
                  <ErrorOutlineRoundedIcon color="error" />
                )
              }
              label="Lowercase"
              variant={rules.lower ? "filled" : "outlined"}
              color={rules.lower ? "success" : "default"}
            />
            <Chip
              size="small"
              icon={
                rules.digit ? (
                  <CheckCircleRoundedIcon color="success" />
                ) : (
                  <ErrorOutlineRoundedIcon color="error" />
                )
              }
              label="Number"
              variant={rules.digit ? "filled" : "outlined"}
              color={rules.digit ? "success" : "default"}
            />
            <Chip
              size="small"
              icon={
                rules.symbol ? (
                  <CheckCircleRoundedIcon color="success" />
                ) : (
                  <ErrorOutlineRoundedIcon color="error" />
                )
              }
              label="Symbol"
              variant={rules.symbol ? "filled" : "outlined"}
              color={rules.symbol ? "success" : "default"}
            />
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            autoComplete="new-password"
            label="Confirm New Password"
            name="confirmPassword"
            type={showConfirm ? "text" : "password"}
            fullWidth
            value={formData.confirmPassword}
            onChange={onChange}
            error={!!confirmMismatch}
            helperText={confirmMismatch ? "Passwords do not match" : " "}
            sx={fieldSx}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockTwoToneIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                    onClick={() => setShowConfirm((v) => !v)}
                    edge="end"
                  >
                    {showConfirm ? (
                      <VisibilityOffRoundedIcon />
                    ) : (
                      <VisibilityRoundedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Actions */}
        <Grid item xs={12}>
          <Divider sx={{ my: 1 }} />
          <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={disableSubmit}
              sx={{
                px: 3,
                py: 1.2,
                fontWeight: 800,
                borderRadius: 999,
                textTransform: "none",
                boxShadow: "0 14px 30px rgba(37,99,235,0.25)",
                background: "linear-gradient(180deg,#3b82f6,#2563eb)",
                "&:hover": {
                  transform: "translateY(-1px)",
                  boxShadow: "0 18px 42px rgba(37,99,235,0.35)",
                  background: "linear-gradient(180deg,#2563eb,#1e40af)",
                },
              }}
            >
              Save changes
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
