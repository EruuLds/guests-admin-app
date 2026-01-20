import { useContext } from "react";
import { DataContext } from "../contexts/DataContext";
import { shareInvitationViaWhatsApp } from "./shareInvitationViaWhatsapp";

export function shareInvitation(guestId, guestName) {
    const { customInvitationURL } = useContext(DataContext);
    const guestURL = customInvitationURL + '?id=' + guestId;
    const message = `¡Hola, ${guestName}!\n\nQueremos compartir contigo un momento muy especial para nosotros. Es por eso que compartimos el enlace a nuestra invitación digital con todos los detalles y la confirmación de asistencia:\n\n${guestURL}\n\n¡Nos haría muy felices que nos acompañes!\n\nCon cariño,\n*Ale & Luis.*`

    const share = async () => {
    if (navigator.share) {
        await navigator.share({
            text: message
        });
    } else {
      shareInvitationViaWhatsApp(guestId, guestName);
    }
  };

  return (share);
};