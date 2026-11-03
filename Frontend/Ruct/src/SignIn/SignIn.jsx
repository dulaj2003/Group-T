import { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css';

function SignIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setError('');

        // Frontend demonstration only
        console.log('Sign In Data:', formData);

        alert('Sign In form submitted successfully!');
    }

    return (
        <div className="signin-container">
            <form className="signin-form" onSubmit={handleSubmit}>

                {/* Header */}
                <div className="signin-header">
                    <h1>Welcome Back!</h1>
                    <p>Sign in to continue to Ruct</p>
                </div>

                {/* Email */}
                <div className="signin-group">
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

                {/* Password */}
                <div className="signin-group">
                    <label htmlFor="password">Password *</label>

                    <div className="signin-password-wrapper">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <button
                            type="button"
                            className="signin-toggle-password"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>

                {/* Remember Me and Forgot Password */}
                <div className="signin-options">
                    <label className="remember-me">
                        <input type="checkbox" name="rememberMe" />
                        Remember me
                    </label>

                    <Link to="/forgot-password">
                        Forgot password?
                    </Link>
                </div>

                {/* Error Message */}
                {error && (
                    <p className="signin-error">{error}</p>
                )}

                {/* Sign In Button */}
                <button type="submit" className="signin-button">
                    Sign In
                </button>

                {/* Registration Link */}
                <p className="signin-register-link">
                    Don't have an account?{' '}
                    <Link to="/register">Create Account</Link>
                </p>

            </form>
        </div>
    );
}

export default SignIn;
