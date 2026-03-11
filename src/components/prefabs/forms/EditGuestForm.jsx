import Button from '../../ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import { useHandleModals } from '../../../hooks/useHandleModals';
import { useHandleDirtyForms } from '../../../hooks/useHandleDirtyForms';
import { useDialog } from '../../../hooks/useDialog';
import { useGuests } from '../../../hooks/database/useGuests';
import { useDataContext } from '../../../hooks/contexts/useDataContext';

export default function EditGuestForm({ formId }) {
    const handleModals = useHandleModals();
    const handleDirtyForms = useHandleDirtyForms();
    const { updateGuest } = useGuests();
    const { openDialog } = useDialog();

    const { guests, selectedCard } = useDataContext();
    const guestId = useRef(selectedCard)
    const defaultData = guests.find(guest => guest.id === guestId.current);

    const { register, handleSubmit, watch, setValue, formState: { errors, isDirty, dirtyFields } } = useForm({ defaultValues: { ...defaultData } });

    const passesValue = watch("passes");
    const tableValue = watch("table");

    useEffect(() => {
        isDirty
            ? handleDirtyForms('add', formId)
            : handleDirtyForms('delete', formId)

        return () => {
            handleDirtyForms('delete', formId)
        };
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
        const guest = guests.find(g => g.id === guestId.current);
        if (!guest) return;

        const payload = {};

        Object.keys(dirtyFields).forEach(field => {
            payload[field] = data[field];
        });

        if ('passes' in payload) {
            payload.confirmedPasses =
                data.passes < guest.confirmedPasses
                    ? data.passes
                    : guest.confirmedPasses;
        }

        try {
            await updateGuest(guestId.current, payload);
            openDialog('success', `Guardaste los cambios para ${data.name} ${data.lastName}`);
        } catch(err) {
            openDialog('error', 'Se produjo un error al guardar los cambios. Inténtalo nuevamente.');
            throw err;
        } finally {
            handleModals('close', 'editGuest');
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
