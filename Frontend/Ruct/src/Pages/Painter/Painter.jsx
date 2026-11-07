
import '../Workers.css';
import ProfilePicture from '../WorkersImages/img2.webp';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Painter() {
    const navigate = useNavigate();

    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let active = true;

        async function loadWorkers() {
            try {
                const response = await fetch(
                    'http://localhost:5000/api/workers?trade=Painter'
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(
                        result.message || 'Unable to load painters.'
                    );
                }

                if (active) {
                    setWorkers(result.data || []);
                }
            } catch (err) {
                if (active) {
                    setError(err.message);
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadWorkers();

        return () => {
            active = false;
        };
    }, []);

    return (
        <div>
            <section className="hero">
                <h1>Find the Best Painter for Your Home</h1>
                <p>
                    Professional interior and exterior painting services.
                </p>
            </section>

            <main className="container" id="workers">
                <h2 className="section-title">
                    Available Painting Workers
                </h2>

                <p className="subtitle">
                    Choose a worker to view their details.
                </p>

                {loading && <p>Loading painters...</p>}

                {error && <p>{error}</p>}

                {!loading && !error && workers.length === 0 && (
                    <p>No registered painters found.</p>
                )}

                <div className="worker-grid">
                    {workers.map(worker => (
                        <div className="worker-card" key={worker.id}>
                            <img
                                src={worker.profilePicture || ProfilePicture}
                                alt={worker.name}
                            />

                            <div className="card-content">
                                <span
                                    className={
                                        worker.availability
                                            ? 'available'
                                            : 'unavailable'
                                    }
                                >
                                    {worker.availability
                                        ? 'Available'
                                        : 'Unavailable'}
                                </span>

                                <h3>{worker.name}</h3>

                                <p>
                                    📍 {worker.area}, Sri Lanka
                                </p>

                                <p className="price">
                                    {worker.hourlyRate != null
                                        ? `Rs. ${Number(worker.hourlyRate).toLocaleString()}/hour`
                                        : 'Rate not specified'}
                                </p>

                                <button
                                    className="details-btn"
                                    onClick={() =>
                                        navigate(`/painters/${worker.id}`)
                                    }
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Painter;
