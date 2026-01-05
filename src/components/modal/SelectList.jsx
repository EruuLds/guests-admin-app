import { ModalContext } from "../../contexts/ModalContext";
import { useContext } from "react";

export default function SelectList({selectID, children}) {
  const { openDropdowns } = useContext(ModalContext);

  return (
    <div 
      className={`absolute bg-zinc-100 rounded-2xl shadow-lg translate-y-full bottom-0 overflow-hidden standard-ease transition-all duration-300 
      ${openDropdowns === selectID ? 'max-h-70 opacity-100' : 'max-h-[0] opacity-0'}`}>
      <div className="p-2">
        {children}
      </div>
    </div>
  )
}