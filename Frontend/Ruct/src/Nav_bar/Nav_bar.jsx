
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav_bar.css';
import Logo from '../assets/Ruct.png';

function Nav_bar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        let active = true;

        async function checkLogin() {
            const token = sessionStorage.getItem('token');

            if (!token) {
                if (active) {
                    setUser(null);
                    setAuthLoading(false);
                }
                return;
            }

            try {
                const response = await fetch(
                    'http://localhost:5000/api/auth/me',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error('Session expired.');
                }

                const result = await response.json();

                if (active) {
                    setUser(result.data.user);
                    sessionStorage.setItem(
                        'user',
                        JSON.stringify(result.data.user)
                    );
                }
            } catch (error) {
                if (active) {
                    sessionStorage.removeItem('token');
                    sessionStorage.removeItem('user');
                    setUser(null);
                }
            } finally {
                if (active) {
                    setAuthLoading(false);
                }
            }
        }

        checkLogin();
        window.addEventListener('ruct-auth-changed', checkLogin);

        return () => {
            active = false;
            window.removeEventListener('ruct-auth-changed', checkLogin);
        };
    }, []);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const handleCategoryChange = (e) => {
        const path = e.target.value;

        if (path) {
            navigate(path);
            closeMenu();
        }

        e.target.value = '';
    };

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');

        setUser(null);
        closeMenu();

        navigate('/', { replace: true });
    };

    return (
        <nav className="NavBar">
            <div className="Logo">
                <Link to="/" onClick={closeMenu}>
                    <img
                        className="Logo-img"
                        src={Logo}
                        alt="Ruct Logo"
                    />
                </Link>
            </div>

            <button
                type="button"
                className="Hamburger"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
            >
                {menuOpen ? '✕' : '☰'}
            </button>

            <div className={`Directions ${menuOpen ? 'active' : ''}`}>
                <Link
                    to="/"
                    className="Direction-link"
                    onClick={closeMenu}
                >
                    Home
                </Link>

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

                {!authLoading && (
                        user ? (
                            <>
                                {user.role === 'customer' && (
                                    <Link
                                        to="/customer-profile"
                                        className="Direction-link navbar-user"
                                        onClick={closeMenu}
                                    >
                                        {user.profilePicture ? (
                                            <img
                                                src={user.profilePicture}
                                                alt={user.name}
                                                className="navbar-profile-picture"
                                            />
                                        ) : (
                                            <div className="navbar-default-avatar">
                                                {user.name?.charAt(0).toUpperCase() || 'U'}
                                            </div>
                                        )}

                                        <span>Customer: {user.name}</span>
                                    </Link>
                                )}

                                {user.role === 'worker' && (
                                    <Link
                                        to="/worker-profile"
                                        className="Direction-link navbar-user"
                                        onClick={closeMenu}
                                    >
                                        {user.profilePicture ? (
                                            <img
                                                src={user.profilePicture}
                                                alt={user.name}
                                                className="navbar-profile-picture"
                                            />
                                        ) : (
                                            <div className="navbar-default-avatar">
                                                {user.name?.charAt(0).toUpperCase() || 'U'}
                                            </div>
                                        )}

                                        <span>Worker: {user.name}</span>
                                    </Link>
                                )}

                                <button
                                    type="button"
                                    className="Join-btn"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                        <>
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
                        </>
                    )
                )}
            </div>
        </nav>
    );
}

export default Nav_bar;
