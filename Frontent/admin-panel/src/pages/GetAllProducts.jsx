
import { useEffect, useState } from "react";
import axios from "axios";
import '../style/allproduct.css';

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [cartProduct, setCartProduct] = useState(null); // recently added product

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

      const userId = storedUser.id;

      await axios.post('http://localhost:8082/api/users/cart/add', null, {
        params: {
          userId,
          productId: product.id,
          quantity: 1,
        }
      });

      setCartProduct(product);
      alert(`✅ ${product.name} added to cart!`);

    } catch (error) {
      console.error(error);
      alert('Failed to add product to cart');
    }
  };

  return (
    <div className="product-container">
      <h2 className="page-title">🛍️ All Products</h2>

      {cartProduct && (
        <div className="cart-alert">
          <h3 className="cart-alert-title">🛒 Recently Added to Cart:</h3>
          <p><strong>Name:</strong> {cartProduct.name}</p>
          <p><strong>Price:</strong> ₹{cartProduct.price}</p>
        </div>
      )}

      {products.length > 0 ? (
        <div className="product-grid">
          {products.map(p => (
            <div key={p.id} className="product-card">
              <div className="product-tag">
                New
              </div>
              <div className="product-image">
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="image-cover"
                />
              </div>
              <div className="product-info">
                <p className="category">{p.categoryName}</p>
                <h3 className="product-name">{p.name}</h3>
                <p className="price">₹{p.price}</p>
                <div className="vendor-rating">
                  <span>By {p.vendorName}</span>
                  <span className="rating">★★★★★</span>
                </div>

                <button
                  onClick={() => handleAddToCart(p)}
                  className="add-to-cart"
                >
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-products">No products found.</p>
      )}
    </div>
  );
}


