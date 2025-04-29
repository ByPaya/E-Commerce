import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8082/api/user/login", loginData);
      console.log(response.data);

      // Store the user info in localStorage
      localStorage.setItem("user", JSON.stringify(response.data));

      alert("Login Successful!");
      navigate("/UserDash");  // After login, navigate to Dashboard
    } catch (error) {
      console.error(error);
      alert("Login Failed!");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" name="email" placeholder="Email" value={loginData.email} onChange={handleChange} className="border p-2 w-full" required />
        <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleChange} className="border p-2 w-full" required />
        <button type="submit" className="bg-green-500 text-white p-2 w-full rounded">Login</button>
      </form>
    </div>
  );
}

export default Login;
