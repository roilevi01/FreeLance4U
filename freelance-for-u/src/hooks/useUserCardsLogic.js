import { useCallback, useEffect, useRef, useState } from "react";
import api from "../Services/api";

export default function useUserCardsLogic() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const didInit = useRef(false);
  const abortRef = useRef(null);

  const fetchCards = useCallback(async () => {
    try {
      abortRef.current?.abort(); 
      abortRef.current = new AbortController();

      setLoading(true);
      setError(null);

      const res = await api.get("/businesscards/all", {
        signal: abortRef.current.signal,
      });

      setCards(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      if (err.name !== "CanceledError" && err.code !== "ERR_CANCELED") {
        console.error("Error fetching cards:", err);
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = useCallback(async (id) => {
    try {
      await api.delete(`/businesscards/delete/${id}`);
      setCards((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Failed to delete card", err);
    }
  }, []);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    fetchCards();
    return () => abortRef.current?.abort();
  }, [fetchCards]);

  return {
    cards,
    loading,
    error,
    fetchCards, 
    handleDelete,
  };
}
