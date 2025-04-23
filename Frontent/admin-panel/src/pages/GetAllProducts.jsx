
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function AllProducts() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:8082/api/admin/getAllProducts')
//       .then(res => {
//         const data = res.data.map(p => ({
//           ...p,
//           imageUrl: `http://localhost:8082${p.imageUrl}`, // Prepend server URL
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


import { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/allproduct.css'; // ✅ Correct path from AllProducts.jsx



export default function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8082/api/admin/getAllProducts')
      .then(res => {
        const data = res.data.map(p => ({
          ...p,
          imageUrl: `http://localhost:8082${p.imageUrl}`,
        }));
        setProducts(data);
      })
      .catch(err => {
        alert('Error fetching products');
        console.error(err);
      });
  }, []);

  const handleAddToCart = (product) => {
    alert(`🛒 ${product.name} added to cart!`);
    // Optional: Call cart API or update local storage here
  };

  return (
    <div className="all-products-container">
      <h2>📦 All Products</h2>

      {products.length > 0 ? (
        <div className="product-grid">
          {products.map(p => (
            <div key={p.id} className="product-card">
              <img
                src={p.imageUrl}
                alt={p.name}
                className="product-image"
              />
              <h3 className="product-name">{p.name}</h3>
              <p className="product-price">₹{p.price}</p>
              <p className="product-description">{p.description}</p>
              <p className="product-meta"><strong>Vendor:</strong> {p.vendorName}</p>
              <p className="product-meta"><strong>Category:</strong> {p.categoryName}</p>
              <p className="product-meta"><strong>Stock:</strong> {p.stock}</p>
              <button className="add-to-cart-btn" onClick={() => handleAddToCart(p)}>Add to Cart</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}
