const Logo = 'Logo.svg';
function Header() {
  return (
    <header className="flex items-center bg-gradient-to-b from-white to-[#c4c4c4] shadow-lg">
      <img style={{ filter: 'drop-shadow(0px 5px 5px rgba(0,0,0,0.25))' }} className="w-20 h-20 ml-5" src={Logo} alt="Logo" />
      <h1 className="text-4xl pl-4 pt-2 font-Caeser select-none font-bold text-black whitespace-nowrap">Odyssey Financial</h1>
    </header>
  )
}

export default Header
