import Button from "../../ui/Button";
import SelectList from "../../modal/SelectList";
import { useHandleDropdowns } from "../../../hooks/useHandleDropdowns";
import { useContext } from "react";
import { DataContext } from "../../../contexts/DataContext";


export default function FilterDropdown() {
    const handleDropdowns = useHandleDropdowns();
    const { setStatusFilter, statusFilter} = useContext(DataContext);
    return (
        <div className="relative">
            <Button
                type={"icon"}
                icon={"funnel"}
                buttonColor={"secondary"}
                roundness={"large"}
                onClickFunction={() => handleDropdowns("filterBy")}
            />
            <SelectList selectID={"filterBy"}>
                <div className="mb-2">
                    <p className="text-center">Mostrar:</p>
                </div>
                <Button
                    type={"text"}
                    wFit={"container"}
                    roundness={"small"}
                    icon={"sort-alpha-down"}
                    buttonColor={"secondary"}
                    listed
                    onClickFunction={() => {
                        setStatusFilter('all');
                        handleDropdowns('filterBy');
                    }}
                >
                    <div className="flex">
                        <p>Todas</p>
                        {statusFilter === 'all' && <i className="bi bi-check-circle-fill text-green ms-2"></i>}
                    </div>
                </Button>
                <Button
                    type={"text"}
                    wFit={"container"}
                    roundness={"small"}
                    icon={"sort-alpha-up"}
                    buttonColor={"secondary"}
                    listed
                    onClickFunction={() => {
                        setStatusFilter('confirmed');
                        handleDropdowns('filterBy');
                    }}
                >
                    <div className="flex">
                        <p>Aceptadas</p>
                        {statusFilter === 'confirmed' && <i className="bi bi-check-circle-fill text-green ms-2"></i>}
                    </div>
                </Button>
                <Button
                    type={"text"}
                    wFit={"container"}
                    roundness={"small"}
                    icon={"sort-numeric-down"}
                    buttonColor={"secondary"}
                    listed
                    onClickFunction={() => {
                        setStatusFilter('declined');
                        handleDropdowns('filterBy');
                    }}
                >
                    <div className="flex">
                        <p>Rechazadas</p>
                        {statusFilter === 'declined' && <i className="bi bi-check-circle-fill text-green ms-2"></i>}
                    </div>
                </Button>
                <Button
                    type={"text"}
                    wFit={"container"}
                    roundness={"small"}
                    icon={"sort-numeric-down"}
                    buttonColor={"secondary"}
                    listed
                    onClickFunction={() => {
                        setStatusFilter('unconfirmed');
                        handleDropdowns('filterBy');
                    }}
                >
                    <div className="flex">
                        <p>Pendientes</p>
                        {statusFilter === 'unconfirmed' && <i className="bi bi-check-circle-fill text-green ms-2"></i>}
                    </div>
                </Button>
            </SelectList>
            <span className={`absolute size-3 bg-rose-400 rounded-full end-0 top-0 transition-scale duration-150 ease-(--standard-ease) ${statusFilter !== 'all' ? 'scale-100' : 'scale-0'}`}></span>
        </div>
    );
}
