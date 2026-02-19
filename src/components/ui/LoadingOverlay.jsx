import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LoadingOverlay({text}) {
  return (
    <div className="absolute inset-0 w-full h-full z-[1000] bg-white/60 flex justify-center items-center">
      <div className="flex flex-col items-center p-8 rounded-xl bg-white/80">
        <FontAwesomeIcon icon={faArrowsRotate} size="2xl" spin style={{animationDuration: '1s'}} className="mb-4"/>
        {text && <h5 className="uppercase">{text}</h5>}
      </div>
    </div>
  );
}
