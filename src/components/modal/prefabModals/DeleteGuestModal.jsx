import Modal from "../Modal";
import ModalBody from "../ModalBody";
import ModalFooter from "../ModalFooter";
import Button from "../../Button";
import LoadingOverlay from "../../LoadingOverlay";
import { DataContext } from "../../../contexts/DataContext";
import { useContext, useRef } from "react";
import { useHandleModals } from "../../../hooks/useHandleModals";

export default function DeleteGuestModal() {
    const { guests, selectedCard, loading, deleteGuest } = useContext(DataContext);
    const guestToDelete = useRef(selectedCard)
    const selectedGuestData = guests.find((g) => g.id === guestToDelete.current);
    const handleModals = useHandleModals();
    const modalID = 'confirmDeleteGuest';

    return (
        <Modal id={modalID} title={"Eliminar Invitado"}>
            <ModalBody>
                <div className="text-center">
                    <p className="mb-8">Vas a eliminar a:</p>
                    <h3 className="uppercase mb-2 bg-gray-200 rounded-lg p-2">
                        {selectedGuestData
                            ? `${selectedGuestData.name} ${selectedGuestData.lastName}`
                            : ""}
                    </h3>
                    <p className="mb-8 text-red text-xs">
                        <i className="bi bi-exclamation-triangle me-2"></i>Esta acción NO se
                        puede deshacer.
                    </p>
                    <p>
                        Podrás agregarlo otra vez y enviarle un nuevo enlace si lo deseas.
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
                    Cancelar
                </Button>
                <Button
                    type={"combined"}
                    size={"large"}
                    buttonColor={"red"}
                    icon={"trash3"}
                    textColor={"white"}
                    roundness={"large"}
                    onClickFunction={() => {
                        // Lógica para eliminar el invitado
                        handleModals("close", modalID);
                        deleteGuest(guestToDelete.current);
                    }}
                >
                    Sí, eliminar
                </Button>
            </ModalFooter>
            {loading && <LoadingOverlay text={"Eliminando Invitado"} />}
        </Modal>
    );
}
