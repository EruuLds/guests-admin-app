import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../ui/Button";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useHandleModals } from "../../hooks/useHandleModals";

export default function Navbar() {
    const handleModals = useHandleModals();
    
    return (
        <div className="bg-white border-b border-zinc-100">
            <nav className="py-4 responsive-container flex justify-between">
                <div className="w-full flex justify-between items-center">
                    <a className="me-8" href="#">
                        <img className="h-8 min-w-25" src="/img/invitex-logo.svg" alt="Invitex Logo" />
                    </a>
                    <Button variant={'primary'} size={'sm'} onClick={() => handleModals('open', 'confirmLogout')} >
                        <FontAwesomeIcon icon={faArrowRightFromBracket} className="me-1"/>
                        Cerrar sesión
                    </Button>
                </div>
            </nav>
        </div>
    )
}
