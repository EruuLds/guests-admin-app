import ReactDOM from "react-dom";
import { useContext, useEffect } from "react";
import { ModalContext } from "../../contexts/ModalContext";

export default function DialogModal({ id, children }) {
  const { visibleDialogs, setVisibleDialogs, setOpenDialogs } =
    useContext(ModalContext);
  const show = true //visibleDialogs.some((dialog) => dialog === id);


  return ReactDOM.createPortal(
    <div className="fixed pointer-events-none inset-0 flex top-0 z-[1000]">
      <a
        href="#-OgZGkLX3xeV3_SB4cmZ"
        className={`pointer-events-auto absolute -translate-x-1/2 left-1/2 text-center p-4 bg-gray-100 rounded-2xl shadow-lg transition-all
          ${show ? 'top-8' : '-top-20'}`}
      >
        <p>{children}</p>
      </a>
    </div>,
    document.getElementById("dialogs")
  );
}
