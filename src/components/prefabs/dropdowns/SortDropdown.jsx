import Button from "../../ui/Button";
import { useContext, useRef, useState } from "react";
import { DataContext } from "../../../contexts/DataContext";
import { useClickOutside } from "../../../hooks/useClickOutside";
import Dropdown from "../../ui/Dropdown";

export default function SortDropdown() {
    const [ isOpen, setIsOpen ] = useState(false);
    const { sortBy, setSortBy } = useContext(DataContext);
    const dropdownBox = useRef(null);

    useClickOutside(dropdownBox, () => setIsOpen(false));

    return (
        <div className="relative" ref={dropdownBox}>
            <Button
                type={"icon"}
                icon={"sort-down"}
                hFit={'container'}
                buttonColor={"secondary"}
                roundness={"large"}
                onClickFunction={() => setIsOpen(!isOpen)}
            />
            <div className="absolute translate-y-full bottom-0 bg-zinc-100 rounded-2xl shadow-xl">
                <Dropdown isOpen={isOpen}>
                    <div className="p-2">
                        <div className="mb-2">
                            <p className="text-center">Ordenar por:</p>
                        </div>
                        <div className="overflow-hidden rounded-lg">
                            <Button
                                type={"text"}
                                wFit={"container"}
                                buttonColor={"white"}
                                listed
                                onClickFunction={() => {
                                    setSortBy("name-asc");
                                    setIsOpen(false);
                                }}
                            >
                                <div className="flex">
                                    <p>Nombre (ascendente)</p>
                                    {sortBy === 'name-asc' && <i className="bi bi-check-circle-fill text-rose ms-2"></i>}
                                </div>
                            </Button>
                            <Button
                                type={"text"}
                                wFit={"container"}
                                buttonColor={"white"}
                                listed
                                onClickFunction={() => {
                                    setSortBy("name-desc");
                                    setIsOpen(false);
                                }}
                            >
                                <div className="flex">
                                    <p>Nombre (descendente)</p>
                                    {sortBy === 'name-desc' && <i className="bi bi-check-circle-fill text-rose ms-2"></i>}
                                </div>
                            </Button>
                            <Button
                                type={"text"}
                                wFit={"container"}
                                buttonColor={"white"}
                                listed
                                onClickFunction={() => {
                                    setSortBy("table-asc");
                                    setIsOpen(false);
                                }}
                            >
                                <div className="flex">
                                    <p>Mesa (ascendente)</p>
                                    {sortBy === 'table-asc' && <i className="bi bi-check-circle-fill text-rose ms-2"></i>}
                                </div>
                            </Button>
                            <Button
                                type={"text"}
                                wFit={"container"}
                                buttonColor={"white"}
                                listed
                                onClickFunction={() => {
                                    setSortBy("table-desc");
                                    setIsOpen(false);
                                }}
                            >
                                <div className="flex">
                                    <p>Mesa (descendente)</p>
                                    {sortBy === 'table-desc' && <i className="bi bi-check-circle-fill text-rose ms-2"></i>}
                                </div>
                            </Button>
                        </div>
                    </div>
                </Dropdown>
            </div>

            <span className={`absolute size-3 bg-rose-400 rounded-full end-0 top-0 transition-scale duration-150 ease-(--standard-ease) ${sortBy !== 'name-asc' ? 'scale-100' : 'scale-0'}`}></span>
        </div>
    );
}
