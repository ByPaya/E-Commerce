

// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function Cart() {
//   const [cartItems, setCartItems] = useState([]);
//   const [address, setAddress] = useState("");
//   const [orderPlaced, setOrderPlaced] = useState(false);

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

//       // Fetch cart items with product details
//       const response = await axios.get(`http://localhost:8082/api/users/cart/${userId}`);
//       setCartItems(response.data);
//     } catch (error) {
//       console.error(error);
//       alert("Error fetching cart items");
//     }
//   };

//   const handlePlaceOrder = async () => {
//     try {
//       const storedUser = JSON.parse(localStorage.getItem("user"));
//       if (!storedUser) {
//         alert("Please login first!");
//         return;
//       }

//       const userId = storedUser.id;

//       const orderData = {
//         address: address,
//       };

//       const response = await axios.post(
//         `http://localhost:8082/api/users/orders/place/${userId}`,
//         orderData
//       );

//       alert(`Order placed successfully! Order ID: ${response.data.id}`);
//       setOrderPlaced(true);
//     } catch (error) {
//       console.error(error);
//       alert("Failed to place order");
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
//                 src={`http://localhost:8082/api/admin/product/${item.product.id}/image`}
//                 alt={item.product.name}
//                 className="h-48 w-full object-cover mb-4 rounded"
//               />
//               <h3 className="text-lg font-bold">{item.product.name}</h3>
//               <p className="text-green-700 font-semibold">₹{item.product.price}</p>
//               <p><strong>Quantity:</strong> {item.quantity}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>Your cart is empty.</p>
//       )}

//       <div className="mt-6">
//         <label className="block text-sm font-semibold">Enter Address</label>
//         <textarea
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//           className="mt-2 p-2 w-full border rounded"
//           rows="4"
//           placeholder="Enter your address"
//         ></textarea>
//       </div>

//       <button
//         onClick={handlePlaceOrder}
//         className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//       >
//         Place Order
//       </button>

