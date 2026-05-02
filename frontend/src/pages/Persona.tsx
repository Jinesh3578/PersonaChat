import { useState } from 'react';
import { personalities } from '../data/personalities';
import '../Persona.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { selectPersona } from '../helpers/api-communicator';
import toast from 'react-hot-toast';

type Personality = {
  id: string;
  name: string;
  description: string;
  image: string;
};

const Persona = () => {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const auth = useAuth();
  const navigate = useNavigate();

  const handlePersonaSelect = (personaId: string) => {
    setSelectedPersonaId(personaId);
  };

  const handleCustomPromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomPrompt(e.target.value);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>, persona: Personality) => {
    e.stopPropagation();
    if (!auth) return;
    try {
      toast.loading('Selecting persona...', { id: 'persona' });
      // Bug 2 fix: use the API helper which has the correct base URL + cookies
      await selectPersona(persona.id, persona.id === 'custom' ? customPrompt : undefined);
      toast.success('Persona selected!', { id: 'persona' });
      // Navigate to chat, passing the full persona object via router state
      navigate('/chat', { state: { selectedPersona: persona } });
    } catch (error) {
      console.error('Error selecting persona:', error);
      toast.error('Failed to select persona', { id: 'persona' });
    }
  };

  return (
    <div className="persona-container">
      {personalities.map((personality: Personality) => (
        <div
          key={personality.id}
          className={`persona-card ${selectedPersonaId === personality.id ? 'selected' : ''}`}
          onClick={() => handlePersonaSelect(personality.id)}
        >
          <img src={personality.image} alt={personality.name} className="persona-image" />
          <h3>{personality.name}</h3>
          <p>{personality.description}</p>
          {personality.id === 'custom' && selectedPersonaId === 'custom' && (
            <input
              type="text"
              placeholder="Enter custom personality prompt"
              value={customPrompt}
              onChange={handleCustomPromptChange}
              className="custom-prompt-input"
              onClick={(e) => e.stopPropagation()}
            />
          )}
          <button 
            onClick={(e) => handleSubmit(e, personality)} 
            disabled={!auth}
            className="select-button"
            style={{ display: selectedPersonaId === personality.id ? 'block' : 'none' }}
          >
            Start Chat
          </button>
        </div>
      ))}
    </div>
  );
};

export default Persona;
