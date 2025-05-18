import React from 'react';
import { ArrowRight, RotateCw, Target, Repeat } from 'lucide-react';
import { Block, BlockType } from '../../types';

interface MotionBlocksProps {
  onAddBlock: (block: Block) => void;
}

export const MotionBlocks: React.FC<MotionBlocksProps> = ({ onAddBlock }) => {
  const motionBlocks: Block[] = [
    { 
      id: '', 
      type: BlockType.Motion, 
      action: 'move', 
      params: { steps: 10 },
      label: 'Move [steps] steps'
    },
    { 
      id: '', 
      type: BlockType.Motion, 
      action: 'turn', 
      params: { degrees: 15 },
      label: 'Turn [degrees] degrees'
    },
    { 
      id: '', 
      type: BlockType.Motion, 
      action: 'goto', 
      params: { x: 0, y: 0 },
      label: 'Go to x: [x] y: [y]'
    },
    { 
      id: '', 
      type: BlockType.Control, 
      action: 'repeat', 
      params: { times: 10 },
      label: 'Repeat [times] times',
      children: []
    }
  ];

  const getIcon = (action: string) => {
    switch (action) {
      case 'move': return <ArrowRight size={16} />;
      case 'turn': return <RotateCw size={16} />;
      case 'goto': return <Target size={16} />;
      case 'repeat': return <Repeat size={16} />;
      default: return null;
    }
  };

  return (
    <div className="bg-white p-2 space-y-2">
      {motionBlocks.map((block, index) => (
        <div 
          key={index}
          className="p-2 bg-blue-100 rounded border border-blue-200 cursor-grab hover:shadow-md transition-shadow"
          onClick={() => onAddBlock(block)}
        >
          <div className="flex items-center text-blue-800">
            <span className="mr-2">{getIcon(block.action)}</span>
            <span>{block.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};