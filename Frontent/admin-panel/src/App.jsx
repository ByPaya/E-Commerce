
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
import Register from './pages/User/Register';
import Login from './pages/User/Login';
import DashboardUser from './pages/User/DashboardUser';
import Cart from './pages/User/Cart';
import VendorLayout from './pages/Vendor/VendorLayout';
import VendorProducts from './pages/Vendor/VendorProducts';
import Index from './components/Index';
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
      <Route path='/index' element={<Index />} /> 
 
      <Route path='/home'  element={<HomePage />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/register' element ={<Register />} />
      <Route path='/login' element ={<Login />} />
       <Route path="/UserDash" element={< DashboardUser />} />
      <Route path="/" element={<AdminLayout />}>
        <Route path="vendors" element={<VendorApproval />} />
        <Route path="categories" element={<CreateCategory />} />
        <Route path="products" element={<AddProduct />} />
        <Route path="category-products" element={<CategoryProduct />} />
        <Route path="getAllProducts" element={<GetAllProducts />} />
        <Route path="/register-vendor" element={<VendorRegistration />} />
      </Route>
   
   <Route path='vendorProduts' element  ={<VendorProducts />}/>
  

    </Routes>

    </div>
  );
}
