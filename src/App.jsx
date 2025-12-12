import './App.css'
import PageHeader from './components/PageHeader'
import Button from './components/Button'
import SectionContainer from './components/SectionContainer'
import { useContext } from 'react'
import { DataContext } from './contexts/DataContext'
import { ModalContext } from './contexts/ModalContext'
import { useHandleModals } from './hooks/useHandleModals'

import ModalManager from './components/modal/ModalManager';
import GuestsList from './components/GuestsList'


function App() {
  const { openModals } = useContext(ModalContext);
  const { initialLoading } = useContext(DataContext);
  const handleModals = useHandleModals();

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
          <GuestsList />
        </SectionContainer>
        <ModalManager></ModalManager>
      </div>
    </>
  )
}

export default App