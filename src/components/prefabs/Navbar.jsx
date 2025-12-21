export default function Navbar() {
    return (
        <div className="bg-white border-b border-zinc-100">
            <nav className="py-4 responsive-container flex justify-between">
                <div className="w-full flex justify-between items-center">
                    <a className="me-8" href="#">
                        <img className="h-8 min-w-25" src="/img/invitex-logo.svg" alt="Invitex Logo" />
                    </a>
                    <div>
                        <p>Lista de Invitaciones</p>
                    </div>
                </div>
            </nav>
        </div>
  )
}
