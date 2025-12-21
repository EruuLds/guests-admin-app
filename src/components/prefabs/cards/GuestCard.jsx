import { useContext } from 'react'
import { DataContext } from '../../../contexts/DataContext';
import Button from '../../ui/Button';
import { useShare } from '../../../hooks/useShare';
import { useHandleModals } from '../../../hooks/useHandleModals';

export default function GuestCard({id, guestName, guestLastName, passes, table, confirmation, confirmedPasses, attendanceReg}) {
    const { selectedCard, setSelectedCard, customInvitationURL} = useContext(DataContext);
    const handleModals = useHandleModals();
    //const guestURL = customInvitationURL + '?data=' + btoa(id);
    const guestURL = customInvitationURL + '?data=' + btoa(`${id},${guestName + ' ' + guestLastName},${passes}`);
    const isOpen = selectedCard === id;

    const share = useShare(id);

    function whatsappShare() {
        window.open(
            `https://wa.me/?text=${encodeURIComponent(guestURL)}`,
            "_blank"
        );
    }

    return (
        <div id={id} className='relative bg-zinc-100 rounded-2xl overflow-hidden mb-2'>
            <div className='p-4 text-start'>
                <div className='grid grid-cols-5 gap-4'>
                    <div className='col-span-5 lg:col-span-3 bg-zinc-200 p-2 rounded-lg relative overflow-hidden'>
                        <p className='uppercase text-sm text-zinc-500 select-none'>Invitado</p>
                        <p className='text-xl truncate'>{guestName + ' ' + guestLastName}</p>
                        { confirmation !== undefined && 
                            <div className={`absolute flex justify-center items-center w-30 h-4 top-0 right-0 rounded-bl-lg ${confirmation ? 'bg-green-300' : 'bg-gray-300'}`}>
                                <p className='text-xs uppercase mx-1 text-center select-none'>{confirmation ? 'Asistirá' : 'No Asistirá'}</p>
                            </div>
                        }
                    </div>
                    <div className='col-span-5 lg:col-span-2 grid grid-cols-5 gap-4'>
                        <div className='bg-zinc-200 p-2 rounded-lg col-span-2'>
                            <p className='uppercase text-sm text-zinc-500 select-none'>{confirmation ? 'Asisten' : 'Pases'}</p>
                            <p className='text-xl'>{confirmation ? (confirmedPasses + '/' + passes) : passes}</p>
                        </div>
                        <div className='bg-zinc-200 p-2 rounded-lg col-span-2'>
                            <p className='uppercase text-sm text-zinc-500 select-none'>Mesa</p>
                            <p className='text-xl'>{table == undefined ? '-' : table}</p>
                        </div>
                        <div className='col-span-1 flex justify-center items-middle'>
                            <Button type={'text'} wFit={'container'} icon={'gear'} buttonColor={'secondary'} roundness={'small'} onClickFunction={selectedCard === id ? () => setSelectedCard(null) : () => setSelectedCard(id)}>
                                <div className={`transition-all duration-300 ${selectedCard === id ? 'rotate-180' : 'rotate-0'}`}>
                                    <img className='min-w-[1.8rem]' src="/icons/gear.svg" alt="Gear Icon"/>
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
                
                <div className={`transition-all standard-ease duration-500 overflow-hidden ${isOpen ? "max-h-50" : "max-h-0"}`}>
                    <div className={`transition-opacity standard-ease duration-500 ${isOpen ? "opacity-100" : "opacity-0"} grid grid-cols-5 gap-4 mt-4`}>
                        <div className="flex grow items-center bg-white rounded-lg text-sm col-span-5 lg:col-span-3 overflow-hidden">
                            <div className="flex-none flex items-center h-full bg-zinc-200 px-2 py-1 uppercase text-zinc-500">
                                <p>Link</p>
                            </div>
                            <a className="truncate grow px-2 py-1" href={guestURL} target="_blank">{guestURL}</a>
                            <Button type={'icon'} size={'small'} icon={'share'} hFit={'container'} buttonColor={'dark-gray'} onClickFunction={share}/>
                            <Button type={'icon'} size={'small'} icon={'whatsapp'} hFit={'container'} buttonColor={'whatsapp'} onClickFunction={whatsappShare}/>
                        </div>
                        <div className='grid grid-cols-2 gap-4 col-span-5 lg:col-span-2'>
                            <Button type={'combined'} size={'small'} icon={'pencil'} buttonColor={'white'} roundness={'small'} onClickFunction={() => handleModals('open', 'editGuest')} >Editar</Button>
                            <Button type={'combined'} size={'small'} icon={'trash3'} buttonColor={'white-danger'} textColor={'red'} roundness={'small'} onClickFunction={() => handleModals('open', 'confirmDeleteGuest')} >Eliminar</Button>
                        </div>
                    </div>
                </div>
            </div>

            {(confirmation !== undefined && !confirmation) &&
                <div className='absolute inset-0 bg-stripes opacity-50'></div>
            }
        </div>
    )
}
