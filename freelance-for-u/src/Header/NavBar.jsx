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
import { useNavigate, useLocation } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import { getCurrentUser, isAdmin } from "../Services/authHelper";
import api from "../Services/api";

// נירמול תמונת פרופיל
const normalizeProfileImage = (img) => {
  if (!img || typeof img !== "string") return "";
  if (img.startsWith("data:image/")) return img;
  if (/^https?:\/\//i.test(img)) return img;
  if (img.startsWith("/")) return `${window.location.origin}${img}`;
  const base64 =
    /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(
      img
    );
  return base64 ? `data:image/jpeg;base64,${img}` : img;
};

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();
  const admin = isAdmin();

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [profilePicture, setProfilePicture] = React.useState(() => {
    return localStorage.getItem("profilePicture") || "";
  });

  const links = React.useMemo(() => {
    const base = [
      { label: "Contact", route: ROUTES.CONNECT },
      { label: "About Us", route: ROUTES.ABOUT },
    ];
    if (user) {
      base.push({ label: "Jobs", route: ROUTES.USER_CARDS });
      base.push({ label: "Create Card", route: ROUTES.CREATE_CARD });
    }
    if (admin) {
      base.push({ label: "Manage Users", route: ROUTES.MANAGE_USERES });
    }
    return base;
  }, [user, admin]);

  React.useEffect(() => {
    let abortCtrl = new AbortController();
    const bootstrap = async () => {
      try {
        if (!user?.id) return;
        const res = await api.get(`/user/profile/${user.id}`, {
          signal: abortCtrl.signal,
        });
        const norm = normalizeProfileImage(res.data?.profilePicture || "");
        if (norm) {
          localStorage.setItem("profilePicture", norm);
          setProfilePicture(norm);
        }
      } catch {}
    };
    bootstrap();

    const onProfileUpdated = (e) => {
      const norm = normalizeProfileImage(e.detail?.profilePicture || "");
      if (norm) {
        localStorage.setItem("profilePicture", norm);
        setProfilePicture(norm);
      }
    };
    window.addEventListener("profile:updated", onProfileUpdated);

    return () => {
      abortCtrl.abort();
      window.removeEventListener("profile:updated", onProfileUpdated);
    };
  }, [user?.id]);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profilePicture");
    setProfilePicture("");
    alert("You have been logged out.");
    navigate(ROUTES.LOGIN);
  };

  const brandGradient = "linear-gradient(90deg,#0ea5e9,#a78bfa 50%,#22d3ee)";

  const isActive = (route) =>
    location.pathname === route || location.pathname.startsWith(route + "/");

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background:
          "linear-gradient(90deg, rgba(96,165,250,.85), rgba(167,139,250,.85), rgba(34,211,238,.85))",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.18)",
        boxShadow: "0 10px 32px rgba(2,6,23,0.15)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: 72 }}>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              mr: 2,
            }}
          >
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                mr: 1,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,.3), rgba(255,255,255,.15))",
                boxShadow: "0 6px 14px rgba(2,6,23,.2)",
              }}
            >
              <AdbIcon sx={{ color: "#fff" }} />
            </Box>
            <Typography
              onClick={() => navigate(ROUTES.ROOT)}
              variant="h6"
              noWrap
              sx={{
                fontWeight: 900,
                letterSpacing: ".08em",
                cursor: "pointer",
                backgroundImage: brandGradient,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Freelance4U
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              onClick={handleOpenNavMenu}
              sx={{
                color: "#fff",
                borderRadius: 2,
                "&:hover": { backgroundColor: "rgba(255,255,255,.12)" },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                "& .MuiPaper-root": {
                  borderRadius: 3,
                  mt: 1,
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(8px)",
                },
                display: { xs: "block", md: "none" },
              }}
            >
              {links.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={() => {
                    navigate(page.route);
                    handleCloseNavMenu();
                  }}
                  sx={{
                    borderRadius: 2,
                    mx: 1,
                    my: 0.5,
                    ...(isActive(page.route) && {
                      background: "linear-gradient(90deg,#eef2ff,#f0f9ff)",
                    }),
                  }}
                >
                  <Typography
                    textAlign="center"
                    sx={{ fontWeight: 700, color: "#0f172a" }}
                  >
                    {page.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
          >
            <AdbIcon sx={{ color: "#fff", mr: 1 }} />
            <Typography
              onClick={() => navigate(ROUTES.ROOT)}
              variant="h6"
              noWrap
              sx={{
                flexGrow: 1,
                fontWeight: 900,
                cursor: "pointer",
                backgroundImage: brandGradient,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Freelance4U
            </Typography>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              ml: 2,
              gap: 0.5,
            }}
          >
            {links.map((page) => {
              const active = isActive(page.route);
              return (
                <Button
                  key={page.label}
                  onClick={() => navigate(page.route)}
                  sx={{
                    position: "relative",
                    my: 1.2,
                    px: 2,
                    borderRadius: 999,
                    color: "#fff",
                    textTransform: "none",
                    fontWeight: 800,
                    letterSpacing: ".2px",
                    ...(active
                      ? {
                          background: "rgba(255,255,255,.16)",
                          "&:hover": { background: "rgba(255,255,255,.22)" },
                        }
                      : {
                          "&:hover": { background: "rgba(255,255,255,.12)" },
                        }),
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      left: 16,
                      right: 16,
                      bottom: 6,
                      height: active ? 3 : 0,
                      borderRadius: 999,
                      transition: "height .2s ease",
                      background:
                        "linear-gradient(90deg, #e0e7ff, #f0f9ff, #cffafe)",
                    },
                  }}
                >
                  {page.label}
                </Button>
              );
            })}
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1.25, mr: 2 }}>
            {[Facebook, Instagram, Twitter, LinkedIn].map((Icon, i) => (
              <Box
                key={i}
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  backgroundColor: "rgba(255,255,255,.14)",
                  transition: "transform .15s ease, background-color .15s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    backgroundColor: "rgba(255,255,255,.22)",
                  },
                }}
              >
                <Icon sx={{ color: "#fff", fontSize: 18 }} />
              </Box>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Box
                  sx={{
                    p: "2px",
                    borderRadius: "50%",
                    background:
                      "conic-gradient(from 180deg at 50% 50%, #e0e7ff, #f0f9ff, #cffafe, #e0e7ff)",
                  }}
                >
                  <Avatar
                    src={profilePicture || "/assets/default-avatar.png"}
                    alt="user"
                    sx={{
                      width: 40,
                      height: 40,
                      border: "2px solid rgba(255,255,255,.85)",
                    }}
                    onError={() =>
                      setProfilePicture("/assets/default-avatar.png")
                    }
                  />
                </Box>
              </IconButton>
            </Tooltip>

            <Menu
              sx={{
                mt: "45px",
                "& .MuiPaper-root": {
                  borderRadius: 3,
                  background: "rgba(255,255,255,.98)",
                  backdropFilter: "blur(6px)",
                },
              }}
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={() => {
                  navigate(ROUTES.USER_PROFILE);
                  handleCloseUserMenu();
                }}
                sx={{ fontWeight: 700 }}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  logout();
                  handleCloseUserMenu();
                }}
                sx={{ fontWeight: 700, color: "error.main" }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
