import Header from '../../Components/Header/Header';
function About() {
  return (
    <div>
      <Header />

      <div className='w-11/12 h-full bg-white shadow-2xl flex rounded-xl p-8 m-auto mt-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>

          <div className='bg-[#4682B4] p-8 rounded-2xl shadow-2xl'>
            <div className='text-center select-none text-5xl pt-4 text-white'>Our Values</div>
            <ul className='list-disc text-center select-none text-white text-md space-y-4 pt-4'>
              <li className='bg-[#4682B4] p-1'>Empowering Financial Success: Helping you achieve your financial goals with tailored solutions.</li>
              <li className='bg-[#4682B4] p-1'>Building Trusted Relationships: Providing personalized support and expert advice for long-term success.</li>
              <li className='bg-[#4682B4] p-1'>Delivering Excellence: Consistently offering reliable, transparent, and innovative financial services.</li>
            </ul>
          </div>

          <div className='bg-white p-8 rounded-2xl shadow-2xl'>
            <div className='text-center select-none text-5xl'>Our Goals</div>
            <ul className='list-disc text-center select-none text-sm'>
              <li>AGHH</li>
              <li>AGHH</li>
              <li>AGHH</li>
              <li>AGHH</li>
              <li>AGHH</li>
              <li>AGHH</li>
            </ul>
          </div>

          <div className='bg-white p-8 rounded-2xl shadow-2xl'>
            <div className='text-center select-none text-5xl'>What We Offer</div>
            <ul className='list-disc text-center select-none text-sm'>
              <li>AGHH</li>
              <li>AGHH</li>
              <li>AGHH</li>
              <li>AGHH</li>
              <li>AGHH</li>
              <li>AGHH</li>
            </ul>
          </div>


        </div>
      </div>
    </div>
  )
}

export default About
