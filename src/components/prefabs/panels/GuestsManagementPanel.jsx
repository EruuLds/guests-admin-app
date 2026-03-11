import Toolbar from "../../Toolbar"
import GuestsList from "../../GuestsList"

export default function GuestsManagementPanel() {
    return (
        <div className="h-full flex flex-col">
            <h3 className="pt-6 pb-2 text-center">Lista de Invitaciones</h3>
            <div className="mb-4 md:mb-0 border-b border-zinc-100 md:border-none sticky top-0 z-[100]">
                <Toolbar />
            </div>
            <div className="flex-1 md:overflow-y-auto custom-scrollbar rounded-2xl">
                <GuestsList />
            </div>
        </div>
    )
}
