import Modal from "../../modal/Modal";
import ModalBody from "../../modal/ModalBody";
import ModalFooter from "../../modal/ModalFooter";
import Button from "../../ui/Button";
import GuestForm from "../forms/GuestForm";
import LoadingOverlay from "../../ui/LoadingOverlay";
import { DataContext } from "../../../contexts/DataContext";
import { useContext } from "react";
import { useHandleModals } from "../../../hooks/useHandleModals";

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
                    type={"text"}
                    buttonColor={"secondary"}
                    roundness={"large"}
                    onClickFunction={
                        dirtyForms.some(df => df === formID)
                            ? () => {handleModals("open", "confirmDiscardEditing")}
                            : () => handleModals("close", modalID)
                    }
                >
                    Descartar
                </Button>
                <Button
                    type={"combined"}
                    buttonColor={"primary"}
                    icon={"floppy"}
                    roundness={"large"}
                    targetForm={formID}
                >
                    Guardar
                </Button>
            </ModalFooter>

            {loading && <LoadingOverlay text={"Guardando Cambios"} />}
        </Modal>
    );
}
