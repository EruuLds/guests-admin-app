export default function ModalFooter({children, alignment}) {
    return (
        <div className={`
            w-full 
            flex 
            p-6
            gap-4
            flex-wrap
            ${alignment === 'start' && 'justify-start'}
            ${alignment === 'center' && 'justify-center'}
            ${alignment === 'end' && 'justify-end'}
        `}>
            {children}
        </div>
    )
}