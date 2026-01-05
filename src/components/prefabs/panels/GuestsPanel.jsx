import Toolbar from "../../Toolbar"
import GuestsList from "../../GuestsList"

export default function GuestsPanel() {
    return (
        <div className="h-full flex flex-col">
            <h3 className="py-6 border-b border-zinc-100 text-center">Lista de Invitaciones</h3>
            <div className="mb-4 md:mb-0 border-b border-zinc-100 md:border-none sticky top-0 z-[100]">
                <Toolbar />
            </div>
            <div className="flex-1 md:overflow-y-scroll rounded-2xl">
                <GuestsList id="guestList" />
            </div>
        </div>
    )
}
