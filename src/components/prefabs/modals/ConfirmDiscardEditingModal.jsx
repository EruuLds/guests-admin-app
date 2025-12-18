import Modal from "../../modal/Modal";
import ModalBody from "../../modal/ModalBody";
import ModalFooter from "../../modal/ModalFooter";
import Button from "../../ui/Button";
import { useHandleModals } from "../../../hooks/useHandleModals";
import { useDialog } from "../../../hooks/useDialog";

export default function ConfirmDiscardEditingModal() {
    const handleModals = useHandleModals();
    const { openDialog } = useDialog();
    const modalID = 'confirmDiscardEditing';

    return (
        <Modal id={modalID} title={"Descartar Cambios"}>
            <ModalBody>
                <div className="text-center">
                    <p>
                        Hay cambios en la información del este invitado. ¿Deseas descartarlos?
                    </p>
                </div>
            </ModalBody>
            <ModalFooter alignment={"center"}>
                <Button
                    type={"text"}
                    size={"large"}
                    buttonColor={"secondary"}
                    roundness={"large"}
                    onClickFunction={() => handleModals("close", modalID)}
                >
                    Volver
                </Button>
                <Button
                    type={"combined"}
                    size={"large"}
                    buttonColor={"primary"}
                    icon={"x-lg"}
                    roundness={"large"}
                    onClickFunction={() => {
                        handleModals("close", modalID)
                        handleModals("close", "editGuest")
                        openDialog('info', 'Se descartaron los cambios')
                    }}
                >
                    Descartar
                </Button>
            </ModalFooter>
        </Modal>
    );
}
