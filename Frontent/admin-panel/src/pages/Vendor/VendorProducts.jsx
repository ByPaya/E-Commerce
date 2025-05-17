// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';


// const VendorProducts = () => {
//     const navigate = useNavigate();

//   const [products, setProducts] = useState([]);
//   const [vendorId, setVendorId] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Get vendor ID from localStorage or any other source
//     const user = JSON.parse(localStorage.getItem('user'));
//     const id = user?.id || 1;
//     setVendorId(id);

//     if (id) {
//       axios.get(`http://localhost:8082/api/vendors/${id}/products`)
//         .then(res => {
//           setProducts(res.data);
//           setLoading(false);
//         })
//         .catch(err => {
//           console.error('Error fetching products:', err);
//           setLoading(false);
//         });
//     }
//   }, []);

//   return (
    
//     <div className="container mt-5">
//         <div className="d-flex justify-content-between align-items-center mb-3">
//         <h2>Vendor Products</h2>
//         <button
//           className="btn btn-primary"
//           onClick={() => navigate('/products')}
//         >
//           Add Product
//         </button>
//       </div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : products.length === 0 ? (
//         <p>No products found for vendor ID {vendorId}.</p>
//       ) : (
//         <table className="table table-striped table-bordered">
//           <thead className="table-dark">
//             <tr>
//               <th>#</th>
//               <th>Product Name</th>
//               <th>Description</th>
//               <th>Price (₹)</th>
//               <th>Stock</th>
//               <th>Category</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((prod, index) => (
//               <tr key={prod.id}>
//                 <td>{index + 1}</td>
//                 <td>{prod.name}</td>
//                 <td>{prod.description}</td>
//                 <td>{prod.price}</td>
//                 <td>{prod.stock}</td>
//                 <td>{prod.category?.name}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default VendorProducts;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const VendorProducts = () => {
//   const navigate = useNavigate();

//   const [products, setProducts] = useState([]);
//   const [vendorId, setVendorId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     const id = user?.id || 1;
//     setVendorId(id);

//     if (id) {
//       axios.get(`http://localhost:8082/api/vendors/${id}/products`)
//         .then(res => {
//           setProducts(res.data);
//           setLoading(false);
//         })
//         .catch(err => {
//           console.error('Error fetching products:', err);
//           setLoading(false);
//         });
//     }
//   }, []);

//   // Filter products based on search term
//   const filteredProducts = products.filter((prod) =>
//     prod.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="container mt-5">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h2>Vendor Products</h2>
//         <button
//           className="btn btn-primary"
//           onClick={() => navigate('/products')}
//         >
//           Add Product
//         </button>
//       </div>

//       {/* Search Input */}
//       <div className="mb-3">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Search by product name..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {loading ? (
//         <p>Loading...</p>
//       ) : filteredProducts.length === 0 ? (
//         <p>No products found for vendor ID {vendorId}.</p>
//       ) : (
//         <table className="table table-striped table-bordered">
//           <thead className="table-dark">
//             <tr>
//               <th>#</th>
//               <th>Product Name</th>
//               <th>Description</th>
//               <th>Price (₹)</th>
//               <th>Stock</th>
//               <th>Category</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProducts.map((prod, index) => (
//               <tr key={prod.id}>
//                 <td>{index + 1}</td>
//                 <td>{prod.name}</td>
//                 <td>{prod.description}</td>
//                 <td>{prod.price}</td>
//                 <td>{prod.stock}</td>
//                 <td>{prod.category?.name}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default VendorProducts;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VendorProducts = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [vendorId, setVendorId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const id = user?.id || 1;
    setVendorId(id);

    if (id) {
      axios.get(`http://localhost:8082/api/vendors/${id}/products`)
        .then(res => {
          setProducts(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching products:', err);
          setLoading(false);
        });
    }
  }, []);

  // Extract unique category names
  const categoryOptions = [
    "All",
    ...new Set(products.map((prod) => prod.category?.name).filter(Boolean))
  ];

  // Filter products based on search term and selected category
  const filteredProducts = products.filter((prod) => {
    const matchesSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || prod.category?.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Vendor Products</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/products')}
        >
          Add Product
        </button>
      </div>

      {/* Search and Category Filter */}
      <div className="row mb-3">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-2">
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categoryOptions.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Table */}
      {loading ? (
        <p>Loading...</p>
      ) : filteredProducts.length === 0 ? (
        <p>No products found for vendor ID {vendorId}.</p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Price (₹)</th>
              <th>Stock</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((prod, index) => (
              <tr key={prod.id}>
                <td>{index + 1}</td>
                <td>{prod.name}</td>
                <td>{prod.description}</td>
                <td>{prod.price}</td>
                <td>{prod.stock}</td>
                <td>{prod.category?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VendorProducts;

