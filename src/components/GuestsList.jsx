import GuestCard from "./prefabs/cards/GuestCard";
import GuestCardSkeleton from "./prefabs/cards/GuestCardSkeleton";
import { useContext } from "react";
import { DataContext } from "../contexts/DataContext";
import { useFilteredAndSortedGuests } from "../hooks/useFilteredAndSortedGuests";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

export default function GuestsList() {
    const { statusFilter, guests, initialLoading, error, searchData } = useContext(DataContext);
    const filteredAndSortedGuests = useFilteredAndSortedGuests();
    const skeletons = Array.from({ length: 10 }, (_, i) => (<GuestCardSkeleton key={i} />));

    const emptyStateMessages = {
        confirmed: 'Si algún invitado confirma su asistencia, aparecerá aquí.',
        declined: 'Si algún invitado indica que no asistirá, aparecerá aquí.',
        pending: 'No tienes invitaciones pendientes de confirmación.',
        used: 'Ningún invitado ha usado su invitación todavía.'
    };

    if (initialLoading) {
        return (
            <div className="mask-b-from-10% h-full overflow-y-hidden">{skeletons}</div>
        );
    }
    else if (error) {
        return (
            <div className="flex items-center flex-col text-center pt-10">
                <h3 className="text-2xl mb-3 text-light-gray">
                    Se produjo un error al obtener los datos.
                </h3>
                <p className="mb-8 text-light-gray">
                    Por favor, refresca la página
                </p>
            </div>
        );
    } else if (guests.length === 0) {
        return (
            <div className="flex items-center flex-col text-center pt-10 select-none">
                <h3 className="text-2xl mb-3 text-light-gray">
                    No hay invitados en tu lista
                </h3>
                <p className="mb-8 text-light-gray">
                    Empieza con "
                    <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                    NUEVA INVITACIÓN" para gestionar su asistencia.
                </p>
            </div>
        );
    } else if (filteredAndSortedGuests.length === 0) {
        return (
            <div className="flex items-center flex-col text-center pt-10">
                <h3 className="text-2xl mb-3 text-light-gray">
                    {searchData === ''
                        ? `Nada por aquí${statusFilter !== 'pending' ? ' aún' : ''}...`
                        : `Sin resultados para "${searchData}".`
                    }
                </h3>
                <p className="mb-8 text-light-gray">
                    {searchData === ''
                        ? emptyStateMessages[statusFilter]
                        : 'Por favor, verifica la información de tu búsqueda.'
                    }
                </p>
            </div>
        );
    }

    return (
        <> {filteredAndSortedGuests.map((guest) => (
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
    )

    /*return (
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
                <div className="mask-b-from-10% h-full overflow-y-hidden">{skeletons}</div>
            }
            {!initialLoading && !error && guests.length === 0 && (
                <div className="flex items-center flex-col text-center pt-10 select-none">
                    <h3 className="text-2xl mb-3 text-light-gray">
                        No hay invitados en tu lista
                    </h3>
                    <p className="mb-8 text-light-gray">
                        Empieza con "
                        <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                        NUEVA INVITACIÓN" para gestionar su asistencia.
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
    );*/
}
