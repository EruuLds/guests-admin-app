import { ref, set, update, remove, get } from "firebase/database";
import { database } from "../firebase/firebaseConfig";

export const guestsService = {

    async getGuests(eventId) {
        const snapshot = await get(ref(database, `guests/${eventId}`));

        if (!snapshot.exists()) return [];

        const data = snapshot.val();

        return Object.entries(data).map(([id, value]) => ({
            id,
            ...value
        }));
    },

    listenGuests(eventId, callback) {
        const unsubscribe = onValue(
            ref(database, `guests/${eventId}`),
            (snapshot) => {
                if (!snapshot.exists()) {
                    callback([]);
                    return;
                }

                const data = snapshot.val();

                const guestsArray = Object.entries(data).map(([id, value]) => ({
                    id,
                    ...value
                }));

                callback(guestsArray);
            });

        return unsubscribe;
    },

    async createGuest(eventId, guestId, guestData) {
        return await set(
            ref(database, `guests/${eventId}/${guestId}`),
            guestData
        );
    },

    async updateGuest(eventId, guestId, updates) {
        return await update(
            ref(database, `guests/${eventId}/${guestId}`),
            updates
        );
    },

    async deleteGuest(eventId, guestId) {
        return await remove(
            ref(database, `guests/${eventId}/${guestId}`)
        );
    },

    async confirmAttendance(eventId, guestId, confirmedPasses) {
        return await update(
            ref(database, `guests/${eventId}/${guestId}`),
            {
                status: "confirmed",
                confirmedPasses
            }
        );
    },

    async scanGuest(eventId, guestId) {
        return await update(
            ref(database, `guests/${eventId}/${guestId}`),
            {
                status: "checked-in"
            }
        );
    }

};