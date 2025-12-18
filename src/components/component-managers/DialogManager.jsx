import DialogModal from "../modal/DialogModal";
import { useContext } from "react"
import { ModalContext } from "../../contexts/ModalContext"

export default function DialogManager() {
    const { openDialogs } = useContext(ModalContext);

    return (
        <>
            {openDialogs.map((d) => (
                <DialogModal key={d.id} id={d.id} type={d.type} message={d.message} onClickTarget={d.onClickTarget}></DialogModal>
            ))}
        </>
    )
}
