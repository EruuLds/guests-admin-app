import ModalManager from "../components/component-managers/ModalManager";
import DialogManager from "../components/component-managers/DialogManager";
import Button from "../components/ui/Button";
import Navbar from "../components/prefabs/Navbar";
import StatsPanel from "../components/prefabs/panels/StatsPanel";
import GuestsManagementPanel from "../components/prefabs/panels/GuestsManagementPanel";
import { DataContext } from "../contexts/DataContext";
import { ModalContext } from "../contexts/ModalContext";
import { useContext } from "react";
import { useHandleModals } from "../hooks/useHandleModals";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
    const { openModals } = useContext(ModalContext);
    const { initialLoading } = useContext(DataContext);
    const handleModals = useHandleModals();

    return (
        <div
            className={`relative h-dvh flex flex-col ${initialLoading ? 'overflow-y-hidden' : 'overflow-y-visible'}`}
        >
            <Navbar />
            <main id="mainPanel" className="responsive-container pb-4 flex-1 md:overflow-y-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 md:h-full">
                    <div className="h-full border-b border-zinc-100 md:overflow-y-auto">
                        <StatsPanel />
                    </div>
                    <div className="md:col-span-2 h-full md:overflow-y-hidden">
                        <GuestsManagementPanel />
                    </div>
                </div>
            </main>

            <ModalManager />
            <DialogManager />

            <div className="sticky flex justify-end px-6 pb-6 pt-2 bottom-0 top-0 block sm:hidden pointer-events-none">
                <div
                    className={`size-14 rounded-full shadow-xl transition-all duration-300 standard-ease pointer-events-auto ${initialLoading || openModals.length > 0
                        ? "scale-[0.8] opacity-0"
                        : "scale-[1.0] opacity-100"
                        }`}
                >
                    <Button variant={"primary"} size={'lg'} shape={'circle'} grow onClick={() => handleModals("open", "createGuest")} >
                        <FontAwesomeIcon icon={faUserPlus} />
                    </Button>
                </div>
            </div>
        </div>
    )
}
