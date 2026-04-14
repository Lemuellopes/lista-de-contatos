import React from 'react';
import { Avatar } from './Avatar';
import './ContactCard.css';

// Exibe um resumo clicável do contato na lista principal.
export function ContactCard({ contact, onClick }) {
  return (
    <div className="contact-card" onClick={onClick}>
      <Avatar initials={contact.initials} color={contact.color} size="medium" />
      <div className="contact-info">
        <h3 className="contact-name">{contact.name}</h3>
        <p className="contact-phone">{contact.phone}</p>
      </div>
      <svg className="contact-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </div>
  );
}
