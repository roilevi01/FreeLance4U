import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Rating,
} from "@mui/material";

const freelancers = [
  {
    name: "Noa Levi",
    role: "UX/UI Designer",
    rating: 4.9,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Eitan Cohen",
    role: "Full Stack Developer",
    rating: 5.0,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Rivka Azulay",
    role: "SEO Expert",
    rating: 4.8,
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

export default function TopRatedFreelancers() {
  return (
    <Box sx={{ py: 6, backgroundColor: "#f5f5f5" }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Top Rated Freelancers
      </Typography>
      <Grid container spacing={4} justifyContent="center" px={3}>
        {freelancers.map((freelancer, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ borderRadius: 3 }}>
              <CardMedia
                component="img"
                height="220"
                image={freelancer.image}
                alt={freelancer.name}
              />
              <CardContent>
                <Typography variant="h6">{freelancer.name}</Typography>
                <Typography color="text.secondary">
                  {freelancer.role}
                </Typography>
                <Rating
                  value={freelancer.rating}
                  precision={0.1}
                  readOnly
                  sx={{ mt: 1 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
