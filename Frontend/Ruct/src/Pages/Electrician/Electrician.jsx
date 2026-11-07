
import '../Workers.css';
import ProfilePicture from '../WorkersImages/img2.webp';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Electrician() {
    const navigate = useNavigate();

    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let active = true;

        async function loadWorkers() {
            try {
                const response = await fetch(
                    'http://localhost:5000/api/workers?trade=Electrician'
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(
                        result.message || 'Unable to load electricians.'
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
                <h1>Find the Best Electrical Worker for Your Home</h1>
                <p>
                    Safe and dependable electrical services you can trust.
                </p>
            </section>

            <main className="container" id="workers">
                <h2 className="section-title">
                    Available Electrical Workers
                </h2>

                <p className="subtitle">
                    Choose a worker to view their details.
                </p>

                {loading && <p>Loading electricians...</p>}

                {error && <p>{error}</p>}

                {!loading && !error && workers.length === 0 && (
                    <p>No registered electricians found.</p>
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
                                        navigate(`/electricians/${worker.id}`)
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

export default Electrician;
