function Footer() {

  return (
<footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t">
    <ul className="flex flex-wrap items-center justify-center text-md font-medium text-black uppercase select-none md:justify-center">
        <li>
            <a href="About" className="me-4 md:me-6">About</a>
        </li>
        <li>
            <a href="Privacy" className="me-4 md:me-6">Privacy</a>
        </li>
        <li>
            <a href="Locations" className="me-4 md:me-6">Locations</a>
        </li>
        <li>
            <a href="Contact">Contact</a>
        </li>
    </ul>
</footer>
  )
}

export default Footer
