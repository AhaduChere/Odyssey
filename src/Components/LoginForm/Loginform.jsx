function Loginform() {
    const Logo = 'Logo.svg';
    return (
        <div className="relative w-fit bg-white shadow-2xl flex rounded-3xl p-8 m-auto justify-content: center text-center mt-8">
            <form action="">
                <div className="flex justify-center">
                    <div className="w-[120px] h-[120px] mx-32 mb-8">
                        <img src={Logo} alt="Logo" />
                    </div>
                </div>
                <div className="text-center text-black text-5xl font-Caeser select-none -mt-10 font-bold pb-5">
                    <span className="block font-bold">Odyssey</span>
                    <span className="block font-bold">Financial</span>
                </div>
                <div className="w-full flex justify-center items-center">
                    <input className="w-11/12 bg-transparent border-2 border-black/60 outline-none rounded-full text-black text-md font-serif placeholder-black px-5 py-2 mb-3" required="" placeholder="Username" type="text" />
                </div>
                <div className="w-full flex justify-center items-center">
                    <input className="w-11/12 bg-transparent border-2 border-black/60 outline-none rounded-full text-black text-md font-serif placeholder-black px-5 py-2" required="" placeholder="Password" type="password" />
                </div>
                <div className="flex items-center pt-5">
                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0"/>
                    <label htmlFor="remember-me" className="ml-3 block text-md text-black select-none">Remember me</label>
                </div>
                <div className="w-full flex justify-center pt-5">
                    <button href="Dashboard" className="inline-flex w-10/12 items-center justify-center rounded-full bg-zinc-800 px-3.5 py-2.5 font-semibold leading-7 text-white">
                        Login
                    </button>
                </div>
                <div className="text-center mt-4">
                    <p className="text-sm font-medium text-gray-800 pr-5">
                        <a href="#" className="text-black hover:underline select-none">Forgot Password?</a>
                        <a href="#" className="text-black hover:underline pl-2 select-none">Enroll Now</a>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Loginform 