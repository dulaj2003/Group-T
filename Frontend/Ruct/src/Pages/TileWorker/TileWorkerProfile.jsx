
import '../Workers.css';
import ProfilePicture from '../WorkersImages/img2.webp';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function TileWorkerProfile() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [worker, setWorker] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let active = true;

        async function loadWorker() {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/workers/${id}`
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(
                        result.message || 'Worker not found.'
                    );
                }

                if (active) {
                    if (result.data.trade?.toLowerCase() !== 'tile worker') {
                        throw new Error('Tile worker not found.');
                    }

                    setWorker(result.data);
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

        loadWorker();

        return () => {
            active = false;
        };
    }, [id]);

    if (loading) {
        return (
            <main className="details-container">
                <p>Loading tile worker details...</p>
            </main>
        );
    }

    if (error || !worker) {
        return (
            <main className="details-container">
                <button
                    className="back-link"
                    onClick={() => navigate('/tile-workers')}
                >
                    ← Back to Workers
                </button>

                <p>{error || 'Tile worker not found.'}</p>
            </main>
        );
    }

    return (
        <div className="Page-container">
            <main className="details-container">
                <button
                    className="back-link"
                    onClick={() => navigate('/tile-workers')}
                >
                    ← Back to Workers
                </button>

                <div className="profile-card">
                    <img
                        id="workerImage"
                        src={worker.profilePicture || ProfilePicture}
                        alt={worker.name}
                    />

                    <div className="profile-info">
                        <span
                            className={
                                worker.availability
                                    ? 'available'
                                    : 'unavailable'
                            }
                        >
                            {worker.availability
                                ? 'Available for Work'
                                : 'Currently Unavailable'}
                        </span>

                        <h1 id="workerName">{worker.name}</h1>

                        <p id="workerLocation">
                            📍 {worker.area}, Sri Lanka
                        </p>

                        <p id="workerPrice" className="price">
                            {worker.hourlyRate != null
                                ? `Rs. ${Number(worker.hourlyRate).toLocaleString()}/hour`
                                : 'Rate not specified'}
                        </p>

                        <hr />

                        <h3>About Me</h3>

                        <p id="workerDescription">
                            {worker.description ||
                                'No description available.'}
                        </p>

                        <h3>Contact Details</h3>

                        <p>
                            <span>Phone: </span>
                            <span id="workerPhone">
                                {worker.phone || 'Not provided'}
                            </span>
                        </p>

                        <p>
                            <span>Email: </span>
                            <span id="workerEmail">
                                {worker.email || 'Not provided'}
                            </span>
                        </p>

                        {worker.phone && (
                            <a
                                id="callButton"
                                href={`tel:${worker.phone}`}
                                className="details-btn"
                            >
                                Call Worker
                            </a>
                        )}
                    </div>
                </div>

                {(worker.projectPictures || []).length > 0 && (
                    <section className="worker-public-projects">
                        <h2>Previous Projects</h2>

                        <div className="worker-public-gallery">
                            {worker.projectPictures.map((picture, index) => (
                                <img
                                    key={index}
                                    src={picture}
                                    alt={`Project ${index + 1}`}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}

export default TileWorkerProfile;
