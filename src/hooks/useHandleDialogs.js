import { useContext} from "react";
import { ModalContext } from "../contexts/ModalContext";

export function useHandleDialogs() {
  const { setOpenDialogs, setVisibleDialogs } = useContext(ModalContext);

  const handleDialogs = (action, modalID, afterClose) => {
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
      }, 500);
    }
  };

  return handleDialogs;
}