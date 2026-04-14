import React, { useState } from 'react';
import { FormInput, phoneMask } from '../components/FormInput';
import { Button } from '../components/Button';
import './AddContactPage.css';

// Tela de cadastro de novo contato.
export function AddContactPage({ onAdd, onCancel }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Valida os campos obrigatórios e o formato mínimo do telefone.
  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Telefone inválido (mínimo 10 dígitos)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submete o formulário e aciona o cadastro no componente pai.
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simular delay de salvamento
    await new Promise(resolve => setTimeout(resolve, 500));

    onAdd(name.trim(), phone);
    setIsLoading(false);
  };

  return (
    <div className="add-contact-page">
      {/* Header */}
      <div className="add-contact-header">
        <h2 className="add-contact-title">Novo Contato</h2>
        <button 
          className="close-button" 
          onClick={onCancel}
          disabled={isLoading}
        >
          ✕
        </button>
      </div>

      {/* Form Content */}
      <form className="add-contact-form" onSubmit={handleSubmit}>
        {/* Icon */}
        <div className="form-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
          </svg>
        </div>

        {/* Form Fields */}
        <div className="form-fields">
          <FormInput
            label="Nome Completo"
            placeholder="Digite o nome do contato"
            value={name}
            onChange={setName}
            error={errors.name}
            disabled={isLoading}
          />

          <FormInput
            label="Telefone"
            placeholder="(XX) XXXXX-XXXX"
            value={phone}
            onChange={setPhone}
            error={errors.phone}
            mask={phoneMask}
            maxLength={15}
            disabled={isLoading}
          />

          {/* Info Text */}
          <div className="form-info">
            <span>💡</span>
            <p>Você pode adicionar quantos contatos desejar. Todos serão salvos no seu navegador.</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="form-actions">
          <Button 
            type="submit"
            variant="primary"
            size="large"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? 'Salvando...' : 'Salvar Contato'}
          </Button>

          <Button 
            type="button"
            variant="secondary"
            size="large"
            fullWidth
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
