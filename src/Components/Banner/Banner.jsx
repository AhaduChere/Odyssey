const banner = ('Banner1.jpg')
function Banner() {
  return (
    <div>

      <div className="w-full max-w-[1000px] mx-auto mt-4">
        <div className="flex bg-gradient-to-b from-white to-[#c4c4c4] rounded-[40px]" style={{ height: "250px" }}>
          <div className="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
            <div>
              <h2 className="text-3xl font-Caeser font-bold text-black select-none">Every financial journey begins with a vision</h2>
              <p className="mt-2 text-lg text-black md:text-base select-none">At Odyssey Financial, we believe that true success is built on a strong foundation of values. That’s why our approach is guided by our three core principles</p>
            </div>
          </div>
          <div className="block w-1/2" style={{ clipPath: "polygon(10% 0, 100% 0%, 100% 100%, 0 100%)" }}>
            <div className="h-full rounded-tr-[40px] rounded-br-[40px] ml-[-50px] bg-auto" style={{backgroundImage: `url(${banner})`, backgroundRepeat: "no-repeat", backgroundSize: "auto", clipPath: "inherit" }}></div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Banner


