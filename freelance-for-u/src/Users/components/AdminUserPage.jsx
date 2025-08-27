import React, { useMemo } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Stack,
  Chip,
  Divider,
} from "@mui/material";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import useAdminUserLogic from "../../hooks/useAdminUserLogic";
import SearchInput from "../../SearchFillter/SearchInput";
import AdminUserTable from "../AdminUserTable";
import NavBar from "../../Header/NavBar";

const AdminUserPage = () => {
  const { users, handleDelete, formatDate, searchQuery, handleSearchChange } =
    useAdminUserLogic();

  const total = users?.length || 0;
  const admins = useMemo(
    () =>
      (users || []).filter(
        (u) => String(u?.role || "").toLowerCase() === "admin"
      ).length,
    [users]
  );

  return (
    <>
      <NavBar />

      <Box
        sx={{
          minHeight: "100vh",
          background:
            "radial-gradient(120% 120% at 0% 0%, #f1f5f9 0%, #eef2ff 55%, #ffffff 100%)",
          pb: 8,
        }}
      >
        <Container maxWidth="lg" sx={{ pt: 6 }}>
          <Box sx={{ textAlign: "center", position: "relative", mb: 4 }}>
        
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                zIndex: 0,
                pointerEvents: "none",
                "&::before, &::after": {
                  content: '""',
                  position: "absolute",
                  filter: "blur(70px)",
                  opacity: 0.6,
                  borderRadius: "50%",
                },
                "&::before": {
                  width: 260,
                  height: 260,
                  left: -40,
                  top: -30,
                  background: "linear-gradient(180deg, #60a5fa, #a78bfa)",
                },
                "&::after": {
                  width: 260,
                  height: 260,
                  right: -40,
                  bottom: -40,
                  background: "linear-gradient(180deg, #22d3ee, #60a5fa)",
                },
              }}
            />

            <Typography
              variant="h3"
              gutterBottom
              sx={{
                position: "relative",
                zIndex: 1,
                fontWeight: 900,
                letterSpacing: "-.02em",
                lineHeight: 1.1,
                backgroundImage:
                  "linear-gradient(90deg,#0ea5e9,#a78bfa 50%,#22d3ee)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Manage Users
            </Typography>

            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{
                position: "relative",
                zIndex: 1,
                maxWidth: 720,
                mx: "auto",
              }}
            >
              As an admin, you can view and delete users.
            </Typography>

            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                width: 80,
                height: 4,
                mx: "auto",
                mt: 2,
                borderRadius: 999,
                background: "linear-gradient(90deg,#3b82f6,#22d3ee)",
              }}
            />

            <Stack
              direction="row"
              spacing={1.2}
              justifyContent="center"
              sx={{ mt: 2, position: "relative", zIndex: 1 }}
            >
              <Chip
                icon={<PeopleAltRoundedIcon />}
                label={`${total} Users`}
                sx={{
                  fontWeight: 700,
                  bgcolor: "rgba(255,255,255,.8)",
                  backdropFilter: "blur(8px)",
                }}
              />
              <Chip
                icon={<VerifiedUserRoundedIcon />}
                label={`${admins} Admins`}
                sx={{
                  fontWeight: 700,
                  bgcolor: "rgba(255,255,255,.8)",
                  backdropFilter: "blur(8px)",
                }}
              />
            </Stack>
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, md: 2.5 },
              mb: 3,
              borderRadius: 3,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.86))",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(2,6,23,0.06)",
              boxShadow: "0 16px 36px rgba(2,6,23,0.06)",
            }}
          >
            <SearchInput
              label="Search users by name or email..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 1, md: 2 },
              borderRadius: 3,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,255,255,0.9))",
              border: "1px solid rgba(2,6,23,0.06)",
              boxShadow: "0 16px 36px rgba(2,6,23,0.06)",
              overflow: "hidden",
            }}
          >
            <Box sx={{ px: { xs: 1, md: 1.5 }, py: 1 }}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ fontWeight: 700 }}
              >
                Users table
              </Typography>
              <Divider sx={{ mt: 1 }} />
            </Box>

            <Box sx={{ overflowX: "auto" }}>
              <AdminUserTable
                users={users}
                onDelete={handleDelete}
                formatDate={formatDate}
              />
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default AdminUserPage;
