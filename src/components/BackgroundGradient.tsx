
import React from 'react';

const BackgroundGradient: React.FC = () => {
  return (
    <div className="fixed w-full h-full top-0 left-0 z-[-1] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black to-[#0E0B14] opacity-90"></div>
      
      {/* Animated neon circles */}
      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-neon-purple/10 blur-[60px] animate-float"></div>
      <div className="absolute top-[70%] left-[60%] w-[30%] h-[30%] rounded-full bg-neon-pink/10 blur-[70px] animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-[30%] left-[70%] w-[25%] h-[25%] rounded-full bg-neon-blue/10 blur-[50px] animate-float" style={{ animationDelay: '2s' }}></div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:50px_50px] opacity-10"></div>
    </div>
  );
};

export default BackgroundGradient;
