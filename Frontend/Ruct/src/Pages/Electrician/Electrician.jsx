import '../Workers.css';
import ProfilePicture from '../WorkersImages/img2.webp';

function Electrician(){
    return(
        <div>
                <section class="hero">
                    <h1>Find the Best Electrical Worker for Your Home</h1>
                    <p>Safe and dependable electrical services you can trust.</p>
                    <a href="#workers" class="main-btn">Find a Worker</a>
                </section>
                <main class="container" id="workers">
                    <h2 class="section-title">Available Electrical Workers</h2>
                    <p class="subtitle">Choose a worker to view their details.</p>
                    <div class="worker-grid">

                        <div class="worker-card">
                            <img src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800" alt="Electrical Worker Nimal Perera"/>
                            <div class="card-content">
                                <span class="available">Available</span>
                                <h3>Nimal Perera</h3>
                                <p>📍 Galle, Sri Lanka</p>
                                <p>Experience: 8 Years</p>
                                <p class="price">From Rs. 2,500</p>
                                <a href="electrical-worker-details.html?id=1" class="details-btn">View Details</a>
                            </div>
                        </div>

                        <div class="worker-card">
                            <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800" alt="Electrical Worker Kasun Silva"/>
                            <div class="card-content">
                                <span class="available">Available</span>
                                <h3>Kasun Silva</h3>
                                <p>📍 Matara, Sri Lanka</p>
                                <p>Experience: 5 Years</p>
                                <p class="price">From Rs. 2,000</p>
                                <a href="electrical-worker-details.html?id=2" class="details-btn">View Details</a>
                            </div>
                        </div>

                        <div class="worker-card">
                            <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800" alt="Electrical Worker Saman Fernando"/>
                            <div class="card-content">
                                <span class="available">Available</span>
                                <h3>Saman Fernando</h3>
                                <p>📍 Colombo, Sri Lanka</p>
                                <p>Experience: 10 Years</p>
                                <p class="price">From Rs. 3,000</p>
                                <a href="electrical-worker-details.html?id=3" class="details-btn">View Details</a>
                            </div>
                        </div>

                        <div class="worker-card">
                            <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800" alt="Electrical Worker Amal Kumara"/>
                            <div class="card-content">
                                <span class="available">Available</span>
                                <h3>Amal Kumara</h3>
                                <p>📍 Hikkaduwa, Sri Lanka</p>
                                <p>Experience: 6 Years</p>
                                <p class="price">From Rs. 2,200</p>
                                <a href="electrical-worker-details.html?id=4" class="details-btn">View Details</a>
                            </div>
                        </div>
                    </div>
                </main>
        </div>
    )
}

export default Electrician