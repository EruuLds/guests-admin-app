import './App.css'
import PageHeader from './components/PageHeader'
import Button from './components/Button'
import SectionContainer from './components/SectionContainer'
import GuestCard from './components/guestCard/GuestCard'
import GuestCardSkeleton from './components/guestCard/GuestCardSkeleton'
import { useContext, useEffect} from 'react'
import { DataContext } from './contexts/DataContext'
import { ModalContext } from './contexts/ModalContext'
import { useHandleModals } from './hooks/useHandleModals'

import ModalManager from './components/modal/ModalManager';


function App() {
  const { selectedCard } = useContext(DataContext);
  const { openModals } = useContext(ModalContext);
  const handleModals = useHandleModals();
  const { guests, initialLoading, error } = useContext(DataContext);

  useEffect(() => {
    console.log(error)
  }, [])

  return (
    <>
      <div className={`${(initialLoading || openModals.length > 0) ? "h-screen overflow-hidden" : "h-auto"} flex flex-col`} >
        <PageHeader pageTitle="Lista de Invitados"/>
        <SectionContainer id='guestsList'>
          <div className='flex justify-between gap-4 py-8 sticky top-0 z-[100] bg-linear-to-b from-white from-50% via-white via-75% to-white/0 to-100%'>
            <div className='flex gap-4'>
              <Button type={'icon'} icon={'funnel'} buttonColor={'gray'} roundness={'large'} />
              <Button type={'icon'} icon={'sort-down'} buttonColor={'gray'} roundness={'large'} />
            </div>
            <Button type={'combined'} icon={'plus-circle'} buttonColor={'red'} roundness={'large'} onClickFunction={() => handleModals('open', 'addGuest')}>Añadir Invitado</Button>
          </div>
          {error && <h1>Error: {error}</h1>}
          {initialLoading && 
            Array.from({ length: 10 }).map((_, i) => (
              <GuestCardSkeleton key={i} />
            ))
          }
          {!initialLoading && guests.length === 0 &&
            <div className='flex flex-1 justify-center items-center flex-col text-center'>
              <h2 className='text-2xl mb-4 text-light-gray'>No hay invitados en tu lista</h2>
              <p className='mb-8 text-light-gray'>Empieza con "<span className='uppercase'><i className='bi bi-plus-circle'></i> Añadir Invitado</span>" para gestionar su asistencia.</p>
            </div>
          }
          {guests.map((guest) => (
            <GuestCard 
              key={guest.id} 
              id={guest.id} 
              guestName={guest.name} 
              guestLastName={guest.lastName} 
              passes={guest.passes} 
              table={guest.table} 
              confirmation={guest.confirmation}
              confirmedPasses={guest.confirmedPasses}
              attendanceReg={guest.attendanceReg}
              selectedCard={selectedCard} />
            ))}
        </SectionContainer>

        <ModalManager></ModalManager>
      </div>
    </>
  )
}

export default App

/*
Web apps:

Enviar Correo: https://script.google.com/macros/s/AKfycbw-73GwWTH6huyxJsAldaTjqz0JHa8R0HLp7mH1hpjSfFH9Jr2erXvV8-55v7yqZum0/exec
*/