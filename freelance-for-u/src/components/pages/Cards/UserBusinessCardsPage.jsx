import { useEffect, useState } from "react";
import api from "../../../Services/api";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";
import {
  Typography,
  Button,
  Container,
  Grid2,
  Box,
  Divider,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { AnimatePresence, motion } from "framer-motion";
import CardComponent from "./CardComponent";
import NavBar from "../../../Header/NavBar";
import FooterBar from "../../../Footer/FooterBar";
import SearchInput from "../../../SearchFillter/SearchInput";
import useSearchFilter from "../../../SearchFillter/useSearchFilter";
import useDebouncedValue from "../../../SearchFillter/useDebouncedValue";

const UserBusinessCardsPage = () => {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 400);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await api.get("/businesscards/all");
        setCards(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCards();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/businesscards/delete/${id}`);
      setCards((prev) => prev.filter((card) => card.id !== id));
    } catch (err) {
      console.error("Failed to delete card", err);
    }
  };

  const handleClear = () => setSearch("");

  const filteredCards = useSearchFilter(cards, debouncedSearch, [
    "businessName",
    "description",
    "contactInfo",
  ]);

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
          <Divider sx={{ mt: 4 }} />
        </Box>

        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={handleClear}
          isLoading={search !== debouncedSearch}
        />

        <Grid2 container spacing={4}>
          <AnimatePresence>
            {filteredCards.length === 0 ? (
              <Typography variant="body1" sx={{ px: 2, mt: 2 }}>
                No freelancers matched your search.
              </Typography>
            ) : (
              filteredCards.map((card) => (
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
              ))
            )}
          </AnimatePresence>
        </Grid2>
      </Container>
      <FooterBar />
    </>
  );
};

export default UserBusinessCardsPage;
