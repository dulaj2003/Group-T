
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Nav_bar from './Nav_bar/Nav_bar.jsx';
import Footer from './Footer/Footer.jsx';

import Home from './Home/Home.jsx';
import Login from './Login/Login.jsx';
import SignIn from './SignIn/SignIn.jsx';
import WorkerLogin from './WorkerLogin/WorkerLogin.jsx';


import Construction from './Pages/Constructor/Constructor.jsx';
import ConstructionProfile from './Pages/Constructor/ConstructorProfile.jsx';

import Plumber from './Pages/Plumber/Plumber.jsx';
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

import CustomerProfile from './CustomerProfile/CustomerProfile';
import WorkerProfile from './WorkerProfile/WorkerProfile';

function App() {
    return (
      
        <BrowserRouter>
        <div className="page-container">
        <Nav_bar />

        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<Login />} />
            <Route path="/worker-register" element={<WorkerLogin />} />

            <Route path="/construction" element={<Construction />} />
            <Route path="/construction/:id" element={<ConstructionProfile />} />

            <Route path="/plumbers" element={<Plumber />} />
            <Route path="/plumbers/:id" element={<PlumberProfile />} />

            <Route path="/electricians" element={<Electrician />} />
            <Route path="/electricians/:id" element={<ElectricianProfile />} />

            <Route path="/masons" element={<Mason />} />
            <Route path="/masons/:id" element={<MasonProfile />} />

            <Route path="/painters" element={<Painter />} />
            <Route path="/painters/:id" element={<PainterProfile />} />

            <Route path="/tile-workers" element={<TileWorker />} />
            <Route path="/tile-workers/:id" element={<TileWorkerProfile />} />

            <Route path="/roof-workers" element={<RoofWorker />} />
            <Route path="/roof-workers/:id" element={<RoofWorkerProfile />} />

            <Route path="/customer-profile" element={<CustomerProfile />} />
            <Route path="/worker-profile" element={<WorkerProfile />} />
        </Routes>

        <Footer />
    </div>
</BrowserRouter>
    );
}

export default App;
