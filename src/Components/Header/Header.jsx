const Logo = 'Logo.svg';
function Header() {
  return (
    <header className="flex items-center justify-between bg-gradient-to-b from-white to-[#c4c4c4] shadow-lg px-5">
      <div className="flex items-center">
       <a href="/Odyssey/"> 
        <img 
          style={{ filter: 'drop-shadow(0px 5px 5px rgba(0,0,0,0.25))' }} 
          className="w-20 h-20" 
          src={Logo} 
          alt="Logo" 
        />
        </a>
        <h1 className="text-4xl pl-4 pt-2 font-Caeser select-none font-bold text-black whitespace-nowrap">
          Odyssey Financial
        </h1>
      </div>

      <ul className="flex items-center space-x-4 text-md font-medium text-black uppercase select-none">
        <li><a href="About" className="hover:underline">About</a></li>
        <li><a href="Privacy" className="hover:underline">Privacy</a></li>
        <li><a href="Locations" className="hover:underline">Locations</a></li>
        <li><a href="Contact" className="hover:underline">Contact</a></li>
      </ul>
    </header>
  );
}

export default Header;

