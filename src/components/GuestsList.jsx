import GuestCard from "./guestCard/GuestCard";
import GuestCardSkeleton from "./guestCard/GuestCardSkeleton";
import { useContext } from "react";
import { DataContext } from "../contexts/DataContext";

export default function GuestsList() {
    const { selectedCard } = useContext(DataContext);
    const { guests, initialLoading, error } = useContext(DataContext);

    return (
        <>
            {error && <h1>Error: {error}</h1>}
            {initialLoading &&
                Array.from({ length: 10 }).map((_, i) => <GuestCardSkeleton key={i} />)}
            {!initialLoading && guests.length === 0 && (
                <div className="flex flex-1 justify-center items-center flex-col text-center">
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
            {guests.map((guest) => (
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
