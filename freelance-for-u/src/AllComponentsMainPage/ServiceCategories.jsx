import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import CampaignIcon from "@mui/icons-material/Campaign";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import "./styles/ServiceCategories.css";

const categories = [
  {
    title: "Web Development",
    desc: "Interactive, blazing-fast websites with cutting-edge technologies.",
    icon: LanguageIcon,
    variant: "blue",
  },
  {
    title: "Graphic Design",
    desc: "Craft stunning visuals that tell compelling brand stories.",
    icon: DesignServicesIcon,
    variant: "rose",
  },
  {
    title: "Digital Marketing",
    desc: "Amplify your voice with data-driven, creative campaigns.",
    icon: CampaignIcon,
    variant: "teal",
  },
  {
    title: "Business Analytics",
    desc: "Transform your data into strategy with real-time dashboards.",
    icon: AnalyticsIcon,
    variant: "amber",
  },
];

export default function ServiceCategories() {
  return (
    <Box className="sc section">
      <div className="container">
        <Typography
          variant="h2"
          align="center"
          className="sc__title gradient-text"
        >
          Unlock Your Digital Power
        </Typography>
        <div className="sc__rule" />
        <Typography align="center" className="sc__subtitle">
          Elite services for ambitious brands — where ideas become impact.
        </Typography>

        <Grid container spacing={3} className="sc__grid">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Grid item xs={12} sm={6} md={3} key={cat.title}>
                <div className="sc__outer">
                  <div className={`sc__card sc__card--${cat.variant}`}>
                    <div className="sc__shine" />
                    <div className={`sc__icon sc__icon--${cat.variant}`}>
                      <div className="sc__iconCircle">
                        <Icon className="sc__iconSymbol" />
                      </div>
                    </div>

                    <h3 className="sc__heading">{cat.title}</h3>
                    <p className="sc__desc">{cat.desc}</p>
                  </div>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </Box>
  );
}
