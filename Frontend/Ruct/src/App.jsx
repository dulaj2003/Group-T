import './App.css';
import Nav_bar from './Nav_bar/Nav_bar.jsx';
import Footer from './Footer/Footer.jsx';
import Home from './Home/Home.jsx';
import Login from './Login/Login.jsx';
import Plumber from './Pages/Plumber/Plumber.jsx'
import PlumberProfile from './Pages/Plumber/PlumberProfile.jsx';
import Electrician from './Pages/Electrician/Electrician.jsx';
import ElectricianProfile from './Pages/Electrician/ElectricianProfile.jsx';
import Mason from './Pages/Mason/Mason.jsx';
import MasonProfile from './Pages/Mason/MasonProfile.jsx';
import Painter from './Pages/Painter/Painter.jsx';
import PainterProfile from './Pages/Painter/PainterProfile.jsx';
import TileWorker from './Pages/TileWorker/TileWorker.jsx';
import TileWorkerProfile from './Pages/TileWorker/TileWorkerProfile.jsx';
import RoofWorker from './Pages/RoofWorker/RoofWorker.jsx';
import RoofWorkerProfile from './Pages/RoofWorker/RoofWorkerProfile.jsx';



function App() {

  return (
    <div className="page-container">
      <Nav_bar />
      <Home />

      {/* <Login/> */}

      {/* <Plumber/> */}
      {/* <PlumberProfile/> */}



      <Footer />
    </div>
  )
}

export default App
