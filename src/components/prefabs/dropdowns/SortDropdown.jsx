import Button from "../../ui/Button";
import { useContext, useRef, useState } from "react";
import { DataContext } from "../../../contexts/DataContext";
import { useClickOutside } from "../../../hooks/useClickOutside";
import Dropdown from "../../ui/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownWideShort, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function SortDropdown() {
    const [ isOpen, setIsOpen ] = useState(false);
    const { sortBy, setSortBy } = useContext(DataContext);
    const dropdownBox = useRef(null);

    useClickOutside(dropdownBox, () => setIsOpen(false));

    return (
        <div className="relative" ref={dropdownBox}>
            <Button variant={'secondary'} size={'lg'} shape={'square'} onClick={() => setIsOpen(!isOpen)}>
                <FontAwesomeIcon icon={faArrowDownWideShort}/>
            </Button>
            <div className="absolute translate-y-full bottom-0 bg-zinc-100 rounded-2xl shadow-xl">
                <Dropdown isOpen={isOpen}>
                    <div className="p-2">
                        <div className="mb-2">
                            <p className="text-center">Ordenar por:</p>
                        </div>
                        <div className="overflow-hidden rounded-lg grid gap-2">
                            <Button
                                variant={'white'} 
                                size={'sm'} 
                                grow 
                                onClick={() => {
                                    setSortBy("name-asc");
                                    setIsOpen(false);
                                }}
                            >
                                <div className="flex items-center text-nowrap">
                                    <p>Nombre (asc)</p>
                                    {sortBy === 'name-asc' && <FontAwesomeIcon icon={faCheckCircle} className="ms-2 text-rose"/>}
                                </div>
                            </Button>
                            <Button
                                variant={'white'} 
                                size={'sm'} 
                                grow 
                                onClick={() => {
                                    setSortBy("name-desc");
                                    setIsOpen(false);
                                }}
                            >
                                <div className="flex items-center text-nowrap">
                                    <p>Nombre (desc)</p>
                                    {sortBy === 'name-desc' && <FontAwesomeIcon icon={faCheckCircle} className="ms-2 text-rose"/>}
                                </div>
                            </Button>
                            <Button
                                variant={'white'} 
                                size={'sm'} 
                                grow 
                                onClick={() => {
                                    setSortBy("table-asc");
                                    setIsOpen(false);
                                }}
                            >
                                <div className="flex items-center text-nowrap">
                                    <p>Mesa (asc)</p>
                                    {sortBy === 'table-asc' && <FontAwesomeIcon icon={faCheckCircle} className="ms-2 text-rose"/>}
                                </div>
                            </Button>
                            <Button
                                variant={'white'} 
                                size={'sm'} 
                                grow 
                                onClick={() => {
                                    setSortBy("table-desc");
                                    setIsOpen(false);
                                }}
                            >
                                <div className="flex items-center text-nowrap">
                                    <p>Mesa (desc)</p>
                                    {sortBy === 'table-desc' && <FontAwesomeIcon icon={faCheckCircle} className="ms-2 text-rose"/>}
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
