import { Outlet} from 'react-router-dom';

import Sidebar from './sideBarVendor';

export default function VendorLayout() {
  return (
    <div style={{ display: 'flex' }}>
    <Sidebar />
    <div style={{ marginLeft: '240px', padding: '20px', width: '100%' }}>
      <Outlet />
    </div>
  </div>
  );
}

