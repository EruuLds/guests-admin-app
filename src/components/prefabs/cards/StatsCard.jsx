
export default function StatsCard({dataName, data, semanticDot}) {
  const semanticDotsMap = {
    gray: 'bg-zinc-300',
    greenDashed: 'border-2 border-dashed border-green-300',
    green: 'bg-green-300',
    rose: 'bg-rose-400'
  }

  return (
    <div className="bg-zinc-100 w-full h-fit rounded-2xl flex flex-col items-center p-4">
        <div className="flex items-center">
          <p className='uppercase text-xs w-fit font-medium text-zinc-500 mb-2'>{dataName}</p>
          {semanticDot && <span className={`ms-1 size-[0.6rem] rounded-full ${semanticDotsMap[semanticDot]}`}></span>}
        </div>
        <h2 className="leading-none w-fit">{data}</h2>
    </div>
  )
}
