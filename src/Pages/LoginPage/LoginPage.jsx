import Loginform from '../../Components/LoginForm/Loginform.jsx'
import Footer from '../../Components/Footer/Footer.jsx'
function LoginPage() {
  return (
    <>
<div className="flex flex-col min-h-screen">
      <main className="flex-grow pb-44">
        <Loginform /> 
      </main>
      <Footer /> 
    </div>
   </>
  )
}

export default LoginPage
