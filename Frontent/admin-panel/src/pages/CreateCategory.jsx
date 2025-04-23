import { useState } from 'react';
import axios from 'axios';

export default function CreateCategory() {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const handleCreate = () => {
    axios.post('http://localhost:8082/api/admin/categories?adminId=1', {
      name, description: desc
    }).then(() => {
      alert('Category created!');
      setName('');
      setDesc('');
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Create New Category</h2>
      <input
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)} />
      <br />
      <input
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)} />
      <br />
      <button onClick={handleCreate}>Create</button>
    </div>
  );
}
