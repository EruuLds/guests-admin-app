import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { DataContext } from "../../../contexts/DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function IdRequestForm() {
    const { guests, loading, eventId, setEventId, urlProvidedId } = useContext(DataContext);
    const formId = 'idRequestForm';
    const { register, handleSubmit, formState: { errors } } = useForm({defaultValues: { id: urlProvidedId }});

    const onSubmit = (data) => {
        setEventId(data.id);
    }

    return (
        <form id={formId} method="post" onSubmit={handleSubmit(onSubmit)}>
            {errors.id?.type === 'required' && <span className='flex text-xs text-red mb-2 items-center'>*Debes ingresar un ID válido</span>}
            <input className="text-center mb-4" type="text" placeholder="Ejemplo: EV-XXXX-XXXX" {...register('id', { required: true })} />
            {(eventId && !loading && !guests) && <span className='flex text-sm mb-2 items-center'>No se encontró el evento</span>}

            <Button variant={'primary'} targetForm={formId}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} className="me-2" />
                Comenzar
            </Button>
        </form>
    )
}