//       {orderPlaced && (
//         <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
//           <p>✅ Your order has been placed successfully!</p>
//         </div>
//       )}
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function Cart() {
//   const [cartItems, setCartItems] = useState([]);
//   const [address, setAddress] = useState("");
//   const [orderPlaced, setOrderPlaced] = useState(false);

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

//       // const response = await axios.get(`http://localhost:8082/api/users/cart/${storedUser.id}`);
//       const response = await axios.get(`http://localhost:8082/api/users/cart/1`);
//       const cartItems = response.data;

//       const updatedItems = await Promise.all(
//         cartItems.map(async (item) => {
//           try {
//             const imageRes = await axios.get(
//               `http://localhost:8082/api/admin/product/${item.product.id}/image`,
//               { responseType: "blob" }
//             );
//             const imageUrl = URL.createObjectURL(imageRes.data);
//             return { ...item, imageUrl };
//           } catch (error) {
//             console.error("Image fetch failed for product", item.product.id);
//             return { ...item, imageUrl: null };
//           }
//         })
//       );

//       setCartItems(updatedItems);
//     } catch (error) {
//       console.error(error);
//       alert("Error fetching cart items");
//     }
//   };

//   const handlePlaceOrder = async () => {
//     try {
//       const storedUser = JSON.parse(localStorage.getItem("user"));
//       const userId = storedUser.id;

//       const orderData = { address };
//       const response = await axios.post(
//         `http://localhost:8082/api/users/orders/place/${userId}`,
//         orderData
//       );

//       alert(`Order placed successfully! Order ID: ${response.data.id}`);
//       setOrderPlaced(true);
//     } catch (error) {
//       console.error(error);
//       alert("Failed to place order");
//     }
//   };

//   const handleRemoveFromCart = async (productId) => {
//     try {
//       const storedUser = JSON.parse(localStorage.getItem("user"));
//       const userId = storedUser.id;

//       await axios.delete(`http://localhost:8082/api/users/cart/${userId}/remove/${productId}`);
//       fetchCart(); // Refresh cart after deletion
//     } catch (error) {
//       console.error("Failed to remove item from cart", error);
//     }
//   };

//   const calculateTotalPrice = () => {
//     return cartItems.reduce(
//       (total, item) => total + item.product.price * item.quantity,
//       0
//     );
//   };

//   return (
//     <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
//       {/* Cart Items Section */}
//       <div className="flex-1">
//         <h2 className="text-3xl font-bold mb-6">🛒 Shopping Cart</h2>

//         {cartItems.length > 0 ? (
//           <div className="space-y-6">
//             {cartItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex flex-col md:flex-row gap-6 border p-4 rounded-lg shadow bg-white"
//               >
//                 {/* Left: Image */}
//                 <div className="flex-shrink-0">
//                   <img
//                     src={item.imageUrl || "/placeholder.png"}
//                     alt={item.product.name}
//                     width={200}
//                     height={200}
//                     className="object-contain w-[400px] h-[400px] rounded border"
//                   />
//                 </div>

//                 {/* Right: Product Details */}
//                 <div className="flex flex-col justify-between flex-grow">
//                   <div>
//                     <h3 className="text-xl font-bold mb-1">{item.product.name}</h3>
//                     <p className="text-gray-600 mb-2">{item.product.description}</p>
//                     <p className="text-green-700 font-semibold text-lg">
//                       ₹{item.product.price}
//                     </p>
//                     <p className="text-sm mt-1">Quantity: {item.quantity}</p>
//                   </div>
//                   <button
//                     onClick={() => handleRemoveFromCart(item.product.id)}
//                     className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-fit"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-600">Your cart is empty.</p>
//         )}
//       </div>

//       {/* Order Summary Section */}
//       <div className="w-full lg:w-1/3 sticky top-6 h-fit bg-white p-6 border rounded shadow-md">
//         <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>

//         <p className="mb-2">Total Items: {cartItems.length}</p>
//         <p className="mb-4 font-semibold text-lg">
//           Total Price: ₹{calculateTotalPrice()}
//         </p>

//         <label className="block text-sm font-semibold mb-1">Shipping Address</label>
//         <textarea
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//           className="w-full p-2 border rounded mb-4"
//           rows="3"
//           placeholder="Enter your address"
//         ></textarea>

//         <button
//           onClick={handlePlaceOrder}
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//         >
//           Place Order
//         </button>

//         {orderPlaced && (
//           <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
//             ✅ Order placed successfully!
//           </div>
//         )}
//       </div>
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

      const response = await axios.get(`http://localhost:8082/api/users/cart/1`);
      const cartItems = response.data;

      const updatedItems = await Promise.all(
        cartItems.map(async (item) => {
          try {
            const imageRes = await axios.get(
              `http://localhost:8082/api/admin/product/${item.product.id}/image`,
              { responseType: "blob" }
            );
            const imageUrl = URL.createObjectURL(imageRes.data);
            return { ...item, imageUrl };
          } catch (error) {
            console.error("Image fetch failed for product", item.product.id);
            return { ...item, imageUrl: null };
          }
        })
      );

      setCartItems(updatedItems);
    } catch (error) {
      console.error(error);
      alert("Error fetching cart items");
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser.id;

      const orderData = { address };
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

  const handleRemoveFromCart = async (productId) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser.id;

      await axios.delete(`http://localhost:8082/api/users/cart/${userId}/remove/${productId}`);
      fetchCart(); // Refresh cart after deletion
    } catch (error) {
      console.error("Failed to remove item from cart", error);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Cart Items Section */}
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-6">🛒 Shopping Cart</h2>

        {cartItems.length > 0 ? (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row gap-6 border p-4 rounded-lg shadow bg-white"
              >
                {/* Product Image */}
                <div >
                  <img
                    src={item.imageUrl || "/placeholder.png"}
                    alt={item.product.name}
                    className="object-contain w-full h-full rounded border"
                  />
                </div>

                {/* Product Details */}
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{item.product.name}</h3>
                    <p className="text-gray-600 mb-2">{item.product.description}</p>
                    <p className="text-green-700 font-semibold text-lg">
                      ₹{item.product.price}
                    </p>
                    <p className="text-sm mt-1">Quantity: {item.quantity}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(item.product.id)}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-fit"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">Your cart is empty.</p>
        )}
      </div>

      {/* Order Summary Section */}
      <div className="w-full lg:w-1/3 sticky top-6 h-fit bg-white p-6 border rounded shadow-md">
        <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>

        <p className="mb-2">Total Items: {cartItems.length}</p>
        <p className="mb-4 font-semibold text-lg">
          Total Price: ₹{calculateTotalPrice()}
        </p>

        <label className="block text-sm font-semibold mb-1">Shipping Address</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          rows="3"
          placeholder="Enter your address"
        ></textarea>

        <button
          onClick={handlePlaceOrder}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Place Order
        </button>

        {orderPlaced && (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
            ✅ Order placed successfully!
          </div>
        )}
      </div>
    </div>
  );
}

