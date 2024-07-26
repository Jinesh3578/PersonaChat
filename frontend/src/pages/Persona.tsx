import React, { useState } from 'react';
import { personalities } from '../data/personalities';
import '../Persona.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Chat from './Chat';

const Persona = () => {
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const handlePersonaSelect = (persona) => {
    setSelectedPersona(persona);
  };

  const handleCustomPromptChange = (e) => {
    setCustomPrompt(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/persona/select', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({
          persona: selectedPersona.id,
          customPrompt: customPrompt,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate(data.redirectPath);
      } else {
        console.error('Error selecting persona:', data.message);
      }
    } catch (error) {
      console.error('Error selecting persona:', error);
    }
  };

  return (
    <div className="persona-container">
      {!selectedPersona ? (
        personalities.map((personality) => (
          <div
            key={personality.id}
            className="persona-card"
            onClick={() => handlePersonaSelect(personality)}
          >
            <img src={personality.image} alt={personality.name} className="persona-image" />
            <h3>{personality.name}</h3>
            <p>{personality.description}</p>
            {personality.id === 'custom' && (
              <input
                type="text"
                placeholder="Enter custom personality prompt"
                value={customPrompt}
                onChange={handleCustomPromptChange}
                className="custom-prompt-input"
              />
            )}
          </div>
        ))
      ) : (
        <Chat selectedPersona={selectedPersona} />
      )}
    </div>
  );
};

export default Persona;
