import React from "react";
import { Grid2 } from "@mui/material";
import ImageBlock from "./ImageBlock";
import TextBlock from "./TextBlock";

const GridComponent = () => {
  return (
    <Grid2 container spacing={3} justifyContent="center" alignItems="center">
      <Grid2 item xs={12} md={6}>
        <TextBlock text="We believe in the power of collaboration. Our platform connects employers and freelancers through trust and mutual respect, creating successful partnerships." />
      </Grid2>
      <Grid2 item xs={12} md={6}>
        <ImageBlock
          src="/assets/handshake-business-people.png"
          alt="handshake"
        />
      </Grid2>

      <Grid2 item xs={12} md={6} order={{ xs: 2, md: 1 }}>
        <ImageBlock src="/assets/teammeeting.png" alt="team" />
      </Grid2>
      <Grid2 item xs={12} md={6} order={{ xs: 1, md: 2 }}>
        <TextBlock text="Meet the team behind Freelance For You. We’re a dedicated group of professionals working hard to ensure both employers and freelancers experience smooth, seamless interactions." />
      </Grid2>

      <Grid2 item xs={12} md={6}>
        <TextBlock text="Led by Shenik Meritz, our founder and CEO, we are committed to providing a platform where opportunities are accessible, and success is within reach for both freelancers and employers." />
      </Grid2>
      <Grid2 item xs={12} md={6}>
        <ImageBlock src="/assets/manegment.png" alt="management" />
      </Grid2>

      <Grid2 item xs={12} style={{ textAlign: "center", marginTop: "40px" }}>
        <button
          style={{
            padding: "12px 30px",
            backgroundColor: "#007bff",
            color: "#fff",
            fontSize: "1rem",
            borderRadius: "30px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Contact Us Today
        </button>
      </Grid2>
    </Grid2>
  );
};

export default GridComponent;
