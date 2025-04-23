import { useState, useEffect } from "react";
import api from "../Services/api";
import { getCurrentUser } from "../Services/authHelper";

const useCommentLogic = (cardId) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const user = getCurrentUser();

  const fetchComments = async () => {
    try {
      const res = await api.get(`/comments/by-card/${cardId}`);
      setComments(res.data);
    } catch (err) {
      console.error("Failed to load comments:", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [cardId]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleAddComment = async () => {
    if (!text.trim()) return;

    try {
      await api.post("/comments/add", {
        businessCardId: cardId,
        content: text,
      });
      setText("");
      fetchComments();
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await api.delete(`/comments/delete/${commentId}`);
      fetchComments();
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  return {
    comments,
    text,
    handleTextChange,
    handleAddComment,
    handleDeleteComment,
    user,
  };
};

export default useCommentLogic;
