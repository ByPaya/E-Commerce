// import { useState } from 'react';
// import axios from 'axios';

// export default function CategoryProducts() {
//   const [categoryId, setCategoryId] = useState('');
//   const [products, setProducts] = useState([]);

//   const fetchProducts = () => {
//     if (!categoryId) return alert('Please enter a Category ID');

//     axios.get(`http://localhost:8082/api/admin/categories/${categoryId}/products`)
//       .then(res => setProducts(res.data))
//       .catch(err => {
//         alert('Error fetching products');
//         console.error(err);
//       });
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>📁 View Products by Category</h2>

//       <input
//         placeholder="Enter Category ID"
//         value={categoryId}
//         onChange={(e) => setCategoryId(e.target.value)} />
//       <button onClick={fetchProducts}>Fetch</button>

//       <hr />

//       {products.length > 0 ? (
//         <table border="1" cellPadding="6" style={{ marginTop: '20px', width: '100%' }}>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Image</th>
//               <th>Name</th>
//               <th>Description</th>
//               <th>Price ($)</th>
//               <th>Stock</th>
//               <th>Vendor</th>
//               <th>Created At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map(p => (
//               <tr key={p.id}>
//                 <td>{p.id}</td>
//                 <td>
//                   {p.imageUrl ? (
//                     <img src={p.imageUrl} alt={p.name} width="60" height="60" />
//                   ) : 'N/A'}
//                 </td>
//                 <td>{p.name}</td>
//                 <td>{p.description}</td>
//                 <td>{p.price}</td>
//                 <td>{p.stock}</td>
//                 <td>{p.vendor ? p.vendor.name : 'N/A'}</td>
//                 <td>{p.createdAt ? new Date(p.createdAt).toLocaleString() : 'Invalid Date'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No products found.</p>
//       )}
//     </div>
//   );
// }

// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function AllProducts() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:8082/api/admin/getAllProducts')
//       .then(res => {
//         const data = res.data.map(p => ({
//           ...p,
//           imageUrl: `http://localhost:8082${p.imageUrl}`, // Adjust image path
//         }));
//         setProducts(data);
//       })
//       .catch(err => {
//         alert('Error fetching products');
//         console.error(err);
//       });
//   }, []);

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>📦 All Products</h2>
//       <hr />

//       {products.length > 0 ? (
//         <table border="1" cellPadding="6" style={{ marginTop: '20px', width: '100%' }}>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Image</th>
//               <th>Name</th>
//               <th>Description</th>
//               <th>Price ($)</th>
//               <th>Stock</th>
//               <th>Vendor</th>
//               <th>Category</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map(p => (
//               <tr key={p.id}>
//                 <td>{p.id}</td>
//                 <td>
//                   {p.imageUrl ? (
//                     <img src={p.imageUrl} alt={p.name} width="60" height="60" />
//                   ) : 'N/A'}
//                 </td>
//                 <td>{p.name}</td>
//                 <td>{p.description}</td>
//                 <td>{p.price}</td>
//                 <td>{p.stock}</td>
//                 <td>{p.vendorName || 'N/A'}</td>
//                 <td>{p.categoryName || 'N/A'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No products found.</p>
//       )}
//     </div>
//   );
// }


import { useState } from 'react';
import axios from 'axios';

export default function CategoryProducts() {
  const [categoryId, setCategoryId] = useState('');
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    if (!categoryId) return alert('Please enter a Category ID');

    axios.get(`http://localhost:8082/api/admin/categories/${categoryId}/products`)
      .then(res => {
        const data = res.data.map(p => ({
          ...p,
          imageUrl: `http://localhost:8082${p.imageUrl}`, // Fixed backticks here
        }));
        setProducts(data);
      })
      .catch(err => {
        alert('Error fetching products');
        console.error(err);
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>📁 View Products by Category</h2>

      <input
        placeholder="Enter Category ID"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)} />
      <button onClick={fetchProducts}>Fetch</button>

      <hr />

      {products.length > 0 ? (
        <table border="1" cellPadding="6" style={{ marginTop: '20px', width: '100%' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price ($)</th>
              <th>Stock</th>
              <th>Vendor</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>
                  {p.imageUrl ? (
                    <img src={p.imageUrl} alt={p.name} width="60" height="60" />
                  ) : 'N/A'}
                </td>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>{p.price}</td>
                <td>{p.stock}</td>
                <td>{p.vendorName}</td>
                <td>{p.categoryName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}
