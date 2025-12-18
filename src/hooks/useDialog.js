import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";

export function useDialog() {
  const { setOpenDialogs } = useContext(ModalContext);

  const openDialog = (type, message, onClickTarget) => {
    const id = crypto.randomUUID();

    setOpenDialogs(prev => [...prev, {id, type, message, onClickTarget}]);
  };

  const closeDialog = (id) => {
    setOpenDialogs(prev => prev.filter(d => d.id !== id));
  }

  return ({openDialog, closeDialog});
}