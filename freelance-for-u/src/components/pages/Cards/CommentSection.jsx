import { useEffect, useState } from "react";
import api from "../../../Services/api";
import { getCurrentUser, isAdmin } from "../../../Services/authHelper";
import {
  Typography,
  TextField,
  Button,
  IconButton,
  Box,
  List,
  Snackbar,
  Alert,
  Paper,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion } from "framer-motion";

const CommentSection = ({ cardId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
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

  const handleAddComment = async () => {
    if (!text.trim()) return;
    try {
      await api.post("/comments/add", {
        businessCardId: cardId,
        content: text,
      });
      setText("");
      fetchComments();
      setSnackbar({
        open: true,
        message: "Comment added!",
        severity: "success",
      });
    } catch (err) {
      console.error("Failed to add comment:", err);
      setSnackbar({
        open: true,
        message: "Failed to add comment",
        severity: "error",
      });
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await api.delete(`/comments/delete/${commentId}`);
      fetchComments();
      setSnackbar({ open: true, message: "Comment deleted", severity: "info" });
    } catch (err) {
      console.error("Failed to delete comment:", err);
      setSnackbar({
        open: true,
        message: "Failed to delete comment",
        severity: "error",
      });
    }
  };

  return (
    <Box mt={2}>
      <Typography variant="h6">Comments</Typography>

      <List>
        {comments.map((c) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Paper elevation={1} sx={{ p: 2, mb: 1, position: "relative" }}>
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  <Typography variant="subtitle2">{c.username}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {c.content}
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    {new Date(c.createdAt).toLocaleString()}
                  </Typography>
                </Box>
                {(isAdmin() || user?.username === c.username) && (
                  <IconButton onClick={() => handleDeleteComment(c.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
              </Stack>
            </Paper>
          </motion.div>
        ))}
      </List>

      {user && (
        <Box mt={2}>
          <TextField
            fullWidth
            multiline
            label="Write a comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={handleAddComment} variant="contained" sx={{ mt: 1 }}>
            Post Comment
          </Button>
        </Box>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CommentSection;
