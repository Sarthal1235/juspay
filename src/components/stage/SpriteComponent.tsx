import React from 'react';
import { Sprite } from '../../types';

interface SpriteComponentProps {
  sprite: Sprite;
}

export const SpriteComponent: React.FC<SpriteComponentProps> = ({ sprite }) => {
  const getPositionStyle = () => {
    // Convert sprite coordinates to CSS positioning
    // The stage is centered at (0,0), so we need to offset by 50%
    return {
      left: `calc(50% + ${sprite.x}px)`,
      top: `calc(50% - ${sprite.y}px)`,
      transform: `rotate(${90 - sprite.direction}deg)`,
    };
  };

  return (
    <div 
      className="absolute transition-all duration-100"
      data-sprite-id={sprite.id}
      style={getPositionStyle()}
    >
      <div className="relative">
        {/* Sprite character */}
        <div className="text-4xl">{sprite.costume}</div>
        
        {/* Speech bubble */}
        {sprite.sayText && (
          <div className="absolute -top-12 left-6 bg-white p-2 rounded-lg border border-gray-300 text-sm min-w-[100px] text-center">
            {sprite.sayText}
            <div className="absolute -bottom-2 left-2 w-4 h-4 bg-white border-r border-b border-gray-300 transform rotate-45"></div>
          </div>
        )}
        
        {/* Thought bubble */}
        {sprite.thinkText && (
          <div className="absolute -top-12 left-6 bg-white p-2 rounded-lg border border-gray-300 text-sm min-w-[100px] text-center">
            {sprite.thinkText}
            <div className="absolute -bottom-6 left-2 flex flex-col items-center">
              <div className="w-3 h-3 bg-white rounded-full border border-gray-300 mb-1"></div>
              <div className="w-2 h-2 bg-white rounded-full border border-gray-300"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};