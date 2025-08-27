import React, { useEffect, useRef, useState } from "react";
import { Grid2 } from "@mui/material";
import { motion } from "framer-motion";
import ImageBlock from "./ImageBlock";
import TextBlock from "./TextBlock";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";
import Groups2RoundedIcon from "@mui/icons-material/Groups2Rounded";
import LeaderboardRoundedIcon from "@mui/icons-material/LeaderboardRounded";

const rows = [
  {
    step: "01",
    kicker: "Principle",
    title: "Collaboration at the core",
    text: "We believe in the power of collaboration. Our platform connects employers and freelancers through trust and mutual respect, creating successful partnerships.",
    icon: HandshakeRoundedIcon,
    img: { src: "/assets/handshake-business-people.png", alt: "handshake" },
    testimonial: {
      quote: "Working with FFY felt seamless — brief to delivery in days.",
      author: "Noa D.",
      role: "Marketing Lead",
    },
  },
  {
    step: "02",
    kicker: "Team",
    title: "Meet the team",
    text: "Meet the team behind Freelance For You. We’re a dedicated group of professionals working hard to ensure both employers and freelancers experience smooth, seamless interactions.",
    icon: Groups2RoundedIcon,
    img: { src: "/assets/teammeeting.png", alt: "team" },
    testimonial: {
      quote: "They matched us with top talent in 24h. Impressive.",
      author: "Jonathan R.",
      role: "Product Manager",
    },
  },
  {
    step: "03",
    kicker: "Leadership",
    title: "Focused leadership",
    text: "Led by Shenik Meritz, our founder and CEO, we are committed to providing a platform where opportunities are accessible, and success is within reach for both freelancers and employers.",
    icon: LeaderboardRoundedIcon,
    img: { src: "/assets/manegment.png", alt: "management" },
    testimonial: {
      quote: "Clear communication, trustworthy process, great outcomes.",
      author: "Maya L.",
      role: "Operations",
    },
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.14 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function GridComponent() {
  const [active, setActive] = useState(0);
  const rowRefs = useRef([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number(e.target.getAttribute("data-idx"));
            setActive(idx);
          }
        });
      },
      { threshold: 0.5 }
    );

    rowRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="story-section">

      <nav className="story-progress" aria-label="Story progress">
        {rows.map((_, i) => (
          <button
            key={i}
            className={`dot ${active === i ? "active" : ""}`}
            aria-label={`Go to section ${i + 1}`}
            onClick={() =>
              rowRefs.current[i]?.scrollIntoView({
                behavior: "smooth",
                block: "center",
              })
            }
          />
        ))}
      </nav>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        {rows.map((row, i) => {
          const Icon = row.icon;
          return (
            <Grid2
              key={row.step}
              container
              spacing={4}
              alignItems="center"
              className={`story-row ${i % 2 ? "reverse" : ""}`}
              data-idx={i}
              ref={(el) => (rowRefs.current[i] = el)}
            >
              
              <Grid2 item xs={12} md={6} className="story-col">
                <motion.div variants={item} className="story-card">
                  <span className="badge-step" aria-hidden>
                    {row.step}
                  </span>
                  <div className="kicker">
                    <span className="kicker-icon" aria-hidden>
                      <Icon fontSize="small" />
                    </span>
                    <span className="kicker-text">{row.kicker}</span>
                  </div>
                  <h3 className="story-title">{row.title}</h3>
                  <div className="story-text">
                    <TextBlock text={row.text} />
                  </div>
                </motion.div>
              </Grid2>

              
              <Grid2 item xs={12} md={6} className="story-col">
                <motion.div
                  variants={item}
                  className="story-media"
                  whileHover={{ translateY: -3, scale: 1.01 }}
                >
                  <div className="media-frame">
                    <ImageBlock src={row.img.src} alt={row.img.alt} />
                  </div>
                  <div className="media-shadow" aria-hidden />

                  <figure className="testimonial">
                    <blockquote>“{row.testimonial.quote}”</blockquote>
                    <figcaption>
                      <span className="avatar" aria-hidden>
                        {row.testimonial.author.split(" ")[0][0]}
                      </span>
                      <div className="who">
                        <strong>{row.testimonial.author}</strong>
                        <span>{row.testimonial.role}</span>
                      </div>
                    </figcaption>
                  </figure>
                </motion.div>
              </Grid2>
            </Grid2>
          );
        })}
      </motion.div>
    </section>
  );
}
