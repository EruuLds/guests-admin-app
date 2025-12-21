
export default function StatsCard({dataName, data}) {
  return (
    <div className="bg-zinc-100 w-full h-fit rounded-2xl text-center p-4">
        <h5 className="uppercase text-sm text-zinc-500 mb-2">{dataName}</h5>
        <h1 className="leading-none">{data}</h1>
    </div>
  )
}
