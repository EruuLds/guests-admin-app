import Button from "../../ui/Button";
import SelectList from "../../modal/SelectList";
import { useHandleDropdowns } from "../../../hooks/useHandleDropdowns";
import { useContext } from "react";
import { DataContext } from "../../../contexts/DataContext";

export default function SortDropdown() {
    const handleDropdowns = useHandleDropdowns();
    const { sortBy, setSortBy} = useContext(DataContext);

    return (
        <div className="relative">
            <Button
                type={"icon"}
                icon={"sort-down"}
                hFit={'container'}
                buttonColor={"secondary"}
                roundness={"large"}
                onClickFunction={() => handleDropdowns("sortBy")}
            />
            <SelectList selectID={"sortBy"}>
                <div className="mb-2">
                    <p className="text-center">Ordenar por:</p>
                </div>
                <div className="overflow-hidden rounded-lg">
                    <Button
                        type={"text"}
                        wFit={"container"}
                        buttonColor={"secondary"}
                        listed
                        onClickFunction={() => {
                            setSortBy("name-asc");
                            handleDropdowns('sortBy');
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
                        buttonColor={"secondary"}
                        listed
                        onClickFunction={() => {
                            setSortBy("name-desc");
                            handleDropdowns('sortBy');
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
                        buttonColor={"secondary"}
                        listed
                        onClickFunction={() => {
                            setSortBy("table-asc");
                            handleDropdowns('sortBy');
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
                        buttonColor={"secondary"}
                        listed
                        onClickFunction={() => {
                            setSortBy("table-desc");
                            handleDropdowns('sortBy');
                        }}
                    >
                        <div className="flex">
                            <p>Mesa (descendente)</p>
                            {sortBy === 'table-desc' && <i className="bi bi-check-circle-fill text-rose ms-2"></i>}
                        </div>
                    </Button>
                </div>
            </SelectList>
            <span className={`absolute size-3 bg-rose-400 rounded-full end-0 top-0 transition-scale duration-150 ease-(--standard-ease) ${sortBy !== 'name-asc' ? 'scale-100' : 'scale-0'}`}></span>
        </div>
    );
}
