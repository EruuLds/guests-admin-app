import Modal from '../../modal/Modal'
import ModalBody from '../../modal/ModalBody'
import ModalFooter from '../../modal/ModalFooter'
import Button from '../../ui/Button'
import { useHandleModals } from '../../../hooks/useHandleModals'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../../hooks/database/useAuth'

export default function ConfirmLogoutModal() {
    const handleModals = useHandleModals();
    const { logout } = useAuth()
    const modalID = 'confirmLogout';

    return (
        <Modal id={modalID} title={"Cerrar Sesión"}>
            <ModalBody>
                <div className="text-center">
                    <p>
                        ¿Deseas cerrar sesión?
                    </p>
                </div>
            </ModalBody>
            <ModalFooter alignment={"center"}>
                <Button
                    variant={'secondary'}
                    onClick={() => handleModals("close", modalID)}
                >
                    Cancelar
                </Button>
                <Button
                    variant={'primary'}
                    onClick={() => {
                        logout();
                        handleModals('close', modalID);
                    }}
                >
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className='me-2' />
                    Cerrar Sesión
                </Button>
            </ModalFooter>
        </Modal>
    );
}
