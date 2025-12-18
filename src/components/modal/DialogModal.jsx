import ReactDOM from "react-dom";
import Button from "../ui/Button";
import { useEffect, useState } from "react";
import { useDialog } from "../../hooks/useDialog";

export default function DialogModal({ id, type, message, onClickTarget}) {
  const [visible, setVisible] = useState(false);
  const { closeDialog } = useDialog();
  const targetElement = document.getElementById(onClickTarget)

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 10);
    const hideTimer = setTimeout(() => setVisible(false), 5000);
    const removeTimer = setTimeout(() => closeDialog(id), 5500);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [])

  const handleClick = () => {
    if (!onClickTarget) return;
    const el = document.getElementById(onClickTarget);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => closeDialog(id), 500);
  };

  const icon = {
    success: 'text-green bi bi-check-lg',
    error: 'text-red bi bi-exclamation-triangle',
    info: 'text-blue bi bi-info-circle'
  }

  return ReactDOM.createPortal(
    <div className="fixed pointer-events-none inset-0 flex top-0 z-[1000]">
      <div
        className={`select-none pointer-events-auto flex items-center absolute -translate-x-1/2 left-1/2 text-center p-4 bg-zinc-50 rounded-2xl shadow-xl transition-all duration-500
          ${visible ? "top-8 opacity-100" : "-top-20 opacity-0"}`}
        onClick={handleClick}
      >
        {type && <i className={`text-2xl pe-4 ${icon[type]}`}></i>}
        <p className="grow">{message}</p>
        <div className="aspect-square ms-4" onClick={(e) => e.stopPropagation()}>
          <Button
            type={"icon"}
            size={"small"}
            icon={"x-lg"}
            buttonColor={"secondary"}
            roundness={"full"}
            onClickFunction={handleClose}
          ></Button>
        </div>
      </div>
    </div>,
    document.getElementById("dialogs")
  );
}
