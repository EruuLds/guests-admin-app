import { useContext, useMemo } from "react";
import { DataContext } from "../contexts/DataContext";
import { normalizeText } from "../utils/normalizeText";

export function useFilteredAndSortedGuests() {
  const { guests, searchData } = useContext(DataContext);

  const result = useMemo(() => {
    if (!searchData.trim()) return guests;

    const searchWords = normalizeText(searchData)
      .split(" ")
      .filter(Boolean);

    return guests.filter(g => {
      const fullName = normalizeText(`${g.name} ${g.lastName}`);

      return searchWords.every(word => fullName.includes(word));
    });
  }, [guests, searchData]);

  return result;
}