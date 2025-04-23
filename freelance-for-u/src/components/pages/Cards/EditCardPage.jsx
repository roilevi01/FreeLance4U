import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../Services/api";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";
import ROUTES from "../../../routes/routesModel";
import NavBar from "../../../Header/NavBar";

const EditCardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const res = await api.get(`/businesscards/${id}`);
        setCard(res.data);
      } catch (err) {
        console.error("Failed to fetch card:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [id]);

  const handleChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/businesscards/update/${id}`, card);
      alert("Card updated successfully!");
      navigate(ROUTES.USER_CARDS);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (loading || !card) return <p>Loading...</p>;

  return (
    <>
      <NavBar />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h4" gutterBottom>
              Edit Business Card
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Business Name"
                name="businessName"
                value={card.businessName}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={card.description}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={3}
              />
              <TextField
                fullWidth
                label="Contact Info"
                name="contactInfo"
                value={card.contactInfo}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={card.phoneNumber}
                onChange={handleChange}
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                fullWidth
              >
                Save Changes
              </Button>
            </form>
          </Paper>
        </motion.div>
      </Container>
    </>
  );
};

export default EditCardPage;
