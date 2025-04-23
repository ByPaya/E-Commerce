import { useEffect, useState } from 'react';
import axios from 'axios';

export default function VendorApproval() {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8082/api/admin/vendors/pending')
      .then(async (res) => {
        const vendorList = res.data;

        // Fetch business licenses for each vendor
        const updatedVendors = await Promise.all(
          vendorList.map(async (vendor) => {
            try {
              const licenseRes = await axios.get(`http://localhost:8082/api/vendors/license/${vendor.id}`, {
                responseType: 'blob',
              });

              // Create an object URL for the license blob
              const licenseUrl = URL.createObjectURL(licenseRes.data);
              return { ...vendor, businessLicenseUrl: licenseUrl };
            } catch (err) {
              console.error(`Error fetching license for vendor ${vendor.id}:`, err);
              return { ...vendor, businessLicenseUrl: null };
            }
          })
        );

        setVendors(updatedVendors);
      })
      .catch(err => console.error("Error fetching vendors:", err));
  }, []);

  const approveVendor = (id) => {
    axios.post(`http://localhost:8082/api/admin/vendors/approve/${id}`)
      .then(() => {
        alert('✅ Vendor Approved!');
        setVendors(prev => prev.filter(v => v.id !== id));
      })
      .catch(err => {
        console.error("Approval error:", err);
        alert("❌ Approval failed.");
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🛂 Pending Vendor Requests</h2>
      {vendors.length === 0 ? (
        <p>No pending vendors.</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Business License</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map(v => (
              <tr key={v.id}>
                <td>{v.name}</td>
                <td>{v.email}</td>
                <td>{v.phone}</td>
                <td>
                  {v.businessLicenseUrl ? (
                    <a href={v.businessLicenseUrl} target="_blank" rel="noopener noreferrer">
                      View Document
                    </a>
                  ) : (
                    "Unavailable"
                  )}
                </td>
                <td>
                  <button onClick={() => approveVendor(v.id)}>Approve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
