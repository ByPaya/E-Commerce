// import { useState } from 'react';
// import axios from 'axios';

// export default function CreateCategory() {
//   const [name, setName] = useState('');
//   const [desc, setDesc] = useState('');

//   const handleCreate = () => {
//     axios.post('http://localhost:8082/api/admin/categories?adminId=1', {
//       name, description: desc
//     }).then(() => {
//       alert('Category created!');
//       setName('');
//       setDesc('');
//     });
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Create New Category</h2>
//       <input
//         placeholder="Category Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)} />
//       <br />
//       <input
//         placeholder="Description"
//         value={desc}
//         onChange={(e) => setDesc(e.target.value)} />
//       <br />
//       <button onClick={handleCreate}>Create</button>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function CreateCategory() {
//   const [name, setName] = useState("");
//   const [desc, setDesc] = useState("");
//   const [categories, setCategories] = useState([]);

//   // Fetch all categories on component mount
//   useEffect(() => {
//     axios
//       .get("http://localhost:8082/api/admin/getCategories")
//       .then((response) => {
//         setCategories(response.data);
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the categories:", error);
//       });
//   }, []);

//   const handleCreate = () => {
//     axios
//       .post("http://localhost:8082/api/admin/categories?adminId=1", {
//         name,
//         description: desc,
//       })
//       .then(() => {
//         alert("Category created!");
//         setName("");
//         setDesc("");
//         // Fetch updated categories list
//         axios
//           .get("http://localhost:8082/api/admin/getCategories")
//           .then((response) => {
//             setCategories(response.data);
//           });
//       })
//       .catch((error) => {
//         console.error("There was an error creating the category:", error);
//       });
//   };

//   return (
//     <div className="container mt-4">
//       <div className="row">
//         {/* Left side: Add Category Form */}
//         <div className="col-md-6">
//           <div className="card p-4">
//             <h3 className="mb-3">Create New Category</h3>
//             <input
//               type="text"
//               className="form-control mb-3"
//               placeholder="Category Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//             <textarea
//               className="form-control mb-3"
//               placeholder="Category Description"
//               value={desc}
//               onChange={(e) => setDesc(e.target.value)}
//             />
//             <button
//               className="btn btn-primary w-100"
//               onClick={handleCreate}
//             >
//               Create
//             </button>
//           </div>
//         </div>

//         {/* Right side: List of Categories */}
//         <div className="col-md-6">
//           <div className="card p-4">
//             <h3 className="mb-3">Existing Categories</h3>
//             {categories.length === 0 ? (
//               <p>No categories available.</p>
//             ) : (
//               <ul className="list-group">
//                 {categories.map((category) => (
//                   <li className="list-group-item" key={category.id}>
//                     <h5>{category.name}</h5>
//                     <p>{category.description}</p>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import axios from "axios";

export default function CreateCategory() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Fetch all categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get("http://localhost:8082/api/admin/getCategories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const handleCreateOrUpdate = () => {
    if (editingId) {
      // Update category
      axios
        .put(`http://localhost:8082/api/admin/categories/${editingId}`, {
          name,
          description: desc,
        })
        .then(() => {
          alert("Category updated!");
          resetForm();
          fetchCategories();
        })
        .catch((error) => {
          console.error("Error updating category:", error);
        });
    } else {
      // Create category
      axios
        .post("http://localhost:8082/api/admin/categories?adminId=1", {
          name,
          description: desc,
        })
        .then(() => {
          alert("Category created!");
          resetForm();
          fetchCategories();
        })
        .catch((error) => {
          console.error("Error creating category:", error);
        });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      axios
        .delete(`http://localhost:8082/api/admin/categories/${id}`)
        .then(() => {
          alert("Category deleted!");
          fetchCategories();
        })
        .catch((error) => {
          console.error("Error deleting category:", error);
        });
    }
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setName(category.name);
    setDesc(category.description);
  };

  const resetForm = () => {
    setName("");
    setDesc("");
    setEditingId(null);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left side: Add/Update Category Form */}
        <div className="col-md-6">
          <div className="card p-4">
            <h3 className="mb-3">{editingId ? "Update Category" : "Create New Category"}</h3>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              className="form-control mb-3"
              placeholder="Category Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <div className="d-flex justify-content-between">
              <button className="btn btn-primary" onClick={handleCreateOrUpdate}>
                {editingId ? "Update" : "Create"}
              </button>
              {editingId && (
                <button className="btn btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right side: List of Categories */}
        <div className="col-md-6">
          <div className="card p-4">
            <h3 className="mb-3">Existing Categories</h3>
            {categories.length === 0 ? (
              <p>No categories available.</p>
            ) : (
              <ul className="list-group">
                {categories.map((category) => (
                  <li className="list-group-item d-flex justify-content-between align-items-center" key={category.id}>
                    <div>
                      <h5>{category.name}</h5>
                      <p>{category.description}</p>
                    </div>
                    <div>
                      <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(category)}>Update</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(category.id)}>Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
