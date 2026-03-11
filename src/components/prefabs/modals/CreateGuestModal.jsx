import Modal from "../../modal/Modal";
import ModalBody from "../../modal/ModalBody";
import ModalFooter from "../../modal/ModalFooter";
import Button from "../../ui/Button";
import LoadingOverlay from "../../ui/LoadingOverlay";
import { DataContext } from "../../../contexts/DataContext";
import { useContext } from "react";
import { useHandleModals } from "../../../hooks/useHandleModals";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import CreateGuestForm from "../forms/CreateGuestForm";

export default function CreateGuestModal() {
    const { loading, dirtyForms } = useContext(DataContext);
    const handleModals = useHandleModals();
    const modalID = 'createGuest';
    const formID = 'createGuestForm';

    return (
        <Modal
            id={modalID}
            buttons
            card
            title={"Añadir Invitado"}
            loading={loading}
            onClose={
                dirtyForms.some(df => df === formID)
                    ? () => handleModals("open", "confirmDiscardCreating")
                    : () => handleModals("close", modalID)
            }
        >   
            <ModalBody>
                <CreateGuestForm formId={formID} />
            </ModalBody>
            <ModalFooter alignment={"end"}>
                <Button
                    variant={'secondary'}
                    onClick={
                        dirtyForms.some(df => df === formID)
                            ? () => handleModals("open", "confirmDiscardCreating")
                            : () => handleModals("close", modalID)
                    }
                >
                    Descartar
                </Button>
                <Button
                    variant={'primary'}
                    targetForm={formID}
                >
                    <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                    Añadir
                </Button>
            </ModalFooter>

            {loading && <LoadingOverlay text={"Añadiendo Invitado"} />}
        </Modal>
    );
}
