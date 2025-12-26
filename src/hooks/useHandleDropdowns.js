import { useContext} from "react";
import { ModalContext } from "../contexts/ModalContext";

export function useHandleDropdowns() {
  const { openDropdowns, setOpenDropdowns } = useContext(ModalContext);

  const handleDropdowns = (dropdownID) => {
    if (openDropdowns !== dropdownID) {
      setOpenDropdowns(dropdownID);
    } else if (openDropdowns === dropdownID) {
      setOpenDropdowns(null);
    }
  };
  return handleDropdowns;
}