import { Box, Grid, Paper, Typography } from "@mui/material";
import WebIcon from "@mui/icons-material/Language";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import CampaignIcon from "@mui/icons-material/Campaign";
import AnalyticsIcon from "@mui/icons-material/Analytics";

const categories = [
  {
    icon: <WebIcon fontSize="large" color="primary" />,
    title: "Web Development",
    desc: "Build modern, responsive, and fast websites tailored to your business needs.",
  },
  {
    icon: <DesignServicesIcon fontSize="large" color="primary" />,
    title: "Graphic Design",
    desc: "Stand out with eye-catching visuals, logos, and brand identities.",
  },
  {
    icon: <CampaignIcon fontSize="large" color="primary" />,
    title: "Digital Marketing",
    desc: "Boost your online presence with SEO, social media, and paid campaigns.",
  },
  {
    icon: <AnalyticsIcon fontSize="large" color="primary" />,
    title: "Business Analytics",
    desc: "Turn data into decisions with professional analysis and dashboards.",
  },
];

export default function ServiceCategories() {
  return (
    <Box sx={{ py: 6, backgroundColor: "#ffffff" }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Explore Service Categories
      </Typography>
      <Grid container spacing={4} justifyContent="center" px={3}>
        {categories.map((cat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper sx={{ p: 3, textAlign: "center", borderRadius: 3 }}>
              {cat.icon}
              <Typography variant="h6" mt={2}>
                {cat.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {cat.desc}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
