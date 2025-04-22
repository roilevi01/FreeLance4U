import { Box, Typography } from "@mui/material";

const RightAd = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(to left, #e0f7fa, #ffffff)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: 3,
        borderLeft: "1px solid #ddd",
      }}
    >
      <img
        src="https://cdn.pixabay.com/photo/2017/06/13/22/42/laptop-2407433_1280.jpg"
        alt="Business service ad"
        style={{ width: "80%", borderRadius: 12, marginBottom: 16 }}
      />
      <Typography variant="h5" fontWeight={600} gutterBottom>
        שירותים מקצועיים לעסק שלך
      </Typography>
      <Typography variant="body1" color="text.secondary">
        הירשם עכשיו וקבל גישה לפרסום חינם, תמיכה טכנית, וחיבור לקהילה רחבה של
        פרילנסרים מובילים!
      </Typography>
    </Box>
  );
};

export default RightAd;
