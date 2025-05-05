import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import { getCurrentUser, isAdmin } from "../Services/authHelper";

const NavBar = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [profilePicture, setProfilePicture] = React.useState("");

  React.useEffect(() => {
    const stored = localStorage.getItem("profilePicture");
    if (stored) setProfilePicture(stored);
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profilePicture");
    alert("You have been logged out.");
    navigate(ROUTES.LOGIN);
  };

  const navLinks = [
    { label: "Contact", route: ROUTES.CONNECT },
    { label: "About Us", route: ROUTES.ABOUT },
    { label: "Create Cards", route: ROUTES.CREATE_CARD },
  ];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            onClick={() => navigate(ROUTES.ROOT)}
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
            <IconButton
              size="large"
              aria-label="open navigation menu"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {navLinks.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={() => {
                    navigate(page.route);
                    handleCloseNavMenu();
                  }}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            onClick={() => navigate(ROUTES.ROOT)}
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
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

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navLinks.map((page) => (
              <Button
                key={page.label}
                onClick={() => navigate(page.route)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.label}
              </Button>
            ))}
            {user && (
              <Button
                onClick={() => navigate(ROUTES.USER_CARDS)}
                sx={{ my: 2, color: "white" }}
              >
                Jobs
              </Button>
            )}
            {isAdmin() && (
              <Button
                onClick={() => navigate(ROUTES.MANAGE_USERES)}
                sx={{ my: 2, color: "white" }}
              >
                Manage Users
              </Button>
            )}
            {user && (
              <Button
                onClick={() => navigate(ROUTES.CREATE_CARD)}
                sx={{ my: 2, color: "white" }}
              >
                Create Card
              </Button>
            )}
          </Box>

          <Box sx={{ display: "flex", gap: 1, marginRight: 2 }}>
            <Facebook style={{ color: "#fff" }} />
            <Instagram style={{ color: "#fff" }} />
            <Twitter style={{ color: "#fff" }} />
            <LinkedIn style={{ color: "#fff" }} />
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  src={profilePicture || "/assets/default-avatar.png"}
                  alt="user"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={() => {
                  navigate(ROUTES.USER_PROFILE);
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  logout();
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
