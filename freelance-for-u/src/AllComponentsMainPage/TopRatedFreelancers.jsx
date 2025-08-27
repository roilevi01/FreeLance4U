import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Rating,
  Button,
} from "@mui/material";
import "./styles/TopRatedFreelancers.css";

const freelancers = [
  {
    name: "Liran Gold",
    profession: "UX/UI Designer",
    rating: 4.9,
    image: "https://randomuser.me/api/portraits/men/43.jpg",
    bio: "Creates seamless, human-centered experiences with modern design principles.",
  },
  {
    name: "Tamar Azulay",
    profession: "Frontend Developer",
    rating: 4.8,
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    bio: "Passionate about building responsive, fast, and interactive web apps.",
  },
  {
    name: "Daniel Avraham",
    profession: "Full Stack Developer",
    rating: 5.0,
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    bio: "Crafting scalable backend systems and pixel-perfect frontends.",
  },
];

export default function TopRatedFreelancers() {
  return (
    <Box className="trf section">
      <div className="container">
        <Typography
          variant="h2"
          align="center"
          className="trf__title gradient-text"
        >
          Top Rated Freelancers
        </Typography>
        <div className="trf__rule" />
        <Typography align="center" className="trf__subtitle">
          Meet our elite talent — professionals trusted by clients worldwide.
        </Typography>

        <Grid container spacing={3} className="trf__grid">
          {freelancers.map((f) => (
            <Grid item xs={12} sm={6} md={4} key={f.name}>
              <div className="trf__outer">
                <Card elevation={0} className="trf__card">
                  <div className="trf__shine" />
                  <CardContent className="trf__content">
                    <div className="trf__avatarWrap">
                      <Avatar
                        src={f.image}
                        alt={f.name}
                        className="trf__avatar"
                      />
                    </div>

                    <Typography variant="h6" className="trf__name">
                      {f.name}
                    </Typography>
                    <span className="trf__badge">{f.profession}</span>

                    <Typography variant="body2" className="trf__bio">
                      {f.bio}
                    </Typography>

                    <div className="trf__ratingRow">
                      <Rating
                        name={`rating-${f.name}`}
                        value={f.rating}
                        precision={0.1}
                        readOnly
                        size="small"
                      />
                      <span className="trf__ratingValue">
                        {f.rating.toFixed(1)}
                      </span>
                    </div>

                    <Button variant="contained" className="trf__btn">
                      View Profile
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </Box>
  );
}
