export default function GuestCardSkeleton() {
    return (
        <div className='bg-zinc-100 rounded-2xl mb-2'>
            <div className='p-3'>
                <div className='grid grid-cols-5 gap-3 animate-pulse'>
                    <div className='col-span-5 sm:col-span-3 bg-zinc-300 h-13 rounded-lg'></div>
                    <div className='col-span-5 sm:col-span-2 grid grid-cols-5 gap-4'>
                        <div className='bg-zinc-300 rounded-lg col-span-2 h-13'></div>
                        <div className='bg-zinc-300 rounded-lg col-span-2 h-13'></div>
                        <div className='flex justify-center items-center rounded-lg col-span-1 h-full'>
                            <div className="bg-zinc-300 size-6 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
