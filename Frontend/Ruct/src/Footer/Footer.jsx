import './Footer.css'
import Logo from '../assets/Ruct.png';
import { Link } from 'react-router-dom';

function Footer(){
    return(
        <footer className="Footer">
            <div className="Footer-directions">
                
                <div className="Categories">
                    <span className="text">Categories</span>
                    <ul className="lists">
                        <li><Link to="/construction">Construction</Link></li>
                        <li><Link to="/masons">Mason Work</Link></li>
                        <li><Link to="/plumbers">Plumbing</Link></li>
                        <li><Link to="/electricians">Electrical Work</Link></li>
                        <li><Link to="/tile-workers">Tile Work</Link></li>
                        <li><Link to="/painters">Painting</Link></li>
                        <li><Link to="/roof-workers">Roof Work</Link></li>
                    </ul>
                </div>

                <div className="Client">
                    <span className="text">For Client</span>
                    <ul className="lists">
                        <li>
                            <Link to="/register">As a Client</Link>
                        </li>
                    </ul>
                </div>

                <div className="Seller">
                    <span className="text">For Worker</span>
                    <ul className="lists">
                        <li>
                            <Link to="/worker-register">As a Worker</Link>
                        </li>
                    </ul>
                </div>
                
            </div>
            <div className="Footer-details">
                <div className="Logo">
                    <img className="Logo-img" src={Logo} alt="Logo" />
                </div>
                <div className="Copy_rights">
                    <span >&copy; {new Date().getFullYear()} Ruct (Pvt) Ltd. All rights reserved. </span>
                </div>
                
                
            </div>
            
        </footer>
    )
}

export default Footer