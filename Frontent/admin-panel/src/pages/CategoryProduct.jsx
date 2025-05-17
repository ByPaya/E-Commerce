

// import { useState } from 'react';
// import axios from 'axios';

// export default function CategoryProducts() {
//   const [categoryId, setCategoryId] = useState('');
//   const [products, setProducts] = useState([]);

//   const fetchProducts = () => {
//     if (!categoryId) return alert('Please enter a Category ID');

//     axios.get(`http://localhost:8082/api/admin/categories/${categoryId}/products`)
//       .then(res => {
//         const data = res.data.map(p => ({
//           ...p,
//           imageUrl: `http://localhost:8082${p.imageUrl}`, // Fixed backticks here
//         }));
//         setProducts(data);
//       })
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
//                 <td>{p.vendorName}</td>
//                 <td>{p.categoryName}</td>
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

import { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/categoryproducts.css'; // Optional external CSS

export default function CategoryProducts() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/admin/getCategories');
      setCategories(response.data);
    } catch (error) {
      alert('Failed to load categories');
      console.error(error);
    }
  };

  const fetchProducts = async () => {
    if (!selectedCategoryId) return alert('Please select a category');

    try {
      const res = await axios.get(`http://localhost:8082/api/admin/categories/${selectedCategoryId}/products`);
      const data = res.data.map(p => ({
        ...p,
        imageUrl: `http://localhost:8082${p.imageUrl}`,
      }));
      setProducts(data);
    } catch (err) {
      alert('Error fetching products');
      console.error(err);
    }
  };

  return (
    <div className="category-container">
      <h2 className="page-title">📁 View Products by Category</h2>

      <div className="form-section">
        <label>Select Category:</label>
        <select
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
        >
          <option value="">-- Choose Category --</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <button onClick={fetchProducts}>Fetch Products</button>
      </div>

      <hr />

      {products.length > 0 ? (
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price (₹)</th>
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

