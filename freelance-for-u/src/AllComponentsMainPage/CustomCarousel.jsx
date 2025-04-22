import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function CustomCarousel() {
  const images = [
    {
      text: " Hello, my name is Mittal, I was in need of work and since I joined freelance4U people started contacting me to hire my services ",
      image: "../assets/APictureOfAnEmployee.png",
    },
    {
      text: "Hello, I'm Ilan and I'm part of a group of contractors who deal with earthworks since I registered on the website, the demand is only increasing",
      image: "../assets/ConstructionSiteWorker.png",
    },
    {
      text: "I'm Yaron and I'm a certified electrician since I met Freelance4U my cell phone doesn't stop ringing ",
      image: "../assets/electrician.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <Box sx={{ position: "relative", width: "800px", marginLeft: "220px" }}>
      <Card>
        <img
          src={images[currentIndex].image}
          alt={`Slide ${currentIndex}`}
          style={{
            width: "100%",
            height: "400px",
            objectFit: "cover",
          }}
        />
        <CardContent>
          <Typography variant="h6" align="center">
            {images[currentIndex].text}
          </Typography>
        </CardContent>
      </Card>

      <Button
        onClick={handlePrev}
        sx={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          backgroundColor: "black",
          color: "white",
          border: "none",
          cursor: "pointer",
          padding: "10px",
        }}
      >
        Prev
      </Button>

      <Button
        onClick={handleNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          backgroundColor: "black",
          color: "white",
          border: "none",
          cursor: "pointer",
          padding: "10px",
        }}
      >
        Next
      </Button>
    </Box>
  );
}

export default CustomCarousel;
