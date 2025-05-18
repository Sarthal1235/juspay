import React from 'react';
import { Sprite } from '../../types';
import { SpriteList } from './SpriteList';
import { BlockList } from './BlockList';

interface CodeAreaProps {
  sprites: Sprite[];
  activeSprite: string;
  onSelectSprite: (spriteId: string) => void;
  onUpdateBlock: (blockId: string, updates: any) => void;
  onRemoveBlock: (blockId: string) => void;
}

export const CodeArea: React.FC<CodeAreaProps> = ({ 
  sprites, 
  activeSprite, 
  onSelectSprite,
  onUpdateBlock,
  onRemoveBlock
}) => {
  const currentSprite = sprites.find(sprite => sprite.id === activeSprite);

  return (
    <div className="flex-1 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Code</h2>
        <p className="text-sm text-gray-600">Drag blocks to create animations for your sprites</p>
      </div>
      
      <div className="flex flex-col h-full overflow-hidden">
        <SpriteList 
          sprites={sprites} 
          activeSprite={activeSprite} 
          onSelectSprite={onSelectSprite} 
        />
        
        <div className="flex-1 overflow-y-auto p-4">
          {currentSprite && (
            <BlockList 
              blocks={currentSprite.blocks} 
              onUpdateBlock={onUpdateBlock} 
              onRemoveBlock={onRemoveBlock}
            />
          )}
        </div>
      </div>
    </div>
  );
};