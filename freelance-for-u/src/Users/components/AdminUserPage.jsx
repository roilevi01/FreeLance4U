import React from "react";
import { Container, Typography, Box } from "@mui/material";
import useAdminUserLogic from "../../hooks/useAdminUserLogic";
import SearchInput from "../../SearchFillter/SearchInput";
import AdminUserTable from "../AdminUserTable";
import NavBar from "../../Header/NavBar";

const AdminUserPage = () => {
  const { users, handleDelete, formatDate, searchQuery, handleSearchChange } =
    useAdminUserLogic();

  return (
    <>
      <NavBar />
      <Container>
        <Box mt={4} mb={3}>
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            gutterBottom
          >
            Manage Users
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary">
            As an admin, you can view and delete users.
          </Typography>
        </Box>

        <Box mb={4}>
          <SearchInput
            label="Search users by name or email..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Box>

        <AdminUserTable
          users={users}
          onDelete={handleDelete}
          formatDate={formatDate}
        />
      </Container>
    </>
  );
};

export default AdminUserPage;
