export default function SectionContainer(props) {
  return (
    <section id={props.id} className='responsive-container flex flex-col flex-1'>
        {props.children}
    </section>
  )
}
