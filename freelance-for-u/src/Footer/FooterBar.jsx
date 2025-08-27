import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Link as MLink,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "./FooterBar.css";

const companyLinks = [
  { label: "About Us", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Careers", href: "#" },
];

const supportLinks = [
  { label: "Help Center", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "Terms of Service", href: "#" },
];

export default function FooterBar({ variant = "dark" }) {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`footer footer--${variant}`}
    >
      <span className="footer__accent" aria-hidden="true" />

      <Box className="footer__wrap">
        <Container maxWidth="xl" className="footer__container">
          <Grid container spacing={4} className="footer__grid">
          
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" className="footer__brand">
                Freelance4U
              </Typography>
              <Typography variant="body2" className="footer__brandText">
                Connecting top freelancers with businesses worldwide. Fast,
                secure, and reliable.
              </Typography>
            </Grid>

    
            <Grid item xs={6} sm={3} md={3}>
              <Typography variant="subtitle1" className="footer__heading">
                Company
              </Typography>
              <nav className="footer__links">
                {companyLinks.map((item) => (
                  <MLink
                    key={item.label}
                    href={item.href}
                    underline="hover"
                    className="footer__link"
                  >
                    {item.label}
                  </MLink>
                ))}
              </nav>
            </Grid>

            
            <Grid item xs={6} sm={3} md={3}>
              <Typography variant="subtitle1" className="footer__heading">
                Support
              </Typography>
              <nav className="footer__links">
                {supportLinks.map((item) => (
                  <MLink
                    key={item.label}
                    href={item.href}
                    underline="hover"
                    className="footer__link"
                  >
                    {item.label}
                  </MLink>
                ))}
              </nav>
            </Grid>

            
            <Grid item xs={12} sm={12} md={3}>
              <Typography variant="subtitle1" className="footer__heading">
                Follow Us
              </Typography>
              <Box className="footer__social">
                {[FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon].map(
                  (Icon, idx) => (
                    <motion.span
                      key={idx}
                      whileHover={{ scale: 1.15, rotate: -4 }}
                      whileTap={{ scale: 0.94 }}
                    >
                      <IconButton
                        className="footer__socialBtn"
                        aria-label="social link"
                      >
                        <Icon />
                      </IconButton>
                    </motion.span>
                  )
                )}
              </Box>
            </Grid>
          </Grid>

          
          <Box className="footer__bottom">
            <Typography variant="body2" className="footer__copy">
              &copy; {new Date().getFullYear()} Freelance4U. All rights
              reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </motion.footer>
  );
}
