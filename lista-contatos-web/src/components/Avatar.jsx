import React from 'react';
import './Avatar.css';

export function Avatar({ initials, color, photo, size = 'medium' }) {
  return (
    <div className={`avatar avatar-${size}`} style={{ backgroundColor: color }}>
      {photo ? (
        <img className="avatar-image" src={photo} alt={`Foto de ${initials}`} />
      ) : (
        <span className="avatar-text">{initials}</span>
      )}
    </div>
  );
}
