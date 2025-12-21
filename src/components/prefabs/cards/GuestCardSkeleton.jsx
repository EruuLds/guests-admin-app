export default function GuestCardSkeleton() {
    return (
        <div className='bg-zinc-100 rounded-2xl mb-4'>
            <div className='p-4'>
                <div className='grid grid-cols-5 gap-4 animate-pulse'>
                    <div className='col-span-5 md:col-span-3 bg-zinc-300 h-[4rem] rounded-lg'></div>
                    <div className='col-span-5 md:col-span-2 grid grid-cols-5 gap-4'>
                        <div className='bg-zinc-300 rounded-lg col-span-2 h-[4rem]'></div>
                        <div className='bg-zinc-300 rounded-lg col-span-2 h-[4rem]'></div>
                        <div className='flex justify-center items-center rounded-lg col-span-1 h-[4rem]'>
                            <div className="bg-zinc-300 size-8 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
