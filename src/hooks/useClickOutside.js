import { useEffect } from "react";

export function useClickOutside(ref, callback) {
  useEffect(() => {
    function handleClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener("mouseup", handleClick);
    return () => document.removeEventListener("mouseup", handleClick);
  }, [ref, callback]);
}