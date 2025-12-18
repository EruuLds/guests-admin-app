import GuestCard from "./prefabs/guest-card/GuestCard";
import GuestCardSkeleton from "./prefabs/guest-card/GuestCardSkeleton";
import { useContext } from "react";
import { DataContext } from "../contexts/DataContext";
import { useFilteredAndSortedGuests } from "../hooks/useFilteredAndSortedGuests";

export default function GuestsList() {
    const { selectedCard } = useContext(DataContext);
    const { guests, initialLoading, error, searchData } = useContext(DataContext);
    const filteredAndSortedGuests = useFilteredAndSortedGuests()

    return (
        <>
            {(error && guests.length === 0) &&
                <div className="flex items-center flex-col text-center pt-25">
                    <h2 className="text-2xl mb-4 text-light-gray">
                        Se produjo un error al obtener los datos.
                    </h2>
                    <p className="mb-8 text-light-gray">
                        Por favor, refresca la página
                    </p>
                </div>
            }
            {initialLoading &&
                Array.from({ length: 10 }).map((_, i) => <GuestCardSkeleton key={i} />)}
            {!initialLoading && guests.length === 0 && (
                <div className="flex items-center flex-col text-center pt-25">
                    <h2 className="text-2xl mb-4 text-light-gray">
                        No hay invitados en tu lista
                    </h2>
                    <p className="mb-8 text-light-gray">
                        Empieza con "
                        <span className="uppercase">
                            <i className="bi bi-plus-circle"></i> Añadir Invitado
                        </span>
                        " para gestionar su asistencia.
                    </p>
                </div>
            )}
            {guests.length > 0 && filteredAndSortedGuests.length === 0 &&
                <div className="flex items-center flex-col text-center pt-25">
                    <h2 className="text-2xl mb-4 text-light-gray">
                        Sin resultados para "{searchData}".
                    </h2>
                    <p className="mb-8 text-light-gray">
                        Por favor, verifica la información de tu búsqueda.
                    </p>
                </div>
            }
            {filteredAndSortedGuests.map((guest) => (
                <GuestCard
                    key={guest.id}
                    id={guest.id}
                    guestName={guest.name}
                    guestLastName={guest.lastName}
                    passes={guest.passes}
                    table={guest.table}
                    confirmation={guest.confirmation}
                    confirmedPasses={guest.confirmedPasses}
                    attendanceReg={guest.attendanceReg}
                    selectedCard={selectedCard}
                />
            ))}
        </>
    );
}
