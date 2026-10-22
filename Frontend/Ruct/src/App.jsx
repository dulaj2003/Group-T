import './App.css';
import Nav_bar from './Nav_bar/Nav_bar.jsx';
import Footer from './Footer/Footer.jsx';
import Home from './Home/Home.jsx';
import Login from './Login/Login.jsx';
import Plumber from './Pages/Plumber/Plumber.jsx'
import PlumberProfile from './Pages/Plumber/PlumberProfile.jsx';
import Electrician from './Pages/Electrician/Electrician.jsx';
import ElectricianProfile from './Pages/Electrician/ElectricianProfile.jsx';


function App() {

  return (
    <div className="page-container">
      <Nav_bar/>
      {/* <Home/> */}
      
      {/* <Login/> */}

      <Plumber/>
      {/* <PlumberProfile/> */}

      {/* <ElectricianProfile/> */}

      <Footer/>
    </div>
  )
}

export default App
