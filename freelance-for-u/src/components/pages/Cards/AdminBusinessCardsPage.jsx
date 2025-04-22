import { useEffect, useState } from "react";
import api from "../../../Services/api";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid2,
} from "@mui/material";

const AdminBusinessCardsPage = () => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await api.get("/businesscard");
        setCards(res.data);
      } catch (err) {
        setError(err.response?.data || "Failed to fetch business cards");
      }
    };

    fetchCards();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/businesscard/${id}`);
      setCards(cards.filter((card) => card.id !== id));
    } catch (err) {
      setError(err.response?.data || "Failed to delete card");
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Business Cards Management
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Grid2 container spacing={2}>
        {cards.map((card) => (
          <Grid2 item xs={12} sm={6} md={4} key={card.id}>
            <Card>
              {card.businessImage && (
                <CardMedia
                  component="img"
                  height="140"
                  image={card.businessImage}
                  alt={card.businessName}
                />
              )}
              <CardContent>
                <Typography variant="h5" component="div">
                  {card.businessName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Phone: {card.phoneNumber}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Contact Info: {card.contactInfo}
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(card.id)}
                  sx={{ mt: 2 }}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
};

export default AdminBusinessCardsPage;
