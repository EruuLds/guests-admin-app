import Modal from "../../modal/Modal";
import ModalBody from "../../modal/ModalBody";
import ModalFooter from "../../modal/ModalFooter";
import Button from "../../ui/Button";
import GuestForm from "../forms/GuestForm";
import LoadingOverlay from "../../ui/LoadingOverlay";
import { DataContext } from "../../../contexts/DataContext";
import { useContext } from "react";
import { useHandleModals } from "../../../hooks/useHandleModals";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

export default function EditGuestModal() {
    const { loading, dirtyForms } = useContext(DataContext);
    const handleModals = useHandleModals();
    const modalID = 'editGuest';
    const formID = 'editGuestForm';

    return (
        <Modal
            id={modalID}
            buttons
            card
            title={"Editar Invitado"}
            onClose={
                dirtyForms.some(df => df === formID)
                    ? () => handleModals("open", "confirmDiscardEditing")
                    : () => handleModals("close", "editGuest")
            }
        >
            <ModalBody>
                <GuestForm formType={"edit"} formId={formID} />
            </ModalBody>
            <ModalFooter alignment={"end"}>
                <Button
                    variant={'secondary'}
                    onClick={
                        dirtyForms.some(df => df === formID)
                            ? () => {handleModals("open", "confirmDiscardEditing")}
                            : () => handleModals("close", modalID)
                    }
                >
                    Descartar
                </Button>
                <Button
                    variant={'primary'}
                    targetForm={formID}
                >
                    <FontAwesomeIcon icon={faFloppyDisk} className="me-2" />
                    Guardar
                </Button>
            </ModalFooter>

            {loading && <LoadingOverlay text={"Guardando Cambios"} />}
        </Modal>
    );
}
