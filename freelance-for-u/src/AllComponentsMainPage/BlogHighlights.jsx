// src/components/BlogHighlights.jsx
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";

const blogPosts = [
  {
    title: "5 Tips to Boost Your Freelancing Career",
    excerpt:
      "Discover actionable advice to grow your freelancing business and attract more clients.",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
  },
  {
    title: "Why Every Freelancer Needs a Portfolio Website",
    excerpt:
      "Learn how to build trust and showcase your skills with a professional portfolio.",
    image: "https://images.unsplash.com/photo-1559027615-005c63f140ed",
  },
  {
    title: "Top Skills in Demand for 2025",
    excerpt:
      "Stay ahead of the curve with the most sought-after skills for remote professionals.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  },
];

export default function BlogHighlights() {
  return (
    <Box sx={{ py: 6, px: { xs: 2, md: 8 }, backgroundColor: "#f8f9fa" }}>
      <Typography variant="h4" align="center" gutterBottom>
        From Our Blog
      </Typography>
      <Typography align="center" color="textSecondary" mb={4}>
        Stay informed with insights from industry leaders.
      </Typography>
      <Grid container spacing={4}>
        {blogPosts.map((post, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                height="160"
                image={post.image}
                alt={post.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.excerpt}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
