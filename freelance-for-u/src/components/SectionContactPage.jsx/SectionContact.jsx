import { Box, Button, TextField, Typography } from "@mui/material";

export default function SectionContact() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1310px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#dc6601",
        color: "white",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        gap: 3,
        textAlign: { xs: "center", md: "left" },
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" component="h2" sx={{ fontFamily: "fantasy" }}>
          Our <span style={{ color: "black" }}>Newsletters</span>
        </Typography>
        <Typography variant="body1" sx={{ marginTop: "10px" }}>
          Join us for professional, fast, and reliable service. We're here to
          help grow your business, connect with new clients, and deliver real
          results. Our platform is easy to use, and our team is always available
          for support. Start today and feel the difference!
        </Typography>
      </Box>

      <Box
        sx={{
          flexShrink: 0,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          width: "100%",
          maxWidth: 500,
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Email"
          fullWidth
          sx={{
            backgroundColor: "white",
            borderRadius: "10px",
            mb: { xs: 2, sm: 0 },
            mr: { sm: 2 },
          }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            color: "white",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            px: 4,
            height: "56px",
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
