import Modal from "../../modal/Modal";
import ModalBody from "../../modal/ModalBody";
import ModalFooter from "../../modal/ModalFooter";
import Button from "../../ui/Button";
import LoadingOverlay from "../../ui/LoadingOverlay";
import { DataContext } from "../../../contexts/DataContext";
import { useContext, useRef } from "react";
import { useHandleModals } from "../../../hooks/useHandleModals";
import { useDialog } from "../../../hooks/useDialog";

export default function DeleteGuestModal() {
    const { guests, selectedCard, loading, error, deleteGuest } = useContext(DataContext);
    const guestToDeleteData = useRef(guests.find((g) => g.id === selectedCard));
    const handleModals = useHandleModals();
    const { openDialog } = useDialog();
    const modalID = 'confirmDeleteGuest';
            
    return (
        <Modal id={modalID} title={"Eliminar Invitado"}>
            <ModalBody>
                <div className="text-center">
                    <p className="mb-4">Vas a eliminar a:</p>
                    <h3 className="uppercase mb-4 bg-gray-100 rounded-lg p-2">
                        {`${guestToDeleteData.current.name} ${guestToDeleteData.current.lastName}`}
                    </h3>
                    <p>
                        Podrás agregarlo otra vez y enviarle un nuevo enlace si lo deseas.
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
                    Conservar Invitado
                </Button>
                <Button
                    type={"combined"}
                    size={"large"}
                    buttonColor={"secondary-danger"}
                    icon={"trash3"}
                    roundness={"large"}
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
