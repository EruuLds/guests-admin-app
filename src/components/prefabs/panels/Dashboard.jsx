import StatsCard from "../cards/StatsCard"
import StatsCardSkeleton from "../cards/StatsCardSkeleton";
import Dropdown from "../../ui/Dropdown";
import { DataContext } from "../../../contexts/DataContext";
import { useGuestsStats } from "../../../hooks/useGuestStats"
import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
    const guestStats = useGuestsStats();
    const { initialLoading } = useContext(DataContext);
    const [showDashboard, setShowDashboard] = useState(false)
    const isMobile = useMediaQuery("(max-width: 768px)");

    useEffect(() => {
        if(isMobile)
        setShowDashboard(false);
    }, [isMobile])

    return (
        <div>
            <div className="cursor-pointer md:cursor-auto flex justify-center items-center py-6 border-b border-zinc-100" onClick={() => setShowDashboard(!showDashboard)}>
                <h3 className="text-center">Panel de Seguimiento</h3>
                <div className={`ms-2 transition-all duration-300 block md:hidden ${showDashboard ? 'rotate-180' : 'rotate-0'}`}>
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>
            </div>
            <Dropdown isOpen={(showDashboard || !isMobile)}>
                <div className='border-b border-zinc-100'>
                    {initialLoading &&
                        <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 my-4">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <StatsCardSkeleton key={i} />
                            ))}
                        </div>
                    }
                    {!initialLoading &&
                        <div className="grid grid-cols-2 lg:grid-cols-1 lg:grid-cols-2 gap-4 my-4">
                            <StatsCard dataName={'Total'} data={guestStats.totalPasses} semanticDot={'rose'} />
                            <StatsCard dataName={'Confirmadas'} data={guestStats.confirmedPasses} semanticDot={'green'} />
                            <StatsCard dataName={'Pendientes'} data={guestStats.pendingPasses} semanticDot={'greenDashed'} />
                            <StatsCard dataName={'Rechazadas'} data={guestStats.declinedPasses} semanticDot={'gray'} />
                        </div>
                    }
                </div>
            </Dropdown>
        </div>
    )
}
