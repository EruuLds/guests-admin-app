import { ref, set, get } from "firebase/database";
import { database } from "../firebase/firebaseConfig";

export const eventService = {

    async eventExists(eventId) {
        const snapshot = await get(ref(database, `events/${eventId}/info/${eventId}`));

        if (!snapshot.exists()) return [];

        const data = snapshot.val();

        return Object.entries(data).map(([id, value]) => ({
            id,
            ...value
        }));
    },

    async getEventInfo(eventId, guestId, guestData) {
        return await set(
            ref(database, `events/${eventId}/guests/${guestId}`),
            guestData
        );
    }

};