import React from 'react';
import { MessageCircle, MessageSquare } from 'lucide-react';
import { Block, BlockType } from '../../types';

interface LooksBlocksProps {
  onAddBlock: (block: Block) => void;
}

export const LooksBlocks: React.FC<LooksBlocksProps> = ({ onAddBlock }) => {
  const looksBlocks: Block[] = [
    { 
      id: '', 
      type: BlockType.Looks, 
      action: 'say', 
      params: { message: 'Hello!', seconds: 2 },
      label: 'Say [message] for [seconds] seconds'
    },
    { 
      id: '', 
      type: BlockType.Looks, 
      action: 'think', 
      params: { message: 'Hmm...', seconds: 2 },
      label: 'Think [message] for [seconds] seconds'
    }
  ];

  const getIcon = (action: string) => {
    switch (action) {
      case 'say': return <MessageCircle size={16} />;
      case 'think': return <MessageSquare size={16} />;
      default: return null;
    }
  };

  return (
    <div className="bg-white p-2 space-y-2">
      {looksBlocks.map((block, index) => (
        <div 
          key={index}
          className="p-2 bg-purple-100 rounded border border-purple-200 cursor-grab hover:shadow-md transition-shadow"
          onClick={() => onAddBlock(block)}
        >
          <div className="flex items-center text-purple-800">
            <span className="mr-2">{getIcon(block.action)}</span>
            <span>{block.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};