import "./App.css";
import PageHeader from "./components/PageHeader";
import Toolbar from "./components/Toolbar";
import SectionContainer from "./components/SectionContainer";
import GuestsList from "./components/GuestsList";
import ModalManager from "./components/modal/ModalManager";
import Button from "./components/Button";
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
            : "h-auto"
        }`}
      >
        <PageHeader pageTitle="Lista de Invitados" />
        <Toolbar />
        <SectionContainer id="guestsList">
          <GuestsList />
        </SectionContainer>
        <ModalManager />
        <div
          className={`fixed size-14 rounded-2xl shadow-xl block sm:hidden bottom-8 right-8 transition-all duration-300 standard-ease ${
            initialLoading || openModals.length > 0
              ? "scale-[0.8] opacity-0"
              : "scale-[1.0] opacity-100"
          }`}
        >
          <Button
            type={"icon"}
            icon={"plus-circle"}
            buttonColor={"red"}
            wFit={'container'}
            hFit={'container'}
            roundness={"large"}
            onClickFunction={() => handleModals("open", "addGuest")}
          />
        </div>
      </div>
    </>
  );
}

export default App;
