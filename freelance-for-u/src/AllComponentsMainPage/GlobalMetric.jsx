import React, { useState, useEffect } from "react";
import { Globe } from "lucide-react";

const GlobalMetric = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 50;
    const targetNumber = 15750;
    const increment = targetNumber / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current > targetNumber) {
        setCount(targetNumber);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="p-8"
      style={{
        position: "absolute", // מיקום מוחלט במסך
        top: "80px", // ממקם את הדיב בחלק העליון של המסך
        right: "0", // ממקם את הדיב בצד ימין של המסך
        background: "linear-gradient(to bottom right, #f0f9ff, white)",
        borderRadius: "12px",
      }}
    >
      <div
        style={{
          padding: "15px",
          background: "rgba(255, 255, 255, 0.7)",
          borderRadius: "16px",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <div style={{ position: "relative", display: "inline-block" }}>
          <Globe size={96} style={{ opacity: 0.2, color: "#2563eb" }} />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "48px",
              fontWeight: "bold",
              background: "linear-gradient(to right, #2563eb, #1e40af)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {count.toLocaleString()}
          </div>
        </div>
        <div
          style={{
            fontSize: "24px",
            marginTop: "20px",
            background: "linear-gradient(to right, #1e40af, #1e3a8a)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            direction: "rtl",
          }}
        >
          customers around the world
        </div>
      </div>
    </div>
  );
};

export default GlobalMetric;
