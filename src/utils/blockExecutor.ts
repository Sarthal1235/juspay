import { Block, Sprite, BlockType } from '../types';

export const executeBlocks = (
  sprite: Sprite, 
  allSprites: Sprite[], 
  onUpdateSprite: (spriteId: string, updates: Partial<Sprite>) => void
) => {
  // Process each block for the sprite
  sprite.blocks.forEach(block => {
    executeBlock(block, sprite, allSprites, onUpdateSprite);
  });
};

const executeBlock = (
  block: Block, 
  sprite: Sprite, 
  allSprites: Sprite[], 
  onUpdateSprite: (spriteId: string, updates: Partial<Sprite>) => void
) => {
  switch (block.type) {
    case BlockType.Motion:
      executeMotionBlock(block, sprite, onUpdateSprite);
      break;
    case BlockType.Looks:
      executeLooksBlock(block, sprite, onUpdateSprite);
      break;
    case BlockType.Control:
      executeControlBlock(block, sprite, allSprites, onUpdateSprite);
      break;
  }
};

const executeMotionBlock = (
  block: Block, 
  sprite: Sprite, 
  onUpdateSprite: (spriteId: string, updates: Partial<Sprite>) => void
) => {
  const { action, params } = block;
  
  let updates: Partial<Sprite> = {};
  
  switch (action) {
    case 'move':
      // Calculate movement based on sprite's direction
      // For 90 degrees (facing right), cos = 1, sin = 0
      // For -90 degrees (facing left), cos = -1, sin = 0
      const radians = ((sprite.direction - 90) * Math.PI) / 180; // Subtract 90 to align with correct direction
      const dx = Math.cos(radians) * params.steps * 0.1; // Scale for smoother movement
      const dy = Math.sin(radians) * params.steps * 0.1;
      
      // Keep sprite within stage bounds
      let newX = sprite.x + dx;
      let newY = sprite.y + dy;
      
      // Simple boundary checking
      const maxX = 250;
      const maxY = 150;
      if (newX > maxX) newX = maxX;
      if (newX < -maxX) newX = -maxX;
      if (newY > maxY) newY = maxY;
      if (newY < -maxY) newY = -maxY;
      
      updates = { x: newX, y: newY };
      break;
      
    case 'turn':
      let newDirection = (sprite.direction + params.degrees) % 360;
      if (newDirection < 0) newDirection += 360;
      updates = { direction: newDirection };
      break;
      
    case 'goto':
      updates = { x: params.x, y: params.y };
      break;
  }
  
  if (Object.keys(updates).length > 0) {
    onUpdateSprite(sprite.id, updates);
  }
};

const executeLooksBlock = (
  block: Block, 
  sprite: Sprite, 
  onUpdateSprite: (spriteId: string, updates: Partial<Sprite>) => void
) => {
  const { action, params } = block;
  
  switch (action) {
    case 'say':
      // Clear any existing timeout
      if (sprite.textTimeout) {
        window.clearTimeout(sprite.textTimeout);
      }
      
      // Set the say text
      onUpdateSprite(sprite.id, { 
        sayText: params.message,
        thinkText: '',
        textTimeout: null
      });
      
      // Set timeout to clear text after specified seconds
      const sayTimeout = window.setTimeout(() => {
        onUpdateSprite(sprite.id, { 
          sayText: '',
          textTimeout: null
        });
      }, params.seconds * 1000);
      
      onUpdateSprite(sprite.id, { textTimeout: sayTimeout as unknown as number });
      break;
      
    case 'think':
      // Clear any existing timeout
      if (sprite.textTimeout) {
        window.clearTimeout(sprite.textTimeout);
      }
      
      // Set the think text
      onUpdateSprite(sprite.id, { 
        thinkText: params.message,
        sayText: '',
        textTimeout: null
      });
      
      // Set timeout to clear text after specified seconds
      const thinkTimeout = window.setTimeout(() => {
        onUpdateSprite(sprite.id, { 
          thinkText: '',
          textTimeout: null
        });
      }, params.seconds * 1000);
      
      onUpdateSprite(sprite.id, { textTimeout: thinkTimeout as unknown as number });
      break;
  }
};

const executeControlBlock = (
  block: Block, 
  sprite: Sprite, 
  allSprites: Sprite[], 
  onUpdateSprite: (spriteId: string, updates: Partial<Sprite>) => void
) => {
  const { action, params, children } = block;
  
  switch (action) {
    case 'repeat':
      // For simplicity in this implementation, we'll just execute once per frame
      // In a real implementation, you'd need to track iteration count
      if (children && children.length > 0) {
        children.forEach(childBlock => {
          executeBlock(childBlock, sprite, allSprites, onUpdateSprite);
        });
      }
      break;
  }
};