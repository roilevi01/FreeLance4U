import { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Button,
  Avatar,
  Typography,
  Stack,
  IconButton,
  Alert,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import RestoreRoundedIcon from "@mui/icons-material/RestoreRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

import api from "../../Services/api"; 
import { getCurrentUser } from "../../Services/authHelper"; 

const MAX_MB = 5;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const normalizeProfileImage = (img) => {
  if (!img || typeof img !== "string") return "";
  if (img.startsWith("data:image/")) return img;
  if (/^https?:\/\//i.test(img)) return img;
  if (img.startsWith("/")) return `${window.location.origin}${img}`;
  const base64 =
    /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(
      img
    );
  return base64 ? `data:image/jpeg;base64,${img}` : img;
};

const ProfileImageUpload = ({ profilePicture, onImageChange }) => {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [okMsg, setOkMsg] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [saving, setSaving] = useState(false);

  const inputRef = useRef(null);
  const dropRef = useRef(null);

  useEffect(() => {
    setPreview(profilePicture || null);
  }, [profilePicture]);

  const resetError = () => setError("");

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result); 
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const validate = (file) => {
    if (!file) return "No file selected.";
    if (!ACCEPTED.includes(file.type))
      return "Please upload JPG, PNG, WEBP, or GIF.";
    if (file.size > MAX_MB * 1024 * 1024)
      return `File is too large. Max ${MAX_MB} MB.`;
    return "";
  };

  const handleFile = useCallback(
    async (file) => {
      setOkMsg("");
      resetError();
      const err = validate(file);
      if (err) {
        setError(err);
        return;
      }
      try {
        const b64 = await toBase64(file);
        setPreview(b64);
        onImageChange?.(b64); 
      } catch {
        setError("Failed to read file. Please try a different image.");
      }
    },
    [onImageChange]
  );

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handlePaste = (e) => {
    const item = [...e.clipboardData.items].find((it) =>
      it.type.startsWith("image/")
    );
    if (item) {
      const file = item.getAsFile();
      if (file) handleFile(file);
    }
  };

  const clearImage = () => {
    setOkMsg("");
    setPreview(null);
    onImageChange?.("");
    resetError();
    if (inputRef.current) inputRef.current.value = "";
  };

  const useDefault = () => {
    setOkMsg("");
    const def = "/assets/default-avatar.png";
    setPreview(def);
    onImageChange?.(def);
    resetError();
  };

  const handleSavePhoto = async () => {
    setOkMsg("");
    resetError();
    const user = getCurrentUser();
    if (!user?.id) {
      setError("You must be logged in to update your profile picture.");
      return;
    }
    if (!preview) {
      setError("Please select an image first.");
      return;
    }

    try {
      setSaving(true);

      const current = await api.get(`/user/profile/${user.id}`);
      const username = current.data?.username || "";
      const email = current.data?.email || "";

      await api.put(`/user/update/${user.id}`, {
        username,
        email,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        profilePicture: preview,
      });

      const normalized = normalizeProfileImage(preview);
      localStorage.setItem("profilePicture", normalized);
      window.dispatchEvent(
        new CustomEvent("profile:updated", {
          detail: { profilePicture: normalized },
        })
      );

      setOkMsg("Profile photo saved successfully.");
    } catch (e) {
      const msg =
        e?.response?.data?.message ||
        e?.response?.data ||
        "Failed to save profile photo.";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box
      sx={{
        borderRadius: 3,
        p: 2.5,
        textAlign: "center",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,255,255,0.9))",
        border: "1px solid rgba(2,6,23,0.06)",
        boxShadow: "0 16px 36px rgba(2,6,23,0.06)",
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: 900, letterSpacing: "-.01em", mb: 1 }}
      >
        Profile Picture
      </Typography>
      <Typography variant="caption" color="text.secondary">
        JPG / PNG / WEBP / GIF, up to {MAX_MB} MB
      </Typography>

      <Box
        ref={dropRef}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onPaste={handlePaste}
        role="button"
        tabIndex={0}
        aria-label="Upload profile image area"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        sx={{
          mt: 2,
          p: 2,
          borderRadius: 3,
          border: "1px dashed #cbd5e1",
          outline: isDragOver ? "3px solid rgba(59,130,246,0.35)" : "none",
          background: isDragOver
            ? "linear-gradient(180deg, #eff6ff, #ffffff)"
            : "linear-gradient(180deg, #f8fafc, #ffffff)",
          transition: "all .2s ease",
          cursor: "pointer",
          userSelect: "none",
        }}
        onClick={() => inputRef.current?.click()}
      >
        <Box
          sx={{
            position: "relative",
            width: 120,
            height: 120,
            mx: "auto",
            borderRadius: "50%",
            p: "2px",
            background:
              "conic-gradient(from 180deg at 50% 50%, #60a5fa, #a78bfa, #22d3ee, #60a5fa)",
          }}
        >
          <Avatar
            src={preview || "/assets/default-avatar.png"}
            alt="Profile"
            sx={{
              width: "100%",
              height: "100%",
              border: "3px solid #fff",
              boxShadow: "0 10px 24px rgba(2,6,23,0.12)",
            }}
          />
          <Tooltip title="Change photo">
            <IconButton
              size="small"
              sx={{
                position: "absolute",
                right: -6,
                bottom: -6,
                bgcolor: "#111827",
                color: "#fff",
                "&:hover": { bgcolor: "#0f172a" },
                boxShadow: "0 6px 16px rgba(2,6,23,0.25)",
              }}
              onClick={(e) => {
                e.stopPropagation();
                inputRef.current?.click();
              }}
            >
              <EditRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        <Typography variant="body2" sx={{ mt: 1.5 }}>
          Click, drag & drop, or paste an image
        </Typography>
        <input
          ref={inputRef}
          type="file"
          hidden
          accept={ACCEPTED.join(",")}
          onChange={handleInputChange}
        />
      </Box>

      {error && (
        <Alert
          severity="error"
          sx={{ mt: 1.5, textAlign: "left", borderRadius: 2 }}
        >
          {error}
        </Alert>
      )}
      {okMsg && (
        <Alert
          severity="success"
          sx={{ mt: 1.5, textAlign: "left", borderRadius: 2 }}
        >
          {okMsg}
        </Alert>
      )}

      <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2 }}>
        <Button
          variant="contained"
          startIcon={<UploadRoundedIcon />}
          onClick={() => inputRef.current?.click()}
          sx={{
            borderRadius: 999,
            textTransform: "none",
            fontWeight: 800,
            px: 2.5,
            background: "linear-gradient(180deg,#3b82f6,#2563eb)",
            boxShadow: "0 12px 28px rgba(37,99,235,0.25)",
            "&:hover": {
              transform: "translateY(-1px)",
              background: "linear-gradient(180deg,#2563eb,#1e40af)",
              boxShadow: "0 16px 40px rgba(37,99,235,0.35)",
            },
          }}
        >
          Upload
        </Button>

        <Button
          variant="outlined"
          startIcon={<DeleteOutlineRoundedIcon />}
          onClick={clearImage}
          sx={{ borderRadius: 999, textTransform: "none" }}
        >
          Remove
        </Button>

        <Button
          variant="text"
          startIcon={<RestoreRoundedIcon />}
          onClick={useDefault}
          sx={{ textTransform: "none", fontWeight: 700 }}
        >
          Use default
        </Button>

        {/* ✅ כפתור שמירה לשרת */}
        <Button
          variant="contained"
          color="success"
          startIcon={
            saving ? (
              <CircularProgress size={18} sx={{ color: "#fff" }} />
            ) : (
              <SaveRoundedIcon />
            )
          }
          disabled={saving || !preview}
          onClick={handleSavePhoto}
          sx={{
            borderRadius: 999,
            textTransform: "none",
            fontWeight: 800,
            px: 2.5,
            background: "linear-gradient(180deg,#16a34a,#15803d)",
            "&:hover": {
              transform: "translateY(-1px)",
              background: "linear-gradient(180deg,#15803d,#166534)",
            },
          }}
        >
          {saving ? "Saving…" : "Save Photo"}
        </Button>
      </Stack>
    </Box>
  );
};

export default ProfileImageUpload;
