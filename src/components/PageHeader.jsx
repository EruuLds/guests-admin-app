export default function PageHeader({ children, pageTitle }) {
  return (
    <header className='py-8 px-8'>
        <h1 className='leading-11'>{pageTitle}</h1>
        {children}
    </header>
  )
}
