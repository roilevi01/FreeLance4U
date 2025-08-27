import React, { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  Stack,
  Tooltip,
  Divider,
  Chip,
  Avatar,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import PhoneIphoneRoundedIcon from "@mui/icons-material/PhoneIphoneRounded";
import ImageNotSupportedRoundedIcon from "@mui/icons-material/ImageNotSupportedRounded";
import { motion, AnimatePresence } from "framer-motion";
import useCardActions from "../../../hooks/useCardActions";
import {
  CommentsProvider,
  CommentsList,
  CommentComposer,
} from "./CommentSection";

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");

const MotionBox = motion(Box);

const CardComponent = ({ card, onDelete }) => {
  const {
    liked,
    likeCount,
    handleLike,
    handleDelete,
    handleEdit,
    isAdmin,
    isOwner,
  } = useCardActions(card, onDelete);

  const [imgError, setImgError] = useState(false);
  const [burstKey, setBurstKey] = useState(0);

  const initials = useMemo(
    () => getInitials(card?.businessName),
    [card?.businessName]
  );

  const onLikeClick = () => {
    handleLike();
    setBurstKey((k) => k + 1);
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      whileHover={{ y: -4, boxShadow: "0 18px 46px rgba(2,6,23,0.16)" }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      sx={{
        position: "relative",
        borderRadius: 4,
        p: "2px",
        maxWidth: 400,
        background:
          "conic-gradient(from 180deg at 50% 50%, #60a5fa, #a78bfa, #22d3ee, #60a5fa)",
      }}
    >
      <Card
        sx={{
          borderRadius: 3.5,
          overflow: "hidden",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,255,255,0.92))",
          backdropFilter: "blur(6px)",
          boxShadow: "0 12px 28px rgba(2,6,23,0.08)",
          position: "relative",
        }}
      >
        
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          {card.businessImage && !imgError ? (
            <CardMedia
              component="img"
              image={card.businessImage}
              alt={card.businessName}
              onError={() => setImgError(true)}
              sx={{
                aspectRatio: "16/9",
                objectFit: "cover",
                transition: "transform .6s ease",
                "&:hover": { transform: "scale(1.04)" },
              }}
            />
          ) : (
            <Box
              sx={{
                aspectRatio: "16/9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "radial-gradient(120% 120% at 0% 0%, #e0f2fe 0%, #dbeafe 60%, #ffffff 120%)",
              }}
            >
              <Stack alignItems="center" spacing={1}>
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    fontWeight: 900,
                    bgcolor: "#3b82f6",
                    color: "#fff",
                  }}
                >
                  {initials || <ImageNotSupportedRoundedIcon />}
                </Avatar>
                <Typography variant="caption" color="text.secondary">
                  Image not available
                </Typography>
              </Stack>
            </Box>
          )}

          
          <Box
            sx={{
              pointerEvents: "none",
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.28) 100%)",
            }}
          />
          <Chip
            label={card.businessName}
            size="small"
            sx={{
              position: "absolute",
              left: 12,
              bottom: 10,
              bgcolor: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(4px)",
              fontWeight: 700,
            }}
          />

          {(isAdmin || isOwner) && (
            <Stack
              direction="row"
              spacing={1}
              sx={{ position: "absolute", top: 10, right: 10, zIndex: 2 }}
            >
              <Tooltip title="Edit">
                <IconButton
                  size="small"
                  onClick={handleEdit}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.9)",
                    "&:hover": { bgcolor: "rgba(255,255,255,1)" },
                    boxShadow: "0 6px 16px rgba(2,6,23,0.18)",
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  size="small"
                  onClick={handleDelete}
                  sx={{
                    bgcolor: "#ef4444",
                    color: "#fff",
                    "&:hover": { bgcolor: "#dc2626" },
                    boxShadow: "0 6px 16px rgba(239,68,68,0.4)",
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          )}
        </Box>

        
        <CardContent sx={{ p: 2.5 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography
              variant="h6"
              component="h3"
              sx={{ fontWeight: 900, letterSpacing: "-0.01em", mb: 0 }}
            >
              {card.businessName}
            </Typography>
            <Chip
              label="Business"
              size="small"
              variant="outlined"
              sx={{ borderColor: "#e2e8f0", color: "text.secondary" }}
            />
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {card.description}
          </Typography>

          <Divider sx={{ my: 1.5 }} />

          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            flexWrap="wrap"
            alignItems="center"
            sx={{ mb: 1 }}
          >
            {card.contactInfo && (
              <Button
                size="small"
                variant="outlined"
                startIcon={<MailOutlineRoundedIcon />}
                href={`mailto:${card.contactInfo}`}
                sx={{ borderRadius: 999, textTransform: "none", px: 1.4 }}
              >
                {card.contactInfo}
              </Button>
            )}
            {card.phoneNumber && (
              <Button
                size="small"
                variant="outlined"
                startIcon={<PhoneIphoneRoundedIcon />}
                href={`tel:${card.phoneNumber}`}
                sx={{ borderRadius: 999, textTransform: "none", px: 1.4 }}
              >
                {card.phoneNumber}
              </Button>
            )}
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Tooltip title={liked ? "Unlike" : "Like"}>
              <IconButton
                onClick={onLikeClick}
                aria-label="like"
                sx={{
                  bgcolor: liked ? "rgba(239,68,68,0.12)" : "rgba(2,6,23,0.06)",
                  "&:hover": {
                    bgcolor: liked
                      ? "rgba(239,68,68,0.2)"
                      : "rgba(2,6,23,0.12)",
                  },
                }}
              >
                <motion.span
                  key={liked ? "liked" : "unliked"}
                  animate={{ scale: liked ? 1.2 : 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 16 }}
                  style={{ display: "grid" }}
                >
                  <FavoriteIcon sx={{ color: liked ? "#ef4444" : "gray" }} />
                </motion.span>
              </IconButton>
            </Tooltip>

            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              {likeCount} {likeCount === 1 ? "Like" : "Likes"}
            </Typography>

            <AnimatePresence>
              <motion.div
                key={burstKey}
                initial={{ y: 6, opacity: 0, scale: 0.8 }}
                animate={{ y: -12, opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -24, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                style={{ position: "relative" }}
              >
                {burstKey > 0 && liked && (
                  <Typography
                    variant="caption"
                    sx={{ color: "#ef4444", position: "absolute", left: 8 }}
                  >
                    +1
                  </Typography>
                )}
              </motion.div>
            </AnimatePresence>
          </Stack>
        </CardContent>

        
        <CommentsProvider cardId={card.id}>
          <Box sx={{ px: 2, pb: 2 }}>
            <Divider sx={{ mb: 1.25 }} />

            
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ letterSpacing: ".12em", display: "block", mb: 0.5 }}
            >
              Comments
            </Typography>
            <Box
              sx={{
                maxHeight: 260, 
                overflowY: "auto", 
                pr: 1,
                pb: 1,
                scrollbarWidth: "thin",
                scrollbarColor: "#94a3b8 transparent",
                "&::-webkit-scrollbar": { width: 8 },
                "&::-webkit-scrollbar-thumb": {
                  background:
                    "linear-gradient(180deg, rgba(100,116,139,.7), rgba(148,163,184,.8))",
                  borderRadius: 999,
                },
              }}
            >
              <CommentsList />
            </Box>

            <Divider sx={{ my: 1.25 }} />

            
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ letterSpacing: ".12em", display: "block", mb: 0.5 }}
            >
              Add a comment
            </Typography>
            <CommentComposer />
          </Box>
        </CommentsProvider>
      </Card>
    </MotionBox>
  );
};

export default CardComponent;
