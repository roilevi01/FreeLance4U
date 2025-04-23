import { useEffect, useState } from "react";
import api from "../../Services/api";
import CardComponent from "../pages/Cards/CardComponent";
import useDebouncedValue from "../../SearchFillter/useDebouncedValue";
import useSearchFilter from "../../SearchFillter/useSearchFilter";
import SearchInput from "../../SearchFillter/SearchInput";

const UserCardsPage = () => {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const debouncedSearch = useDebouncedValue(search, 300);

  const filteredCards = useSearchFilter(cards, debouncedSearch, [
    "businessName",
    "description",
    "contactInfo",
  ]);

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

  useEffect(() => {
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
    <div className="p-4">
      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClear={() => setSearch("")}
        isLoading={search !== debouncedSearch}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <CardComponent key={card.id} card={card} onDelete={handleDelete} />
          ))
        ) : (
          <p>No cards matched your search.</p>
        )}
      </div>
    </div>
  );
};

export default UserCardsPage;
