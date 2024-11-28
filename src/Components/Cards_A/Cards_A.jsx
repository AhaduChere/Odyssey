function Cards_A() {

  return ( // Cards for About Page
  

       
        <div className="flex flex-row justify-center px-8 mt-8 md:px-12 lg:w-full">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 max-w-[900px] mx-auto">
                <div className="bg-gradient-to-b from-white to-[#c4c4c4] rounded-[40px] p-6 select-none" style={{ height: "400px" }}>
                    <h3 className="text-xl font-bold">Empowering Financial Success</h3>
                    <p className="mt-2 select-none">Helping you achieve your financial goals with tailored solutions.</p>
                </div>
                <div className="bg-gradient-to-b from-white to-[#c4c4c4] rounded-[40px] p-6 select-none" style={{ height: "400px" }}>
                    <h3 className="text-xl font-bold">Building Trusted Relationships</h3>
                    <p className="mt-2 select-none">Providing personalized support and expert advice for long-term success.</p>
                </div>
                <div className="bg-gradient-to-b from-white to-[#c4c4c4] rounded-[40px] p-6 select-none" style={{ height: "400px" }}>
                    <h3 className="text-xl font-bold">Delivering Excellence</h3>
                    <p className="mt-2 select-none">Consistently offering reliable, transparent, and innovative financial services.</p>
                </div>
            </div>
        </div>



  )
}

export default Cards_A
