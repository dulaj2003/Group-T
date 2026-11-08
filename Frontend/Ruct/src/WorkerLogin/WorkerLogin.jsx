
import { useState } from 'react';
import './WorkerLogin.css';

const districts = [
    'Ampara',
    'Anuradhapura',
    'Badulla',
    'Batticaloa',
    'Colombo',
    'Galle',
    'Gampaha',
    'Hambantota',
    'Jaffna',
    'Kalutara',
    'Kandy',
    'Kegalle',
    'Kilinochchi',
    'Kurunegala',
    'Mannar',
    'Matale',
    'Matara',
    'Monaragala',
    'Mullaitivu',
    'Nuwara Eliya',
    'Polonnaruwa',
    'Puttalam',
    'Ratnapura',
    'Trincomalee',
    'Vavuniya'
];

function WorkerLogin() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        category: '',
        location: '',
        hourlyRate: '',
        description: '',
        password: '',
        confirmPassword: ''
    });

    const [profilePicture, setProfilePicture] = useState(null);
    const [projectPictures, setProjectPictures] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const wordCount = formData.description.trim()
        ? formData.description.trim().split(/\s+/).length
        : 0;

    function handleChange(e) {
        const { name, value } = e.target;

        if (name === 'description') {
            const words = value.trim()
                ? value.trim().split(/\s+/)
                : [];

            if (words.length > 100) {
                setError('Description cannot exceed 100 words.');
                return;
            }
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        setError('');
        setSuccess('');
    }

    function handleProfileChange(e) {
        const file = e.target.files[0];

        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setError('Please select a valid profile picture.');
            e.target.value = '';
            return;
        }

        setProfilePicture(file);
        setError('');
        setSuccess('');
    }

    function handleProjectsChange(e) {
        const files = Array.from(e.target.files);

        if (files.length > 5) {
            setError('You can upload a maximum of 5 project pictures.');
            e.target.value = '';
            return;
        }

        if (files.some(file => !file.type.startsWith('image/'))) {
            setError('All project files must be images.');
            e.target.value = '';
            return;
        }

        setProjectPictures(files);
        setError('');
        setSuccess('');
    }

    
    async function handleSubmit(e) {
        e.preventDefault();

        setError('');
        setSuccess('');

        if (wordCount > 100) {
            setError('Description cannot exceed 100 words.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (formData.password.length < 8) {
            setError('Password must contain at least 8 characters.');
            return;
        }

        try {
            setIsSubmitting(true);

            // Create FormData for text fields and image files
            const data = new FormData();

            data.append('name', formData.username);
            data.append('email', formData.email);
            data.append('phone', formData.phone.trim());
            data.append('password', formData.password);
            data.append('trade', formData.category);
            data.append('area', formData.location);
            data.append('hourlyRate', formData.hourlyRate);
            data.append('description', formData.description);

            // Add profile picture if selected
            if (profilePicture) {
                data.append('profilePicture', profilePicture);
            }

            // Add project pictures
            projectPictures.forEach((file) => {
                data.append('projectPictures', file);
            });

            // Send registration request to backend
            const response = await fetch(
                'http://localhost:5000/api/auth/register/worker',
                {
                    method: 'POST',
                    body: data
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || 'Worker registration failed.'
                );
            }

            setSuccess('Worker registered successfully!');

            // Clear form after successful registration
            setFormData({
                username: '',
                email: '',
                phone: '',
                category: '',
                location: '',
                hourlyRate: '',
                description: '',
                password: '',
                confirmPassword: ''
            });

            setProfilePicture(null);
            setProjectPictures([]);

            const profileInput = document.getElementById('workerProfile');
            const projectInput = document.getElementById('workerProjects');

            if (profileInput) profileInput.value = '';
            if (projectInput) projectInput.value = '';

        } catch (error) {
            console.error('Worker registration error:', error);

            setError(
                error.message || 'Unable to connect to the server.'
            );
        } finally {
            setIsSubmitting(false);
        }
    }


    return (
        <div className="worker-register-container">
            <form
                className="worker-register-form"
                onSubmit={handleSubmit}
            >
                <header className="worker-register-header">
                    <h1>Worker Registration</h1>
                    <p>
                        Join Ruct and showcase your construction services.
                    </p>
                </header>

                {/* Profile Picture */}
                <div className="worker-profile-section">
                    <div className="worker-profile-preview">
                        {profilePicture ? (
                            <img
                                src={URL.createObjectURL(profilePicture)}
                                alt="Profile preview"
                            />
                        ) : (
                            <span>👤</span>
                        )}
                    </div>

                    <label htmlFor="workerProfile">
                        Profile Picture (Optional)
                    </label>

                    <input
                        type="file"
                        id="workerProfile"
                        accept="image/*"
                        onChange={handleProfileChange}
                    />
                </div>

                {/* Username */}
                <div className="worker-form-group">
                    <label htmlFor="workerUsername">Username *</label>
                    <input
                        type="text"
                        id="workerUsername"
                        name="username"
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={handleChange}
                        autoComplete="username"
                        required
                    />
                </div>

                {/* Email */}
                <div className="worker-form-group">
                    <label htmlFor="workerEmail">Email Address *</label>
                    <input
                        type="email"
                        id="workerEmail"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                    />
                </div>

                {/* Phone Number */}
                <div className="worker-form-group">
                    <label htmlFor="workerPhone">Phone Number *</label>
                    <input
                        type="tel"
                        id="workerPhone"
                        name="phone"
                        placeholder="Enter your phone number (e.g. 0771234567)"
                        value={formData.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                        pattern="(?:0[0-9]{9}|\+94[0-9]{9})"
                        required
                    />
                </div>

                {/* Hourly Rate */}
                <div className="worker-form-group">
                    <label htmlFor="workerHourlyRate">Hourly Rate (Rs.) *</label>
                    <input
                        type="number"
                        id="workerHourlyRate"
                        name="hourlyRate"
                        placeholder="Enter your hourly rate"
                        value={formData.hourlyRate}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        required
                    />
                </div>

                {/* Category */}
                <div className="worker-form-group">
                    <label htmlFor="workerCategory">Category *</label>

                    <select
                        id="workerCategory"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select your category</option>
                        <option value="Construction Worker">Construction Worker</option>
                        <option value="Electrician">Electrician</option>
                        <option value="Mason">Mason</option>
                        <option value="Painter">Painter</option>
                        <option value="Plumber">Plumber</option>
                        <option value="Roof Worker">Roof Worker</option>
                        <option value="Tile Worker">Tile Worker</option>
                    </select>
                </div>

                {/* District */}
                <div className="worker-form-group">
                    <label htmlFor="workerLocation">
                        District *
                    </label>

                    <select
                        id="workerLocation"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select your district</option>
                        {districts.map(district => (
                            <option key={district} value={district}>
                                {district}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Description */}
                <div className="worker-form-group">
                    <label htmlFor="workerDescription">
                        About Your Services * (Maximum 100 words)
                    </label>

                    <textarea
                        id="workerDescription"
                        name="description"
                        placeholder="Describe your skills, experience, and services..."
                        value={formData.description}
                        onChange={handleChange}
                        rows="5"
                        required
                    />

                    <small className={
                        wordCount >= 100
                            ? 'worker-word-count limit'
                            : 'worker-word-count'
                    }>
                        {wordCount}/100 words
                    </small>
                </div>

                {/* Project Pictures */}
                <div className="worker-form-group">
                    <label htmlFor="workerProjects">
                        Project Pictures (Maximum 5)
                    </label>

                    <input
                        className="worker-file-input"
                        type="file"
                        id="workerProjects"
                        accept="image/*"
                        multiple
                        onChange={handleProjectsChange}
                    />

                    <small className="worker-help-text">
                        Upload up to 5 images of your completed projects.
                    </small>

                    {projectPictures.length > 0 && (
                        <div className="worker-project-preview">
                            {projectPictures.map((file, index) => (
                                <div
                                    className="worker-project-image"
                                    key={`${file.name}-${index}`}
                                >
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`Project ${index + 1}`}
                                    />
                                    <span>Project {index + 1}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Password */}
                <div className="worker-form-group">
                    <label htmlFor="workerPassword">Password *</label>
                    <input
                        type="password"
                        id="workerPassword"
                        name="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                        minLength={8}
                        required
                    />
                </div>

                {/* Confirm Password */}
                <div className="worker-form-group">
                    <label htmlFor="workerConfirmPassword">
                        Confirm Password *
                    </label>
                    <input
                        type="password"
                        id="workerConfirmPassword"
                        name="confirmPassword"
                        placeholder="Re-enter your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        autoComplete="new-password"
                        minLength={8}
                        required
                    />
                </div>

                {error && (
                    <p className="worker-form-error" role="alert">
                        {error}
                    </p>
                )}

                {success && (
                    <p className="worker-form-success" role="status">
                        {success}
                    </p>
                )}

                <button
                    type="submit"
                    className="worker-register-button"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Registering...' : 'Register as a Worker'}
                </button>
            </form>
        </div>
    );
}

export default WorkerLogin;
