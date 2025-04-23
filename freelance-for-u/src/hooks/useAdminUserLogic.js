import { useEffect, useState } from "react";
import api from "../Services/api";
import { getCurrentUser } from "../Services/authHelper";

const useAdminUserLogic = () => {
  const [users, setUsers] = useState([]);
  const currentUser = getCurrentUser();
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await api.get("/user/all");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const handleDelete = async (id) => {
    if (currentUser?.id === id) {
      alert("Admin cannot delete their own account");
      return;
    }

    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/user/delete/${id}`);
        setUsers((prev) => prev.filter((u) => u.id !== id));
      } catch (err) {
        console.error("Failed to delete user", err);
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users: filteredUsers,
    handleDelete,
    formatDate,
    searchQuery,
    handleSearchChange,
  };
};

export default useAdminUserLogic;
