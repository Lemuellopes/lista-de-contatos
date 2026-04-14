import React, { useState } from 'react';
import { useContacts } from './hooks/useContacts';
import { ContactsPage } from './pages/ContactsPage';
import { CallPage } from './pages/CallPage';
import { AddContactPage } from './pages/AddContactPage';
import './App.css';

function App() {
  // Estado para controlar qual página está sendo exibida
  const { contacts, isLoaded, addContact, removeContact, updateContactPhoto, getContactById } = useContacts();
  // Estado para armazenar o ID do contato selecionado
  const [currentPage, setCurrentPage] = useState('contacts');
  // Hook customizado que gerencia os contatos
  const [selectedContactId, setSelectedContactId] = useState(null);
// Encontra o contato selecionado
  const selectedContact = selectedContactId ? getContactById(selectedContactId) : null;

  const handleContactClick = (id) => {
    setSelectedContactId(id);
    setCurrentPage('call'); // Muda para página de ligação
  };
// Quando um novo contato é adicionado
  const handleAddContact = (name, phone, photo) => {
    addContact(name, phone, photo);
    setCurrentPage('contacts');
  };

  const handleDeleteContact = (id, name) => {
    const shouldDelete = window.confirm(`Deseja excluir o contato ${name}?`);

    if (!shouldDelete) {
      return;
    }

    removeContact(id);

    if (selectedContactId === id) {
      setSelectedContactId(null);
      setCurrentPage('contacts');
    }
  };

  const handleUpdateContactPhoto = (id, photo) => {
    updateContactPhoto(id, photo);
  };

  if (!isLoaded) {
    return (
      <div className="app loading">
        <div className="spinner"></div>
      </div>
    );
  }
  // Renderiza a página correta baseado no estado

  return (
    <div className="app">
      {currentPage === 'contacts' && (
        <ContactsPage
          contacts={contacts}
          onContactClick={handleContactClick}
          onDeleteClick={handleDeleteContact}
          onAddClick={() => setCurrentPage('add')}
        />
      )}

      {currentPage === 'call' && (
        <CallPage
          contact={selectedContact}
          onUpdatePhoto={handleUpdateContactPhoto}
          onBack={() => setCurrentPage('contacts')}
        />
      )}

      {currentPage === 'add' && (
        <AddContactPage
          onAdd={handleAddContact}
          onCancel={() => setCurrentPage('contacts')}
        />
      )}
    </div>
  );
}

export default App;
