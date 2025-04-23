// import { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function AddProduct() {
//   const [form, setForm] = useState({
//     name: '',
//     description: '',
//     price: '',
//     stock: '',
//     imageUrl: '',
//     categoryId: ''
//   });

//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const vendorId = localStorage.getItem('vendorId'); // 🧠 Get from login

//   useEffect(() => {
//     axios.get('http://localhost:8082/api/admin/getCategories')
//       .then(res => setCategories(res.data))
//       .catch(err => console.error('Failed to load categories', err));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = () => {
//     if (!vendorId) return alert('Vendor not logged in!');

//     axios.post(`http://localhost:8082/api/admin/categories/${form.categoryId}/products?vendorId=${vendorId}`, {
//       name: form.name,
//       description: form.description,
//       price: form.price,
//       stock: form.stock,
//       imageUrl: form.imageUrl
//     }).then(res => {
//       alert('✅ Product Added');
//       setProducts(prev => [...prev, res.data]);
//       setForm({
//         name: '',
//         description: '',
//         price: '',
//         stock: '',
//         imageUrl: '',
//         categoryId: ''
//       });
//     }).catch(err => {
//       alert('❌ Error adding product');
//       console.error(err);
//     });
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Add New Product</h2>

//       <input name="name" placeholder="Name" value={form.name} onChange={handleChange} /><br />
//       <input name="description" placeholder="Description" value={form.description} onChange={handleChange} /><br />
//       <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} /><br />
//       <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} /><br />
//       <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} /><br />

//       <select name="categoryId" value={form.categoryId} onChange={handleChange}>
//         <option value="">-- Select Category --</option>
//         {categories.map(cat => (
//           <option key={cat.id} value={cat.id}>{cat.name}</option>
//         ))}
//       </select><br /><br />

//       <button onClick={handleSubmit}>Add Product</button>

//       <hr />
//       <h3>📦 Product Table</h3>
//       <table border="1" cellPadding="6">
//         <thead>
//           <tr>
//             <th>Name</th><th>Price</th><th>Stock</th><th>Vendor</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map(p => (
//             <tr key={p.id}>
//               <td>{p.name}</td>
//               <td>${p.price}</td>
//               <td>{p.stock}</td>
//               <td>{p.vendor?.name || 'You'}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <hr />

//       <h3>📝 Live Preview</h3>
//       <p><strong>Name:</strong> {form.name}</p>
//       <p><strong>Description:</strong> {form.description}</p>
//       <p><strong>Price:</strong> {form.price}</p>
//       <p><strong>Stock:</strong> {form.stock}</p>
//       <p><strong>Category ID:</strong> {form.categoryId}</p>
//       <p><strong>Vendor ID (from storage):</strong> {vendorId}</p>
//       {form.imageUrl && (
//         <p><img src={form.imageUrl} alt="preview" width="100" /></p>
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddProduct() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryId: ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const vendorId = localStorage.getItem('vendorId');

  useEffect(() => {
    axios.get('http://localhost:8082/api/admin/getCategories')
      .then(res => setCategories(res.data))
      .catch(err => console.error('Failed to load categories', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (!vendorId) return alert('Vendor not logged in!');
    if (!imageFile) return alert('Please select an image!');

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('stock', form.stock);
    formData.append('image', imageFile); // 👈 matches @RequestPart("image")

    axios.post(
      `http://localhost:8082/api/admin/categories/${form.categoryId}/products?vendorId=${vendorId}`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    ).then(res => {
      alert('✅ Product Added');
      setProducts(prev => [...prev, res.data]);
      setForm({
        name: '',
        description: '',
        price: '',
        stock: '',
        categoryId: ''
      });
      setImageFile(null);
    }).catch(err => {
      alert('❌ Error adding product');
      console.error(err);
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add New Product</h2>

      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} /><br />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} /><br />
      <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} /><br />
      <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} /><br />
      <input type="file" accept="image/*" onChange={handleFileChange} /><br /><br />

      <select name="categoryId" value={form.categoryId} onChange={handleChange}>
        <option value="">-- Select Category --</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select><br /><br />

      <button onClick={handleSubmit}>Add Product</button>

      <hr />
      <h3>📦 Product Table</h3>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Name</th><th>Price</th><th>Stock</th><th>Vendor</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>₹{p.price}</td>
              <td>{p.stock}</td>
              <td>{p.vendor?.name || 'You'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      <h3>📝 Live Preview</h3>
      <p><strong>Name:</strong> {form.name}</p>
      <p><strong>Description:</strong> {form.description}</p>
      <p><strong>Price:</strong> {form.price}</p>
      <p><strong>Stock:</strong> {form.stock}</p>
      <p><strong>Category ID:</strong> {form.categoryId}</p>
      <p><strong>Vendor ID (from storage):</strong> {vendorId}</p>
      {imageFile && (
        <p>
          <img
            src={URL.createObjectURL(imageFile)}
            alt="preview"
            width="100"
            style={{ border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </p>
      )}
    </div>
  );
}

