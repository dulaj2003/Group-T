
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerProfile.css';

function CustomerProfile() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        district: '',
        phone: ''
    });
    const [profilePicture, setProfilePicture] = useState(null);
    const [preview, setPreview] = useState('');
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        let active = true;

        async function loadProfile() {
            const token = sessionStorage.getItem('token');

            if (!token) {
                navigate('/login', { replace: true });
                return;
            }

            try {
                const response = await fetch(
                    'http://localhost:5000/api/auth/me',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || 'Unable to load profile.');
                }

                if (result.data.user.role !== 'customer') {
                    navigate('/', { replace: true });
                    return;
                }

                if (active) {
                    const customer = result.data.user;

                    setUser(customer);
                    setFormData({
                        name: customer.name || '',
                        district: customer.district || '',
                        phone: customer.phone || ''
                    });
                    setPreview(customer.profilePicture || '');
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

        loadProfile();

        return () => {
            active = false;
        };
    }, [navigate]);

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData(previous => ({
            ...previous,
            [name]: value
        }));
    }

    function handlePictureChange(e) {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setError('Please select an image.');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError('Image must be smaller than 5 MB.');
            return;
        }

        setProfilePicture(file);
        setPreview(URL.createObjectURL(file));
        setError('');
    }

    function handleCancel() {
        setFormData({
            name: user.name || '',
            district: user.district || '',
            phone: user.phone || ''
        });

        setProfilePicture(null);
        setPreview(user.profilePicture || '');
        setEditing(false);
        setError('');
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!editing || saving) {
            return;
        }

        setSaving(true);
        setError('');
        setSuccess('');

        try {
            const data = new FormData();

            data.append('name', formData.name);
            data.append('district', formData.district);
            data.append('phone', formData.phone);

            if (profilePicture) {
                data.append('profilePicture', profilePicture);
            }

            const response = await fetch(
                'http://localhost:5000/api/auth/me',
                {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`
                    },
                    body: data
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Update failed.');
            }

            const updatedUser = result.data.user;

            setUser(updatedUser);
            setFormData({
                name: updatedUser.name || '',
                district: updatedUser.district || '',
                phone: updatedUser.phone || ''
            });
            setPreview(updatedUser.profilePicture || '');
            setProfilePicture(null);
            setEditing(false);
            setSuccess('Profile updated successfully!');

            sessionStorage.setItem('user', JSON.stringify(updatedUser));
            window.dispatchEvent(new Event('ruct-auth-changed'));

        } catch (err) {
            setError(err.message || 'Unable to update profile.');
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return <div className="customer-profile-page">Loading profile...</div>;
    }

    if (!user) {
        return <div className="customer-profile-page">{error || 'Profile unavailable.'}</div>;
    }

    return (
        <div className="customer-profile-page">
            <div className="customer-profile-card">
                <h1>My Profile</h1>
                <p className="customer-profile-subtitle">Manage your RUCT customer information</p>

                <div className="customer-profile-avatar">
                    {preview ? (
                        <img src={preview} alt="Customer profile" />
                    ) : (
                        <div className="customer-profile-initial">
                            {user.name?.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>

                {editing && (
                    <div className="customer-profile-upload">
                        <label htmlFor="customerPicture">Change Profile Picture</label>
                        <input
                            id="customerPicture"
                            type="file"
                            accept="image/*"
                            onChange={handlePictureChange}
                        />
                    </div>
                )}

                {error && <p className="customer-profile-error">{error}</p>}
                {success && <p className="customer-profile-success">{success}</p>}

                <form onSubmit={handleSubmit}>
                    <label>Full Name</label>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!editing}
                        required
                    />

                    <label>Email Address</label>
                    <input
                        value={user.email}
                        disabled
                    />

                    <label>District</label>
                    <input
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        disabled={!editing}
                        required
                    />

                    <label>Phone Number</label>
                    <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!editing}
                        placeholder="Enter phone number"
                    />

                    {editing && (
                        <div className="customer-profile-actions">
                            <button type="submit" disabled={saving}>
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>

                            <button
                                type="button"
                                className="customer-cancel-btn"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </form>
                {!editing && (
                    <div className="customer-profile-actions">
                        <button
                            type="button"
                            onClick={() => {
                                setError('');
                                setSuccess('');
                                setEditing(true);
                            }}
                        >
                            Edit Profile
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CustomerProfile;
