import React, { useEffect, useRef } from 'react';
import { Sprite } from '../../types';
import { SpriteComponent } from './SpriteComponent';
import { executeBlocks } from '../../utils/blockExecutor';
import { ArrowLeftRight } from 'lucide-react';

interface StageProps {
  sprites: Sprite[];
  isPlaying: boolean;
  onUpdateSprite: (spriteId: string, updates: Partial<Sprite>) => void;
  setIsPlaying: (isPlaying: boolean) => void;
}

export const Stage: React.FC<StageProps> = ({ sprites, isPlaying, onUpdateSprite, setIsPlaying }) => {
  const animationRef = useRef<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const positionSpritesOnSides = () => {
    if (sprites.length >= 2) {
      // Position first sprite on the left
      onUpdateSprite(sprites[0].id, { x: -200, y: 0, direction: 90 });
      // Position second sprite on the right
      onUpdateSprite(sprites[1].id, { x: 200, y: 0, direction: -90 });
    }
  };

  // Handle collision detection and animation swap
  const checkCollisions = () => {
    const spriteElements = document.querySelectorAll('[data-sprite-id]');
    const spriteRects: { id: string, rect: DOMRect }[] = [];

    spriteElements.forEach(elem => {
      const id = elem.getAttribute('data-sprite-id');
      if (id) {
        spriteRects.push({
          id,
          rect: elem.getBoundingClientRect()
        });
      }
    });

    // Check each sprite against others for collision
    for (let i = 0; i < spriteRects.length; i++) {
      for (let j = i + 1; j < spriteRects.length; j++) {
        const sprite1 = spriteRects[i];
        const sprite2 = spriteRects[j];

        // Simple collision detection
        if (
          sprite1.rect.left < sprite2.rect.right &&
          sprite1.rect.right > sprite2.rect.left &&
          sprite1.rect.top < sprite2.rect.bottom &&
          sprite1.rect.bottom > sprite2.rect.top
        ) {
          // Swap animations - find the sprites
          const sprite1Data = sprites.find(s => s.id === sprite1.id);
          const sprite2Data = sprites.find(s => s.id === sprite2.id);

          if (sprite1Data && sprite2Data) {
            // Swap move blocks only - this is our "hero feature"
            const sprite1MoveBlocks = sprite1Data.blocks.filter(b => b.action === 'move');
            const sprite2MoveBlocks = sprite2Data.blocks.filter(b => b.action === 'move');

            if (sprite1MoveBlocks.length > 0 && sprite2MoveBlocks.length > 0) {
              // Swap the motion blocks between sprites
              const updatedSprite1Blocks = sprite1Data.blocks.map(block => {
                if (block.action === 'move') {
                  // Invert the steps (change direction)
                  return { 
                    ...block, 
                    params: { 
                      ...block.params, 
                      steps: -block.params.steps 
                    } 
                  };
                }
                return block;
              });

              const updatedSprite2Blocks = sprite2Data.blocks.map(block => {
                if (block.action === 'move') {
                  // Invert the steps (change direction)
                  return { 
                    ...block, 
                    params: { 
                      ...block.params, 
                      steps: -block.params.steps 
                    } 
                  };
                }
                return block;
              });

              // Update both sprites with their new blocks
              onUpdateSprite(sprite1.id, { blocks: updatedSprite1Blocks });
              onUpdateSprite(sprite2.id, { blocks: updatedSprite2Blocks });
            }
          }
        }
      }
    }
  };

  // Animation loop
  useEffect(() => {
    if (isPlaying) {
      const frame = () => {
        // Execute each sprite's blocks
        sprites.forEach(sprite => {
          executeBlocks(sprite, sprites, onUpdateSprite);
        });

        // Check for collisions
        checkCollisions();

        // Continue animation loop
        animationRef.current = requestAnimationFrame(frame);
      };

      animationRef.current = requestAnimationFrame(frame);
    } else if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, sprites]);

  return (
    <div className="w-full md:w-1/2 lg:w-3/5 bg-white p-4 overflow-hidden flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Stage</h2>
        <button
          onClick={positionSpritesOnSides}
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          title="Position sprites on opposite sides"
        >
          <ArrowLeftRight size={16} />
          <span>Position Sprites</span>
        </button>
      </div>
      <div 
        ref={stageRef}
        className="flex-1 bg-gray-100 border border-gray-200 rounded-lg relative overflow-hidden"
        style={{ minHeight: '300px' }}
      >
        {sprites.map(sprite => (
          <SpriteComponent 
            key={sprite.id} 
            sprite={sprite} 
          />
        ))}
      </div>
    </div>
  );
};