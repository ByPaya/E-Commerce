import { Link } from 'react-router-dom';

export default function SideBarVendor() {
  return (
    <div style={{ display: 'flex' }}>
    <div className="sidebar">
      <div className="sidebar-logo mt-5">SandBind</div>

      <nav className="sidebar-nav mb-5">
        
        <Link to="/vendordashboard/productListing" className="sidebar-link">🧾 Product Listing </Link>
        <Link to="/orders" className="sidebar-link">📂 Orders</Link>
        <Link to="/sales" className="sidebar-link">📦 Sales</Link>
        <Link to="/reports" className="sidebar-link">📦 Reports</Link>
        <Link to="/getAllProducts" className="sidebar-link">📦 Get All Products</Link>
      </nav>

      <div className="sidebar-logout mb-5">
        <Link to="/logout" className="logout-button">⏻ Logout</Link>
      </div>
    </div>
   
    </div>
  );
}

