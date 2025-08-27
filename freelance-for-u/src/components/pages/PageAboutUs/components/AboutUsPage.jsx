import React, { useEffect, useState } from "react";
import NavBar from "../../../../Header/NavBar";
import FooterBar from "../../../../Footer/FooterBar";
import GridComponent from "./GridComponent";
import { Container, Box, Button, Chip } from "@mui/material";
import { motion } from "framer-motion";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import Diversity3RoundedIcon from "@mui/icons-material/Diversity3Rounded";
import "../Styles/AboutUs.css";

const MotionBox = motion(Box);

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const stagger = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

export default function AboutUsPage() {
  const [progress, setProgress] = useState(0);

  
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setProgress(Math.min(100, Math.max(0, scrolled)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <NavBar />
      <main className="about-us-page">
        
        <div
          className="scrollbar-mobile"
          style={{ width: `${progress}%` }}
          aria-hidden
        />

      
        <section className="about-hero pro-hero">
          <div className="hero-bg" aria-hidden="true" />

          <Container maxWidth="lg">
            <MotionBox variants={fadeUp} initial="hidden" animate="show">
              <h1 className="page-title">
                <span className="gradient-text">About Us</span>
              </h1>
              <p className="page-subtitle">
                Connecting employers and freelancers through trust,
                transparency, and delightful execution.
              </p>

              <div className="hero-cta">
                <Button
                  className="btn-cta"
                  size="large"
                  onClick={() =>
                    document
                      .querySelector("#contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Get in touch
                </Button>
                <Button
                  className="btn-ghost"
                  size="large"
                  onClick={() =>
                    document
                      .querySelector("#our-story")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Our story
                </Button>
              </div>

              <div
                className="hero-badges"
                role="list"
                aria-label="Our strengths"
              >
                <Chip
                  icon={<VerifiedUserRoundedIcon />}
                  label="Trusted by teams"
                  className="chip"
                  role="listitem"
                />
                <Chip
                  icon={<CheckCircleRoundedIcon />}
                  label="Quality-first"
                  className="chip"
                  role="listitem"
                />
                <Chip
                  icon={<Diversity3RoundedIcon />}
                  label="Inclusive"
                  className="chip"
                  role="listitem"
                />
              </div>
            </MotionBox>
          </Container>
        </section>

        
        <section className="values-section" aria-labelledby="values-title">
          <Container maxWidth="lg">
            <MotionBox
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
            >
              <h2 id="values-title" className="section-title">
                What we stand for
              </h2>
              <div className="cards">
                <MotionBox variants={fadeUp} className="card">
                  <div className="card-icon">
                    <VerifiedUserRoundedIcon />
                  </div>
                  <h3 className="card-title">Transparency</h3>
                  <p className="card-text">
                    Clear expectations and fair terms for every engagement.
                  </p>
                </MotionBox>
                <MotionBox variants={fadeUp} className="card">
                  <div className="card-icon">
                    <RocketLaunchRoundedIcon />
                  </div>
                  <h3 className="card-title">Velocity</h3>
                  <p className="card-text">
                    From brief to delivery — faster, without sacrificing
                    quality.
                  </p>
                </MotionBox>
                <MotionBox variants={fadeUp} className="card">
                  <div className="card-icon">
                    <Diversity3RoundedIcon />
                  </div>
                  <h3 className="card-title">Collaboration</h3>
                  <p className="card-text">
                    People-first processes that unlock creative outcomes.
                  </p>
                </MotionBox>
              </div>
            </MotionBox>
          </Container>
        </section>

      
        <section id="our-story" aria-labelledby="story-title">
          <Container maxWidth="lg">
            <h2 id="story-title" className="section-title">
              Our story
            </h2>
            <GridComponent />
          </Container>
        </section>

      
        <section className="stats-strip" aria-label="Impact metrics">
          <Container maxWidth="lg" className="stats">
            <div className="stat">
              <strong>2.5k+</strong>
              <span>Projects</span>
            </div>
            <div className="stat">
              <strong>1.2k+</strong>
              <span>Employers</span>
            </div>
            <div className="stat">
              <strong>4.9/5</strong>
              <span>Avg. rating</span>
            </div>
            <div className="stat">
              <strong>75+</strong>
              <span>Categories</span>
            </div>
          </Container>
        </section>

        
        <section className="final-cta" aria-labelledby="cta-title">
          <Container maxWidth="lg">
            <MotionBox
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
            >
              <h2 id="cta-title" className="section-title">
                Ready to build something great?
              </h2>
              <p className="page-subtitle">
                Tell us about your needs — we’ll match you with the right
                talent.
              </p>
              <Button
                className="btn-cta"
                size="large"
                onClick={() =>
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Contact Us Today
              </Button>
            </MotionBox>
          </Container>
        </section>

        <div id="contact" style={{ height: 1 }} />
        <FooterBar />
      </main>
    </>
  );
}
