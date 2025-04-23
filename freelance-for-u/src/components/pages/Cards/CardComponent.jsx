import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import { motion } from "framer-motion";
import useCardActions from "../../../hooks/useCardActions";
import CommentSection from "./CommentSection";

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
        }}
      >
        {card.businessImage && (
          <CardMedia
            component="img"
            height="140"
            image={card.businessImage}
            alt={card.businessName}
          />
        )}

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
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

          <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
            <IconButton onClick={handleLike}>
              <FavoriteIcon sx={{ color: liked ? "red" : "gray" }} />
            </IconButton>
            <Typography variant="body2">{likeCount} Likes</Typography>
          </div>

          {(isAdmin || isOwner) && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <IconButton
                onClick={handleEdit}
                sx={{ backgroundColor: "#1976d2", color: "#fff" }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={handleDelete}
                sx={{ backgroundColor: "#f44336", color: "#fff" }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          )}
        </CardContent>

        <CommentSection cardId={card.id} />
      </Card>
    </motion.div>
  );
};

export default CardComponent;
