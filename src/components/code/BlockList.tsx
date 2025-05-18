import React from 'react';
import { Block, BlockType } from '../../types';
import { BlockItem } from './BlockItem';
import { DndProvider } from '../../dnd/DndProvider';

interface BlockListProps {
  blocks: Block[];
  onUpdateBlock: (blockId: string, updates: any) => void;
  onRemoveBlock: (blockId: string) => void;
}

export const BlockList: React.FC<BlockListProps> = ({ 
  blocks, 
  onUpdateBlock,
  onRemoveBlock
}) => {
  if (blocks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <p>No blocks yet</p>
        <p className="text-sm">Add blocks from the menu on the left</p>
      </div>
    );
  }

  return (
    <DndProvider>
      <div className="space-y-2">
        {blocks.map((block) => (
          <BlockItem 
            key={block.id} 
            block={block} 
            onUpdateBlock={onUpdateBlock}
            onRemoveBlock={onRemoveBlock}
          />
        ))}
      </div>
    </DndProvider>
  );
};