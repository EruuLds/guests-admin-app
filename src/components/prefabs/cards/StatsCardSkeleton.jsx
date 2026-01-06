export default function StatsCardSkeleton() {
  return (
    <div className="bg-zinc-100 w-full h-fit rounded-2xl p-4">
        <div className="flex flex-col items-center animate-pulse">
            <div className='h-4 w-16 bg-zinc-300 rounded-sm mb-2'></div>
            <div className="h-7 w-12 bg-zinc-300 rounded-sm"></div>
        </div>
    </div>
  )
}
