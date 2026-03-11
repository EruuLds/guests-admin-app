import CreateGuestModal from "../prefabs/modals/CreateGuestModal";
import EditGuestModal from "../prefabs/modals/EditGuestModal";
import DeleteGuestModal from "../prefabs/modals/DeleteGuestModal";
import ConfirmDiscardCreatingModal from "../prefabs/modals/ConfirmDiscardCreatingModal";
import ConfirmDiscardEditingModal from "../prefabs/modals/ConfirmDiscardEditingModal";
import ConfirmLogoutModal from "../prefabs/modals/ConfirmLogoutModal";
import { ModalContext } from "../../contexts/ModalContext";
import { useContext } from "react";

export default function ModalManager() {
  const { openModals } = useContext(ModalContext);

  return (
    <>
      {openModals.some((modal) => modal === "createGuest") && ( // Añadir nuevo invitado.
        <CreateGuestModal />
      )}
      {openModals.some((modal) => modal === "editGuest") && ( // Editar un invitado.
        <EditGuestModal />
      )}
      {openModals.some((modal) => modal === "confirmDeleteGuest") && ( //Confirmar la eliminación de un invitado
        <DeleteGuestModal />
      )}
      {openModals.some((modal) => modal === "confirmDiscardCreating") && ( //Descartar los cambios al añadir un nuevo invitado.
        <ConfirmDiscardCreatingModal />
      )}
      {openModals.some((modal) => modal === "confirmDiscardEditing") && ( //Descartar los cambios al editar un nuevo invitado.
        <ConfirmDiscardEditingModal />
      )}
      {openModals.some((modal) => modal === "confirmLogout") && ( //Descartar los cambios al editar un invitado.
        <ConfirmLogoutModal  />
      )}
    </>
  );
}
