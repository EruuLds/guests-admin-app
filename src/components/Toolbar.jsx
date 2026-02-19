import Button from "./ui/Button";
import { DataContext } from "../contexts/DataContext";
import { useContext } from "react";
import { useHandleModals } from "../hooks/useHandleModals";
import SortDropdown from "./prefabs/dropdowns/SortDropdown";
import FilterDropdown from "./prefabs/dropdowns/FilterDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

export default function Toolbar() {
    const handleModals = useHandleModals();
    const { setSearchData } = useContext(DataContext);

    const updateSearchData = (updatedData) => {
        setSearchData(updatedData);
    }

    return (
        <div className="bg-white">
            <div className="grid sm:grid-cols-[1fr_auto] items-center gap-4 py-4">
                <div className="w-full">
                    <div className="grid grid-cols-[auto_auto_1fr] gap-4">
                        <FilterDropdown />
                        <SortDropdown />
                        <input className="search-input" type="text" onChange={e => updateSearchData(e.target.value)} placeholder='Buscar Invitación'/>
                    </div>
                </div>
                <div className="hidden sm:block">
                    <Button variant={'primary'} size={'lg'} onClick={() => handleModals("open", "addGuest")}>
                        <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                        Nueva Invitación
                    </Button>
                </div>
            </div>
        </div>
    );
}
