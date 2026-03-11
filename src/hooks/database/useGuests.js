import { useEffect } from "react";
import { guestsService } from "../../services/guestsService";
import { useDataContext } from "../contexts/useDataContext";

export function useGuests() {
    const { setGuests, setLoading, setError, event } = useDataContext();
    const eventId = event /*event.id*/;

    useEffect(() => {
        return setError(null);
    }, [])

    const getGuests = async () => {
        setLoading(true);

        try {
            const guests = await guestsService.getGuests(eventId);
            return guests;
        } catch(err) {
            setError(err)
            throw err;
        } finally {
            setLoading(false);
        }
    }

    const listenGuests = async () => {
        setLoading(true);

        try {
            await guestsService.listenGuests(
                eventId,
                guests => setGuests(guests)
            )
        } catch(err) {
            setError(err)
            throw err;
        } finally {
            setLoading(false);
        }
    }

    const createGuest = async (guestId, guestData) => {
        setLoading(true);

        try {
            await guestsService.createGuest(eventId, guestId, guestData);
        } catch(err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    const updateGuest = async (guestId, updates) => {
        setLoading(true);

        try {
            await guestsService.updateGuest(eventId, guestId, updates);
        } catch(err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    const deleteGuest = async (guestId) => {
        setLoading(true);

        try {
            await guestsService.deleteGuest(eventId, guestId);
        } catch(err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    return { getGuests, listenGuests, createGuest, updateGuest, deleteGuest };
}
