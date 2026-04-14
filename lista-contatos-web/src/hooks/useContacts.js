import { useState, useEffect } from 'react';

// Chave usada para persistir os contatos no localStorage.
const STORAGE_KEY = 'contacts_list';

// Lista padrão carregada quando não há dados persistidos.
const initialContacts = [
  {
    id: '1',
    name: 'João Silva',
    phone: '(11) 98765-4321',
    initials: 'JS',
    color: '#3b82f6'
  },
  {
    id: '2',
    name: 'Maria Santos',
    phone: '(21) 99876-5432',
    initials: 'MS',
    color: '#8b5cf6'
  },
  {
    id: '3',
    name: 'Pedro Costa',
    phone: '(31) 97654-3210',
    initials: 'PC',
    color: '#ec4899'
  },
  {
    id: '4',
    name: 'Ana Oliveira',
    phone: '(41) 96543-2109',
    initials: 'AO',
    color: '#10b981'
  },
  {
    id: '5',
    name: 'Carlos Ferreira',
    phone: '(51) 95432-1098',
    initials: 'CF',
    color: '#f59e0b'
  }
];

export function useContacts() {
  const [contacts, setContacts] = useState(initialContacts);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carregar contatos do localStorage ao iniciar
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setContacts(JSON.parse(stored));
      } catch (error) {
        console.error('Erro ao carregar contatos:', error);
        setContacts(initialContacts);
      }
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialContacts));
    }
    setIsLoaded(true);
  }, []);

  // Salva contatos no localStorage
  const saveContacts = (newContacts) => {
    setContacts(newContacts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newContacts));
  };

  // Cria e salva um novo contato na lista.
  const addContact = (name, phone) => {
    const initials = name
      .split(' ')
      .slice(0, 2)
      .map(word => word[0])
      .join('')
      .toUpperCase();

    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#6366f1'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    const newContact = {
      id: Date.now().toString(),
      name,
      phone,
      initials,
      color
    };

    const updated = [...contacts, newContact];
    saveContacts(updated);
    return newContact;
  };

  const removeContact = (id) => {
    const updated = contacts.filter(c => c.id !== id);
    saveContacts(updated);
  };

  // Busca um contato específico pelo ID.
  const getContactById = (id) => {
    return contacts.find(c => c.id === id);
  };

  return {
    contacts,
    isLoaded,
    addContact,
    removeContact,
    getContactById
  };
}
