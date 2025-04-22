import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Header/NavBar";
import { yellow } from "@mui/material/colors";
import SectionContact from "../SectionContactPage.jsx/SectionContact";
import SectionInContactPage from "../SectionContactPage.jsx/SectionInContactPage";
import FooterBar from "../../Footer/FooterBar";

export default function ContactPage() {
  return (
    <>
      <NavBar />
      <Typography
        sx={{
          position: "absolute",
          marginLeft: "600px",
          marginTop: "200px",
          fontFamily: "fantasy",
          fontSize: "35px",
        }}
      >
        <span style={{ color: "orange" }}>Contact</span>

        <span style={{ color: "white" }}>Us</span>
      </Typography>
      <Box>
        <img
          style={{ width: 1349, height: 450 }}
          src="assets/ContactPicture.png"
          alt="Contact Us"
        ></img>
      </Box>
      <SectionInContactPage />
      <SectionContact />
      <FooterBar />
    </>
  );
}
