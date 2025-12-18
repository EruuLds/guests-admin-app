import Modal from "../../modal/Modal";
import ModalBody from "../../modal/ModalBody";
import ModalFooter from "../../modal/ModalFooter";
import Button from "../../ui/Button";
import GuestForm from "../../prefabs/forms/GuestForm";
import LoadingOverlay from "../../ui/LoadingOverlay";
import { DataContext } from "../../../contexts/DataContext";
import { useContext } from "react";
import { useHandleModals } from "../../../hooks/useHandleModals";

export default function AddGuestModal() {
    const { loading, dirtyForms } = useContext(DataContext);
    const handleModals = useHandleModals();
    const modalID = 'addGuest';
    const formID = 'addGuestForm';

    return (
        <Modal
            id={modalID}
            buttons
            card
            title={"Añadir Invitado"}
            loading={loading}
            onClose={
                dirtyForms.some(df => df === formID)
                    ? () => handleModals("open", "confirmDiscardAdding")
                    : () => handleModals("close", modalID)
            }
        >   
            <ModalBody>
                <GuestForm formType={"add"} formId={formID} />
            </ModalBody>
            <ModalFooter alignment={"end"}>
                <Button
                    type={"text"}
                    buttonColor={"secondary"}
                    roundness={"large"}
                    onClickFunction={
                        dirtyForms.some(df => df === formID)
                            ? () => handleModals("open", "confirmDiscardAdding")
                            : () => handleModals("close", modalID)
                    }
                >
                    Descartar
                </Button>
                <Button
                    type={"combined"}
                    buttonColor={"primary"}
                    icon={"plus-circle"}
                    roundness={"large"}
                    targetForm={formID}
                >
                    Añadir
                </Button>
            </ModalFooter>

            {loading && <LoadingOverlay text={"Añadiendo Invitado"} />}
        </Modal>
    );
}
