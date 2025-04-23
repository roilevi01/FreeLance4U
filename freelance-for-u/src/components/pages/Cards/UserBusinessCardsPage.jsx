import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Typography, Button, Container, Divider, Box } from "@mui/material";
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

const UserBusinessCardsPage = () => {
  const { cards, handleDelete, fetchCards } = useUserCardsLogic();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 400);

  const filteredCards = useSearchFilter(debouncedSearch, cards, [
    "businessName",
    "description",
    "contactInfo",
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const handleClear = () => setSearch("");

  return (
    <>
      <NavBar />
      <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Discover Talented Freelancers
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Browse amazing services shared by professionals and showcase your
            own work to the world.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<AddCircleOutlineIcon />}
            sx={{ mt: 3, borderRadius: 3, px: 4 }}
            onClick={() => navigate(ROUTES.CREATE_CARD)}
          >
            Add Your Service
          </Button>

          <Divider sx={{ mt: 4, mb: 3 }} />
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={handleClear}
            isLoading={search !== debouncedSearch}
          />
        </Box>

        <Grid2 container spacing={4}>
          <AnimatePresence>
            {filteredCards.map((card) => (
              <Grid2 item xs={12} sm={6} md={4} key={card.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <CardComponent card={card} onDelete={handleDelete} />
                </motion.div>
              </Grid2>
            ))}
          </AnimatePresence>
        </Grid2>
      </Container>
      <FooterBar />
    </>
  );
};

export default UserBusinessCardsPage;
