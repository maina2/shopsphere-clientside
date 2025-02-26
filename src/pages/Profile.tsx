import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useProfile } from "../context/ProfileContext";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css"; 
import Navbar from "../components/Navbar";

const Profile = () => {
  const { user, logoutUser } = useAuth();
  const { profile, loading, error, fetched, fetchProfile, updateProfile } = useProfile();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    bio: "",
    phone: "",
  });
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !fetched) {
      fetchProfile();
    }
  }, [user, fetched, fetchProfile]);

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        username: profile.username || "",
        email: profile.email || "",
        bio: profile.bio || "",
        phone: profile.phone || "",
      });
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(formData, profilePicture || undefined);
    setEditMode(false);
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  if (loading && !fetched) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="home-page">
      <Navbar/>
      <div className="profile-container">
      <div className="profile-header">
        <h2>Profile</h2>
        <h3>{profile?.first_name} {profile?.last_name}</h3>
      </div>
      {editMode ? (
        <form className="edit-form" onSubmit={handleSubmit}>
          <div>
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div className="edit-form-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <div className="profile-details">
          <div className="profile-picture">
            {profile?.profile_picture && (
              <img
                src={profile.profile_picture}
                alt="Profile"
              />
            )}
          </div>
          <p><strong>Username:</strong> {profile?.username}</p>
          <p><strong>Email:</strong> {profile?.email}</p>
          <p><strong>Bio:</strong> {profile?.bio}</p>
          <p><strong>Phone:</strong> {profile?.phone}</p>
          <div className="profile-actions">
            <button onClick={() => setEditMode(true)}>Edit Profile</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Profile;