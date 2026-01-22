import Button from "../../ui/Button";
import Dropdown from "../../ui/Dropdown"
import { useContext, useRef, useState } from "react";
import { DataContext } from "../../../contexts/DataContext";
import { useClickOutside } from "../../../hooks/useClickOutside"

export default function FilterDropdown() {
    const [ isOpen, setIsOpen ] = useState(false);
    const { setStatusFilter, statusFilter} = useContext(DataContext);
    const dropdownBox = useRef(null);
    
    useClickOutside(dropdownBox, () => setIsOpen(false));

    return (
        <div className="relative" ref={dropdownBox}>
            <Button
                type={"icon"}
                icon={"funnel"}
                hFit={'container'}
                buttonColor={"secondary"}
                roundness={"large"}
                onClickFunction={() => setIsOpen(!isOpen)}
            />
            <div className="absolute translate-y-full bottom-0 bg-zinc-100 rounded-2xl shadow-lg" >
                <Dropdown isOpen={isOpen}>
                    <div className="p-2">
                        <div className="mb-2">
                            <p className="text-center">Mostrar:</p>
                        </div>
                        <div className="overflow-hidden rounded-lg">
                            <Button
                                type={"text"}
                                wFit={"container"}
                                icon={"sort-alpha-down"}
                                buttonColor={"white"}
                                listed
                                onClickFunction={() => {
                                    setStatusFilter('all');
                                    setIsOpen(false);
                                }}
                            >
                                <div className="flex">
                                    <p>Todas</p>
                                    {statusFilter === 'all' && <i className="bi bi-check-circle-fill text-rose ms-2"></i>}
                                </div>
                            </Button>
                            <Button
                                type={"text"}
                                wFit={"container"}
                                icon={"sort-alpha-up"}
                                buttonColor={"white"}
                                listed
                                onClickFunction={() => {
                                    setStatusFilter('confirmed');
                                    setIsOpen(false);
                                }}
                            >
                                <div className="flex">
                                    <p>Aceptadas</p>
                                    {statusFilter === 'confirmed' && <i className="bi bi-check-circle-fill text-rose ms-2"></i>}
                                </div>
                            </Button>
                            <Button
                                type={"text"}
                                wFit={"container"}
                                icon={"sort-numeric-down"}
                                buttonColor={"white"}
                                listed
                                onClickFunction={() => {
                                    setStatusFilter('declined');
                                    setIsOpen(false);
                                }}
                            >
                                <div className="flex">
                                    <p>Rechazadas</p>
                                    {statusFilter === 'declined' && <i className="bi bi-check-circle-fill text-rose ms-2"></i>}
                                </div>
                            </Button>
                            <Button
                                type={"text"}
                                wFit={"container"}
                                icon={"sort-numeric-down"}
                                buttonColor={"white"}
                                listed
                                onClickFunction={() => {
                                    setStatusFilter('pending');
                                    setIsOpen(false);
                                }}
                            >
                                <div className="flex">
                                    <p>Pendientes</p>
                                    {statusFilter === 'pending' && <i className="bi bi-check-circle-fill text-rose ms-2"></i>}
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
