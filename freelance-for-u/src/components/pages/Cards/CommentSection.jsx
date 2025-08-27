import React, { createContext, useContext } from "react";
import {
  Typography,
  TextField,
  Button,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useCommentLogic from "../../../hooks/useCommentLogic";

const CommentsCtx = createContext(null);
const useCommentsContext = () => useContext(CommentsCtx);

export const CommentsProvider = ({ cardId, children }) => {
  const value = useCommentLogic(cardId);
  return <CommentsCtx.Provider value={value}>{children}</CommentsCtx.Provider>;
};

export const CommentsList = () => {
  const { comments, user, handleDeleteComment } = useCommentsContext();

  if (!comments?.length) {
    return (
      <Typography variant="body2" color="text.secondary">
        No comments yet. Be the first to comment!
      </Typography>
    );
  }

  return (
    <List dense disablePadding sx={{ mt: 1 }}>
      {comments.map((c, idx) => (
        <React.Fragment key={c.id}>
          <ListItem
            alignItems="flex-start"
            secondaryAction={
              (user?.isAdmin || user?.username === c.username) && (
                <IconButton
                  edge="end"
                  aria-label="delete comment"
                  onClick={() => handleDeleteComment(c.id)}
                  size="small"
                  sx={{ "&:hover": { bgcolor: "rgba(239,68,68,0.08)" } }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )
            }
            sx={{
              px: 1,
              py: 1,
              borderRadius: 2,
              "&:hover": { backgroundColor: "rgba(2,6,23,0.03)" },
            }}
          >
            <ListItemText
              primaryTypographyProps={{ variant: "subtitle2", fontWeight: 700 }}
              secondaryTypographyProps={{
                variant: "body2",
                color: "text.secondary",
              }}
              primary={c.username}
              secondary={`${c.content} (${new Date(
                c.createdAt
              ).toLocaleString()})`}
            />
          </ListItem>
          {idx < comments.length - 1 && (
            <Divider component="li" sx={{ ml: 1 }} />
          )}
        </React.Fragment>
      ))}
    </List>
  );
};

export const CommentComposer = () => {
  const { user, text, handleTextChange, handleAddComment } =
    useCommentsContext();
  if (!user) return null;

  const onSubmit = (e) => {
    e.preventDefault();
    handleAddComment();
  };

  return (
    <Box component="form" onSubmit={onSubmit} sx={{ mt: 1.5 }}>
      <TextField
        fullWidth
        multiline
        minRows={2}
        maxRows={6}
        label="Write a comment"
        placeholder="Share your thoughts…"
        value={text}
        onChange={handleTextChange}
      />
      <Button
        type="submit"
        onClick={onSubmit}
        disabled={!text?.trim()}
        variant="contained"
        sx={{
          mt: 1,
          borderRadius: 999,
          textTransform: "none",
          fontWeight: 800,
          px: 2.5,
          boxShadow: "0 10px 24px rgba(37,99,235,0.25)",
          background: "linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0 14px 32px rgba(37,99,235,0.35)",
            background: "linear-gradient(180deg, #2563eb 0%, #1e40af 100%)",
          },
        }}
      >
        Post Comment
      </Button>
    </Box>
  );
};

const CommentSection = ({ cardId }) => (
  <Box mt={2}>
    <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: "-.01em" }}>
      Comments
    </Typography>
    <CommentsProvider cardId={cardId}>
      <CommentsList />
      <CommentComposer />
    </CommentsProvider>
  </Box>
);

export default CommentSection;
