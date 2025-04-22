import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ROUTES from "../routes/routesModel";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import { getCurrentUser } from "../Services/authHelper";
import { Link } from "react-router-dom";
import { isAdmin } from "../Services/authHelper";

export default function NavBar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [profilePicture, setProfilePicture] = useState("");

  const handleNavigate = (route) => {
    navigate(route);
  };
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profilePicture");
    alert("You have been logged out.");
    navigate(ROUTES.LOGIN);
  };

  useEffect(() => {
    const storedImage = localStorage.getItem("profilePicture");
    if (storedImage) setProfilePicture(storedImage);
  }, []);

  const user = getCurrentUser();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            onClick={() => handleNavigate(ROUTES.ROOT)}
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Freelance4U
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuItem onClick={() => handleNavigate(ROUTES.CONNECT)}>
                <Typography sx={{ textAlign: "center" }}>Contact</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleNavigate(ROUTES.ABOUT)}>
                <Typography sx={{ textAlign: "center" }}>About Us</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleNavigate(ROUTES.BLOG)}>
                <Typography sx={{ textAlign: "center" }}>Blog</Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => handleNavigate(ROUTES.CONNECT)}
              sx={{ my: 2, color: "white" }}
            >
              Contact
            </Button>
            <Button
              onClick={() => handleNavigate(ROUTES.ABOUT)}
              sx={{ my: 2, color: "white" }}
            >
              About Us
            </Button>

            {user?.role === "User" || user?.role === "Admin" ? (
              <Button
                onClick={() => handleNavigate(ROUTES.USER_CARDS)}
                sx={{ my: 2, color: "white" }}
              >
                Jobs
              </Button>
            ) : null}

            {isAdmin() && (
              <Button
                component={Link}
                to="/admin/users"
                sx={{ my: 2, color: "white" }}
              >
                Manage Users
              </Button>
            )}

            <Button
              onClick={() => handleNavigate(ROUTES.CREATE_CARD)}
              sx={{ my: 2, color: "white" }}
            >
              Create Card
            </Button>
            <IconButton sx={{ marginLeft: 5 }}>
              <Facebook style={{ color: "#FFFFFF" }} />
            </IconButton>
            <IconButton>
              <Instagram style={{ color: "#ffffff" }} />
            </IconButton>
            <IconButton>
              <Twitter style={{ color: "#FFFFFf" }} />
            </IconButton>
            <IconButton>
              <LinkedIn style={{ color: "#FFFFFF" }} />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="User Avatar"
                  src={profilePicture || "/default-avatar.png"}
                />
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem
                onClick={() => {
                  navigate(ROUTES.USER_PROFILE);
                  handleCloseMenu();
                }}
              >
                <Typography>Profile</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseMenu}>
                <Typography>Account</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  console.log("Dashboard clicked");
                  handleCloseMenu();
                }}
              >
                <Typography>Dashboard</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate(ROUTES.SIGNUP);
                  logout();
                  handleCloseMenu();
                }}
              >
                <Typography>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
