// src/admin/pages/AdminUserPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  CircularProgress,
  Container,
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import AdminUserTable from "../AdminUserTable";
import SearchInput from "../../SearchFillter/SearchInput";
import useSearchFilter from "../../SearchFillter/useSearchFilter";
import useDebouncedValue from "../../SearchFillter/useDebouncedValue";
import NavBar from "../../Header/NavBar";

const AdminUserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 400);
  const [roleFilter, setRoleFilter] = useState("All");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5244/api/user/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data);
      } catch (err) {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleClear = () => setSearch("");

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5244/api/user/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  const filteredUsers = useSearchFilter(
    users.filter((u) => (roleFilter === "All" ? true : u.role === roleFilter)),
    debouncedSearch,
    ["username", "email"]
  );

  return (
    <>
      <NavBar />
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" mt={10}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <SearchInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClear={handleClear}
              isLoading={search !== debouncedSearch}
            />

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Filter by Role</InputLabel>
              <Select
                value={roleFilter}
                label="Filter by Role"
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </Select>
            </FormControl>

            <AdminUserTable users={filteredUsers} onDelete={handleDelete} />
          </>
        )}
      </Container>
    </>
  );
};

export default AdminUserPage;
