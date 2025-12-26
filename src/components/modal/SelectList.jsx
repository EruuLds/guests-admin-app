import { ModalContext } from "../../contexts/ModalContext";
import { useContext } from "react";

export default function SelectList({selectID, children}) {
  const { openDropdowns } = useContext(ModalContext);

  return (
    <div 
      className={`absolute bg-zinc-50 rounded-2xl shadow-lg translate-y-full bottom-0 overflow-hidden transition-all duration-500 
      ${openDropdowns === selectID ? 'max-h-60 opacity-100' : 'max-h-[0] opacity-0'}`}>
      <div className="p-2">
        {children}
      </div>
    </div>
  )
}