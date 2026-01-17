import GuestCard from "./prefabs/cards/GuestCard";
import GuestCardSkeleton from "./prefabs/cards/GuestCardSkeleton";
import { useContext } from "react";
import { DataContext } from "../contexts/DataContext";
import { useFilteredAndSortedGuests } from "../hooks/useFilteredAndSortedGuests";

export default function GuestsList() {
    const { selectedCard, statusFilter, guests, initialLoading, error, searchData } = useContext(DataContext);
    const filteredAndSortedGuests = useFilteredAndSortedGuests()

    return (
        <>
            {(error && guests.length === 0) &&
                <div className="flex items-center flex-col text-center pt-10">
                    <h3 className="text-2xl mb-3 text-light-gray">
                        Se produjo un error al obtener los datos.
                    </h3>
                    <p className="mb-8 text-light-gray">
                        Por favor, refresca la página
                    </p>
                </div>
            }
            {initialLoading &&
                Array.from({ length: 10 }).map((_, i) => <GuestCardSkeleton key={i} />
            )}
            {!initialLoading && !error && guests.length === 0 && (
                <div className="flex items-center flex-col text-center pt-10 select-none">
                    <h3 className="text-2xl mb-3 text-light-gray">
                        No hay invitados en tu lista
                    </h3>
                    <p className="mb-8 text-light-gray">
                        Empieza con "
                        <span className="uppercase">
                            <i className="bi bi-plus-circle"></i> Añadir Invitado
                        </span>
                        " para gestionar su asistencia.
                    </p>
                </div>
            )}
            {(guests.length > 0 && filteredAndSortedGuests.length === 0 && statusFilter !== 'all' && searchData === '') &&
                <div className="flex items-center flex-col text-center pt-10">
                    <h3 className="text-2xl mb-3 text-light-gray">
                        Nada por aquí aún...
                    </h3>
                    <p className="mb-8 text-light-gray">
                        Si algún invitado {statusFilter === 'confirmed' ? 'confirma su asistencia' : 'indica que no asistirá'}, aparecerá aquí.
                    </p>
                </div>
            }
            {(guests.length > 0 && filteredAndSortedGuests.length === 0 && searchData !== '') &&
                <div className="flex items-center flex-col text-center pt-10">
                    <h3 className="text-2xl mb-3 text-light-gray">
                        Sin resultados para "{searchData}".
                    </h3>
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
                    status={guest.status}
                    confirmedPasses={guest.confirmedPasses}
                />
            ))}
        </>
    );
}
