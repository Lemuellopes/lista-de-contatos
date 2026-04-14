import React, { useState } from 'react';
import { useContacts } from './hooks/useContacts';
import { ContactsPage } from './pages/ContactsPage';
import { CallPage } from './pages/CallPage';
import { AddContactPage } from './pages/AddContactPage';
import './App.css';

function App() {
  // Estado para controlar qual página está sendo exibida
  const { contacts, isLoaded, addContact, getContactById } = useContacts();
  // Estado para armazenar o ID do contato selecionado
  const [currentPage, setCurrentPage] = useState('contacts');
  // Estado para guardar o contato escolhido para a tela de chamada.
  const [selectedContactId, setSelectedContactId] = useState(null);
  // Encontra o contato selecionado a partir do ID salvo no estado.
  const selectedContact = selectedContactId ? getContactById(selectedContactId) : null;

  // Abre a tela de chamada com o contato clicado.
  const handleContactClick = (id) => {
    setSelectedContactId(id);
    setCurrentPage('call'); // Muda para página de ligação
  };

  // Adiciona o contato e retorna para a listagem.
  const handleAddContact = (name, phone) => {
    addContact(name, phone);
    setCurrentPage('contacts');
  };

  // Exibe loading enquanto os contatos ainda não foram carregados.
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
          onAddClick={() => setCurrentPage('add')}
        />
      )}

      {currentPage === 'call' && (
        <CallPage
          contact={selectedContact}
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
