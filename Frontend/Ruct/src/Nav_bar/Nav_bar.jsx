
import { useState } from 'react';
import './Nav_bar.css';
import Logo from '../assets/Ruct.png';

function Nav_bar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="NavBar">

            <div className="Logo">
                <img className="Logo-img" src={Logo} alt="Logo" />
            </div>

            {/* Hamburger button */}
            <button
                className="Hamburger"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
            >
                {menuOpen ? '✕' : '☰'}
            </button>

            {/* Navigation links */}
            <div className={`Directions ${menuOpen ? 'active' : ''}`}>

                <a
                    href="#"
                    className="Direction-link"
                    onClick={() => setMenuOpen(false)}
                >
                    Home
                </a>

                <select
                    className="Category"
                    defaultValue="Category"
                    aria-label="Select category"
                >
                    <option value="Category">Category</option>
                    <a href="#" className="Direction-link"><option value="Construction">Construction</option></a>
                    <a href="#" className="Direction-link"><option value="Mason-Work">Mason Work</option></a>
                    <a href="#" className="Direction-link"><option value="Plumbing">Plumbing</option></a>
                    <a href="#" className="Direction-link"><option value="Electrical-Work">Electrical Work</option></a>
                    <a href="#" className="Direction-link"><option value="Tile-Work">Tile Work</option></a>
                    <a href="#" className="Direction-link"><option value="Painting">Painting</option></a>
                    <a href="#" className="Direction-link"><option value="Roof-Work">Roof Work</option></a>
    
                </select>

                <a
                    href="#"
                    className="Direction-link"
                    onClick={() => setMenuOpen(false)}
                >
                    As a Worker
                </a>

                <a
                    href="#"
                    className="Direction-link"
                    onClick={() => setMenuOpen(false)}
                >
                    Sign In
                </a>

                <a
                    href="#"
                    className="Join-btn"
                    onClick={() => setMenuOpen(false)}
                >
                    Join
                </a>

            </div>

        </nav>
    );
}

export default Nav_bar;
