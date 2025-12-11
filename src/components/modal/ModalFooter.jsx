export default function ModalFooter({children, alignment}) {
    return (
        <div className={`
            w-full 
            flex 
            p-8
            gap-4
            ${alignment === 'start' && 'justify-start'}
            ${alignment === 'center' && 'justify-center'}
            ${alignment === 'end' && 'justify-end'}
        `}>
            {children}
        </div>
    )
}
