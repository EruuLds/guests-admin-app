import { useContext, useMemo } from "react";
import { DataContext } from "../contexts/DataContext";

export function useGuestsStats() {
  const { guests } = useContext(DataContext);

  const stats = useMemo(() => {
    return guests.reduce(
      (acc, guest) => {
        const passes = guest.passes ?? 0;
        const confirmed = guest.confirmedPasses ?? 0;

        // Total
        acc.totalPasses += passes;

        // Confirmados
        if (guest.status === 'confirmed') {
          acc.confirmedPasses += confirmed;
        }

        // Pendientes
        if (guest.status === 'pending') {
          acc.pendingPasses += passes;
        }

        // Rechazadas
        if (guest.status === 'declined') {
          acc.declinedPasses += passes;
        }

        return acc;
      },
      {
        totalPasses: 0,
        confirmedPasses: 0,
        pendingPasses: 0,
        declinedPasses: 0,
      }
    );
  }, [guests]);

  return stats;
}