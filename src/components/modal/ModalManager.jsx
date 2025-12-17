import AddGuestModal from "../prefabs/modals/AddGuestModal";
import EditGuestModal from "../prefabs/modals/EditGuestModal";
import DeleteGuestModal from "../prefabs/modals/DeleteGuestModal";
import ConfirmDiscardAddingModal from "../prefabs/modals/ConfirmDiscardAddingModal";
import ConfirmDiscardEditingModal from "../prefabs/modals/ConfirmDiscardEditingModal";
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
