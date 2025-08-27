import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import "./styles/BlogHighlights.css";

const blogPosts = [
  {
    title: "🚀 5 Tips to Boost Your Freelancing Career",
    excerpt:
      "Discover actionable strategies to grow your freelance business and land premium clients.",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
  },
  {
    title: "🌐 Why Every Freelancer Needs a Portfolio Website",
    excerpt:
      "Build trust, showcase your expertise, and stand out in the global market.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },
  {
    title: "💡 Top Skills in Demand for 2025",
    excerpt:
      "Get ahead by learning the most wanted remote skills and future-proof your career.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  },
];

export default function BlogHighlights() {
  return (
    <Box className="bh2 section">
      <div className="container">
        <Typography variant="h3" align="center" className="bh2__title">
          Insights Worth Reading
        </Typography>
        <div className="bh2__rule" />
        <Typography align="center" className="bh2__subtitle">
          Learn from real-world experience and elevate your freelancing career.
        </Typography>

        <Grid container spacing={4}>
          {blogPosts.map((post, i) => (
            <Grid item xs={12} md={4} key={i}>
              <motion.div
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
              >
                <Card className="bh2__card" elevation={0}>
                  <div className="bh2__mediaWrap">
                    <CardMedia
                      component="img"
                      image={post.image}
                      alt={post.title}
                      className="bh2__img"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f";
                      }}
                    />
                    <span className="bh2__tag">Article</span>
                  </div>

                  <CardContent className="bh2__content">
                    <Typography variant="h6" className="bh2__heading">
                      {post.title}
                    </Typography>

                    <Typography variant="body2" className="bh2__excerpt">
                      {post.excerpt}
                    </Typography>

                    <Button size="medium" className="bh2__btn">
                      Read More →
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </div>
    </Box>
  );
}
