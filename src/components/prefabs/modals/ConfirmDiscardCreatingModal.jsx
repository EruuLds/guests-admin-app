import Modal from '../../modal/Modal'
import ModalBody from '../../modal/ModalBody'
import ModalFooter from '../../modal/ModalFooter'
import Button from '../../ui/Button'
import { useHandleModals } from '../../../hooks/useHandleModals'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

export default function ConfirmDiscardCreatingModal() {
    const handleModals = useHandleModals();
    const modalID = 'confirmDiscardCreating';

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
                    variant={'primary'}
                    onClick={() => handleModals("close", modalID)}
                >
                    Volver
                </Button>
                <Button
                    variant={'secondary'}
                    onClick={() => {
                        handleModals("close", modalID);
                        handleModals("close", 'createGuest');
                    }}
                >
                    <FontAwesomeIcon icon={faTrashCan} className='me-2' />
                    Descartar
                </Button>
            </ModalFooter>
        </Modal>
    );
}
