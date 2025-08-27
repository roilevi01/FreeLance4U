import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Typography,
  Button,
  Container,
  Divider,
  Box,
  Stack,
  Paper,
} from "@mui/material";
import { Grid2 } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";

import ROUTES from "../../../routes/routesModel";
import NavBar from "../../../Header/NavBar";
import FooterBar from "../../../Footer/FooterBar";
import CardComponent from "./CardComponent";
import useUserCardsLogic from "../../../hooks/useUserCardsLogic";
import SearchInput from "../../../SearchFillter/SearchInput";
import useDebouncedValue from "../../../SearchFillter/useDebouncedValue";
import useSearchFilter from "../../../SearchFillter/useSearchFilter";

const MotionBox = motion(Box);

const UserBusinessCardsPage = () => {
  const { cards, handleDelete, loading, error } = useUserCardsLogic(); 
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 400);
  const navigate = useNavigate();

  const filteredCards = useSearchFilter(debouncedSearch, cards, [
    "businessName",
    "description",
    "contactInfo",
  ]);

  const isSearching = search !== debouncedSearch;
  const total = cards?.length || 0;
  const count = filteredCards?.length || 0;

  const handleClear = () => setSearch("");

  const listVariants = { show: { transition: { staggerChildren: 0.06 } } };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95 },
  };

  return (
    <>
      <NavBar />
      <Box
        sx={{
          background:
            "radial-gradient(120% 120% at 0% 0%, #f1f5f9 0%, #eef2ff 55%, #ffffff 100%)",
        }}
      >
        <Container maxWidth="lg" sx={{ pt: 8, pb: 8, minHeight: "100vh" }}>
          
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
                  filter: "blur(60px)",
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
              Discover Talented Freelancers
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
              Browse amazing services shared by professionals and showcase your
              own work to the world.
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
          </Box>

          
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, md: 2.5 },
              mb: 4,
              borderRadius: 3,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.86))",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(2,6,23,0.06)",
              boxShadow: "0 16px 36px rgba(2,6,23,0.06)",
            }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              alignItems={{ xs: "stretch", md: "center" }}
              justifyContent="space-between"
            >
              <Box sx={{ flex: 1 }}>
                <SearchInput
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onClear={handleClear}
                  isLoading={isSearching}
                />
              </Box>

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="flex-end"
                sx={{ flexShrink: 0 }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    px: 1.5,
                    py: 0.75,
                    borderRadius: 999,
                    border: "1px solid #e2e8f0",
                    bgcolor: "#f8fafc",
                  }}
                >
                  {loading
                    ? "Loading…"
                    : isSearching
                    ? "Searching…"
                    : `${count} / ${total} results`}
                </Typography>

                <Button
                  variant="contained"
                  size="large"
                  startIcon={<AddCircleOutlineIcon />}
                  sx={{
                    borderRadius: 999,
                    textTransform: "none",
                    px: 3,
                    py: 1.25,
                    fontWeight: 800,
                    background:
                      "linear-gradient(180deg,#3b82f6 0%,#2563eb 100%)",
                    boxShadow: "0 12px 28px rgba(37,99,235,0.25)",
                    "&:hover": {
                      transform: "translateY(-1px)",
                      boxShadow: "0 16px 40px rgba(37,99,235,0.35)",
                      background:
                        "linear-gradient(180deg,#2563eb 0%,#1e40af 100%)",
                    },
                  }}
                  onClick={() => navigate(ROUTES.CREATE_CARD)}
                >
                  Add Your Service
                </Button>
              </Stack>
            </Stack>
          </Paper>

          
          {error ? (
            <Box sx={{ py: 6, textAlign: "center" }}>
              <Typography color="error">Failed to load cards</Typography>
            </Box>
          ) : count === 0 ? (
            <Box
              sx={{
                py: 10,
                textAlign: "center",
                borderRadius: 4,
                border: "1px dashed #cbd5e1",
                background:
                  "linear-gradient(180deg, rgba(248,250,252,0.8), rgba(255,255,255,0.9))",
              }}
            >
              <Typography variant="h6" fontWeight={800} gutterBottom>
                {loading
                  ? "Loading…"
                  : total === 0
                  ? "No cards yet"
                  : "No results"}
              </Typography>
              {!loading && (
                <>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {total === 0
                      ? "Be the first to post a service card."
                      : "Try a different search term or clear the filter."}
                  </Typography>
                  <Stack direction="row" spacing={2} justifyContent="center">
                    {total > 0 && (
                      <Button variant="outlined" onClick={handleClear}>
                        Clear search
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      onClick={() => navigate(ROUTES.CREATE_CARD)}
                    >
                      Create a card
                    </Button>
                  </Stack>
                </>
              )}
            </Box>
          ) : (
            <MotionBox variants={listVariants} initial="hidden" animate="show">
              <Grid2 container spacing={4}>
                <AnimatePresence>
                  {filteredCards.map((card) => (
                    <Grid2 item xs={12} sm={6} md={4} key={card.id}>
                      <motion.div variants={itemVariants} exit="exit">
                        <CardComponent card={card} onDelete={handleDelete} />
                      </motion.div>
                    </Grid2>
                  ))}
                </AnimatePresence>
              </Grid2>
            </MotionBox>
          )}
        </Container>
      </Box>
      <FooterBar />
    </>
  );
};

export default UserBusinessCardsPage;
