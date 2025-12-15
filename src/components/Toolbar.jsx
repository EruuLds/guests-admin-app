import Button from "./Button";
import { DataContext } from "../contexts/DataContext";
import { useContext } from "react";
import { useHandleModals } from "../hooks/useHandleModals";

export default function Toolbar() {
    const handleModals = useHandleModals();
    const { setSearchData } = useContext(DataContext);

    const updateSearchData = (updatedData) => {
        setSearchData(updatedData);
    }

    return (
        <div className="responsive-container flex justify-between gap-4 py-8 sticky top-0 z-[100] bg-linear-to-b from-white from-50% via-white via-75% to-white/0 to-100%">
            <div className="flex gap-4 w-full sm:w-fit">
                <input className="search-input" type="text" onChange={e => updateSearchData(e.target.value)} placeholder='Buscar Invitado' />
                <div className="flex gap-4">
                    <Button
                        type={"icon"}
                        icon={"funnel"}
                        buttonColor={"gray"}
                        roundness={"large"}
                    />
                    <Button
                        type={"icon"}
                        icon={"sort-down"}
                        buttonColor={"gray"}
                        roundness={"large"}
                    />
                </div>
                
            </div>
            <div className="hidden sm:block">
                <Button
                    type={"combined"}
                    icon={"plus-circle"}
                    buttonColor={"red"}
                    roundness={"large"}
                    onClickFunction={() => handleModals("open", "addGuest")}
                >
                    Añadir Invitado
                </Button>
            </div>
        </div>
    );
}
