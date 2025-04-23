import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function FooterBar() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#0f172a",
        color: "#fff",
        py: 4,
        mt: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Freelance4U
            </Typography>
            <Typography variant="body2">
              Connecting top freelancers with businesses worldwide. Fast,
              secure, and reliable.
            </Typography>
          </Grid>

          <Grid item xs={6} sm={3}>
            <Typography variant="h6" gutterBottom>
              Company
            </Typography>
            <Link href="#" color="inherit" underline="hover" display="block">
              About Us
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block">
              Blog
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block">
              Careers
            </Link>
          </Grid>

          <Grid item xs={6} sm={3}>
            <Typography variant="h6" gutterBottom>
              Support
            </Typography>
            <Link href="#" color="inherit" underline="hover" display="block">
              Help Center
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block">
              Contact Us
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block">
              Terms of Service
            </Link>
          </Grid>

          <Grid item xs={12} sm={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <IconButton color="inherit">
              <FacebookIcon />
            </IconButton>
            <IconButton color="inherit">
              <TwitterIcon />
            </IconButton>
            <IconButton color="inherit">
              <InstagramIcon />
            </IconButton>
            <IconButton color="inherit">
              <LinkedInIcon />
            </IconButton>
          </Grid>
        </Grid>

        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="gray">
            &copy; {new Date().getFullYear()} Freelance4U. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
