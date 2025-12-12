import Modal from "../Modal";
import ModalBody from "../ModalBody";
import ModalFooter from "../ModalFooter";
import Button from "../../Button";
import { useHandleModals } from "../../../hooks/useHandleModals";

export default function ConfirmDiscardEditingModal() {
    const handleModals = useHandleModals();

    return (
        <Modal id={"confirmDiscardEditing"} title={"Descartar Cambios"}>
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
                    buttonColor={"gray"}
                    roundness={"large"}
                    onClickFunction={() => handleModals("close", "confirmDiscardEditing")}
                >
                    Volver
                </Button>
                <Button
                    type={"combined"}
                    size={"large"}
                    buttonColor={"red"}
                    icon={"x-lg"}
                    textColor={"white"}
                    roundness={"large"}
                    onClickFunction={() => {
                        // Lógica para eliminar el invitado
                        handleModals(
                            "close",
                            "confirmDiscardEditing",
                            () => handleModals("close", "editGuest"),
                            10
                        );
                    }}
                >
                    Descartar
                </Button>
            </ModalFooter>
        </Modal>
    );
}
