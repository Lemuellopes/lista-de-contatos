import React from 'react';
import './FormInput.css';

export function FormInput({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  error, 
  type = 'text',
  maxLength,
  mask
}) {
  const handleChange = (e) => {
    let text = e.target.value;
    if (mask) {
      text = mask(text);
    }
    onChange(text);
  };

  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <input
        type={type}
        className={`form-input ${error ? 'form-input-error' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
      />
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}

export function phoneMask(text) {
  const cleaned = text.replace(/\D/g, '');
  
  if (cleaned.length <= 2) {
    return cleaned ? `(${cleaned}` : '';
  }
  if (cleaned.length <= 7) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  }
  return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
}
