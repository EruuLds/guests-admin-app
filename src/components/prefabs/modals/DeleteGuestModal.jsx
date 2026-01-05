import Modal from "../../modal/Modal";
import ModalBody from "../../modal/ModalBody";
import ModalFooter from "../../modal/ModalFooter";
import Button from "../../ui/Button";
import LoadingOverlay from "../../ui/LoadingOverlay";
import { DataContext } from "../../../contexts/DataContext";
import { useContext, useRef } from "react";
import { useHandleModals } from "../../../hooks/useHandleModals";
import { useDialog } from "../../../hooks/useDialog";
import { useMediaQuery } from "../../../hooks/useMediaQuery";

export default function DeleteGuestModal() {
    const { guests, selectedCard, loading, error, deleteGuest } = useContext(DataContext);
    const guestToDeleteData = useRef(guests.find((g) => g.id === selectedCard));
    const handleModals = useHandleModals();
    const { openDialog } = useDialog();
    const modalID = 'confirmDeleteGuest';
    const isMobile = useMediaQuery("(max-width: 448px)");
            
    return (
        <Modal id={modalID} title={"Eliminar Invitado"}>
            <ModalBody>
                <div className="text-center">
                    <div className="mb-3">
                        <p >Vas a eliminar a:</p>
                    </div>
                    <div className="mb-3">
                        <p className="bg-gray-100 rounded-lg p-2 text-xl font-semibold">
                            {`${guestToDeleteData.current.name} ${guestToDeleteData.current.lastName}`}
                        </p>
                    </div>
                    <div>
                        <p>Podrás agregarlo otra vez y enviarle un nuevo enlace si lo deseas.</p>
                    </div>
                    
                </div>
            </ModalBody>
            <ModalFooter alignment={"center"}>
                <Button
                    type={"text"}
                    size={"large"}
                    buttonColor={"secondary"}
                    roundness={"large"}
                    wFit={isMobile ? 'container' : 'content'}
                    onClickFunction={() => handleModals("close", modalID)}
                >
                    Conservar Invitado
                </Button>
                <Button
                    type={"combined"}
                    size={"large"}
                    buttonColor={"secondary-danger"}
                    icon={"trash3"}
                    roundness={"large"}
                    wFit={isMobile ? 'container' : 'content'}
                    onClickFunction={() => {
                        deleteGuest(
                            guestToDeleteData.current.id,
                            () => openDialog('success', `Eliminaste a ${guestToDeleteData.current.name.toUpperCase()} ${guestToDeleteData.current.lastName.toUpperCase()} de la lista`),
                            () => openDialog('error', 'Se produjo un error al guardar los cambios. Inténtalo nuevamente.'),
                            () => handleModals("close", modalID)
                        );
                    }}
                >
                    Eliminar
                </Button>
                
            </ModalFooter>
            {loading && <LoadingOverlay text={"Eliminando Invitado"} />}
        </Modal>
    );
}
