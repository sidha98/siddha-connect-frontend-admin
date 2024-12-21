import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './style.scss';
import config from "../../config";
const { backend_url } = config;

function Login() {
  const [role, setRole] = useState("employee");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    // Input validation
    if (!code || !password) {
      setError("Please enter both code and password.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${backend_url}/login`, { role, code, password });
      localStorage.setItem("token", response.data.token);
      
      if (role === "dealer"){
        navigate("/dealer-dashboard/finance")
      } else {
        navigate("/extraction-overview")
      }

    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        {/* Role Selection */}
        <div className="input-group">
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="input-field">
            <option value="employee">Employee</option>
            <option value="dealer">Dealer</option>
          </select>
        </div>

        {/* Code Input */}
        <div className="input-group">
          <label>Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter Code"
            className="input-field"
            required
          />
        </div>

        {/* Password Input with Toggle */}
        <div className="input-group">
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input-field"
            required
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        {/* Login Button */}
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
