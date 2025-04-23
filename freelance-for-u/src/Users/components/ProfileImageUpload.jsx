import { useState, useEffect } from "react";
import { Box, Button, Avatar, Typography } from "@mui/material";

const ProfileImageUpload = ({ profilePicture, onImageChange }) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    setPreview(profilePicture || null);
  }, [profilePicture]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onImageChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: 2,
        padding: 2,
        textAlign: "center",
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h6" mb={2}>
        Profile Picture
      </Typography>
      <Avatar
        src={preview || "/assets/default-avatar.png"}
        alt="Profile"
        sx={{ width: 100, height: 100, margin: "0 auto" }}
      />
      <Typography variant="caption" display="block" mt={1} mb={2}>
        JPG or PNG no larger than 5 MB
      </Typography>
      <Button variant="contained" component="label">
        Upload new image
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageUpload}
        />
      </Button>
    </Box>
  );
};

export default ProfileImageUpload;
