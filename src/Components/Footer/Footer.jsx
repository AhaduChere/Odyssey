function Footer() {
    return (
      <footer className="w-full p-4 bg-gradient-to-b from-white to-[#c4c4c4] border-t mt-auto">
        <ul className="flex flex-col items-center justify-center text-md font-medium text-black uppercase select-none md:flex-row md:justify-center md:space-x-4 md:space-y-0 space-y-2">
          <li><a href="About" className="hover:underline">About</a></li>
          <li><a href="Privacy" className="hover:underline">Privacy</a></li>
          <li><a href="Locations" className="hover:underline">Locations</a></li>
          <li><a href="Contact" className="hover:underline">Contact</a></li>
        </ul>
      </footer>
    );
  }
  

export default Footer;
