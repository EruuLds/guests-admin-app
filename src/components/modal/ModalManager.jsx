import { ModalContext } from '../../contexts/ModalContext'
import Modal from './Modal'
import ModalBody from './ModalBody'
import ModalFooter from './ModalFooter'
import { useContext } from 'react'
import Button from '../Button'
import { useHandleModals } from '../../hooks/useHandleModals'

import AddGuestModal from './prefabModals/AddGuestModal'
import EditGuestModal from './prefabModals/EditGuestModal'
import DeleteGuestModal from './prefabModals/DeleteGuestModal'

export default function ModalManager() {
    const { openModals } = useContext(ModalContext);
    const handleModals = useHandleModals();

    return (
        <>
          {openModals.some(modal => modal === "addGuest") && // Añadir nuevo invitado.
            <AddGuestModal />
          }
          {openModals.some(modal => modal === "editGuest") && // Editar un invitado.
            <EditGuestModal />
          }
          {openModals.some(modal => modal === "confirmDeleteGuest") && //Confirmar la eliminación de un invitado
            <DeleteGuestModal />
          }
          {(openModals.some(modal => modal === "confirmDiscardAdding") ) && //Descartar los cambios al añadir un nuevo invitado.
            <Modal id={'confirmDiscardAdding'} title={'Descartar Cambios'}>
              <ModalBody>
                <div className='text-center'>
                  <p>Hay cambios en la información del formulario. ¿Deseas descartarlos?</p>
                </div>
              </ModalBody>
              <ModalFooter alignment={'center'}>
                <Button type={'text'} size={'large'} buttonColor={'gray'} roundness={'large'} onClickFunction={() => handleModals('close', 'confirmDiscardAdding')} >
                  Volver
                </Button>
                <Button type={'combined'} size={'large'} buttonColor={'red'} icon={'x-lg'} textColor={'white'} roundness={'large'} onClickFunction={() => {
                  handleModals('close', 'confirmDiscardAdding', () => handleModals('close', 'addGuest'), 10);
                }}>
                  Descartar
                </Button>
              </ModalFooter>
            </Modal>
          }
          {(openModals.some(modal => modal === "confirmDiscardEditing")) && //Descartar los cambios al editar un invitado.
            <Modal id={'confirmDiscardEditing'} title={'Descartar Cambios'}>
              <ModalBody>
                <div className='text-center'>
                  <p>Hay cambios en la información del este invitado. ¿Deseas descartarlos?</p>
                </div>
              </ModalBody>
              <ModalFooter alignment={'center'}>
                <Button type={'text'} size={'large'} buttonColor={'gray'} roundness={'large'} onClickFunction={() => handleModals('close', 'confirmDiscardEditing')} >
                  Volver
                </Button>
                <Button type={'combined'} size={'large'} buttonColor={'red'} icon={'x-lg'} textColor={'white'} roundness={'large'} onClickFunction={() => {
                      // Lógica para eliminar el invitado
                  handleModals('close', 'confirmDiscardEditing', () => handleModals('close', 'editGuest'), 10);
                }}>
                  Descartar
                </Button>
              </ModalFooter>
            </Modal>
          }
        </>
    )
}
