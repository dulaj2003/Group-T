import './App.css';
import Nav_bar from './Nav_bar/Nav_bar.jsx';
import Footer from './Footer/Footer.jsx';
import Home from './Home/Home.jsx';
import Login from './Login/Login.jsx';

function App() {

  return (
    <div className="page-container">
      <Nav_bar/>
      <Home/>
      <Footer/>
      {/* <Login/> */}
    </div>
  )
}

export default App
