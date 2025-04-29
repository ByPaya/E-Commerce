// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function Cart() {
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const fetchCart = async () => {
//     try {
//       const storedUser = JSON.parse(localStorage.getItem("user"));
//       if (!storedUser) {
//         alert("Please login first!");
//         return;
//       }

//       const userId = storedUser.id;

//       // Fetch the cart items for this user
//       const response = await axios.get(`http://localhost:8082/api/users/cart/${userId}`);
//       setCartItems(response.data); // Assuming the API returns an array of cart items
//     } catch (error) {
//       console.error(error);
//       alert("Error fetching cart items");
//     }
//   };

//   return (
//     <div className="cart-container p-6 max-w-7xl mx-auto">
//       <h2 className="text-3xl font-bold mb-6">🛒 Your Cart</h2>

//       {cartItems.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {cartItems.map((item) => (
//             <div key={item.id} className="border p-4 rounded shadow">
//               <img
//                 src={item.imageUrl}
//                 alt={item.name}
//                 className="h-48 w-full object-cover mb-4 rounded"
//               />
//               <h3 className="text-lg font-bold">{item.name}</h3>
//               <p className="text-green-700 font-semibold">₹{item.price}</p>
//               <p><strong>Quantity:</strong> {item.quantity}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>Your cart is empty.</p>
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import axios from "axios";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser) {
        alert("Please login first!");
        return;
      }

      const userId = storedUser.id;

      // Fetch cart items
      const response = await axios.get(`http://localhost:8082/api/users/cart/${userId}`);
      setCartItems(response.data);
    } catch (error) {
      console.error(error);
      alert("Error fetching cart items");
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser) {
        alert("Please login first!");
        return;
      }

      const userId = storedUser.id;

      // Create order object with the address
      const orderData = {
        address: address,
      };

      // Call backend to place the order
      const response = await axios.post(
        `http://localhost:8082/api/users/orders/place/${userId}`,
        orderData
      );

      alert(`Order placed successfully! Order ID: ${response.data.id}`);
      setOrderPlaced(true);
    } catch (error) {
      console.error(error);
      alert("Failed to place order");
    }
  };

  return (
    <div className="cart-container p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">🛒 Your Cart</h2>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cartItems.map((item) => (
            <div key={item.id} className="border p-4 rounded shadow">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-48 w-full object-cover mb-4 rounded"
              />
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p className="text-green-700 font-semibold">₹{item.price}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}

      {/* Address Input */}
      <div className="mt-6">
        <label className="block text-sm font-semibold">Enter Address</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-2 p-2 w-full border rounded"
          rows="4"
          placeholder="Enter your address"
        ></textarea>
      </div>

      {/* Place Order Button */}
      <button
        onClick={handlePlaceOrder}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Place Order
      </button>

      {orderPlaced && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
          <p>✅ Your order has been placed successfully!</p>
        </div>
      )}
    </div>
  );
}
