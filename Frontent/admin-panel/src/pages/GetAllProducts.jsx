


// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../style/allproduct.css'; // ✅ Correct path from AllProducts.jsx



// export default function AllProducts() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:8082/api/admin/getAllProducts')
//       .then(res => {
//         const data = res.data.map(p => ({
//           ...p,
//           imageUrl: `http://localhost:8082${p.imageUrl}`,
//         }));
//         setProducts(data);
//       })
//       .catch(err => {
//         alert('Error fetching products');
//         console.error(err);
//       });
//   }, []);

//   const handleAddToCart = (product) => {
//     alert(`🛒 ${product.name} added to cart!`);
//     // Optional: Call cart API or update local storage here


//   };

//   return (
//     <div className="all-products-container">
//       <h2>📦 All Products</h2>

//       {products.length > 0 ? (
//         <div className="product-grid">
//           {products.map(p => (
//             <div key={p.id} className="product-card">
//               <img
//                 src={p.imageUrl}
//                 alt={p.name}
//                 className="product-image"
//               />
//               <h3 className="product-name">{p.name}</h3>
//               <p className="product-price">₹{p.price}</p>
//               <p className="product-description">{p.description}</p>
//               <p className="product-meta"><strong>Vendor:</strong> {p.vendorName}</p>
//               <p className="product-meta"><strong>Category:</strong> {p.categoryName}</p>
//               <p className="product-meta"><strong>Stock:</strong> {p.stock}</p>
//               <button className="add-to-cart-btn" onClick={() => handleAddToCart(p)}>Add to Cart</button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No products found.</p>
//       )}
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import axios from "axios";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [cartProduct, setCartProduct] = useState(null); // 🛒 to store recently added product

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/admin/getAllProducts');
      const data = response.data.map(p => ({
        ...p,
        imageUrl: `http://localhost:8082${p.imageUrl}`,
      }));
      setProducts(data);
    } catch (error) {
      alert('Error fetching products');
      console.error(error);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser) {
        alert("Please login first!");
        return;
      }

      const userId = storedUser.id;  // assuming user object has id

      // Call Add to Cart API
      await axios.post('http://localhost:8082/api/users/cart/add', null, {
        params: {
          userId: userId,
          productId: product.id,
          quantity: 1,  // default quantity 1
        }
      });

      setCartProduct(product); // Store the product in state
      alert(`✅ ${product.name} added to cart!`);

    } catch (error) {
      console.error(error);
      alert('Failed to add product to cart');
    }
  };

  return (
    <div className="all-products-container p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">📦 All Products</h2>

      {cartProduct && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded">
          <h3 className="font-bold text-green-800 mb-2">🛒 Recently Added to Cart:</h3>
          <p><strong>Name:</strong> {cartProduct.name}</p>
          <p><strong>Price:</strong> ₹{cartProduct.price}</p>
          <p><strong>Stock:</strong> {cartProduct.stock}</p>
        </div>
      )}

      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(p => (
            <div key={p.id} className="border p-4 rounded shadow">
              <img
                src={p.imageUrl}
                alt={p.name}
                className="h-48 w-full object-cover mb-4 rounded"
              />
              <h3 className="text-lg font-bold">{p.name}</h3>
              <p className="text-green-700 font-semibold">₹{p.price}</p>
              <p className="text-gray-600">{p.description}</p>
              <p><strong>Vendor:</strong> {p.vendorName}</p>
              <p><strong>Category:</strong> {p.categoryName}</p>
              <p><strong>Stock:</strong> {p.stock}</p>
              <button 
                onClick={() => handleAddToCart(p)}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}
