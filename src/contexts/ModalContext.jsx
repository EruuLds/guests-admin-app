import { createContext, useState } from "react";

export const ModalContext = createContext();

export function ModalContextProvider(props) {
    const [openModals, setOpenModals] = useState([]);
    const [visibleModals, setVisibleModals] = useState([]);

    const [openDialogs, setOpenDialogs] = useState([]);
    const [visibleDialogs, setVisibleDialogs] = useState([]);

    return (
        <ModalContext.Provider
            value={{
                openModals,
                setOpenModals,
                visibleModals,
                setVisibleModals,
                openDialogs,
                setOpenDialogs,
                visibleDialogs,
                setVisibleDialogs,
            }}
        >
            {props.children}
        </ModalContext.Provider>
    );
}
