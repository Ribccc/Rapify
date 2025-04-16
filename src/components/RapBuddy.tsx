
import React, { useState } from 'react';
import RapForm from './RapForm';
import LyricsDisplay from './LyricsDisplay';
import FreestyleIcon from './FreestyleIcon';
import BackgroundGradient from './BackgroundGradient';
import BeatPlayer from './BeatPlayer';
import NeonEmoji from './NeonEmoji';
import { generateRapLyrics, generateFallbackLyrics } from '../services/huggingFaceService';
import { FiHeadphones, FiStar } from 'react-icons/fi';
import { useToast } from '@/components/ui/use-toast';

const RapBuddy: React.FC = () => {
  const [lyrics, setLyrics] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (mood: string, keywords: string) => {
    setIsLoading(true);
    
    try {
      // Set a timeout to use fallback if API takes too long
      const timeoutPromise = new Promise<string>((resolve) => {
        setTimeout(() => {
          resolve(generateFallbackLyrics(mood, keywords));
        }, 10000); // 10 seconds timeout
      });
      
      // Race between actual API and timeout
      const lyricsText = await Promise.race([
        generateRapLyrics(mood, keywords),
        timeoutPromise
      ]);
      
      setLyrics(lyricsText);
    } catch (error) {
      console.error('Error generating lyrics:', error);
      
      // Use fallback on error
      const fallbackLyrics = generateFallbackLyrics(mood, keywords);
      setLyrics(fallbackLyrics);
      
      toast({
        title: "Oops! Something went wrong",
        description: "Using our offline lyrics generator instead.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFreestyleToggle = (isActive: boolean) => {
    if (isActive) {
      toast({
        title: "Freestyle Mode Activated 🎤",
        description: "Find your flow and spit those bars!",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4 relative">
      <BackgroundGradient />
      <header className="mb-8 text-center">
        <div className="flex justify-center items-center gap-4">
          <NeonEmoji emoji="🎵" className="text-neon-blue" />
          <h1 className="text-5xl font-bold">
            <span className="neon-purple">Rap</span>
            <span className="neon-pink">Buddy</span>
          </h1>
          <NeonEmoji emoji="🎤" className="text-neon-pink" />
        </div>
        <p className="text-muted-foreground text-lg mb-4 mt-2">
          Generate fresh verses from your vibe
        </p>
        <div className="flex justify-center mb-2">
          <BeatPlayer />
        </div>
        <div className="flex justify-center gap-10 mt-4">
          <NeonEmoji emoji="🔥" className="text-neon-orange" />
          <NeonEmoji emoji="💯" className="text-neon-blue" />
          <NeonEmoji emoji="🎧" className="text-neon-purple" />
        </div>
      </header>

      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8 items-center glass-card p-8 rounded-2xl border border-white/10 shadow-[0_0_15px_rgba(155,135,245,0.15)]">
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div className="mb-6 flex flex-row items-center justify-center gap-2">
            <FiHeadphones className="text-neon-orange text-xl beat-icon" />
            <span className="text-neon-blue text-lg font-medium">Set Your Vibe</span>
            <FiStar className="text-neon-pink text-xl beat-icon" style={{ animationDelay: '0.5s' }} />
          </div>
          
          <RapForm onSubmit={handleSubmit} isLoading={isLoading} />
          
          <div className="mt-8">
            <FreestyleIcon onToggle={handleFreestyleToggle} />
          </div>
        </div>
        
        <div className="w-full md:w-1/2">
          <div className="mb-6 flex flex-row items-center justify-center gap-2">
            <FiStar className="text-neon-purple text-xl beat-icon" />
            <span className="text-neon-pink text-lg font-medium">Your Verse</span>
            <FiHeadphones className="text-neon-blue text-xl beat-icon" style={{ animationDelay: '0.5s' }} />
          </div>
          
          <LyricsDisplay lyrics={lyrics} isLoading={isLoading} />
        </div>
      </div>
      
      <footer className="mt-12 text-center text-sm text-muted-foreground glass-card py-3 px-6 rounded-full">
        <p>Built with <span className="text-neon-pink animate-pulse-neon">🎵</span> and open-source LLMs.</p>
        <p className="mt-1">Drop a beat and find your flow.</p>
      </footer>
    </div>
  );
};

export default RapBuddy;
