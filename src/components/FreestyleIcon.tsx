
import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';

interface FreestyleIconProps {
  onToggle?: (isActive: boolean) => void;
}

const beatSuggestions = [
  "Try a slow 70 BPM beat for this emotional verse",
  "This would sound fire on a 90 BPM trap beat",
  "Flow with a classic boom bap at 85-95 BPM",
  "Drop this on a modern drill beat around 140 BPM",
  "Go acapella and let your words breathe",
  "Match this with a lo-fi chill beat around 75 BPM"
];

const FreestyleIcon: React.FC<FreestyleIconProps> = ({ onToggle }) => {
  const [isActive, setIsActive] = useState(false);
  const [beatSuggestion, setBeatSuggestion] = useState('');

  const handleToggle = () => {
    const newState = !isActive;
    setIsActive(newState);
    
    if (newState) {
      // When activated, suggest a random beat
      const randomIndex = Math.floor(Math.random() * beatSuggestions.length);
      setBeatSuggestion(beatSuggestions[randomIndex]);
    } else {
      setBeatSuggestion('');
    }
    
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button 
        onClick={handleToggle}
        className={`rounded-full p-4 transition-all duration-300 ${
          isActive 
            ? 'bg-neon-purple text-white animate-mic-pulse' 
            : 'bg-muted text-muted-foreground hover:bg-neon-purple/20'
        }`}
        aria-label={isActive ? "Stop freestyle" : "Start freestyle"}
      >
        {isActive ? (
          <Mic className="h-8 w-8" />
        ) : (
          <MicOff className="h-8 w-8" />
        )}
      </button>
      
      {beatSuggestion && (
        <div className="mt-2 text-sm max-w-xs text-center animate-float">
          <span className="neon-purple">{beatSuggestion}</span>
        </div>
      )}
    </div>
  );
};

export default FreestyleIcon;
