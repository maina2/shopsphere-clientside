import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div>
      <h2>{user.first_name}{user.last_name}</h2>
      <h3>{user.username}</h3>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
