import '../Workers.css';
import ProfilePicture from '../WorkersImages/img2.webp';
import { useNavigate } from 'react-router-dom';

function RoofWorker() {
    const navigate = useNavigate();
    return(
            <div>

                    <section class="hero">
                        <h1>Find the Best Roof Worker for Your Home</h1>
                        <p>Trusted roofing and roof repair services.</p>
                        
                    </section>
                    <main class="container" id="workers">
                        <h2 class="section-title">Available Roof Workers</h2>
                        <p class="subtitle">Choose a worker to view their details.</p>
                        <div class="worker-grid">

                            <div className="worker-card">
                        <img src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800" alt="Ruwan Perera"/>
                        <div className="card-content">
                            <span className="available">Available</span>
                            <h3>Ruwan Perera</h3>
                            <p>📍 Galle, Sri Lanka</p>
                            <p>Experience: 9 Years</p>
                            <p className="price">From Rs. 3,500</p>

                            <button className="details-btn"
                                onClick={() => navigate('/roof-workers/:id')}>
                                View Details
                            </button>
                        </div>
                    </div>

                    <div className="worker-card">
                        <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800" alt="Kasun Silva"/>
                        <div className="card-content">
                            <span className="available">Available</span>
                            <h3>Kasun Silva</h3>
                            <p>📍 Matara, Sri Lanka</p>
                            <p>Experience: 6 Years</p>
                            <p className="price">From Rs. 3,000</p>

                            <button className="details-btn"
                                onClick={() => navigate('/roof-workers/:id')}>
                                View Details
                            </button>
                        </div>
                    </div>

                    <div className="worker-card">
                        <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800" alt="Saman Fernando"/>
                        <div className="card-content">
                            <span className="available">Available</span>
                            <h3>Saman Fernando</h3>
                            <p>📍 Colombo, Sri Lanka</p>
                            <p>Experience: 12 Years</p>
                            <p className="price">From Rs. 4,500</p>

                            <button className="details-btn"
                                onClick={() => navigate('/roof-workers/:id')}>
                                View Details
                            </button>
                        </div>
                    </div>

                    <div className="worker-card">
                        <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800" alt="Amal Kumara"/>
                        <div className="card-content">
                            <span className="available">Available</span>
                            <h3>Amal Kumara</h3>
                            <p>📍 Hikkaduwa, Sri Lanka</p>
                            <p>Experience: 7 Years</p>
                            <p className="price">From Rs. 3,200</p>

                            <button className="details-btn"
                                onClick={() => navigate('/roof-workers/:id')}>
                                View Details
                            </button>
                        </div>
                    </div>
                        </div>
                    </main>
            </div>
    )
}

export default RoofWorker