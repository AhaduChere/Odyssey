function Cards_A() {
  return ( // Cards for About Page
        <div className="flex flex-row justify-stretch mt-8 md:px-24 lg:w-full">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 max-w-[900px] mx-auto">
                <div className="bg-gradient-to-b from-white to-[#c4c4c4] rounded-[40px] p-6 select-none" style={{ height: "250px" }}>
                    <h3 className="text-xl text-center font-bold">The Compass</h3>
                    <p className="mt-2 select-none text-center italic text-sm">"Clear Direction, Every Step of the Way"</p>
                    <p className="mt-2 select-none text-center font-thin text-md">We prioritize understanding your financial goals and providing expert advice to help you navigate life’s financial crossroads confidently.</p>
                </div>
                <div className="bg-gradient-to-b from-white to-[#c4c4c4] rounded-[40px] p-6 select-none" style={{ height: "250px" }}>
                    <h3 className="text-xl text-center font-bold">The Helm</h3>
                    <p className="mt-2 select-none text-center italic text-sm">"Stability and Control"</p>
                </div>
                <div className="bg-gradient-to-b from-white to-[#c4c4c4] rounded-[40px] p-6 select-none" style={{ height: "250px" }}>
                    <h3 className="text-xl text-center font-bold">The Horizon</h3>
                    <p className="mt-2 select-none text-center italic text-sm">"Focused on Your Future"</p>
                </div>
            </div>
        </div>
  )
}

export default Cards_A
