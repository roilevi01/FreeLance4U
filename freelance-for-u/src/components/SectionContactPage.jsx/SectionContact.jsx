import { Box, Button, TextField, Typography } from "@mui/material";

export default function SectionContact() {
  return (
    <Box
      sx={{
        width: "1310px",
        height: "200px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#dc6601", // צבע כתום
        color: "white",
      }}
    >
      {/* חלק הטקסט */}
      <Box>
        <Typography variant="h4" component="h2" sx={{ fontFamily: "fantasy" }}>
          Our <span style={{ color: "black" }}>Newsletters</span>
        </Typography>
        <Typography variant="body1" sx={{ marginTop: "10px" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis pulvinar.
        </Typography>
      </Box>

      {/* חלק הטופס */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          variant="outlined"
          placeholder="Email"
          sx={{
            backgroundColor: "white",
            borderRadius: "10px",
            marginRight: "10px",
            width: "300px",
          }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            color: "white",
            textTransform: "uppercase",
          }}
        >
          Submit Button
        </Button>
      </Box>
    </Box>
  );
}
