
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, SkipForward } from 'lucide-react';

// Array of beat names to display
const beatNames = [
  "Lo-Fi Chill • 75 BPM",
  "Trap Beat • 140 BPM",
  "Boom Bap Classic • 90 BPM",
  "Soul Sample • 85 BPM",
  "Drill Beat • 145 BPM",
  "Old School • 95 BPM",
];

const BeatPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextBeat = () => {
    setCurrentBeat((prev) => (prev + 1) % beatNames.length);
  };

  return (
    <div className="glass-card py-2 px-4 rounded-full flex items-center gap-3 text-sm">
      <Button
        onClick={togglePlay}
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full bg-primary/20 hover:bg-primary/30"
      >
        {isPlaying ? (
          <VolumeX className="h-4 w-4 text-neon-pink" />
        ) : (
          <Volume2 className="h-4 w-4 text-neon-pink" />
        )}
      </Button>
      
      <span className="neon-blue text-xs font-medium whitespace-nowrap">
        {beatNames[currentBeat]}
      </span>
      
      <Button
        onClick={nextBeat}
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full bg-primary/20 hover:bg-primary/30"
      >
        <SkipForward className="h-4 w-4 text-neon-purple" />
      </Button>
    </div>
  );
};

export default BeatPlayer;
