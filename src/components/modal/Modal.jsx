import Button from "../Button";
import ReactDOM from 'react-dom'
import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { DataContext } from "../../contexts/dataContext";
import { useHandleModals } from "../../hooks/useHandleModals";

export default function Modal({ id, card, title, children, onClose}) {
  const { visibleModals } = useContext(ModalContext);
  const { loading } = useContext(DataContext);
  const show = visibleModals.some((modal) => modal === id);
  const handleModals = useHandleModals();

  return ReactDOM.createPortal(
    <div
      id="overlay"
      className={`
        z-[900] 
        fixed 
        inset-0 
        w-full 
        h-full 
        bg-black/20 
        transition-all 
        duration-500 
        ${show ? "opacity-100" : "opacity-0"}`}
      onClick={!loading && onClose ? onClose : () => handleModals("close", id)}
    >
      <div className="relative flex justify-center w-full h-full">
        <div
          id="box"
          className={`
            absolute 
            bg-white
            shadow-xl 
            transition-all 
            standard-ease
            duration-500 
            overflow-hidden
            ${
              card
                ? `inset-x-0 rounded-tl-4xl rounded-tr-4xl ${
                    show ? "bottom-0" : "-bottom-full"
                  }`
                : `rounded-4xl h-fit -translate-y-1/2 top-1/2 mx-[1rem] max-w-full sm:min-w-[30rem] ${
                    show ? "scale-none" : "scale-[0.9]"
                  }`
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <div className="w-full flex justify-between items-center p-8">
              {card ? (
                <h3 className="uppercase">{title}</h3>
              ) : (
                <h4 className="uppercase">{title}</h4>
              )}
              <div className="aspect-square">
                <Button
                  type={"icon"}
                  size={"small"}
                  icon={"x-lg"}
                  wFit={"full"}
                  hFit={"full"}
                  buttonColor={"gray"}
                  roundness={"full"}
                  onClickFunction={!loading && onClose ? onClose : () => handleModals("close", id)}
                ></Button>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>, document.getElementById('modals')
  )
}
