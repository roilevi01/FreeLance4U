import { Box, Typography, IconButton } from "@mui/material";
import { Email, LocationOn, PhoneCallback } from "@mui/icons-material";
import { Navigate } from "react-router-dom";
import FormLeftSide from "./FormLeftSide";

const styles = {
  container: {
    display: "flex",
    height: "600px",
  },
  leftSide: {
    flex: 1,

    padding: "20px",
  },
  rightSide: {
    flex: 1,
  },
  typography: {
    fontFamily: "fantasy",
    fontSize: "35px",
  },
};

function LeftSide() {
  return (
    <Box sx={styles.leftSide}>
      <FormLeftSide />
    </Box>
  );
}

function RightSide() {
  return (
    <>
      {/* הוספת כותרת ייחודית לדף */}
      <head>
        <title>Contact Info | My Website</title>
      </head>

      <Box sx={styles.rightSide}>
        <Typography sx={styles.typography}>Contact Info</Typography>
        <span>
          Please feel free to reach out to us through the contact form or via
          email. We are here to help you with any questions or support you may
          need!
        </span>
        <br />

        {/* טלפון */}
        <Box sx={{ display: "flex", alignItems: "center", marginTop: "30px" }}>
          <IconButton
            sx={{ color: "orange", marginRight: "10px" }}
            aria-label="Phone Call"
          >
            <PhoneCallback />
          </IconButton>
          <Typography sx={{ color: "black" }}>0527051756</Typography>
        </Box>

        {/* דוא"ל */}
        <Box sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
          <IconButton
            sx={{ color: "orange", marginRight: "10px" }}
            aria-label="Email"
          >
            <Email />
          </IconButton>
          <Typography sx={{ color: "black" }}>Freelance4U@email.com</Typography>
        </Box>

        {/* כתובת */}
        <Box sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
          <IconButton
            sx={{ color: "orange", marginRight: "10px" }}
            aria-label="Location"
          >
            <LocationOn />
          </IconButton>
          <Typography sx={{ color: "black" }}>
            Rehovot, Levi Eshkol 6, Israel
          </Typography>
        </Box>

        <Box sx={{ marginTop: "20px" }}>
          <iframe
            width="80%"
            height="250px"
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=levi%20eshkol%20+(freelance4u)&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            title="Google Maps - Location of Freelance4U"
          >
            <a href="https://www.gps.ie/">gps tracker sport</a>
          </iframe>
        </Box>
      </Box>
    </>
  );
}

// הקומפוננטה הראשית
export default function SectionInContactPage() {
  return (
    <Box sx={styles.container}>
      <LeftSide />
      <RightSide />
    </Box>
  );
}
