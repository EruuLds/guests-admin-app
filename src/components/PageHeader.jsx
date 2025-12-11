export default function PageHeader(props) {
  return (
    <header className='py-8 px-8'>
        <h1 className='leading-11'>{props.pageTitle}</h1>
        {props.children}
    </header>
  )
}
