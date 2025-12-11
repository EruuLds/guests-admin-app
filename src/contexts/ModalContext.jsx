import { createContext, useState } from "react";

export const ModalContext = createContext();

export function ModalContextProvider(props) {
    const [openModals, setOpenModals] = useState([]);
    const [visibleModals, setVisibleModals] = useState([]);

    const useOpenModalsState = { openModals, setOpenModals, visibleModals, setVisibleModals };

    return(
        <ModalContext.Provider value={useOpenModalsState}>{props.children}</ModalContext.Provider>
    );
}