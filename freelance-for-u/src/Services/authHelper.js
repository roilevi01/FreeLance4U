// src/utils/authHelper.js
import { jwtDecode } from "jwt-decode";

export const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return {
      id: decoded.nameid,
      role: decoded.role,
    };
  } catch (err) {
    return null;
  }
};

export const isAdmin = () => {
  const user = getCurrentUser();
  return user?.role === "Admin";
};

export const isOwner = (cardUserId) => {
  const user = getCurrentUser();
  return user?.id === cardUserId;
};
