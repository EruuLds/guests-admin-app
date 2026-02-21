import ReactDOM from "react-dom";
import Button from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDialog } from "../../hooks/useDialog";
import { faCircleCheck, faCircleInfo, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

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
    const el = document.getElementById(targetElement);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => closeDialog(id), 500);
  };

  const iconMap = {
    success: {
      style: 'text-green',
      icon: faCircleCheck
    },
    error: {
      style: 'text-red',
      icon: faExclamationTriangle
    },
    info: {
      style: 'text-blue',
      icon: faCircleInfo
    }
  }

  return ReactDOM.createPortal(
    <div className="fixed pointer-events-none inset-0 flex top-0 z-[1000]">
      <div className={`responsive-container absolute w-full flex justify-center -translate-x-1/2 left-1/2 transition-all duration-300 ${visible ? "top-4 opacity-100" : "-top-20 opacity-0"}`}>
        <div
          className={`select-none pointer-events-auto flex items-center text-center p-4 bg-zinc-50 rounded-2xl shadow-xl`}
          onClick={handleClick}
        >
          {type && <FontAwesomeIcon icon={iconMap[type].icon} className={`${iconMap[type].style} me-2`} size="lg" />}
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
      </div>
    </div>,
    document.getElementById("dialogs")
  );
}
