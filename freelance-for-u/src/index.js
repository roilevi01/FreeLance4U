import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";

import "./AllComponentsMainPage/styles/AboutUsFreelanceSection.css";
import "./AllComponentsMainPage/styles/BlogHighlights.css";
import "./AllComponentsMainPage/styles/ClientLogosMarquee.css";
import "./AllComponentsMainPage/styles/CustomerTestimonials.css";
import "./AllComponentsMainPage/styles/FeaturesShowcase.css";
import "./AllComponentsMainPage/styles/NewsletterSignup.css";
import "./AllComponentsMainPage/styles/ServiceCategories.css";
import "./AllComponentsMainPage/styles/TestimonialsSection.css";
import "./AllComponentsMainPage/styles/TopRatedFreelancers.css";

import "./Footer/FooterBar.css";

const theme = createTheme({});
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GoogleOAuthProvider clientId="441588337833-vkoqa5kkap9thi0iu9dadl059bojqq42.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </ThemeProvider>
  </StyledEngineProvider>
);
