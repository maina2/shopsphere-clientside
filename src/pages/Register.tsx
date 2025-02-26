import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css"; 
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {registerUser}= useAuth()
  const navigate = useNavigate();



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      await registerUser(first_name,last_name,username, email, password );
      setSuccessMessage("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Join ShopSphere today!</h2>
          <p className="auth-subtitle">Start your  shopping journey with us</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Display error message */}
          {error && <p className="auth-error">{error}</p>}

          {/* Display success message */}
          {successMessage && <p className="auth-success">{successMessage}</p>}

          <div className="input-grid">
            <div className="input-group">
              <label htmlFor="firstName" className="input-label">First Name</label>
              <input
                id="firstName"
                type="text"
                className="auth-input"
                value={first_name}
                onChange={(e)=>setFirstname(e.target.value)}
                placeholder="John"
                required
              />
            
            </div>

            <div className="input-group">
              <label htmlFor="lastName" className="input-label">Last Name</label>
              <input
                id="lastName"
                type="text"
                className="auth-input"
                value={last_name}
                onChange={(e)=>setLastname(e.target.value)}
                placeholder="Doe"
                required
              />
           
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="username" className="input-label">Username</label>
            <input
              id="username"
              type="text"
              className="auth-input"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              placeholder="johndoe123"
              required
            />
            
          </div>

          <div className="input-group">
            <label htmlFor="email" className="input-label">Email</label>
            <input
              id="email"
              type="email"
              className="auth-input"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="john@example.com"
              required
            />
            
          </div>

          <div className="input-group">
            <label htmlFor="password" className="input-label">Password</label>
            <input
              id="password"
              type="password"
              className="auth-input"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="auth-link">
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
