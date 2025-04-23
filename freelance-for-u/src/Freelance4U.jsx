import NavBar from "./Header/NavBar";
import FooterBar from "./Footer/FooterBar";
import CustomerTestimonials from "./AllComponentsMainPage/CustomerTestimonials";
import AboutUsFreelanceSection from "./components/SectionFreelanceAboutUs/AboutUsFreelanceSection";
import FeaturesShowcase from "./AllComponentsMainPage/FeaturesShowcase";
import TestimonialsSection from "./AllComponentsMainPage/TestimonialsSection";
import CallToActionBanner from "./AllComponentsMainPage/CallToActionBanner";
import NewsletterSignup from "./AllComponentsMainPage/NewsletterSignup";
import TopRatedFreelancers from "./AllComponentsMainPage/TopRatedFreelancers";
import BlogHighlights from "./AllComponentsMainPage/BlogHighlights";
import ServiceCategories from "./AllComponentsMainPage/ServiceCategories";
import ClientLogosMarquee from "./AllComponentsMainPage/ClientLogosMarquee";

export default function Freelance4U() {
  return (
    <>
      <NavBar />
      <CustomerTestimonials />

      <AboutUsFreelanceSection />
      <FeaturesShowcase />
      <ServiceCategories />
      <TopRatedFreelancers />
      <CallToActionBanner />
      <TestimonialsSection />
      <ClientLogosMarquee />
      <BlogHighlights />
      <NewsletterSignup />
      <FooterBar />
    </>
  );
}
