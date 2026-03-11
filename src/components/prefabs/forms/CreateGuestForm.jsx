import Button from '../../ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useDataContext } from '../../../hooks/contexts/useDataContext';
import { useForm } from 'react-hook-form';
import { useHandleModals } from '../../../hooks/useHandleModals';
import { useHandleDirtyForms } from '../../../hooks/useHandleDirtyForms';
import { useDialog } from '../../../hooks/useDialog';
import { useGuests } from '../../../hooks/database/useGuests';
import { generateUniqueId } from '../../../utils/generateUniqueID';

export default function CreateGuestForm({ formId }) {
    const handleModals = useHandleModals();
    const handleDirtyForms = useHandleDirtyForms();
    const { openDialog } = useDialog();
    const { createGuest } = useGuests();
    
    const { register, handleSubmit, watch, setValue, formState: { errors, isDirty } } = useForm({ defaultValues: { passes: 1, table: 1 } });
    
    const { guests } = useDataContext();
    const passesValue = watch("passes");
    const tableValue = watch("table");

    useEffect(() => {
        isDirty
            ? handleDirtyForms('add', formId)
            : handleDirtyForms('delete', formId)

        return () => handleDirtyForms('delete', formId)
    }, [isDirty]);

    const incrementPasses = () => {
        setValue("passes", passesValue + 1, { shouldDirty: true });
    };
    const decrementPasses = () => {
        setValue("passes", Math.max(1, passesValue - 1), { shouldDirty: true });
    };
    const incrementTable = () => {
        setValue("table", tableValue + 1, { shouldDirty: true });
    };
    const decrementTable = () => {
        setValue("table", Math.max(1, tableValue - 1), { shouldDirty: true });
    };

    const submitData = async (data) => {
        const payload = {
            ...data,
            status: "pending",
            confirmedPasses: 0
        }

        try {
            const uniqueID = await generateUniqueId({maxRetries: 10, compareWith: guests});
            await createGuest(uniqueID, payload);
            openDialog('success', `Añadiste a ${data.name} ${data.lastName} a la lista`);
        } catch(err) {
            openDialog('error', 'Se produjo un error al añadir al invitado a la lista. Inténtalo nuevamente.');
            throw err
        } finally {
            handleModals('close', 'createGuest');
        }
    };

    return (
        <form id={formId} method='post' onSubmit={handleSubmit(submitData)}>
            <section>
                <div className='grid grid-cols-6 gap-3'>
                    <div className='col-span-6 sm:col-span-3 lg:col-span-2' >
                        <div className='flex'>
                            <label htmlFor="name">Nombre(s)</label>
                            {errors.name?.type === 'required' && <span className='flex text-xs text-red ms-4 mb-2 items-center'>*{errors.name?.message}</span>}
                        </div>
                        <input
                            id='name'
                            type='text'
                            placeholder='Ej. Juan Carlos'
                            {...register('name', {
                                required: 'Este campo es requerido',
                                setValueAs: value => value.trim(),
                                validate: value => value.length > 0 || 'No puede contener solo espacios'
                            })}
                        />
                    </div>

                    <div className='col-span-6 sm:col-span-3 lg:col-span-2' >
                        <div className='flex'>
                            <label htmlFor="lastName">Apellido(s)</label>
                            {errors.lastName?.type === 'required' && <span className='flex text-xs text-red ms-4 mb-2 items-center'>*{errors.lastName?.message}</span>}
                        </div>
                        <input
                            id='lastName'
                            type="text"
                            placeholder='Ej. Ramírez Torres'
                            {...register('lastName', {
                                required: 'Este campo es requerido',
                                setValueAs: value => value.trim(),
                                validate: value => value.length > 0 || 'No puede contener solo espacios'
                            })}
                        />
                    </div>

                    <div className='col-span-3 lg:col-span-1' >
                        <label className='text-center' htmlFor="passes">Pases</label>
                        <div className='flex gap-2 items-center justify-center'>
                            <Button variant={'primary'} size={'sm'} shape={'circle'} disabled={passesValue <= 1} onClick={decrementPasses}>
                                <FontAwesomeIcon icon={faMinus} />
                            </Button>
                            <input id='passes' className='grow w-full' type="number" value={passesValue} readOnly {...register("passes", { valueAsNumber: true })} />
                            <Button variant={'primary'} size={'sm'} shape={'circle'} onClick={incrementPasses}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        </div>
                    </div>

                    <div className='col-span-3 lg:col-span-1 gap-2'>
                        <label className='text-center' htmlFor="table">Mesa</label>
                        <div className='flex gap-2 items-center justify-center'>
                            <Button variant={'primary'} size={'sm'} shape={'circle'} disabled={tableValue <= 1} onClick={decrementTable}>
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </Button>
                            <input id='table' className='grow w-full' type="number" value={tableValue} readOnly {...register("table", { valueAsNumber: true })} />
                            <Button variant={'primary'} size={'sm'} shape={'circle'} onClick={incrementTable}>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </form>
    )
}