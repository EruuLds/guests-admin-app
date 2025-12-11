export default function LoadingOverlay({text}) {
  return (
    <div className="absolute inset-0 w-full h-full z-[1000] bg-white/60 flex flex-col justify-center items-center">
      <img className='min-w-[3rem] animate-spin' src="/icons/arrow-repeat.svg" alt="Arrows Icon"/>
      {text && <h5 className="uppercase">{text}</h5>}
    </div>
  );
}
