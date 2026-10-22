import '../Workers.css';
import ProfilePicture from '../WorkersImages/img2.webp';
function Plumber() {
    return (

    <div>
        
    <section className="hero">
        <h1>Find the Best Plumber for Your Home</h1>
        <p>Professional plumbing services you can trust.</p>
        
    </section>

    <main className="container" id="workers">
        <h2 className="section-title">Available Plumbers</h2>
        <p className="subtitle">
            Choose a worker to view their details.
        </p>

        <div className="worker-grid">

            <div className="worker-card">
                <img
                    src={ProfilePicture}
                    alt="Plumber Nimal Perera"
                />
                <div className="card-content">
                    <span className="available">Available</span>
                    <h3>Nimal Perera</h3>
                    <p>📍 Galle, Sri Lanka</p>
                    <p>Experience: 8 Years</p>
                    <p className="price">From Rs. 2,500</p>
                    <a
                        href=""
                        className="details-btn"
                    >
                        View Details
                    </a>
                </div>
            </div>

            <div className="worker-card">
                <img
                    src={ProfilePicture}
                    alt="Plumber Nimal Perera"
                />
                <div className="card-content">
                    <span className="available">Available</span>
                    <h3>Nimal Perera</h3>
                    <p>📍 Galle, Sri Lanka</p>
                    <p>Experience: 8 Years</p>
                    <p className="price">From Rs. 2,500</p>
                    <a
                        href=""
                        className="details-btn"
                    >
                        View Details
                    </a>
                </div>
            </div>

            <div className="worker-card">
                <img
                    src={ProfilePicture}
                    alt="Plumber Nimal Perera"
                />
                <div className="card-content">
                    <span className="available">Available</span>
                    <h3>Nimal Perera</h3>
                    <p>📍 Galle, Sri Lanka</p>
                    <p>Experience: 8 Years</p>
                    <p className="price">From Rs. 2,500</p>
                    <a
                        href=""
                        className="details-btn"
                    >
                        View Details
                    </a>
                </div>
            </div>
            <div className="worker-card">
                <img
                    src={ProfilePicture}
                    alt="Plumber Nimal Perera"
                />
                <div className="card-content">
                    <span className="available">Available</span>
                    <h3>Nimal Perera</h3>
                    <p>📍 Galle, Sri Lanka</p>
                    <p>Experience: 8 Years</p>
                    <p className="price">From Rs. 2,500</p>
                    <a
                        href=""
                        className="details-btn"
                    >
                        View Details
                    </a>
                </div>
            </div>

        </div>
    </main>

    </div>

    )
}

export default Plumber