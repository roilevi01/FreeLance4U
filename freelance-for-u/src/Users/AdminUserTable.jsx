// src/admin/components/AdminUserTable.jsx
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getCurrentUser } from "../Services/authHelper";

const AdminUserTable = ({ users, onDelete }) => {
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
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {user.lastLogin
                    ? new Date(user.lastLogin).toLocaleString()
                    : "Never"}
                </TableCell>
                <TableCell align="center">
                  {user.id !== currentUser?.id && (
                    <Tooltip title="Delete User">
                      <IconButton
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this user?"
                            )
                          ) {
                            onDelete(user.id);
                          }
                        }}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default AdminUserTable;
