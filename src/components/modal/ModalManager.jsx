import AddGuestModal from "./prefabModals/AddGuestModal";
import EditGuestModal from "./prefabModals/EditGuestModal";
import DeleteGuestModal from "./prefabModals/DeleteGuestModal";
import ConfirmDiscardAddingModal from "./prefabModals/ConfirmDiscardAddingModal";
import ConfirmDiscardEditingModal from "./prefabModals/ConfirmDiscardEditingModal";
import { ModalContext } from "../../contexts/ModalContext";
import { useContext } from "react";

export default function ModalManager() {
  const { openModals } = useContext(ModalContext);

  return (
    <>
      {openModals.some((modal) => modal === "addGuest") && ( // Añadir nuevo invitado.
        <AddGuestModal />
      )}
      {openModals.some((modal) => modal === "editGuest") && ( // Editar un invitado.
        <EditGuestModal />
      )}
      {openModals.some((modal) => modal === "confirmDeleteGuest") && ( //Confirmar la eliminación de un invitado
        <DeleteGuestModal />
      )}
      {openModals.some((modal) => modal === "confirmDiscardAdding") && ( //Descartar los cambios al añadir un nuevo invitado.
        <ConfirmDiscardAddingModal />
      )}
      {openModals.some((modal) => modal === "confirmDiscardEditing") && ( //Descartar los cambios al editar un invitado.
        <ConfirmDiscardEditingModal />
      )}
    </>
  );
}
