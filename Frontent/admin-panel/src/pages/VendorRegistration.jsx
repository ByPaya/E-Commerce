import { useState } from "react";
import axios from "axios";

export default function VendorRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("phone", formData.phone);
    payload.append("password", formData.password);
    payload.append("file", formData.file);

    try {
      const res = await axios.post("http://localhost:8082/upload", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("✅ " + res.data);
    } catch (err) {
      alert("❌ Error: " + err.response?.data || "Unknown error");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>📋 Vendor Registration</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Name:</label>
          <input type="text" name="name" required onChange={handleChange} />
        </div>

        <div>
          <label>Email:</label>
          <input type="email" name="email" required onChange={handleChange} />
        </div>

        <div>
          <label>Phone:</label>
          <input type="text" name="phone" required onChange={handleChange} />
        </div>

        <div>
          <label>Password:</label>
          <input type="password" name="password" required onChange={handleChange} />
        </div>

        <div>
          <label>Business License (PDF/IMG):</label>
          <input type="file" name="file" accept=".pdf,.jpg,.jpeg,.png" required onChange={handleChange} />
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>Register</button>
      </form>
    </div>
  );
}
