import { Box, Typography } from "@mui/material";
import { FaUsers, FaChartLine, FaBullhorn, FaHandshake } from "react-icons/fa";
import FooterBar from "../../Footer/FooterBar";

const services = [
  {
    icon: <FaUsers size={50} color="#007bff" />,
    title: "Wide Audience",
    description:
      "Your advertisement reaches thousands of potential customers every month.",
  },
  {
    icon: <FaChartLine size={50} color="#007bff" />,
    title: "Analytics & Insights",
    description: "Get real-time data on the performance of your advertisement.",
  },
  {
    icon: <FaBullhorn size={50} color="#007bff" />,
    title: "Targeted Marketing",
    description:
      "Your ad is displayed to users who are specifically looking for your service.",
  },
  {
    icon: <FaHandshake size={50} color="#007bff" />,
    title: "Full Support",
    description:
      "We are here to help you make the most out of your advertisement.",
  },
];

export default function AboutUsFreelanceSection() {
  return (
    <>
      <Box
        sx={{
          width: "1300px",
          display: "flex",
          gap: "1rem",
          margin: "50px auto",
          justifyContent: "center",
        }}
      >
        {services.map((service, index) => (
          <Box
            key={index}
            sx={{
              width: 300,
              height: 250,
              background: "#F0F2F5",
              borderRadius: "25px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              textAlign: "center",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box sx={{ marginBottom: "10px" }}>{service.icon}</Box>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>
              {service.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#555", marginTop: "10px" }}
            >
              {service.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </>
  );
}
