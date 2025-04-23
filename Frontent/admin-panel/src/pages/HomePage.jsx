import React from 'react';
import { Link } from 'react-router-dom';
import '../style/HomePage.css';  // Import the CSS for styling

const HomePage = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <ul>
            <li><Link to="/admin-login">Admin Login</Link></li>
            <li><Link to="/vendor-registration">Vendor Registration</Link></li>
            <li><Link to="/user-registration">User Registration</Link></li>
          </ul>
        </div>
      </nav>

      {/* Main content */}
      <div className="content">
        <h1>Welcome to Our Platform</h1>
        <p>This is the homepage where you can log in as an admin or register as a vendor or user.</p>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Our Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
