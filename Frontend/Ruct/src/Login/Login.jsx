import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        location: '',
        password: '',
        confirmPassword: ''
    });

    const [profilePicture, setProfilePicture] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handlePictureChange(e) {
        const file = e.target.files[0];

        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Please select a valid image.');
                return;
            }

            setProfilePicture(file);
            setPreview(URL.createObjectURL(file));
            setError('');
        }
    }


    async function handleSubmit(e) {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        if (formData.password.length < 8) {
            setError('Password must contain at least 8 characters.');
            return;
        }

        try {
            const data = new FormData();

            data.append('name', formData.username);
            data.append('email', formData.email);
            data.append('district', formData.location);
            data.append('password', formData.password);

            if (profilePicture) {
                data.append('profilePicture', profilePicture);
            }

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/auth/register/customer`,
                {
                    method: 'POST',
                    body: data
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Registration failed.');
            }

            alert('Customer account created successfully!');

            console.log('Registered customer:', result.data.user);

            setFormData({
                username: '',
                email: '',
                location: '',
                password: '',
                confirmPassword: ''
            });

            setProfilePicture(null);
            setPreview(null);

            const pictureInput = document.getElementById('profilePicture');

            if (pictureInput) {
                pictureInput.value = '';
            }

        } catch (error) {
            console.error('Customer registration error:', error);
            setError(error.message || 'Unable to connect to the server.');
        }
    }

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                
                <div className="register-header">
                    <h1>Create Account</h1>
                    <p>Join Ruct — One Platform, One Industry</p>
                </div>

                {/* Profile Picture */}
                <div className="profile-picture-section">
                    <div className="profile-preview">
                        {preview ? (
                            <img src={preview} alt="Profile Preview" />
                        ) : (
                            <span>👤</span>
                        )}
                    </div>

                    <label htmlFor="profilePicture">
                        Upload Profile Picture
                    </label>

                    <input
                        type="file"
                        id="profilePicture"
                        accept="image/*"
                        onChange={handlePictureChange}
                    />
                </div>

                {/* Username */}
                <div className="form-group">
                    <label htmlFor="username">Username *</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Email */}
                <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                
                {/* Location */}
                <div className="form-group">
                    <label htmlFor="location">District *</label>

                    <select
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select your district</option>
                        <option value="Ampara">Ampara</option>
                        <option value="Anuradhapura">Anuradhapura</option>
                        <option value="Badulla">Badulla</option>
                        <option value="Batticaloa">Batticaloa</option>
                        <option value="Colombo">Colombo</option>
                        <option value="Galle">Galle</option>
                        <option value="Gampaha">Gampaha</option>
                        <option value="Hambantota">Hambantota</option>
                        <option value="Jaffna">Jaffna</option>
                        <option value="Kalutara">Kalutara</option>
                        <option value="Kandy">Kandy</option>
                        <option value="Kegalle">Kegalle</option>
                        <option value="Kilinochchi">Kilinochchi</option>
                        <option value="Kurunegala">Kurunegala</option>
                        <option value="Mannar">Mannar</option>
                        <option value="Matale">Matale</option>
                        <option value="Matara">Matara</option>
                        <option value="Monaragala">Monaragala</option>
                        <option value="Mullaitivu">Mullaitivu</option>
                        <option value="Nuwara Eliya">Nuwara Eliya</option>
                        <option value="Polonnaruwa">Polonnaruwa</option>
                        <option value="Puttalam">Puttalam</option>
                        <option value="Ratnapura">Ratnapura</option>
                        <option value="Trincomalee">Trincomalee</option>
                        <option value="Vavuniya">Vavuniya</option>
                    </select>
                </div>


                {/* Password */}
                <div className="form-group">
                    <label htmlFor="password">Password *</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={8}
                    />
                </div>

                {/* Confirm Password */}
                <div className="form-group">
                    <label htmlFor="confirmPassword">
                        Confirm Password *
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        minLength={8}
                    />
                </div>

                {/* Error Message */}
                {error && <p className="form-error">{error}</p>}

                <button type="submit" className="register-button">
                    Create Account
                </button>

                <p className="login-link">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>

            </form>
        </div>
    );
}

export default Login;
