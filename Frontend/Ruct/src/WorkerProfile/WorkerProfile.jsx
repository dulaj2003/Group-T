
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WorkerProfile.css';

const API = `${import.meta.env.VITE_API_URL}/api/workers/my-profile`;

function makeForm(profile) {
    return {
        name: profile.name || '',
        phone: profile.phone || '',
        trade: profile.trade || '',
        area: profile.area || '',
        location: profile.location || '',
        description: profile.description || '',
        hourlyRate: profile.hourlyRate ?? '',
        availability: profile.availability ?? true
    };
}

function WorkerProfile() {
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [form, setForm] = useState(makeForm({}));
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [profileFile, setProfileFile] = useState(null);
    const [projectFiles, setProjectFiles] = useState([]);
    const [removedPictures, setRemovedPictures] = useState([]);

    const [profilePreviewUrl, setProfilePreviewUrl] = useState('');
    const [projectPreviewUrls, setProjectPreviewUrls] = useState([]);

    useEffect(() => {
        let active = true;

        async function loadProfile() {
            const token = sessionStorage.getItem('token');

            if (!token) {
                navigate('/login', { replace: true });
                return;
            }

            try {
                const response = await fetch(API, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(
                        result.message || 'Unable to load profile.'
                    );
                }

                if (active) {
                    setProfile(result.data);
                    setForm(makeForm(result.data));
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

    useEffect(() => {
        const profileUrl = profileFile
            ? URL.createObjectURL(profileFile)
            : '';

        const projectUrls = projectFiles.map(file =>
            URL.createObjectURL(file)
        );

        setProfilePreviewUrl(profileUrl);
        setProjectPreviewUrls(projectUrls);

        return () => {
            if (profileUrl) {
                URL.revokeObjectURL(profileUrl);
            }

            projectUrls.forEach(url => {
                URL.revokeObjectURL(url);
            });
        };
    }, [profileFile, projectFiles]);

    const profilePreview =
        profilePreviewUrl || profile?.profilePicture || '';

    const projectPreviews = projectFiles.map((file, index) => ({
        file,
        url: projectPreviewUrls[index] || ''
    }));

    function handleChange(e) {
        const { name, value, type, checked } = e.target;

        setForm(previous => ({
            ...previous,
            [name]: type === 'checkbox' ? checked : value
        }));
    }

    function handleProfilePicture(e) {
        const file = e.target.files?.[0];

        if (!file) return;

        if (
            !file.type.startsWith('image/') ||
            file.size > 5 * 1024 * 1024
        ) {
            setError('Select an image smaller than 5 MB.');
            e.target.value = '';
            return;
        }

        setProfileFile(file);
        setError('');
        e.target.value = '';
    }

    function handleProjectPictures(e) {
        const files = Array.from(e.target.files || []);

        const existingCount =
            (profile.projectPictures || []).length -
            removedPictures.length;

        const availableSlots =
            5 - existingCount - projectFiles.length;

        if (files.length > availableSlots) {
            setError(
                `You can add only ${availableSlots} more project pictures.`
            );
            e.target.value = '';
            return;
        }

        if (
            files.some(file =>
                !file.type.startsWith('image/') ||
                file.size > 5 * 1024 * 1024
            )
        ) {
            setError(
                'Each project picture must be an image smaller than 5 MB.'
            );
            e.target.value = '';
            return;
        }

        setProjectFiles(previous => [
            ...previous,
            ...files
        ]);

        setError('');
        e.target.value = '';
    }

    function toggleRemovePicture(url) {
        setRemovedPictures(previous =>
            previous.includes(url)
                ? previous.filter(item => item !== url)
                : [...previous, url]
        );
    }

    function removeNewPicture(index) {
        setProjectFiles(previous =>
            previous.filter((_, i) => i !== index)
        );
    }

    function handleCancel() {
        setForm(makeForm(profile));
        setProfileFile(null);
        setProjectFiles([]);
        setRemovedPictures([]);
        setEditing(false);
        setError('');
        setSuccess('');
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

            Object.entries(form).forEach(([key, value]) => {
                data.append(key, String(value));
            });

            data.append(
                'removeProjectPictures',
                JSON.stringify(removedPictures)
            );

            if (profileFile) {
                data.append('profilePicture', profileFile);
            }

            projectFiles.forEach(file => {
                data.append('projectPictures', file);
            });

            const response = await fetch(API, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                },
                body: data
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || 'Unable to update profile.'
                );
            }

            const updatedProfile = result.data;

            setProfile(updatedProfile);
            setForm(makeForm(updatedProfile));
            setProfileFile(null);
            setProjectFiles([]);
            setRemovedPictures([]);
            setEditing(false);

            setSuccess('Worker profile updated successfully!');

            const savedUser = JSON.parse(
                sessionStorage.getItem('user') || '{}'
            );

            sessionStorage.setItem(
                'user',
                JSON.stringify({
                    ...savedUser,
                    name: updatedProfile.name,
                    phone: updatedProfile.phone,
                    profilePicture: updatedProfile.profilePicture
                })
            );

            window.dispatchEvent(
                new Event('ruct-auth-changed')
            );

        } catch (err) {
            setError(
                err.message || 'Unable to update profile.'
            );
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="worker-profile-page">
                Loading profile...
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="worker-profile-page">
                {error || 'Profile unavailable.'}
            </div>
        );
    }

    return (
        <div className="worker-profile-page">
            <div className="worker-profile-card">

                <h1>My Worker Profile</h1>

                <p className="worker-profile-subtitle">
                    Manage your RUCT worker information
                </p>

                <div className="worker-profile-avatar">
                    {profilePreview ? (
                        <img
                            src={profilePreview}
                            alt="Worker profile"
                        />
                    ) : (
                        <div className="worker-profile-initial">
                            {profile.name?.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>

                {editing && (
                    <div className="worker-profile-upload">
                        <label>Change Profile Picture</label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfilePicture}
                            disabled={saving}
                        />
                    </div>
                )}

                {error && (
                    <p className="worker-profile-error">
                        {error}
                    </p>
                )}

                {success && (
                    <p className="worker-profile-success">
                        {success}
                    </p>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="worker-profile-fields">

                        <label>Full Name</label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            disabled={!editing || saving}
                            required
                        />

                        <label>Email Address</label>
                        <input
                            value={profile.email || ''}
                            disabled
                        />

                        <label>Phone Number</label>
                        <input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            disabled={!editing || saving}
                        />

                        <label>Trade</label>
                        <input
                            name="trade"
                            value={form.trade}
                            onChange={handleChange}
                            disabled={!editing || saving}
                            required
                        />

                        <label>Working Area</label>
                        <input
                            name="area"
                            value={form.area}
                            onChange={handleChange}
                            disabled={!editing || saving}
                            required
                        />

                        <label>Location</label>
                        <input
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            disabled={!editing || saving}
                        />
                        
                        <label>Hourly Rate (LKR)</label>
                        <input
                            type="number"
                            name="hourlyRate"
                            min="0"
                            value={form.hourlyRate}
                            onChange={handleChange}
                            disabled={!editing || saving}
                        />

                        <label>Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            disabled={!editing || saving}
                            rows="4"
                        />

                        <label className="worker-availability">
                            <input
                                type="checkbox"
                                name="availability"
                                checked={form.availability}
                                onChange={handleChange}
                                disabled={!editing || saving}
                            />
                            Available for work
                        </label>

                    </div>

                    <h2>Project Pictures</h2>

                    <p className="worker-project-hint">
                        Maximum 5 pictures
                    </p>

                    <div className="worker-project-gallery">

                        {(profile.projectPictures || []).map(url => (
                            <div
                                className="worker-project-image"
                                key={url}
                            >
                                <img
                                    src={url}
                                    alt="Completed project"
                                />

                                {editing && (
                                    <button
                                        type="button"
                                        disabled={saving}
                                        className={
                                            removedPictures.includes(url)
                                                ? 'worker-restore-btn'
                                                : 'worker-remove-btn'
                                        }
                                        onClick={() =>
                                            toggleRemovePicture(url)
                                        }
                                    >
                                        {removedPictures.includes(url)
                                            ? 'Undo'
                                            : 'Remove'}
                                    </button>
                                )}

                                {removedPictures.includes(url) && (
                                    <span className="worker-removal-label">
                                        Will be removed
                                    </span>
                                )}
                            </div>
                        ))}

                        {projectPreviews.map((item, index) => (
                            <div
                                className="worker-project-image"
                                key={index}
                            >
                                {item.url && (
                                    <img
                                        src={item.url}
                                        alt="New project"
                                    />
                                )}

                                {editing && (
                                    <button
                                        type="button"
                                        className="worker-remove-btn"
                                        disabled={saving}
                                        onClick={() =>
                                            removeNewPicture(index)
                                        }
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}

                    </div>

                    {editing && (
                        <div className="worker-profile-upload">
                            <label>Add Project Pictures</label>

                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleProjectPictures}
                                disabled={saving}
                            />
                        </div>
                    )}

                    {editing && (
                        <div className="worker-profile-actions">

                            <button
                                type="submit"
                                disabled={saving}
                            >
                                {saving
                                    ? 'Saving...'
                                    : 'Save Changes'}
                            </button>

                            <button
                                type="button"
                                className="worker-cancel-btn"
                                onClick={handleCancel}
                                disabled={saving}
                            >
                                Cancel
                            </button>

                        </div>
                    )}

                </form>

                {!editing && (
                    <div className="worker-profile-actions">

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

export default WorkerProfile;
