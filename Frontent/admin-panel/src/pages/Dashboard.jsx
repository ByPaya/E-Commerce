// import { Link } from 'react-router-dom';

// export default function Dashboard() {
//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Admin Dashboard</h1>
//       <p>Welcome to your platform overview.</p>
//       <ul style={{ listStyle: 'none', padding: 0 }}>
//         <li><Link to="/products">📦 Add Product</Link></li>
//         <li><Link to="/vendors">👨‍💼 Manage Vendors Approve Vendor</Link></li>
//         <li><Link to="/category-products">📂 
//         CategorieProducts Search product by category id </Link></li>
//         <li > <Link to="/categories"></Link> CreateCatgory </li>
//         <li><Link to="/getAllProducts">💰 get all Products Details </Link></li>
//       </ul>
//     </div>
//   );
// }
import { Link } from 'react-router-dom';
import '../style/admindashboard.css'; // ✅ Import the CSS file

export default function Sidebar() {
  return (
    <div className="sidebar">
      
      <div className="sidebar-logo">SandBind</div>

      <nav className="sidebar-nav">
        
        <Link to="/vendors" className="sidebar-link">🧾 Vendor Approval</Link>
        <Link to="/categories" className="sidebar-link">💰 Create a new     categories</Link>
        <Link to="/category-products" className="sidebar-link">📂 Categories</Link>
        <Link to="/products" className="sidebar-link">📦 Products</Link>
        <Link to="/getAllProducts" className="sidebar-link">📦 Get All Products</Link>
        <Link to="/users" className="sidebar-link">👥 Users</Link>
        <Link to="/orders" className="sidebar-link">🚚 Orders</Link>
      </nav>

      <div className="sidebar-logout">
        <Link to="/logout" className="logout-button">⏻ Logout</Link>
      </div>
    </div>
  );
}

