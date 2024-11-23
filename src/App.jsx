import './App.css'
import LoginPage from './Pages/LoginPage/LoginPage.jsx'
import About from './Pages/About/About.jsx'
import Privacy from './Pages/Privacy/Privacy.jsx'
import Locations from './Pages/Locations/Locations.jsx'
import Contact from './Pages/Contact/Contact.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Odyssey/" element={<LoginPage />} />
        <Route path="/Odyssey/About" element={<About />} />
        <Route path="/Odyssey/Privacy" element={<Privacy />} />
        <Route path="/Odyssey/Locations" element={<Locations />} />
        <Route path="/Odyssey/Contact" element={<Contact />} />
      </Routes>
    </Router>
  )
}

export default App
