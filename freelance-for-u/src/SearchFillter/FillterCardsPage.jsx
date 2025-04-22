import React, { useState } from "react";
import SearchInput from "../components/Search/SearchInput";
import useSearchFilter from "../components/Search/useSearchFilter";
import useDebouncedValue from "../hooks/useDebouncedValue";
import CardComponent from "../components/CardComponent";

const EmployerCardsPage = ({ cards }) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 400);

  const filteredCards = useSearchFilter(debouncedSearch, cards, [
    "businessName",
    "description",
    "contactInfo",
  ]);

  const handleClear = () => setSearch("");

  return (
    <>
      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClear={handleClear}
        isLoading={search !== debouncedSearch}
      />

      {filteredCards.length === 0 ? (
        <p>No employers matched your search.</p>
      ) : (
        filteredCards.map((card) => <CardComponent key={card.id} card={card} />)
      )}
    </>
  );
};

export default EmployerCardsPage;
