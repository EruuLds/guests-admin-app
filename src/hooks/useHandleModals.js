import { useContext} from "react";
import { ModalContext } from "../contexts/ModalContext";

export function useHandleModals() {
  const { setOpenModals, setVisibleModals } = useContext(ModalContext);

  const handleModals = (action, modalID, afterClose, time) => {
    if (action === 'open') {
      setOpenModals(prev => [...prev, modalID]);
      setTimeout(() => {
        setVisibleModals(prev => [...prev, modalID]);
      }, 10);
    } else if (action === 'close') {
      setVisibleModals(prev => prev.filter(item => item !== modalID));
      setTimeout(() => {
        setOpenModals(prev => prev.filter(item => item !== modalID));
        afterClose && afterClose();
      }, time ? time : 500);
    }
  };

  return handleModals;
}