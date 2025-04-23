import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import api from "../Services/api";
import { isOwner, isAdmin } from "../Services/authHelper";

const useCardActions = (card, onDelete) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const navigate = useNavigate();

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

  return {
    liked,
    likeCount,
    handleLike,
    handleDelete,
    handleEdit,
    isAdmin: isAdmin(),
    isOwner: isOwner(card.userId),
  };
};

export default useCardActions;
