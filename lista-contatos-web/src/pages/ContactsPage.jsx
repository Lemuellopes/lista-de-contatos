import React from 'react';
import { ContactCard } from '../components/ContactCard';
import './ContactsPage.css';

export function ContactsPage({ contacts, onContactClick, onDeleteClick, onAddClick }) {
  return (
    <div className="contacts-page">
      {/* Header */}
      <div className="contacts-header">
        <div>
          <h1 className="contacts-title">Contatos</h1>
          <p className="contacts-subtitle">
            {contacts.length} contato{contacts.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Lista de Contatos */}
      <div className="contacts-list">
        {contacts.length > 0 ? (
          contacts.map(contact => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onClick={() => onContactClick(contact.id)}
              onDelete={() => onDeleteClick(contact.id, contact.name)}
            />
          ))
        ) : (
          <div className="empty-state">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <h3>Nenhum contato</h3>
            <p>Adicione seu primeiro contato tocando no botão abaixo</p>
          </div>
        )}
      </div>

      {/* FBotão flutuante para adicionar */}
      <button className="fab" onClick={onAddClick} title="Adicionar contato">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
    </div>
  );
}
