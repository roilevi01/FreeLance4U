import React from "react";
import {
  Typography,
  TextField,
  Button,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useCommentLogic from "../../../hooks/useCommentLogic";

const CommentSection = ({ cardId }) => {
  const {
    comments,
    text,
    user,
    handleTextChange,
    handleAddComment,
    handleDeleteComment,
  } = useCommentLogic(cardId);

  return (
    <Box mt={2}>
      <Typography variant="h6">Comments</Typography>
      <List>
        {comments.map((c) => (
          <ListItem
            key={c.id}
            secondaryAction={
              (user?.isAdmin || user?.username === c.username) && (
                <IconButton onClick={() => handleDeleteComment(c.id)}>
                  <DeleteIcon />
                </IconButton>
              )
            }
          >
            <ListItemText
              primary={c.username}
              secondary={`${c.content} (${new Date(
                c.createdAt
              ).toLocaleString()})`}
            />
          </ListItem>
        ))}
      </List>

      {user && (
        <Box mt={2}>
          <TextField
            fullWidth
            multiline
            label="Write a comment"
            value={text}
            onChange={handleTextChange}
          />
          <Button onClick={handleAddComment} variant="contained" sx={{ mt: 1 }}>
            Post Comment
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CommentSection;
