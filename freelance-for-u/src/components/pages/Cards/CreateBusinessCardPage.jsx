import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../Services/api";
import ROUTES from "../../../routes/routesModel";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import NavBar from "../../../Header/NavBar";
import FooterBar from "../../../Footer/FooterBar";

const CreateBusinessCardPage = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    description: "",
    contactInfo: "",
    businessImage: "",
    phoneNumber: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/businesscards/create", formData);
      alert("Business card created successfully!");
      navigate(ROUTES.USER_CARDS);
    } catch (err) {
      setError(err.response?.data || "An error occurred");
    }
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Create Business Card
        </Typography>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Business Name"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            required
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            label="Contact Info (Email)"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Business Image URL"
            name="businessImage"
            value={formData.businessImage}
            onChange={handleChange}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Create Card
          </Button>
        </Box>
      </Container>
      <FooterBar />
    </>
  );
};

export default CreateBusinessCardPage;
