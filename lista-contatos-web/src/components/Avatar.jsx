import React from 'react';
import './Avatar.css';

// Renderiza o avatar com iniciais e cor do contato.
export function Avatar({ initials, color, size = 'medium' }) {
  return (
    <div className={`avatar avatar-${size}`} style={{ backgroundColor: color }}>
      <span className="avatar-text">{initials}</span>
    </div>
  );
}
