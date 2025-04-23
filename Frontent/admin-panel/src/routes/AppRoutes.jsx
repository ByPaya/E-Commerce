import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import VendorApproval from '../pages/VendorApproval';
// Add more imports...

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/vendors" element={<VendorApproval />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}
