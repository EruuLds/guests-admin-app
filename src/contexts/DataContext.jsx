import { createContext, useState, useEffect } from "react";
import { ref, onValue, push, update, remove } from "firebase/database";
import { database } from '../firebase/firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export const DataContext = createContext();

export function DataContextProvider({ children }) {
  const customInvitationURL = 'https://demo-invitation.netlify.app';
  const urlProvidedId = new URLSearchParams(window.location.search).get('event');
  const [event, setEvent] = useState(null);
  const [user, setUser] = useState(null);

  const [selectedCard, setSelectedCard] = useState(null);
  const [dirtyForms, setDirtyForms] = useState([])

  // Invitados
  const [guests, setGuests] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //Búsqueda, filtros y ordenamiento
  const [searchData, setSearchData] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name-asc");

  useEffect(() => {
    const onLoad = () => setInitialLoading(false);
    
    setEvent('DEMO-2026'); //Eliminar después de integrar la pantalla de formulario de ID de evento

    if (document.readyState === "complete") {
      setInitialLoading(false);
    } else {
      window.addEventListener("load", onLoad);
    }

    return () => window.removeEventListener("load", onLoad);
  }, []);

  //Comprobar si existe una sesión iniciada con Firebase Auth
  useEffect(() => {
    setInitialLoading(true);

    const unsubscribe = onAuthStateChanged(auth, (user) => {

      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }

      setInitialLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Leer invitados en tiempo real
  useEffect(() => {
    if (!(event && user)) return;

    setInitialLoading(true);
    const guestsRef = ref(database, `guests/${event}`);
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
  }, [event, user]);

  useEffect(() => {
    console.log(error);
  }, [error])

  return (
    <DataContext.Provider value={{
      user,
      setUser,
      event,
      setEvent,
      urlProvidedId,
      selectedCard,
      setSelectedCard,
      dirtyForms,
      setDirtyForms,
      customInvitationURL,
      guests,
      initialLoading,
      setInitialLoading,
      loading,
      setLoading,
      error,
      setError,
      searchData,
      setSearchData,
      statusFilter,
      setStatusFilter,
      sortBy,
      setSortBy
    }}>
      {children}
    </DataContext.Provider>
  );
}