import React from 'react';
import { Play, Square, Plus } from 'lucide-react';

interface ControlsProps {
  onPlay: () => void;
  onStop: () => void;
  isPlaying: boolean;
  onAddSprite: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ 
  onPlay, 
  onStop, 
  isPlaying,
  onAddSprite
}) => {
  return (
    <div className="flex items-center space-x-2">
      {!isPlaying ? (
        <button 
          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full flex items-center justify-center transition-colors"
          onClick={onPlay}
          title="Play"
        >
          <Play size={20} fill="white" />
        </button>
      ) : (
        <button 
          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full flex items-center justify-center transition-colors"
          onClick={onStop}
          title="Stop"
        >
          <Square size={16} />
        </button>
      )}
      
      <button 
        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full flex items-center justify-center transition-colors"
        onClick={onAddSprite}
        title="Add Sprite"
      >
        <Plus size={20} />
      </button>
    </div>
  );
};