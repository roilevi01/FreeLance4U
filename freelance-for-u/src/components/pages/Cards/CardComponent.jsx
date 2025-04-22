import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  Stack,
  useMediaQuery,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";
import { isOwner, isAdmin } from "../../../Services/authHelper";
import api from "../../../Services/api";
import CommentSection from "./CommentSection";

const CardComponent = ({ card, onDelete }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await api.get(`/likes/count/${card.id}`);
        setLikeCount(res.data.likes);

        const check = await api.get(`/likes/has-liked/${card.id}`);
        setLiked(check.data.liked);
      } catch (err) {
        console.error("Failed to fetch like info", err);
      }
    };

    fetchLikes();
  }, [card.id]);

  const handleLike = async () => {
    try {
      if (!liked) {
        await api.post(`/likes/${card.id}`);
        setLikeCount((prev) => prev + 1);
        setLiked(true);
      } else {
        await api.delete(`/likes/${card.id}`);
        setLikeCount((prev) => prev - 1);
        setLiked(false);
      }
    } catch (err) {
      alert(err.response?.data || "Error performing like/unlike");
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      onDelete(card.id);
    }
  };

  const handleEdit = () => {
    navigate(`${ROUTES.EDIT_CARD.replace(":id", card.id)}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          maxWidth: 345,
          borderRadius: 2,
          boxShadow: 3,
          position: "relative",
          mx: "auto",
        }}
      >
        {card.businessImage && (
          <CardMedia
            component="img"
            height="180"
            image={card.businessImage}
            alt={card.businessName}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {card.businessName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {card.description}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <strong>Contact:</strong> {card.contactInfo}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Phone:</strong> {card.phoneNumber}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1} mt={2}>
            <motion.div
              whileTap={{ scale: 1.3 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <IconButton onClick={handleLike}>
                <FavoriteIcon sx={{ color: liked ? "red" : "gray" }} />
              </IconButton>
            </motion.div>
            <Typography variant="body2">{likeCount} Likes</Typography>
          </Stack>

          {(isAdmin() || isOwner(card.userId)) && (
            <Stack direction={isMobile ? "column" : "row"} spacing={1} mt={2}>
              <IconButton
                onClick={handleEdit}
                sx={{
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#1565c0" },
                  width: isMobile ? "100%" : "auto",
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={handleDelete}
                sx={{
                  backgroundColor: "#f44336",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#d32f2f" },
                  width: isMobile ? "100%" : "auto",
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          )}

          <Box mt={2}>
            <CommentSection cardId={card.id} />
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CardComponent;
