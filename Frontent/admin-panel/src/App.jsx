
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './pages/AdminLayout';
import VendorRegistration from "./pages/VendorRegistration";
import Dashboard from './pages/Dashboard';
import VendorApproval from './pages/VendorApproval';
import CreateCategory from './pages/CreateCategory';
import AddProduct from './pages/AddProduct';
import CategoryProduct from './pages/CategoryProduct';
import GetAllProducts from './pages/GetAllProducts';
import HomePage from './pages/HomePage';
// import test from './pages/test';

export default function App() {
  return (
    <div style={{ padding: '20px' }}>
      {/* <h1>🛠️ Admin Panel</h1> */}

      {/* <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/vendors" element={<VendorApproval />} />
        <Route path="/categories" element={<CreateCategory />} />
        <Route path="/products" element={<AddProduct />} />
        <Route path="/category-products" element={<CategoryProduct />} />
        <Route path="/getAllProducts" element={<GetAllProducts />} />
      </Routes> */}
      
      <Routes>
      {/* 🧱 Nest routes inside AdminLayout */}
      <Route path="/" element={<AdminLayout />}>
       <Route path='/home'  element={<HomePage />} />
        <Route path="vendors" element={<VendorApproval />} />
        <Route path="categories" element={<CreateCategory />} />
        <Route path="products" element={<AddProduct />} />
        <Route path="category-products" element={<CategoryProduct />} />
        <Route path="getAllProducts" element={<GetAllProducts />} />
        <Route path="/register-vendor" element={<VendorRegistration />} />
      </Route>
    </Routes>

    </div>
  );
}
