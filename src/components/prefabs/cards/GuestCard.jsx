import { useContext } from 'react'
import { DataContext } from '../../../contexts/DataContext';
import Button from '../../ui/Button';
import Dropdown from "../../ui/Dropdown"
import { useHandleModals } from '../../../hooks/useHandleModals';
import { shareInvitationViaWhatsApp } from '../../../utils/shareInvitationViaWhatsapp';
import { shareInvitation } from '../../../utils/shareInvitation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faPenToSquare, faShare, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export default function GuestCard({id, guestName, guestLastName, passes, table, status, confirmedPasses}) {
    const { selectedCard, setSelectedCard, customInvitationURL} = useContext(DataContext);
    const handleModals = useHandleModals();
    const guestURL = customInvitationURL + '?id=' + id;
    const isOpen = selectedCard === id;
    const share = shareInvitation(id, guestName);
    const shareWA = shareInvitationViaWhatsApp(id, guestName);

    return (
        <div id={id} className='relative bg-zinc-100 rounded-2xl overflow-hidden mb-2'>
            <div className='p-2 text-start'>
                <div className='grid grid-cols-5 gap-2'>
                    <div className='col-span-5 sm:col-span-3 bg-zinc-200 py-1 px-2 rounded-lg relative overflow-hidden'>
                        <p className='uppercase text-xs font-medium leading-4 text-zinc-500 select-none'>Invitado</p>
                        <p className='text-lg leading-5 truncate'>{guestName + ' ' + guestLastName}</p>
                        { status !== "pending" && 
                            <div className={`absolute flex justify-center items-center w-30 h-4 top-0 right-0 rounded-bl-lg ${status === 'confirmed' ? 'bg-green-300' : 'bg-gray-300'}`}>
                                <p className='text-xs uppercase mx-1 text-center select-none'>{status === 'confirmed' ? 'Asistirá' : 'No Asistirá'}</p>
                            </div>
                        }
                    </div>
                    <div className='col-span-5 sm:col-span-2 grid grid-cols-5 gap-2'>
                        <div className='bg-zinc-200 py-1 px-2 rounded-lg col-span-2'>
                            <p className='uppercase text-xs font-medium leading-4 text-zinc-500 select-none'>{status === 'confirmed' ? 'Asisten' : 'Pases'}</p>
                            <p className='text-lg leading-5'>{status === 'confirmed' ? (confirmedPasses + '/' + passes) : passes}</p>
                        </div>
                        <div className='bg-zinc-200 py-1 px-2 rounded-lg col-span-2'>
                            <p className='uppercase text-xs font-medium leading-4 text-zinc-500 select-none'>Mesa</p>
                            <p className='text-lg leading-5'>{table == undefined ? '-' : table}</p>
                        </div>
                        <div className='col-span-1 flex justify-center items-middle'>
                            <Button variant={'secondary'} size={'sm'} grow onClick={isOpen ? () => setSelectedCard(null) : () => setSelectedCard(id)}>
                                <div className={`transition-all duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                                    <FontAwesomeIcon icon={faChevronDown} size='lg' />
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
                
                <Dropdown isOpen={isOpen}>
                    <div className={`grid grid-cols-5 gap-2 pt-2`}>
                        <div className="flex items-center col-span-5 lg:col-span-3 gap-2">
                            <div className='flex flex-1 items-center bg-white h-full rounded-lg overflow-hidden text-sm'>
                                <span className="flex items-center h-full bg-zinc-200 px-2 py-1 uppercase text-zinc-500">
                                    <p>Link</p>
                                </span>
                                <a className="truncate px-2 py-1 text-sm" href={guestURL} target="_blank">{guestURL}</a>
                            </div>

                            <Button variant={'white'} size={'sm'} shape={'square'} onClick={share}>
                                <FontAwesomeIcon icon={faShare} />
                            </Button>
                            <Button variant={'whatsapp'} size={'sm'} shape={'square'} onClick={shareWA}>
                                <FontAwesomeIcon icon={faWhatsapp} />
                            </Button>
                        </div>
                        <div className='grid grid-cols-2 gap-2 col-span-5 lg:col-span-2'>
                            <Button variant={'white'} size={'sm'} grow onClick={() => handleModals('open', 'editGuest')} >
                                <FontAwesomeIcon icon={faPenToSquare} className='me-2' />
                                Editar
                            </Button>
                            <Button variant={'whiteDanger'} size={'sm'} grow  onClick={() => handleModals('open', 'confirmDeleteGuest')} >
                                <FontAwesomeIcon icon={faUserXmark} className='me-2' />
                                Eliminar
                            </Button>
                        </div>
                    </div>
                </Dropdown>
            </div>

            {status === 'declined' &&
                <div className='absolute inset-0 bg-stripes opacity-50'></div>
            }
        </div>
    )
}
