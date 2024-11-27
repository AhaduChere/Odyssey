const banner = ('Banner_img.jpg')
function Banner() {
    return (
        <div className="w-full max-w-[1300px] mx-auto mt-16 lg:w-[100vw]">
            <div className="flex bg-gradient-to-b from-white to-[#c4c4c4] rounded-[40px] " style={{height: "400px"}}>
                <div className="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
                    <div>
                        <h2 className="text-3xl font-Caeser font-bold text-black md:text-4xl select-none">ABOUT US</h2>
                        <p className="mt-2 text-lg text-black md:text-base select-none">At Odyssey Financial, we are committed to offering a broad range of innovative financial solutions that meet the unique needs of individuals, families, and businesses. For over 30 years, we’ve been a trusted partner for clients seeking financial expertise, reliability, and personalized service.</p>
                    </div>
                </div>

            <div className="hidden lg:block lg:w-1/2" style={{clipPath: "polygon(10% 0, 100% 0%, 100% 100%, 0 100%)"}}>
                <div className="h-full rounded-tr-[40px] rounded-br-[40px] ml-[-50px]" style={{backgroundImage: `url(${banner})`, backgroundRepeat: "no-repeat", backgroundSize: "auto", clipPath: "inherit"}}></div>
            </div>
        </div>
    </div>

    )
}

export default Banner


