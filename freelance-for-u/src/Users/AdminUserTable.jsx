import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Fade,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getCurrentUser } from "../Services/authHelper";

const AdminUserTable = ({ users, onDelete, formatDate }) => {
  const currentUser = getCurrentUser();

  return (
    <Box mt={3}>
      <Typography variant="h5" mb={2} fontWeight="bold">
        Registered Users
      </Typography>
      <Paper elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Last Login</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <Fade in={true} key={user.id} timeout={400}>
                <TableRow>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    {user.lastLogin ? formatDate(user.lastLogin) : "Never"}
                  </TableCell>
                  <TableCell align="center">
                    {user.id !== currentUser?.id && (
                      <Tooltip title="Delete User">
                        <IconButton
                          onClick={() => onDelete(user.id)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              </Fade>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default AdminUserTable;
