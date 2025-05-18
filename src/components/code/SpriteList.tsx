import React from 'react';
import { Sprite } from '../../types';

interface SpriteListProps {
  sprites: Sprite[];
  activeSprite: string;
  onSelectSprite: (spriteId: string) => void;
}

export const SpriteList: React.FC<SpriteListProps> = ({ 
  sprites, 
  activeSprite, 
  onSelectSprite 
}) => {
  return (
    <div className="bg-gray-50 border-b border-gray-200 p-2 overflow-x-auto">
      <div className="flex space-x-2">
        {sprites.map(sprite => (
          <button
            key={sprite.id}
            className={`flex flex-col items-center p-2 rounded ${
              activeSprite === sprite.id 
                ? 'bg-blue-100 border-blue-400 border' 
                : 'bg-white border-gray-200 border hover:bg-gray-100'
            }`}
            onClick={() => onSelectSprite(sprite.id)}
          >
            <span className="text-2xl mb-1">{sprite.costume}</span>
            <span className="text-xs whitespace-nowrap">{sprite.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};