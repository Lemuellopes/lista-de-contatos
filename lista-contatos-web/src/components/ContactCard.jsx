import React from 'react';
import { Avatar } from './Avatar';
import './ContactCard.css';

export function ContactCard({ contact, onClick, onDelete }) {
  const handleDeleteClick = (event) => {
    event.stopPropagation();

    if (typeof onDelete === 'function') {
      onDelete();
    }
  };

  return (
    <div className="contact-card" onClick={onClick}>
      <Avatar initials={contact.initials} color={contact.color} photo={contact.photo} size="medium" />
      <div className="contact-info">
        <h3 className="contact-name">{contact.name}</h3>
        <p className="contact-phone">{contact.phone}</p>
      </div>

      <div className="contact-actions">
        <button
          className="delete-contact-button"
          type="button"
          onClick={handleDeleteClick}
          aria-label={`Excluir contato ${contact.name}`}
          title="Excluir contato"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18"></path>
            <path d="M8 6V4h8v2"></path>
            <path d="M19 6l-1 14H6L5 6"></path>
            <path d="M10 11v6"></path>
            <path d="M14 11v6"></path>
          </svg>
        </button>

        <svg className="contact-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
    </div>
  );
}
