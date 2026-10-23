import { useState } from 'react';

const MAHALLAHS = ['Ali', 'Aminah', 'Faruq', 'Asiah', 'Bilal', 'Hafsa', 'Uthman', 'Zubair'];

// A plain function: values in, errors object out. Empty object = valid.
function validate(values) {
  const errors = {};
  
  if (values.name.trim().length < 3) {
    errors.name = 'Enter your name (at least 3 characters).';
  }
  
  // Fixed TODO: mahallah must be chosen
  if (!values.mahallah) {
    errors.mahallah = 'Choose your mahallah.';
  }
  
  // Fixed TODO: pickupTime must be between '07:00' and '22:00'
  if (!values.pickupTime) {
    errors.pickupTime = 'Choose a pickup time.';
  } else if (values.pickupTime < '07:00' || values.pickupTime > '22:00') {
    errors.pickupTime = 'Pickup must be between 07:00 and 22:00.';
  }

  return errors;
}

function CheckoutForm({ onPlaceOrder }) {
  const [values, setValues] = useState({ name: '', mahallah: '', pickupTime: '' });
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault(); // stop the page reloading
    const found = validate(values);
    setErrors(found);
    
    // Fixed TODO: if found has no keys, call onPlaceOrder(values)
    if (Object.keys(found).length === 0) {
      onPlaceOrder(values);
    }
  }

  return (
    <form className="card form" onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <h3>Checkout</h3>
      
      <label htmlFor="name" style={{ fontWeight: 600 }}>Name</label>
      <input 
        id="name" 
        name="name" 
        value={values.name} 
        onChange={handleChange} 
        style={{ padding: '0.5rem', border: '1px solid #c5cbd3', borderRadius: '8px' }}
      />
      {errors.name && <p className="field-error" style={{ color: '#b3261e', fontSize: '0.85rem', margin: 0 }}>{errors.name}</p>}

      <label htmlFor="mahallah" style={{ fontWeight: 600, marginTop: '0.5rem' }}>Mahallah</label>
      <select 
        id="mahallah" 
        name="mahallah" 
        value={values.mahallah}
        onChange={handleChange}
        style={{ padding: '0.5rem', border: '1px solid #c5cbd3', borderRadius: '8px' }}
      >
        <option value="">Select…</option>
        {MAHALLAHS.map((m) => <option key={m} value={m}>{m}</option>)}
      </select>
      {/* Fixed TODO: show errors.mahallah */}
      {errors.mahallah && <p className="field-error" style={{ color: '#b3261e', fontSize: '0.85rem', margin: 0 }}>{errors.mahallah}</p>}

      {/* Fixed TODO: label + time input + error */}
      <label htmlFor="pickupTime" style={{ fontWeight: 600, marginTop: '0.5rem' }}>Pickup time</label>
      <input 
        type="time" 
        id="pickupTime" 
        name="pickupTime" 
        value={values.pickupTime} 
        onChange={handleChange} 
        style={{ padding: '0.5rem', border: '1px solid #c5cbd3', borderRadius: '8px' }}
      />
      {errors.pickupTime && <p className="field-error" style={{ color: '#b3261e', fontSize: '0.85rem', margin: 0 }}>{errors.pickupTime}</p>}

      <button type="submit" className="btn" style={{ marginTop: '1rem' }}>Place order</button>
    </form>
  );
}

export default CheckoutForm;