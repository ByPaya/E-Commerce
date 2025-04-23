import { Outlet } from 'react-router-dom';
import Sidebar from '../pages/Dashboard';

export default function AdminLayout() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '240px', padding: '20px', width: '100%' }}>
        <Outlet />
      </div>
    </div>
  );
}
