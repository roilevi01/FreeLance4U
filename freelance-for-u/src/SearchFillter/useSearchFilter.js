const normalizeText = (text) => {
  return text
    .toString()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/["'`]/g, "")
    .toLowerCase();
};

const useSearchFilter = (data, query, fields) => {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) return data;

  return data.filter((item) =>
    fields.some((field) =>
      normalizeText(item[field] || "").includes(normalizedQuery)
    )
  );
};

export default useSearchFilter;
