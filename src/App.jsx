import "./App.css";
import PageHeader from "./components/PageHeader";
import Toolbar from "./components/Toolbar";
import SectionContainer from "./components/ui/SectionContainer";
import GuestsList from "./components/GuestsList";
import ModalManager from "./components/component-managers/ModalManager";
import DialogManager from "./components/component-managers/DialogManager";
import Button from "./components/ui/Button";
import { DataContext } from "./contexts/DataContext";
import { ModalContext } from "./contexts/ModalContext";
import { useContext } from "react";
import { useHandleModals } from "./hooks/useHandleModals";

function App() {
  const { openModals } = useContext(ModalContext);
  const { initialLoading } = useContext(DataContext);
  const handleModals = useHandleModals();

  return (
    <>
      <div
        className={`flex flex-col relative ${
          initialLoading || openModals.length > 0
            ? "h-screen overflow-hidden"
            : "min-h-[100dvh]"
        }`}
      >
        <PageHeader pageTitle="Lista de Invitados" />
        <Toolbar />
        <SectionContainer id="guestsList">
          <GuestsList />
          
        </SectionContainer>

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
