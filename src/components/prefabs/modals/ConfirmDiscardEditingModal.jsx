import Modal from "../../modal/Modal";
import ModalBody from "../../modal/ModalBody";
import ModalFooter from "../../modal/ModalFooter";
import Button from "../../ui/Button";
import { useHandleModals } from "../../../hooks/useHandleModals";
import { useDialog } from "../../../hooks/useDialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function ConfirmDiscardEditingModal() {
    const handleModals = useHandleModals();
    const { openDialog } = useDialog();
    const modalID = 'confirmDiscardEditing';

    return (
        <Modal id={modalID} title={"Descartar Cambios"}>
            <ModalBody>
                <div className="text-center">
                    <p className="text-pretty">
                        Hay cambios en la información del este invitado. ¿Deseas descartarlos?
                    </p>
                </div>
            </ModalBody>
            <ModalFooter alignment={"center"}>
                <Button
                    variant={'primary'}
                    onClick={() => handleModals("close", modalID)}
                >
                    Volver
                </Button>
                <Button
                    variant={'secondary'}
                    onClick={() => {
                        handleModals("close", modalID);
                        handleModals("close", "editGuest");
                    }}
                >
                    <FontAwesomeIcon icon={faTrashCan} className='me-2' />
                    Descartar
                </Button>
            </ModalFooter>
        </Modal>
    );
}
