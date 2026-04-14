import React, { useRef, useState, useEffect } from 'react';
import { Avatar } from '../components/Avatar';
import { Button } from '../components/Button';
import './CallPage.css';

export function CallPage({ contact, onBack, onUpdatePhoto }) {
  const [callPhase, setCallPhase] = useState('ready');
  const [duration, setDuration] = useState(0);
  const fileInputRef = useRef(null);
  const isDialing = callPhase === 'dialing';
  const isCallActive = callPhase === 'active';

  // Simula o tempo em "Ligando..." antes de entrar na chamada ativa.
  useEffect(() => {
    let timeout;

    if (isDialing) {
      timeout = setTimeout(() => {
        setCallPhase('active');
      }, 1800);
    }

    return () => clearTimeout(timeout);
  }, [isDialing]);

  // Cronometro da chamada ativa.
  useEffect(() => {
    let interval;

    if (isCallActive) {
      interval = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isCallActive]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Define o titulo do cabecalho conforme a fase atual da chamada.
  const getHeaderTitle = () => {
    if (isCallActive) return 'Ligação em andamento';
    if (isDialing) return 'Chamando contato';
    return 'Pronto para ligar';
  };

  // Inicia o fluxo de chamada simulada (estado "ligando").
  const handleStartCall = () => {
    setDuration(0);
    setCallPhase('dialing');
  };

  // Cancela/encerra a chamada, limpa o estado local e volta para a lista.
  const handleCancel = () => {
    setCallPhase('ready');
    setDuration(0);
    onBack();
  };

  const handlePickPhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file || !contact) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof onUpdatePhoto === 'function') {
        onUpdatePhoto(contact.id, reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  if (!contact) {
    return (
      <div className="call-page">
        <p>Contato não encontrado</p>
      </div>
    );
  }

  return (
    <div className="call-page">
      {/* Header */}
      <div className="call-header">
        <button className="back-button" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>{getHeaderTitle()}</span>
        </button>
      </div>

      {/* Call Content */}
      <div className="call-content">
        <div className={`avatar-container ${callPhase !== 'ready' ? 'pulse' : ''}`}>
          <Avatar 
            initials={contact.initials} 
            color={contact.color} 
            photo={contact.photo}
            size="large" 
          />
        </div>

        {/* Contact Info */}
        <h2 className="call-name">{contact.name}</h2>
        <p className="call-phone">{contact.phone}</p>
        <button type="button" className="photo-change-button" onClick={handlePickPhotoClick}>
          {contact.photo ? 'Trocar foto' : 'Adicionar foto'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="photo-input-hidden"
          onChange={handlePhotoChange}
        />

        {/* Call Status */}
        <div className="call-status">
          {isCallActive && (
            <>
              <p className="status-label">Duração da ligação</p>
              <p className="status-time">{formatDuration(duration)}</p>
            </>
          )}

          {isDialing && (
            <p className="status-label calling">Ligando</p>
          )}

          {!isDialing && !isCallActive && (
            <>
              <p className="status-label">Tudo pronto para iniciar a chamada</p>
              <p className="status-hint">Toque em iniciar para comecar</p>
            </>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="call-actions">
        {!isDialing && !isCallActive && (
          <Button 
            onClick={handleStartCall}
            variant="primary"
            size="large"
            fullWidth
            className="accept-button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            Iniciar chamada
          </Button>
        )}

        <Button 
          onClick={handleCancel}
          variant={isDialing || isCallActive ? 'danger' : 'secondary'}
          size="large"
          fullWidth
          className={`end-button ${!isDialing && !isCallActive ? 'return-button' : ''}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23 1l-6.97 20.8a.5.5 0 0 1-.933-.055l-2.685-10.604-10.604-2.686a.5.5 0 0 1-.041-.942L22 1z"></path>
          </svg>
          {isCallActive ? 'Encerrar chamada' : isDialing ? 'Cancelar chamada' : 'Voltar'}
        </Button>
      </div>
    </div>
  );
}
