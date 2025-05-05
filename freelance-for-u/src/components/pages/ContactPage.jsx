import { Box, Typography } from "@mui/material";
import NavBar from "../../Header/NavBar";
import SectionContact from "../SectionContactPage.jsx/SectionContact";
import SectionInContactPage from "../SectionContactPage.jsx/SectionInContactPage";
import FooterBar from "../../Footer/FooterBar";

export default function ContactPage() {
  return (
    <>
      <NavBar />

      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "250px", sm: "350px", md: "450px" },
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="assets/ContactPicture.png"
          alt="Contact Us"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        <Typography
          sx={{
            position: "absolute",
            textAlign: "center",
            fontFamily: "fantasy",
            fontSize: { xs: "28px", sm: "32px", md: "40px" },
            backgroundColor: "rgba(0,0,0,0.4)",
            padding: "10px 20px",
            borderRadius: "10px",
          }}
        >
          <span style={{ color: "orange" }}>Contact</span>{" "}
          <span style={{ color: "white" }}>Us</span>
        </Typography>
      </Box>

      <Box sx={{ px: 2 }}>
        <SectionInContactPage />
        <SectionContact />
      </Box>

      <FooterBar />
    </>
  );
}
