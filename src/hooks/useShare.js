import { useContext } from "react";
import { DataContext } from "../contexts/DataContext";

export function useShare(guestID) {
    const { customInvitationURL } = useContext(DataContext);
    const guestShareableLink = customInvitationURL + '?data=' + btoa(guestID);

    const share = async () => {
    if (navigator.share) {
        await navigator.share({
            url: guestShareableLink
        });
    } else {
      // fallback a WhatsApp
      window.open(
        `https://wa.me/?text=${encodeURIComponent(guestShareableLink)}`,
        "_blank"
      );
    }
  };

  return (share);
};