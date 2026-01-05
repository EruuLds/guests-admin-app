import StatsCard from "../cards/StatsCard"
import { DataContext } from "../../../contexts/DataContext";
import { useGuestsStats } from "../../../hooks/useGuestStats"
import { useContext } from "react";
import { useMediaQuery } from "../../../hooks/useMediaQuery";

export default function Dashboard() {
    const guestStats = useGuestsStats();
    const { showDashboard, setShowDashboard } = useContext(DataContext);
    const isDropdown = useMediaQuery("(min-width: 768px)");

    return (
        <div>
            <div className="cursor-pointer flex justify-center items-center py-6 border-b border-zinc-100" onClick={() => setShowDashboard(!showDashboard)}>
                <h3 className="text-center">Panel de Seguimiento</h3>
                <div className={`ms-2 transition-all duration-500 block md:hidden ${showDashboard ? 'rotate-180' : 'rotate-0'}`}>
                    <img className='min-w-[1.25rem]' src="/icons/chevron-down.svg" alt="Arrow Down Icon" />
                </div>
            </div>
            <div className={`transition-all duration-500 overflow-y-hidden ${isDropdown ? 'h-fit' : showDashboard ? 'max-h-70 opacity-100 border-b border-zinc-100' : 'max-h-0 opacity-0'}`}>
                <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 my-4">
                    <StatsCard dataName={'Total'} data={guestStats.totalPasses} />
                    <StatsCard dataName={'Confirmadas'} data={guestStats.confirmedPasses} />
                    <StatsCard dataName={'Pendientes'} data={guestStats.pendingPasses} />
                    <StatsCard dataName={'Rechazadas'} data={guestStats.declinedPasses} />
                </div>
            </div>
        </div>
    )
}
