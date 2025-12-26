import Button from "./ui/Button";
import { DataContext } from "../contexts/DataContext";
import { useContext } from "react";
import { useHandleModals } from "../hooks/useHandleModals";
import SortDropdown from "./prefabs/dropdowns/SortDropdown";
import FilterDropdown from "./prefabs/dropdowns/FilterDropdown";

export default function Toolbar() {
    const handleModals = useHandleModals();
    const { setSearchData } = useContext(DataContext);

    const updateSearchData = (updatedData) => {
        setSearchData(updatedData);
    }

    return (
        <div className="bg-white">
            <div className="flex justify-between gap-4 py-4">
                <div className="flex gap-4 w-full sm:w-fit">
                    <div className="flex gap-4">
                        <FilterDropdown />
                        <SortDropdown />
                        <input className="search-input" type="text" onChange={e => updateSearchData(e.target.value)} placeholder='Buscar Invitación' />
                    </div>
                </div>
                <div className="hidden sm:block">
                    <Button
                        type={"combined"}
                        icon={"plus-circle"}
                        buttonColor={"primary"}
                        roundness={"large"}
                        onClickFunction={() => handleModals("open", "addGuest")}
                    >
                        Nueva Invitación
                    </Button>
                </div>
            </div>
        </div>
    );
}
