import Modal from "../Modal";
import ModalBody from "../ModalBody";
import ModalFooter from "../ModalFooter";
import Button from "../../Button";
import GuestForm from "../../forms/guestForm";
import LoadingOverlay from "../../LoadingOverlay";
import { DataContext } from "../../../contexts/dataContext";
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
                    buttonColor={"gray"}
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
                    buttonColor={"red"}
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
