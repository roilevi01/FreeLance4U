import { useEffect, useState } from "react";
import api from "../Services/api";

const useUserCardsLogic = () => {
  const [cards, setCards] = useState([]);

  const fetchCards = async () => {
    try {
      const res = await api.get("/businesscards/all");
      setCards(res.data);
    } catch (err) {
      console.error("Error fetching cards:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/businesscards/delete/${id}`);
      await fetchCards();
    } catch (err) {
      console.error("Failed to delete card", err);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return {
    cards,
    handleDelete,
    fetchCards,
  };
};

export default useUserCardsLogic;
