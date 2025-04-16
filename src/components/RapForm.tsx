
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FiMusic, FiZap } from 'react-icons/fi';

interface RapFormProps {
  onSubmit: (mood: string, keywords: string) => void;
  isLoading: boolean;
}

const moodOptions = [
  { value: 'heartbreak', label: 'Heartbreak 💔' },
  { value: 'celebration', label: 'Celebration 🎉' },
  { value: 'hustle', label: 'Hustle Grind 💪' },
  { value: 'diss', label: 'Diss Track 🔥' },
  { value: 'reflective', label: 'Reflective 🤔' },
  { value: 'hype', label: 'Hype 🙌' },
  { value: 'confident', label: 'Confident 💯' },
  { value: 'love', label: 'Love ❤️' },
  { value: 'storytelling', label: 'Storytelling 📚' }
];

const RapForm: React.FC<RapFormProps> = ({ onSubmit, isLoading }) => {
  const [mood, setMood] = useState('');
  const [keywords, setKeywords] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(mood, keywords);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div className="space-y-2">
        <Label htmlFor="mood" className="text-sm font-medium flex items-center gap-2">
          <FiMusic className="text-neon-blue animate-pulse" />
          <span>Pick your vibe</span>
        </Label>
        <Select
          value={mood}
          onValueChange={setMood}
        >
          <SelectTrigger id="mood" className="w-full bg-muted/30 border-muted focus:ring-primary/50">
            <SelectValue placeholder="Select your mood" />
          </SelectTrigger>
          <SelectContent>
            {moodOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="keywords" className="text-sm font-medium flex items-center gap-2">
          <FiZap className="text-neon-orange animate-pulse" />
          <span>Drop your keywords (optional)</span>
        </Label>
        <Input
          id="keywords"
          placeholder="midnight, rain, alone, dreams..."
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="bg-muted/30 border-muted focus:ring-primary/50"
        />
        <p className="text-xs text-muted-foreground">
          Separate with commas for better results
        </p>
      </div>

      <Button 
        type="submit" 
        disabled={!mood || isLoading}
        className="w-full bg-gradient-to-r from-neon-purple to-neon-pink hover:opacity-90 transition-all duration-300 font-medium"
      >
        {isLoading ? 'Crafting Verse...' : 'Generate Lyrics'}
      </Button>
    </form>
  );
};

export default RapForm;
