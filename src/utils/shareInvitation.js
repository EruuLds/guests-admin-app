import { useContext } from "react";
import { DataContext } from "../contexts/DataContext";
import { shareInvitationViaWhatsApp } from "./shareInvitationViaWhatsapp";

export function shareInvitation(guestId, guestName) {
    const { customInvitationURL } = useContext(DataContext);
    const guestURL = customInvitationURL + '?id=' + guestId;
    const message = `¡Hola, ${guestName}!\n\n¡Nos casamos! Y queremos celebrar contigo este momento tan especial en nuestras vidas. Te compartimos aquí el enlace a nuestra invitación digital con todos los detalles y la confirmación de asistencia:\n\n${guestURL}\n\n¡Nos haría muy felices que nos acompañes!\n\nCon cariño,\n*Ale & Luis.*`;

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