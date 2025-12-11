import Modal from "../Modal";
import ModalBody from "../ModalBody";
import ModalFooter from "../ModalFooter";
import Button from "../../Button";
import GuestForm from "../../forms/guestForm";
import LoadingOverlay from "../../LoadingOverlay";
import { DataContext } from "../../../contexts/dataContext";
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
                    buttonColor={"gray"}
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
                    buttonColor={"red"}
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
