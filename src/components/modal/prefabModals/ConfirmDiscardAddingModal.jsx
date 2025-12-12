import Modal from '../Modal'
import ModalBody from '../ModalBody'
import ModalFooter from '../ModalFooter'
import Button from '../../Button'
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
                        handleModals(
                            "close",
                            "confirmDiscardAdding",
                            () => handleModals("close", "addGuest"),
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
