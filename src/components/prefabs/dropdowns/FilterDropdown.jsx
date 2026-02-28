import Button from "../../ui/Button";
import Dropdown from "../../ui/Dropdown"
import { useContext, useRef, useState } from "react";
import { DataContext } from "../../../contexts/DataContext";
import { useClickOutside } from "../../../hooks/useClickOutside"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faFilter } from "@fortawesome/free-solid-svg-icons";

export default function FilterDropdown() {
    const [ isOpen, setIsOpen ] = useState(false);
    const { setStatusFilter, statusFilter} = useContext(DataContext);
    const dropdownBox = useRef(null);
    
    useClickOutside(dropdownBox, () => setIsOpen(false));

    return (
        <div className="relative" ref={dropdownBox}>
            <Button variant={'secondary'} size={'lg'} shape={'square'} onClick={() => setIsOpen(!isOpen)}>
                <FontAwesomeIcon icon={faFilter}/>
            </Button>
            <div className="absolute translate-y-full bottom-0 bg-zinc-100 rounded-2xl shadow-lg" >
                <Dropdown isOpen={isOpen}>
                    <div className="p-2">
                        <div className="mb-2">
                            <p className="text-center">Mostrar:</p>
                        </div>
                        <div className="overflow-hidden rounded-lg grid gap-2">
                            <Button 
                                variant={'white'} 
                                size={'sm'} 
                                grow 
                                onClick={() => {
                                    setStatusFilter('all');
                                    setIsOpen(false);
                                }}
                            >
                                <div className="flex items-center">
                                    <p>Todas</p>
                                    {statusFilter === 'all' && <FontAwesomeIcon icon={faCheckCircle} className="ms-2 text-rose"/>}
                                </div>
                            </Button>
                            <Button
                                variant={'white'} 
                                size={'sm'} 
                                grow 
                                onClick={() => {
                                    setStatusFilter('confirmed');
                                    setIsOpen(false);
                                }}
                            >
                                <div className="flex items-center">
                                    <p>Confirmadas</p>
                                    {statusFilter === 'confirmed' && <FontAwesomeIcon icon={faCheckCircle} className="ms-2 text-rose"/>}
                                </div>
                            </Button>
                            <Button
                                variant={'white'} 
                                size={'sm'} 
                                grow 
                                onClick={() => {
                                    setStatusFilter('declined');
                                    setIsOpen(false);
                                }}
                            >
                                <div className="flex items-center">
                                    <p>Rechazadas</p>
                                    {statusFilter === 'declined' && <FontAwesomeIcon icon={faCheckCircle} className="ms-2 text-rose"/>}
                                </div>
                            </Button>
                            <Button
                                variant={'white'} 
                                size={'sm'} 
                                grow 
                                onClick={() => {
                                    setStatusFilter('pending');
                                    setIsOpen(false);
                                }}
                            >
                                <div className="flex items-center">
                                    <p>Pendientes</p>
                                    {statusFilter === 'pending' && <FontAwesomeIcon icon={faCheckCircle} className="ms-2 text-rose"/>}
                                </div>
                            </Button>
                        </div>
                    </div>
                </Dropdown>
            </div>
            <span className={`absolute size-3 bg-rose-400 rounded-full end-0 top-0 transition-scale duration-150 ease-(--standard-ease) ${statusFilter !== 'all' ? 'scale-100' : 'scale-0'}`}></span>
        </div>
    );
}
