import { createContext, useState, useEffect } from "react";
import { ref, onValue, push, update, remove } from "firebase/database";
import database from '../firebase/firebaseConfig';

export const DataContext = createContext();

export function DataContextProvider({ children }) {
  const customInvitationURL = 'https://demo-invitation.netlify.app';
  const [selectedCard, setSelectedCard] = useState(null);
  const [dirtyForms, setDirtyForms] = useState([])

  // Invitados
  const [guests, setGuests] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Leer invitados en tiempo real
  useEffect(() => {
    const guestsRef = ref(database, "invitados");
    const unsubscribe = onValue(
      guestsRef,
      snapshot => {
        const data = snapshot.val();
        if (data) {
          const guestList = Object.entries(data).map(([id, value]) => ({ id, ...value }));
          setGuests(guestList);
        } else {
          setGuests([]);
        }
        setInitialLoading(false);
      },
      err => {
        setError(err.message);
        setInitialLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Funciones de CRUD
  const addGuest = async (guestData, onComplete) => {
    setLoading(true);
    try {
      await push(ref(database, "invitados"), guestData);
      if (onComplete) onComplete();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateGuest = async (id, updatedData, onComplete) => {
    setLoading(true);
    try {
      await update(ref(database, `invitados/${id}`), updatedData);
      if (onComplete) onComplete();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteGuest = async (id, onComplete) => {
    setLoading(true);
    try {
      await remove(ref(database, `invitados/${id}`));
      if (onComplete) onComplete();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DataContext.Provider value={{
      selectedCard,
      setSelectedCard,
      dirtyForms,
      setDirtyForms,
      customInvitationURL,
      guests,
      initialLoading,
      loading,
      error,
      addGuest,
      updateGuest,
      deleteGuest
    }}>
      {children}
    </DataContext.Provider>
  );
}