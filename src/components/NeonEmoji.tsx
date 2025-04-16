
import React from 'react';

interface NeonEmojiProps {
  emoji: string;
  className?: string;
}

const NeonEmoji: React.FC<NeonEmojiProps> = ({ emoji, className = '' }) => {
  return (
    <span 
      className={`inline-block animate-float text-2xl ${className}`}
      style={{ 
        filter: 'drop-shadow(0 0 5px currentColor)',
        textShadow: '0 0 8px currentColor'
      }}
    >
      {emoji}
    </span>
  );
};

export default NeonEmoji;
