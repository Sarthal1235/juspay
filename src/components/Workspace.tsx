import React, { useState } from 'react';
import { BlockMenu } from './blocks/BlockMenu';
import { CodeArea } from './code/CodeArea';
import { Stage } from './stage/Stage';
import { Sprite, Block } from '../types';
import { Controls } from './Controls';

export const Workspace: React.FC = () => {
  const [sprites, setSprites] = useState<Sprite[]>([
    {
      id: 'sprite1',
      name: 'Sprite 1',
      x: 0,
      y: 0,
      direction: 90,
      blocks: [],
      costume: '🐱',
      isActive: true,
      sayText: '',
      thinkText: '',
      textTimeout: null,
    },
  ]);
  const [activeSprite, setActiveSprite] = useState<string>('sprite1');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleAddBlock = (block: Block) => {
    setSprites(currentSprites => {
      return currentSprites.map(sprite => {
        if (sprite.id === activeSprite) {
          return {
            ...sprite,
            blocks: [...sprite.blocks, { ...block, id: `block-${Date.now()}-${Math.random()}` }]
          };
        }
        return sprite;
      });
    });
  };

  const handleUpdateBlock = (blockId: string, newValues: Partial<Block>) => {
    setSprites(currentSprites => {
      return currentSprites.map(sprite => {
        if (sprite.id === activeSprite) {
          return {
            ...sprite,
            blocks: sprite.blocks.map(block => 
              block.id === blockId ? { ...block, ...newValues } : block
            )
          };
        }
        return sprite;
      });
    });
  };

  const handleRemoveBlock = (blockId: string) => {
    setSprites(currentSprites => {
      return currentSprites.map(sprite => {
        if (sprite.id === activeSprite) {
          return {
            ...sprite,
            blocks: sprite.blocks.filter(block => block.id !== blockId)
          };
        }
        return sprite;
      });
    });
  };

  const handleAddSprite = () => {
    const newId = `sprite${sprites.length + 1}`;
    const newSprite: Sprite = {
      id: newId,
      name: `Sprite ${sprites.length + 1}`,
      x: 0,
      y: 0,
      direction: 90,
      blocks: [],
      costume: ['🐱', '🐶', '🐰', '🐻', '🦊'][sprites.length % 5],
      isActive: false,
      sayText: '',
      thinkText: '',
      textTimeout: null,
    };
    
    setSprites([...sprites, newSprite]);
  };

  const handleSelectSprite = (spriteId: string) => {
    setActiveSprite(spriteId);
  };

  const handleUpdateSprite = (spriteId: string, updates: Partial<Sprite>) => {
    setSprites(currentSprites => {
      return currentSprites.map(sprite => {
        if (sprite.id === spriteId) {
          return { ...sprite, ...updates };
        }
        return sprite;
      });
    });
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleStop = () => {
    setIsPlaying(false);
    // Reset all sprites to initial position
    setSprites(currentSprites => {
      return currentSprites.map(sprite => ({
        ...sprite,
        x: 0,
        y: 0,
        direction: 90,
        sayText: '',
        thinkText: '',
        textTimeout: null
      }));
    });
  };

  return (
    <div className="flex flex-col lg:flex-row h-full flex-1 overflow-hidden">
      <div className="w-full lg:w-64 border-r border-gray-200 bg-white p-4">
        <BlockMenu onAddBlock={handleAddBlock} />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <Controls 
            onPlay={handlePlay} 
            onStop={handleStop} 
            isPlaying={isPlaying} 
            onAddSprite={handleAddSprite}
          />
        </div>
        
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          <CodeArea 
            sprites={sprites}
            activeSprite={activeSprite}
            onSelectSprite={handleSelectSprite}
            onUpdateBlock={handleUpdateBlock}
            onRemoveBlock={handleRemoveBlock}
          />
          
          <Stage 
            sprites={sprites} 
            isPlaying={isPlaying}
            onUpdateSprite={handleUpdateSprite}
            setIsPlaying={setIsPlaying}
          />
        </div>
      </div>
    </div>
  );
};