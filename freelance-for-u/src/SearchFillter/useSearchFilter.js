const normalizeText = (text) =>
  text
    .toString()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/["'`]/g, "")
    .toLowerCase();

const useSearchFilter = (query, data, fields) => {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) return data;

  return data.filter((item) =>
    fields.some((field) =>
      normalizeText(item[field] || "").includes(normalizedQuery)
    )
  );
};

export default useSearchFilter;
