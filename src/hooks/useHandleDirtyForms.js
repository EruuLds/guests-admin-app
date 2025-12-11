import { useContext} from "react";
import { DataContext } from "../contexts/dataContext";

export function useHandleDirtyForms() {
  const { setDirtyForms } = useContext(DataContext);

  const handleDirtyForms = (action, formID) => {
    if (action === 'add') {
      setDirtyForms(prev => [...prev, formID]);
    } else if (action === 'delete') {
      setDirtyForms(prev => prev.filter(item => item !== formID));
    }
  };

  return handleDirtyForms;
}