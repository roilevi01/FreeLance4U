// UserCardsPage.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";
import CardComponent from "../../components/common/CardComponent";
import { isAdmin } from "../../Services/authHelper";

const UserCardsPage = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await api.get("/businesscards/all");
        setCards(res.data);
      } catch (err) {
        setError("Failed to fetch cards.");
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/businesscards/delete/${id}`);
      setCards((prev) => prev.filter((card) => card.id !== id));
    } catch (err) {
      alert("Failed to delete the card.");
      console.error(err);
    }
  };

  if (loading) return <p>Loading cards...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {cards.map((card) => (
        <CardComponent key={card.id} card={card} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default UserCardsPage;
