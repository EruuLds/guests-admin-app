import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import { DataContext } from '../../../contexts/DataContext';
import { useContext, useEffect, useRef } from 'react';
import { useHandleModals } from '../../../hooks/useHandleModals';
import { useHandleDirtyForms } from '../../../hooks/useHandleDirtyForms';

export default function GuestForm({formType, formId}) {
  const { guests, selectedCard, addGuest, updateGuest } = useContext(DataContext);
  const guestToEdit = useRef(selectedCard)
  const defaultData = formType === 'add' 
    ? { name: "", lastName:"", passes: 1, table: 1 } 
    : guests.find(guest => guest.id === guestToEdit.current);

  const handleModals = useHandleModals();
  const handleDirtyForms = useHandleDirtyForms();
  
  const { register, handleSubmit, watch, setValue, formState: { errors, isDirty } } = useForm({defaultValues: {...defaultData}});
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
  
  const submitData = (data) => {
    if (formType === 'add') {
      addGuest(data, () => {handleModals('close', 'addGuest');});
    } else if (formType === 'edit') {
      updateGuest(guestToEdit.current, data, () => {handleModals('close', 'editGuest');});
    }
  };

  return (
    <form id={formId} method='post' onSubmit={handleSubmit(submitData)}>
      <section>
        <div className='grid grid-cols-6 gap-4'>
         
         <div className='col-span-6 sm:col-span-3 lg:col-span-2' >
            <div className='flex'>
              <label htmlFor="name">Nombre(s)</label>
              {errors.name?.type === 'required' && <span className='flex text-xs text-red ms-4 mb-2 items-center'>*Este campo es requerido</span>}
            </div>
            <input 
              id='name'
              type='text' 
              placeholder='Ej. Juan Carlos' 
              {...register('name',{required: true})} 
            />
          </div>

          <div className='col-span-6 sm:col-span-3 lg:col-span-2' >
            <div className='flex'>
              <label htmlFor="lastName">Apellido(s)</label>
              {errors.lastName?.type === 'required' && <span className='flex text-xs text-red ms-4 mb-2 items-center'>*Este campo es requerido</span>}
            </div>
            <input
              id='lastName'
              type="text" 
              placeholder='Ej. Ramírez Torres' 
              {...register('lastName', {required: true})} 
            />
          </div>

          <div className='col-span-3 lg:col-span-1' >
            <label className='text-center' htmlFor="passes">Pases</label>
            <div className='flex gap-2 items-center justify-center'>
              <Button type={'icon'} size={'small'} icon={'dash'} buttonColor={'gray'} roundness={'full'} onClickFunction={decrementPasses} />
              <input id='passes' className='grow w-full' type="number" value={passesValue} readOnly {...register("passes", {valueAsNumber: true})}/>
              <Button type={'icon'} size={'small'} icon={'plus'} buttonColor={'gray'} roundness={'full'} onClickFunction={incrementPasses} />
            </div>
          </div>

          <div className='col-span-3 lg:col-span-1 gap-2'>
            <label className='text-center' htmlFor="table">Mesa</label>
            <div className='flex gap-2 items-center justify-center'>
              <Button type={'icon'} size={'small'} icon={'dash'} buttonColor={'gray'} roundness={'full'} onClickFunction={decrementTable} />
              <input id='table' className='grow w-full' type="number" value={tableValue} readOnly {...register("table", {valueAsNumber: true})}/>
              <Button type={'icon'} size={'small'} icon={'plus'} buttonColor={'gray'} roundness={'full'} onClickFunction={incrementTable} />
            </div>
          </div>
        </div>
      </section>
    </form>
  )
}
