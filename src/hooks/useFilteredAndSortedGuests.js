import { useContext, useMemo } from "react";
import { DataContext } from "../contexts/DataContext";
import { normalizeText } from "../utils/normalizeText";

export function useFilteredAndSortedGuests() {
  const {
    guests,
    searchData,
    statusFilter,
    sortBy
  } = useContext(DataContext);

  const result = useMemo(() => {
    let list = [...guests];

    if (searchData.trim()) {
      const searchWords = normalizeText(searchData)
        .split(" ")
        .filter(Boolean);

      list = list.filter(g => {
        const fullName = normalizeText(`${g.name} ${g.lastName}`);
        return searchWords.every(word => fullName.includes(word));
      });
    }

    const confirmationMap = {
      confirmed: true,
      unconfirmed: undefined,
      declined: false,
    };

    if (statusFilter !== "all") {
      list = list.filter(
        g => g.confirmation === confirmationMap[statusFilter]
      );
    }

    list.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return `${a.name} ${a.lastName}`.localeCompare(
            `${b.name} ${b.lastName}`
          );
        case "name-desc":
          return `${b.name} ${b.lastName}`.localeCompare(
            `${a.name} ${a.lastName}`
          );
        case "table-asc":
          return (a.table ?? Infinity) - (b.table ?? Infinity);
        case "table-desc":
          return (b.table ?? -Infinity) - (a.table ?? -Infinity);
        default:
          return 0;
      }
    });

    return list;
  }, [guests, searchData, statusFilter, sortBy]);

  return result;
}