export default function SectionContainer(props) {
  return (
    <section id={props.id} className='responsive-container'>
        {props.children}
    </section>
  )
}
