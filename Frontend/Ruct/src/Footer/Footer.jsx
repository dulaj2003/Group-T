import './Footer.css'
import Logo from '../assets/Ruct.png';


function Footer(){
    return(
        <footer className="Footer">
            <div className="Footer-directions">
                
                <div className="Categories">
                    <span className="text">Categories</span>
                    <ul className="lists">
                        <a href="#"><li>Construction</li></a>
                        <a href="#"><li>Mason Work</li></a>
                        <a href="#"><li>Plumbing</li></a>
                        <a href="#"><li>Electrical Work</li></a>
                        <a href="#"><li>Tile Work</li></a>
                        <a href="#"><li>Painting</li></a>
                        <a href="#"><li>Roof Work</li></a>              
                    </ul>
                </div>

                <div className="Client">
                    <span className="text">For Client</span>
                    <ul className="lists">
                        <a href="#"><li>Contruct</li></a>
                        <a href="#"><li>Tile</li></a>
                        <a href="#"><li>Plumbers</li></a>
                        <a href="#"><li>Wiriing</li></a>
                        <a href="#"><li>Roofing</li></a>              
                    </ul>

                </div>

                <div className="Seller">
                    <span className="text">For Worker</span>
                    <ul className="lists">
                        <a href="#"><li>Contruct</li></a>
                        <a href="#"><li>Tile</li></a>
                        <a href="#"><li>Plumbers</li></a>
                        <a href="#"><li>Wiriing</li></a>
                        <a href="#"><li>Roofing</li></a>              
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