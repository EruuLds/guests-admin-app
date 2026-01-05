import "./App.css";
import ModalManager from "./components/component-managers/ModalManager";
import DialogManager from "./components/component-managers/DialogManager";
import Button from "./components/ui/Button";
import { DataContext } from "./contexts/DataContext";
import { ModalContext } from "./contexts/ModalContext";
import { useContext } from "react";
import { useHandleModals } from "./hooks/useHandleModals";
import Navbar from "./components/prefabs/Navbar";
import Dashboard from "./components/prefabs/panels/Dashboard";
import GuestsPanel from "./components/prefabs/panels/GuestsPanel";

function App() {
  const { openModals } = useContext(ModalContext);
  const { initialLoading } = useContext(DataContext);
  const handleModals = useHandleModals();

  return (
    <>
      <div
        className={`relative h-screen flex flex-col`}
      >
        <Navbar />
        <main id="mainPanel" className="responsive-container pb-4 flex-1 md:overflow-y-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 md:h-full">
            <div className="h-full md:overflow-y-scroll">
              <Dashboard></Dashboard>
            </div>
            <div className="md:col-span-2 h-full md:overflow-y-hidden">
              <GuestsPanel></GuestsPanel>
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
