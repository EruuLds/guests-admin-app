import Modal from '../../modal/Modal'
import ModalBody from '../../modal/ModalBody'
import ModalFooter from '../../modal/ModalFooter'
import Button from '../../ui/Button'
import { useHandleModals } from '../../../hooks/useHandleModals'

export default function ConfirmDiscardAddingModal() {
    const handleModals = useHandleModals();
    const modalID = 'confirmDiscardAdding';

    return (
        <Modal id={modalID} title={"Descartar Cambios"}>
            <ModalBody>
                <div className="text-center">
                    <p>
                        Hay cambios en la información del formulario. ¿Deseas descartarlos?
                    </p>
                </div>
            </ModalBody>
            <ModalFooter alignment={"center"}>
                <Button
                    type={"text"}
                    size={"large"}
                    buttonColor={"gray"}
                    roundness={"large"}
                    onClickFunction={() => handleModals("close", modalID)}
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
                        handleModals("close", modalID);
                        handleModals("close", "addGuest");
                    }}
                >
                    Descartar
                </Button>
            </ModalFooter>
        </Modal>
    );
}
