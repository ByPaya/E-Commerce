import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({ name: "", email: "", password: "", contact: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8082/api/user/register", user);
      console.log(response.data);
      alert("Registration Successful!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Registration Failed!");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange} className="border p-2 w-full" required />
        <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} className="border p-2 w-full" required />
        <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} className="border p-2 w-full" required />
        <input type="text" name="contact" placeholder="Contact" value={user.contact} onChange={handleChange} className="border p-2 w-full" required />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">Register</button>
      </form>
    </div>
  );
}

export default Register;
