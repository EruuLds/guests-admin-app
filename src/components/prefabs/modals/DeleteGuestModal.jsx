import Modal from "../../modal/Modal";
import ModalBody from "../../modal/ModalBody";
import ModalFooter from "../../modal/ModalFooter";
import Button from "../../ui/Button";
import LoadingOverlay from "../../ui/LoadingOverlay";
import { useRef } from "react";
import { useHandleModals } from "../../../hooks/useHandleModals";
import { useDialog } from "../../../hooks/useDialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserXmark } from "@fortawesome/free-solid-svg-icons";
import { useDataContext } from "../../../hooks/contexts/useDataContext";
import { useGuests } from "../../../hooks/database/useGuests";
//import { useMediaQuery } from "../../../hooks/useMediaQuery";

export default function DeleteGuestModal() {
    const { guests, selectedCard, loading } = useDataContext();
    const { deleteGuest } = useGuests();
    const guest = useRef(guests.find((g) => g.id === selectedCard));
    const handleModals = useHandleModals();
    const { openDialog } = useDialog();
    const modalID = 'confirmDeleteGuest';
    //const isMobile = useMediaQuery("(max-width: 448px)");

    const handleGuestDelete = async () => {
        try {
            await deleteGuest(guest.current.id);
            openDialog('success', `Eliminaste a ${guest.current.name.toUpperCase()} ${guest.current.lastName.toUpperCase()} de la lista`);
        } catch(err) {
            openDialog('error', 'Se produjo un error al tratar de eliminar al invitado. Inténtalo nuevamente.');
            throw err;
        } finally {
            handleModals("close", modalID);
        }
    }
            
    return (
        <Modal id={modalID} title={"Eliminar Invitado"}>
            <ModalBody>
                <div className="text-center">
                    <div className="mb-3">
                        <p >Vas a eliminar a:</p>
                    </div>
                    <div className="mb-3">
                        <p className="bg-gray-100 rounded-xl p-2 text-xl font-semibold">
                            {`${guest.current.name} ${guest.current.lastName}`}
                        </p>
                    </div>
                    <div>
                        <p>Podrás agregarlo otra vez y enviarle un nuevo enlace si lo deseas.</p>
                    </div>
                    
                </div>
            </ModalBody>
            <ModalFooter alignment={"center"}>
                <Button
                    variant={'secondary'}
                    onClick={() => handleModals("close", modalID)}
                >
                    Conservar Invitado
                </Button>
                <Button
                    variant={'secondaryDanger'}
                    onClick={handleGuestDelete}
                >
                    <FontAwesomeIcon icon={faUserXmark} className="me-2"/>
                    Eliminar
                </Button>
                
            </ModalFooter>
            {loading && <LoadingOverlay text={"Eliminando Invitado"} />}
        </Modal>
    );
}
