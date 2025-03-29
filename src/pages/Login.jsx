// Login.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import MatlaLogo from "../assets/img/appicon.png";
import { Link } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(signInUser(email, password));
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div id="login_page">
      <div className="form-side">
        <div className="header-part">
          <img src={MatlaLogo} alt="Matla Logo" />
        </div>
        <form onSubmit={handleLogin}>
          <div className="form-header">
            <span>
              <LoginIcon />
            </span>
            <h4>Welcome back to Lighthouse Medicare Booking</h4>
            <p>Enter your email and password to continue.</p>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <p className="forgot-password">
            <Link to="">Forgot Password</Link>
          </p>
          <button type="submit" className="sign-btn" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
          {error && <p className="error white">{error}</p>}
        </form>
        <div className="footer-part">
          <p>&copy; {new Date().getFullYear()} Lighthouse Medicare.</p>
          <p>All rights reserved.</p>
          <div className="terms-links">
            <a href="http://" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
      <div className="image-side"></div>
    </div>
  );
};

export default Login;
