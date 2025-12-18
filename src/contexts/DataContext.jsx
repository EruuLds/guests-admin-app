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

  //Búsqueda, filtros y ordenamiento
  const [searchData, setSearchData] = useState("");

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
  const addGuest = async (guestData, onSuccess, onError, onComplete) => {
    setLoading(true);
    try {
      await push(ref(database, "invitados"), guestData);
      onSuccess?.();
    } catch (err) {
      setError(err.message);
      onError?.();
    } finally {
      setLoading(false);
      onComplete?.();
    }
  };

  const updateGuest = async (id, updatedData, onSuccess, onError, onComplete) => {
    setLoading(true);
    try {
      await update(ref(database, `invitados/${id}`), updatedData);
      onSuccess?.();
    } catch (err) {
      setError(err.message);
      onError?.();
    } finally {
      setLoading(false);
      onComplete?.();
    }
  };

  const deleteGuest = async (id, onSuccess, onError, onComplete) => {
    setLoading(true);
    try {
      await remove(ref(database, `invitados/${id}`));
      onSuccess?.();
    } catch (err) {
      setError(err.message);
      onError?.();
    } finally {
      setLoading(false);
      onComplete?.();
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
      deleteGuest,
      searchData,
      setSearchData
    }}>
      {children}
    </DataContext.Provider>
  );
}