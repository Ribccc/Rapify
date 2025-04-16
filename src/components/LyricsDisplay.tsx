
import React from 'react';
import { motion } from 'framer-motion';

interface LyricsDisplayProps {
  lyrics: string;
  isLoading: boolean;
}

const LyricsDisplay: React.FC<LyricsDisplayProps> = ({ lyrics, isLoading }) => {
  // Split lyrics into lines for animation
  const lines = lyrics.split('\n').filter(line => line.trim() !== '');

  if (isLoading) {
    return (
      <div className="w-full p-6 glass-card rounded-xl min-h-[200px] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-2">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-neon-purple animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-3 h-3 rounded-full bg-neon-pink animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-3 h-3 rounded-full bg-neon-blue animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <p className="text-muted-foreground">Dropping beats and crafting verses...</p>
        </div>
      </div>
    );
  }

  if (!lyrics) {
    return (
      <div className="w-full p-6 glass-card rounded-xl min-h-[200px] flex items-center justify-center">
        <p className="text-muted-foreground text-center">
          Your lyrics will appear here.<br />
          <span className="text-sm italic">Set the mood, drop some keywords, and let's create.</span>
        </p>
      </div>
    );
  }

  return (
    <div className="w-full p-6 glass-card rounded-xl min-h-[200px] overflow-y-auto">
      <div className="space-y-2">
        {lines.map((line, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="font-medium"
          >
            {line}
          </motion.p>
        ))}
      </div>
    </div>
  );
};

export default LyricsDisplay;
