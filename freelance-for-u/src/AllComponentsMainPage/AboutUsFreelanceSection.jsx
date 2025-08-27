import React from "react";
import "./styles/AboutUsFreelanceSection.css";
import { Typography, Paper } from "@mui/material";
import { FaUsers, FaChartLine, FaBullhorn, FaHandshake } from "react-icons/fa";

const services = [
  {
    icon: <FaUsers />,
    title: "Wide Audience",
    description:
      "Your advertisement reaches thousands of potential customers every month.",
    variant: "blue",
  },
  {
    icon: <FaChartLine />,
    title: "Analytics & Insights",
    description: "Get real-time data on the performance of your advertisement.",
    variant: "violet",
  },
  {
    icon: <FaBullhorn />,
    title: "Targeted Marketing",
    description:
      "Your ad is displayed to users who are specifically looking for your service.",
    variant: "teal",
  },
  {
    icon: <FaHandshake />,
    title: "Full Support",
    description:
      "We are here to help you make the most out of your advertisement.",
    variant: "amber",
  },
];

export default function AboutUsFreelanceSection() {
  return (
    <section className="afs section">
      <div className="afs__bg" aria-hidden />
      <div className="container">
        <Typography
          className="afs__title gradient-text"
          variant="h2"
          component="h2"
        >
          Why Advertise With Us?
        </Typography>
        <div className="afs__rule" />
        <Typography className="afs__subtitle" variant="subtitle1" component="p">
          We give your service the visibility and tools it deserves.
        </Typography>

        <div className="afs__grid">
          {services.map((s) => (
            <div className="afs__outer" key={s.title}>
              <Paper
                className={`afs__card afs__card--${s.variant}`}
                elevation={0}
              >
                <div className="afs__shine" aria-hidden />
                <div
                  className={`afs__icon afs__icon--${s.variant}`}
                  aria-hidden
                >
                  <span className="afs__iconCircle">{s.icon}</span>
                </div>

                <h3 className="afs__heading">{s.title}</h3>
                <p className="afs__desc">{s.description}</p>
              </Paper>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
