import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav_bar.css';
import Logo from '../assets/Ruct.png';

function Nav_bar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    // Close mobile menu
    const closeMenu = () => {
        setMenuOpen(false);
    };

    // Navigate when a category is selected
    const handleCategoryChange = (e) => {
        const path = e.target.value;

        if (path) {
            navigate(path);
            closeMenu();
        }

        // Reset dropdown so another category can be selected
        e.target.value = '';
    };

    return (
        <nav className="NavBar">

            {/* Logo */}
            <div className="Logo">
                <Link to="/" onClick={closeMenu}>
                    <img
                        className="Logo-img"
                        src={Logo}
                        alt="Ruct Logo"
                    />
                </Link>
            </div>

            {/* Hamburger - smartphones only */}
            <button
                type="button"
                className="Hamburger"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
            >
                {menuOpen ? '✕' : '☰'}
            </button>

            {/* Navigation links */}
            <div className={`Directions ${menuOpen ? 'active' : ''}`}>

                <Link
                    to="/"
                    className="Direction-link"
                    onClick={closeMenu}
                >
                    Home
                </Link>

                {/* Category dropdown */}
                <select
                    className="Category"
                    defaultValue=""
                    aria-label="Select category"
                    onChange={handleCategoryChange}
                >
                    <option value="" disabled>
                        Category
                    </option>

                    <option value="/construction">
                        Construction
                    </option>

                    <option value="/masons">
                        Mason Work
                    </option>

                    <option value="/plumbers">
                        Plumbing
                    </option>

                    <option value="/electricians">
                        Electrical Work
                    </option>

                    <option value="/tile-workers">
                        Tile Work
                    </option>

                    <option value="/painters">
                        Painting
                    </option>

                    <option value="/roof-workers">
                        Roof Work
                    </option>
                </select>

                <Link
                    to="/worker-register"
                    className="Direction-link"
                    onClick={closeMenu}
                >
                    As a Worker
                </Link>

                <Link
                    to="/login"
                    className="Direction-link"
                    onClick={closeMenu}
                >
                    Sign In
                </Link>

                <Link
                    to="/register"
                    className="Join-btn"
                    onClick={closeMenu}
                >
                    Join
                </Link>

            </div>
        </nav>
    );
}

export default Nav_bar;
