const Logo = 'Logo.svg';
function Header() {
  return (
    
     <header className="w-full h-24 bg-white items-center flex pt-3 justify-between">
  <div className="flex items-center">
    <img className="w-24 h-24 ml-5 pb-4" src={Logo} alt="Logo" />
    <h1 className="text-5xl pb-2 pl-4 font-Caeser select-none font-bold text-black">Odyssey</h1>
  </div>
  <ul className="flex text-lg pb-3 font-medium text-black uppercase select-none">
    <li>
      <a href="/Odyssey/" className="me-4 md:me-6">Login</a>
    </li>
    <li>
      <a href="#OurMission" className="me-4 md:me-6">Our Mission</a>
    </li>
    <li>
      <a href="#OurValues" className="me-4 md:me-6">Our Values</a>
    </li>
    <li>
      <a href="#Whyus?" className="me-4 md:me-6">Why us?</a>
    </li>
  </ul>
</header>
    
  )
}

export default Header
