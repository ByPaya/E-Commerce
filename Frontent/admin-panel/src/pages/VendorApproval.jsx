// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function VendorApproval() {
//   const [vendors, setVendors] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:8082/api/admin/vendors/pending')
//       .then(async (res) => {
//         const vendorList = res.data;

//         // Fetch business licenses for each vendor
//         const updatedVendors = await Promise.all(
//           vendorList.map(async (vendor) => {
//             try {
//               const licenseRes = await axios.get(`http://localhost:8082/api/vendors/license/${vendor.id}`, {
//                 responseType: 'blob',
//               });

//               // Create an object URL for the license blob
//               const licenseUrl = URL.createObjectURL(licenseRes.data);
//               return { ...vendor, businessLicenseUrl: licenseUrl };
//             } catch (err) {
//               console.error(`Error fetching license for vendor ${vendor.id}:`, err);
//               return { ...vendor, businessLicenseUrl: null };
//             }
//           })
//         );

//         setVendors(updatedVendors);
//       })
//       .catch(err => console.error("Error fetching vendors:", err));
//   }, []);

//   const approveVendor = (id) => {
//     axios.post(`http://localhost:8082/api/admin/vendors/approve/${id}`)
//       .then(() => {
//         alert('✅ Vendor Approved!');
//         setVendors(prev => prev.filter(v => v.id !== id));
//       })
//       .catch(err => {
//         console.error("Approval error:", err);
//         alert("❌ Approval failed.");
//       });
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>🛂 Pending Vendor Requests</h2>
//       {vendors.length === 0 ? (
//         <p>No pending vendors.</p>
//       ) : (
//         <table border="1" cellPadding="10" cellSpacing="0">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Business License</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {vendors.map(v => (
//               <tr key={v.id}>
//                 <td>{v.name}</td>
//                 <td>{v.email}</td>
//                 <td>{v.phone}</td>
//                 <td>
//                   {v.businessLicenseUrl ? (
//                     <a href={v.businessLicenseUrl} target="_blank" rel="noopener noreferrer">
//                       View Document
//                     </a>
//                   ) : (
//                     "Unavailable"
//                   )}
//                 </td>
//                 <td>
//                   <button onClick={() => approveVendor(v.id)}>Approve</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function VendorApproval() {
//   const [vendors, setVendors] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:8082/api/admin/vendors/pending")
//       .then(async (res) => {
//         const vendorList = res.data;

//         const updatedVendors = await Promise.all(
//           vendorList.map(async (vendor) => {
//             try {
//               const licenseRes = await axios.get(
//                 `http://localhost:8082/api/vendors/license/${vendor.id}`,
//                 { responseType: "blob" }
//               );
//               const licenseUrl = URL.createObjectURL(licenseRes.data);
//               return { ...vendor, businessLicenseUrl: licenseUrl };
//             } catch (err) {
//               console.error(`Error fetching license for vendor ${vendor.id}:`, err);
//               return { ...vendor, businessLicenseUrl: null };
//             }
//           })
//         );

//         setVendors(updatedVendors);
//       })
//       .catch((err) => console.error("Error fetching vendors:", err));
//   }, []);

//   const approveVendor = (id) => {
//     axios
//       .post(`http://localhost:8082/api/admin/vendors/approve/${id}`)
//       .then(() => {
//         alert("✅ Vendor Approved!");
//         setVendors((prev) => prev.filter((v) => v.id !== id));
//       })
//       .catch((err) => {
//         console.error("Approval error:", err);
//         alert("❌ Approval failed.");
//       });
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">🛂 Pending Vendor Requests</h2>
//       <div className="row">
//         {vendors.length === 0 ? (
//           <div className="col-12 text-center text-muted">No pending vendor requests.</div>
//         ) : (
//           vendors.map((vendor) => (
//             <div className="col-md-6 col-lg-4 mb-4" key={vendor.id}>
//               <div className="card h-100">
//                 <div className="card-body">
//                   <h5 className="card-title">{vendor.name}</h5>
//                   <p className="card-text mb-1">📧 {vendor.email}</p>
//                   <p className="card-text mb-2">📞 {vendor.phone}</p>
//                   <p className="card-text mb-2">
//   📅 {new Date(vendor.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
// </p>

//                   <p className="card-text">
//                     <strong>License:</strong>{" "}
//                     {vendor.businessLicenseUrl ? (
//                       <a href={vendor.businessLicenseUrl} target="_blank" rel="noreferrer">
//                         View Document
//                       </a>
//                     ) : (
//                       <span className="text-muted">Unavailable</span>
//                     )}
//                   </p>
//                 </div>
//                 <div className="card-footer d-flex justify-content-between">
//                   <button className="btn btn-outline-primary btn-sm">View</button>
//                   <button
//                     className="btn btn-success btn-sm"
//                     onClick={() => approveVendor(vendor.id)}
//                   >
//                     Approve
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";

export default function VendorApproval() {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8082/api/admin/vendors/pending")
      .then(async (res) => {
        const vendorList = res.data;

        const updatedVendors = await Promise.all(
          vendorList.map(async (vendor) => {
            try {
              const licenseRes = await axios.get(
                `http://localhost:8082/api/vendors/license/${vendor.id}`,
                { responseType: "blob" }
              );
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
      .catch((err) => console.error("Error fetching vendors:", err));
  }, []);

  const approveVendor = (id) => {
    axios
      .post(`http://localhost:8082/api/admin/vendors/approve/${id}`)
      .then(() => {
        alert("✅ Vendor Approved!");
        setVendors((prev) => prev.filter((v) => v.id !== id));
      })
      .catch((err) => {
        console.error("Approval error:", err);
        alert("❌ Approval failed.");
      });
  };

  const rejectVendor = (id) => {
    axios
      .delete(`http://localhost:8082/api/admin/vendors/reject/${id}`)
      .then(() => {
        alert("❌ Vendor Rejected and Deleted!");
        setVendors((prev) => prev.filter((v) => v.id !== id));
      })
      .catch((err) => {
        console.error("Rejection error:", err);
        alert("❌ Rejection failed.");
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🛂 Pending Vendor Requests</h2>
      <div className="row">
        {vendors.length === 0 ? (
          <div className="col-12 text-center text-muted">No pending vendor requests.</div>
        ) : (
          vendors.map((vendor) => (
            <div className="col-md-6 col-lg-4 mb-4" key={vendor.id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{vendor.name}</h5>
                  <p className="card-text mb-1">📧 {vendor.email}</p>
                  <p className="card-text mb-2">📞 {vendor.phone}</p>
                  <p className="card-text mb-2">
                    📅 {new Date(vendor.createdAt).toLocaleDateString()}
                  </p>
                  <p className="card-text">
                    <strong>License:</strong>{" "}
                    {vendor.businessLicenseUrl ? (
                      <a href={vendor.businessLicenseUrl} target="_blank" rel="noreferrer">
                        View Document
                      </a>
                    ) : (
                      <span className="text-muted">Unavailable</span>
                    )}
                  </p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => approveVendor(vendor.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => rejectVendor(vendor.id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

