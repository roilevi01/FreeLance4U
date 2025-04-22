import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { Code, DesignServices, SupportAgent } from "@mui/icons-material";

const features = [
  {
    icon: <Code fontSize="large" color="primary" />,
    title: "Custom Development",
    description:
      "Tailored software solutions built specifically for your business needs.",
  },
  {
    icon: <DesignServices fontSize="large" color="secondary" />,
    title: "Creative Design",
    description: "Modern, responsive, and user-focused design services.",
  },
  {
    icon: <SupportAgent fontSize="large" color="success" />,
    title: "Ongoing Support",
    description:
      "We’re here for you 24/7 with technical support and maintenance.",
  },
];

const FeaturesShowcase = () => {
  return (
    <Box p={5} bgcolor="#f9f9f9">
      <Typography variant="h4" textAlign="center" gutterBottom>
        What We Offer
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {features.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: "100%", textAlign: "center", p: 2 }}>
              <CardContent>
                <Box mb={2}>{item.icon}</Box>
                <Typography variant="h6" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeaturesShowcase;
