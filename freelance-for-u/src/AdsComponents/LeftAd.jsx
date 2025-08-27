import { useState } from "react";
import { Box, Typography, Stack, Chip, Divider } from "@mui/material";
import { motion } from "framer-motion";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import Groups2RoundedIcon from "@mui/icons-material/Groups2Rounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

const LeftAd = () => {
  const [shine, setShine] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * 100;
    const py = ((e.clientY - r.top) / r.height) * 100;
    setShine({ x: px, y: py });
    const rx = (py - 50) / 8; // עדין
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
        // מסגרת גרדיאנט חיה
        background:
          "conic-gradient(from 180deg at 50% 50%, #60a5fa, #a78bfa, #22d3ee, #60a5fa)",
        boxShadow: "0 20px 48px rgba(2,6,23,0.16)",
      }}
    >
      {/* שכבת Shine דינמית */}
      <Box
        sx={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          borderRadius: 4,
          background: `radial-gradient(250px 200px at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.28), rgba(255,255,255,0) 60%)`,
          filter: "blur(6px)",
          opacity: 0.6,
        }}
      />

      {/* תוכן פנימי (זכוכית) */}
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
        }}
      >
        {/* Blobs דקורטיביים */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: 3.5,
            overflow: "hidden",
            pointerEvents: "none",
            "&::before, &::after": {
              content: '""',
              position: "absolute",
              width: 220,
              height: 220,
              borderRadius: "50%",
              filter: "blur(32px)",
              opacity: 0.35,
              animation: "floaty 16s ease-in-out infinite",
            },
            "&::before": {
              top: -40,
              left: -40,
              background:
                "radial-gradient(circle at 30% 30%, #93c5fd, transparent 60%)",
            },
            "&::after": {
              bottom: -60,
              right: -40,
              animationDelay: "6s",
              background:
                "radial-gradient(circle at 70% 70%, #a78bfa, transparent 60%)",
            },
            "@keyframes floaty": {
              "0%,100%": { transform: "translate(0,0)" },
              "50%": { transform: "translate(10px,14px)" },
            },
          }}
        />

        <Stack spacing={1} sx={{ position: "relative", zIndex: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <AutoAwesomeRoundedIcon color="primary" />
            <Typography
              variant="overline"
              color="primary"
              sx={{ fontWeight: 900, letterSpacing: ".12em" }}
            >
              Level up your brand
            </Typography>
          </Stack>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              mb: 0.5,
            }}
          >
            Showcase Your Business
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create stunning digital cards and attract more clients effortlessly.
          </Typography>

          <Stack spacing={1.4} sx={{ mt: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <CheckCircleRoundedIcon color="success" fontSize="small" />
              <Typography variant="body2">
                Polished profile with premium visuals
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <CheckCircleRoundedIcon color="success" fontSize="small" />
              <Typography variant="body2">
                Connect with employers in minutes
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <CheckCircleRoundedIcon color="success" fontSize="small" />
              <Typography variant="body2">
                Free listing, boosted discovery
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
            <Chip
              icon={<RocketLaunchRoundedIcon />}
              label="Fast onboarding"
              size="small"
            />
            <Chip
              icon={<TrendingUpRoundedIcon />}
              label="Grow reach"
              size="small"
            />
            <Chip
              icon={<Groups2RoundedIcon />}
              label="Community"
              size="small"
            />
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Typography variant="overline" color="text.secondary">
            Get started in 3 steps
          </Typography>
          <Stack spacing={0.6}>
            <Typography variant="caption">1. Create your account</Typography>
            <Typography variant="caption">2. Add skills & portfolio</Typography>
            <Typography variant="caption">
              3. Apply or receive invites
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default LeftAd;
