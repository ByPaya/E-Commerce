import { useEffect, useState } from "react";
import GetAllProducts  from "../GetAllProducts";
import { Link } from "react-router-dom";

function DashboardUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto">
      {user ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h2>
          <p>Email: {user.email}</p>
          <p>Contact: {user.contact}</p>
          {/* Add View Cart button */}
      <Link to="/cart" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        View Cart
      </Link>

        </>
      ) : (
        <h2 className="text-2xl font-bold mb-4">No User Logged In</h2>
      )}
         
    
   <GetAllProducts />

    </div>
  );
}

export default DashboardUser;
