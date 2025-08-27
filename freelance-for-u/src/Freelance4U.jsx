import NavBar from "./Header/NavBar";
import FooterBar from "./Footer/FooterBar";
import CustomerTestimonials from "./AllComponentsMainPage/CustomerTestimonials";
import FeaturesShowcase from "./AllComponentsMainPage/FeaturesShowcase";
import TestimonialsSection from "./AllComponentsMainPage/TestimonialsSection";
import CallToActionBanner from "./AllComponentsMainPage/CallToActionBanner";
import NewsletterSignup from "./AllComponentsMainPage/NewsletterSignup";
import TopRatedFreelancers from "./AllComponentsMainPage/TopRatedFreelancers";
import BlogHighlights from "./AllComponentsMainPage/BlogHighlights";
import ServiceCategories from "./AllComponentsMainPage/ServiceCategories";
import ClientLogosMarquee from "./AllComponentsMainPage/ClientLogosMarquee";
import AboutUsFreelanceSection from "./AllComponentsMainPage/AboutUsFreelanceSection";

export default function Freelance4U() {
  return (
    <>
      <div className="page-bg">
        <div className="bg fx fx--blob-1" />
        <div className="bg fx fx--blob-2" />
        <div className="bg fx fx--grid" />
        <div className="bg fx fx--vignette" />
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
      </div>

      <style>{`
        :root{
          --brand-1:#3b82f6;
          --brand-2:#a78bfa;
          --brand-3:#22d3ee;
        }
        .page-bg{
          position:relative;
          min-height:100vh;
          overflow:hidden;
          background: radial-gradient(120% 120% at 0% 0%, #f7fafc 0%, #eef2ff 55%, #ffffff 100%);
          isolation:isolate;
        }
        .bg{
          position:absolute;
          inset:0;
          pointer-events:none;
          z-index:0;
        }
        .fx--grid{
          background-image:
            linear-gradient(rgba(2,6,23,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(2,6,23,0.04) 1px, transparent 1px);
          background-size: 28px 28px, 28px 28px;
          mask-image: radial-gradient(120% 120% at 50% 0%, rgba(0,0,0,.6), rgba(0,0,0,0.05) 60%, rgba(0,0,0,0) 85%);
        }
        .fx--vignette{
          background: radial-gradient(120% 60% at 50% -10%, rgba(0,0,0,0) 40%, rgba(15,23,42,0.06) 100%);
          mix-blend-mode:multiply;
        }
        .fx--blob-1,
        .fx--blob-2{
          inset:auto;
          width:34rem;
          height:34rem;
          filter: blur(70px);
          opacity:.55;
          border-radius:50%;
          z-index:0;
          animation: float1 18s linear infinite;
        }
        .fx--blob-1{
          left:-6rem;
          top:-6rem;
          background: radial-gradient(closest-side, rgba(96,165,250,.9), rgba(96,165,250,0));
          animation-delay:-6s;
        }
        .fx--blob-2{
          right:-8rem;
          bottom:-8rem;
          background: radial-gradient(closest-side, rgba(167,139,250,.9), rgba(167,139,250,0));
          animation-name: float2;
        }
        @keyframes float1{
          0%{ transform: translate3d(0,0,0) scale(1); }
          50%{ transform: translate3d(4rem,2rem,0) scale(1.05); }
          100%{ transform: translate3d(0,0,0) scale(1); }
        }
        @keyframes float2{
          0%{ transform: translate3d(0,0,0) scale(1); }
          50%{ transform: translate3d(-3rem,-2rem,0) scale(1.07); }
          100%{ transform: translate3d(0,0,0) scale(1); }
        }
        @media (max-width: 900px){
          .fx--blob-1,.fx--blob-2{ width:24rem; height:24rem; filter: blur(60px); }
        }
      `}</style>
    </>
  );
}
