import { useState } from "react";
import { Box, Typography, Stack, Paper } from "@mui/material";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import { motion } from "framer-motion";

const RightAd = () => {
  const [shine, setShine] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * 100;
    const py = ((e.clientY - r.top) / r.height) * 100;
    setShine({ x: px, y: py });
    const rx = (py - 50) / 8;
    const ry = (50 - px) / 8;
    setTilt({ rx, ry });
  };

  const resetTilt = () => setTilt({ rx: 0, ry: 0 });

  return (
    <Box
      component={motion.div}
      initial={{ y: 16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      sx={{
        position: "relative",
        borderRadius: 4,
        p: "2px",
        minHeight: { xs: 440, md: 600 },
        background:
          "conic-gradient(from 180deg at 50% 50%, #22d3ee, #60a5fa, #a78bfa, #22d3ee)",
        boxShadow: "0 20px 48px rgba(2,6,23,0.16)",
      }}
    >
      {/* Shine */}
      <Box
        sx={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          borderRadius: 4,
          background: `radial-gradient(260px 220px at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.26), rgba(255,255,255,0) 60%)`,
          filter: "blur(6px)",
          opacity: 0.6,
        }}
      />

      {/* Glass content */}
      <Box
        component={motion.div}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        }}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 160, damping: 18 }}
        sx={{
          position: "relative",
          borderRadius: 3.5,
          p: { xs: 3, md: 4 },
          minHeight: { xs: 436, md: 596 },
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.75), rgba(255,255,255,0.58))",
          backdropFilter: "blur(10px)",
          overflow: "hidden",
        }}
      >
        {/* קולאז' תמונות צפות */}
        <Box
          sx={{
            position: "relative",
            height: 160,
            mb: 2,
          }}
        >
          {[
            "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=800&q=80&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=800&q=80&auto=format&fit=crop",

            "https://images.unsplash.com/photo-1552581234-26160f608093?w=800&q=80&auto=format&fit=crop",
          ].map((src, i) => (
            <Box
              key={src}
              component={motion.img}
              src={src}
              alt=""
              loading="lazy"
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 + i * 0.1, ease: "easeOut" }}
              sx={{
                position: "absolute",
                top: 18 + i * 8,
                left: 10 + i * 40,
                width: 140,
                height: 90,
                objectFit: "cover",
                borderRadius: 2,
                boxShadow: "0 14px 28px rgba(2,6,23,0.18)",
                transform: `rotate(${i === 0 ? -7 : i === 1 ? 4 : -3}deg)`,
                border: "1px solid #e2e8f0",
              }}
            />
          ))}
        </Box>

        <Typography
          variant="h6"
          sx={{ fontWeight: 900, letterSpacing: "-0.02em", mb: 1 }}
        >
          Trust & Security
        </Typography>

        {/* סטטיסטיקות נוצצות */}
        <Stack direction="row" spacing={3} sx={{ mb: 2, flexWrap: "wrap" }}>
          <Stack>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 900,
                background: "linear-gradient(90deg,#f59e0b,#22c55e,#3b82f6)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              4.9
            </Typography>
            <Stack direction="row" spacing={0.5} alignItems="center">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarRoundedIcon key={i} fontSize="small" color="warning" />
              ))}
            </Stack>
            <Typography variant="caption" color="text.secondary">
              Avg. rating
            </Typography>
          </Stack>

          <Stack>
            <Typography variant="h5" sx={{ fontWeight: 900 }}>
              2.5k+
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Projects delivered
            </Typography>
          </Stack>

          <Stack>
            <Typography variant="h5" sx={{ fontWeight: 900 }}>
              1.2k+
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Employers
            </Typography>
          </Stack>
        </Stack>

        {/* Badges */}
        <Stack
          direction="row"
          spacing={1.2}
          alignItems="center"
          sx={{ mb: 0.5 }}
        >
          <VerifiedUserRoundedIcon color="primary" fontSize="small" />
          <Typography variant="body2">Verified profiles & reviews</Typography>
        </Stack>
        <Stack direction="row" spacing={1.2} alignItems="center">
          <ShieldRoundedIcon color="primary" fontSize="small" />
          <Typography variant="body2">
            Secure authentication & data protection
          </Typography>
        </Stack>

        {/* טסטמוניאל נוצץ */}
        <Paper
          variant="outlined"
          sx={{
            mt: 2.5,
            p: 2,
            borderRadius: 2.5,
            background: "#ffffffcc",
            borderColor: "#e2e8f0",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <FormatQuoteRoundedIcon
            sx={{
              position: "absolute",
              top: -6,
              right: -6,
              fontSize: 56,
              color: "rgba(15, 23, 42, 0.08)",
            }}
          />
          <Typography variant="body2" sx={{ fontStyle: "italic" }}>
            “Signed up and landed my first client within a week. Super smooth!”
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mt: 1 }}
          >
            — Lior A., Designer
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default RightAd;
