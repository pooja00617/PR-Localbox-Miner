import  { useState, useEffect } from 'react';
const Form = () => {
  const [formData, setFormData] = useState({ name: '', email: '', age: '', password: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [storedData, setStoredData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('formData')) || [];
    setStoredData(data);
  }, []);

  const validate = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Name is required.';
    if (!formData.email) newErrors.email = 'Email is required.';
    else if (!/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(formData.email)) newErrors.email = 'Invalid email format.';
    if (!formData.age) newErrors.age = 'Age is required.';
    else if (!/^[0-9]+$/.test(formData.age)) newErrors.age = 'Age must be a number.';
    if (!formData.password) newErrors.password = 'Password is required.';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    if (!formData.phone) newErrors.phone = 'Phone number is required.';
    else if (!/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits.';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      if (isEditing) {
        const updatedData = storedData.map((item, index) => (index === editIndex ? formData : item));
        setStoredData(updatedData);
        localStorage.setItem('formData', JSON.stringify(updatedData));
        setIsEditing(false);
        setEditIndex(null);
      } else {
        const newStoredData = [...storedData, formData];
        localStorage.setItem('formData', JSON.stringify(newStoredData));
        setStoredData(newStoredData);
      }

      setFormData({ name: '', email: '', age: '', password: '', phone: '' });
      setErrors({});
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = (index) => {
    const filteredData = storedData.filter((_, i) => i !== index);
    setStoredData(filteredData);
    localStorage.setItem('formData', JSON.stringify(filteredData));
  };

  const handleEdit = (index) => {
    setFormData(storedData[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <div className="container mt-5 bg-light p-5 rounded-3">
      <h1 className='text-center text-info-emphasis fw-bolder '>Register Form</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label fw-bolder fs-3 text">Name :</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-bolder fs-3 text">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="age" className="form-label fw-bolder fs-3 text">Age:</label>
          <input
            type="text"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={`form-control ${errors.age ? 'is-invalid' : ''}`}
          />
          {errors.age && <div className="invalid-feedback">{errors.age}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label fw-bolder fs-3 text">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label fw-bolder fs-3 text">Phone Number:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>

        <button type="submit" className="btn btn-primary fs-5">{isEditing ? 'Update' : 'Submit'}</button>
      </form>

      <h2 className=' text-center text-info-emphasis fw-bolder mb-3'>User Deta Information</h2>
      <table className="table table-striped mt-3">
        <thead className="table- mt-5">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Password</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {storedData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.age}</td>
              <td>{item.password}</td>
              <td>{item.phone}</td>
              <td>
                <button className="btn text-white bg-success btn-sm me-2 fw-bolder" onClick={() => handleEdit(index)}>Edit</button>
                <button className="btn btn-danger btn-sm fw-bolder" onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Form;