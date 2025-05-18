import React, { useState } from 'react';
import { MotionBlocks } from './MotionBlocks';
import { LooksBlocks } from './LooksBlocks';
import { ChevronDown, ChevronRight, Move, Eye } from 'lucide-react';
import { Block } from '../../types';

interface BlockMenuProps {
  onAddBlock: (block: Block) => void;
}

export const BlockMenu: React.FC<BlockMenuProps> = ({ onAddBlock }) => {
  const [openCategory, setOpenCategory] = useState<string>('motion');

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? '' : category);
  };

  const categories = [
    { id: 'motion', name: 'Motion', icon: <Move size={18} />, color: 'bg-blue-500' },
    { id: 'looks', name: 'Looks', icon: <Eye size={18} />, color: 'bg-purple-500' },
  ];

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Blocks</h2>
      <div className="space-y-2 overflow-y-auto">
        {categories.map(category => (
          <div key={category.id} className="rounded-md overflow-hidden">
            <button
              className={`w-full flex items-center p-2 text-white ${category.color} hover:opacity-90 transition-opacity`}
              onClick={() => toggleCategory(category.id)}
            >
              <span className="mr-2">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
              <span className="ml-auto">
                {openCategory === category.id ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </span>
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ${openCategory === category.id ? 'max-h-96' : 'max-h-0'}`}>
              {category.id === 'motion' && <MotionBlocks onAddBlock={onAddBlock} />}
              {category.id === 'looks' && <LooksBlocks onAddBlock={onAddBlock} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};