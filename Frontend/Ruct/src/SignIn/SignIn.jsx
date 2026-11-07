import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css';

function SignIn() {
    const navigate = useNavigate();

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

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(
                'http://localhost:5000/api/auth/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password
                    })
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Login failed.');
            }

            if (!['customer', 'worker'].includes(result.data.user.role)) {
                throw new Error('Invalid account role.');
            }

            sessionStorage.setItem('token', result.data.token);
            sessionStorage.setItem(
                'user',
                JSON.stringify(result.data.user)
            );

            window.dispatchEvent(new Event('ruct-auth-changed'));

            alert('Login successful!');

            console.log('Logged in user:', result.data.user);

            setFormData({
                email: '',
                password: ''
            });

            navigate('/', { replace: true });

        } catch (error) {
            console.error('User login error:', error);
            setError(error.message || 'Unable to connect to the server.');
        }
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
