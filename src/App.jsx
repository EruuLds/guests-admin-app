import "./App.css";
import Toolbar from "./components/Toolbar";
import GuestsList from "./components/GuestsList";
import ModalManager from "./components/component-managers/ModalManager";
import DialogManager from "./components/component-managers/DialogManager";
import Button from "./components/ui/Button";
import { DataContext } from "./contexts/DataContext";
import { ModalContext } from "./contexts/ModalContext";
import { useContext } from "react";
import { useHandleModals } from "./hooks/useHandleModals";
import Navbar from "./components/prefabs/Navbar";

import StatsCard from "./components/prefabs/cards/StatsCard";
import { useGuestsStats } from "./hooks/useGuestStats";

function App() {
  const { openModals } = useContext(ModalContext);
  const { initialLoading } = useContext(DataContext);
  const guestStats = useGuestsStats();
  const handleModals = useHandleModals();

  return (
    <>
      <div
        className={`relative md:h-screen flex flex-col`}
      >
        <Navbar />
        <main id="mainPanel" className="responsive-container pb-4 flex-1 md:overflow-y-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
            <div className="h-full md:overflow-y-scroll">
              <h3 className="mb-4 py-6 border-b border-zinc-100 text-center">Seguimiento de invitaciones:</h3>
              <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 h-fit">
                <StatsCard dataName={'Total'} data={guestStats.totalPasses} />
                <StatsCard dataName={'Confirmadas'} data={guestStats.confirmedPasses} />
                <StatsCard dataName={'Pendientes'} data={guestStats.pendingPasses} />
                <StatsCard dataName={'Rechazadas'} data={guestStats.declinedPasses} />
              </div>
            </div>
            <div className="md:col-span-2 h-full md:overflow-y-hidden">
              <div className="h-full flex flex-col">
                <div className="mb-4 md:mb-0 border-b border-zinc-100 md:border-none sticky top-0 z-[100]">
                  <Toolbar />
                </div>
                <div className="flex-1 md:overflow-y-scroll rounded-2xl">
                  <GuestsList id="guestList" />
                </div>
              </div>
            </div>
          </div>
        </main>

        <ModalManager />
        <DialogManager />

        <div className="sticky flex justify-end px-8 pb-8 pt-4 bottom-0 top-0 block sm:hidden pointer-events-none">
          <div
            className={`size-14 rounded-2xl shadow-xl transition-all duration-300 standard-ease pointer-events-auto ${
              initialLoading || openModals.length > 0
                ? "scale-[0.8] opacity-0"
                : "scale-[1.0] opacity-100"
            }`}
          >
            <Button
              type={"icon"}
              icon={"plus-circle"}
              buttonColor={"primary"}
              wFit={"container"}
              hFit={"container"}
              roundness={"large"}
              onClickFunction={() => handleModals("open", "addGuest")}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
