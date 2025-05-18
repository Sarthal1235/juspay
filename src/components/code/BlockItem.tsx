import React, { useState } from 'react';
import { Block, BlockType } from '../../types';
import { ArrowRight, RotateCw, Target, Repeat, MessageCircle, MessageSquare, Trash2 } from 'lucide-react';

interface BlockItemProps {
  block: Block;
  onUpdateBlock: (blockId: string, updates: any) => void;
  onRemoveBlock: (blockId: string) => void;
}

export const BlockItem: React.FC<BlockItemProps> = ({ 
  block, 
  onUpdateBlock,
  onRemoveBlock
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const getBlockColor = (): string => {
    switch (block.type) {
      case BlockType.Motion:
        return 'bg-blue-500 hover:bg-blue-600';
      case BlockType.Looks:
        return 'bg-purple-500 hover:bg-purple-600';
      case BlockType.Control:
        return 'bg-amber-500 hover:bg-amber-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getBlockIcon = () => {
    switch (block.action) {
      case 'move': return <ArrowRight size={16} className="text-white" />;
      case 'turn': return <RotateCw size={16} className="text-white" />;
      case 'goto': return <Target size={16} className="text-white" />;
      case 'repeat': return <Repeat size={16} className="text-white" />;
      case 'say': return <MessageCircle size={16} className="text-white" />;
      case 'think': return <MessageSquare size={16} className="text-white" />;
      default: return null;
    }
  };

  const handleInputChange = (key: string, value: any) => {
    const newParams = { ...block.params, [key]: value };
    onUpdateBlock(block.id, { params: newParams });
  };

  const renderParams = () => {
    switch (block.action) {
      case 'move':
        return (
          <input
            type="number"
            className="w-16 px-2 py-1 bg-blue-400 focus:bg-blue-300 text-white rounded border-none focus:outline-none focus:ring-2 focus:ring-white"
            value={block.params.steps}
            onChange={(e) => handleInputChange('steps', Number(e.target.value))}
          />
        );
      case 'turn':
        return (
          <input
            type="number"
            className="w-16 px-2 py-1 bg-blue-400 focus:bg-blue-300 text-white rounded border-none focus:outline-none focus:ring-2 focus:ring-white"
            value={block.params.degrees}
            onChange={(e) => handleInputChange('degrees', Number(e.target.value))}
          />
        );
      case 'goto':
        return (
          <>
            <span className="mx-1">x:</span>
            <input
              type="number"
              className="w-12 px-2 py-1 bg-blue-400 focus:bg-blue-300 text-white rounded border-none focus:outline-none focus:ring-2 focus:ring-white"
              value={block.params.x}
              onChange={(e) => handleInputChange('x', Number(e.target.value))}
            />
            <span className="mx-1">y:</span>
            <input
              type="number"
              className="w-12 px-2 py-1 bg-blue-400 focus:bg-blue-300 text-white rounded border-none focus:outline-none focus:ring-2 focus:ring-white"
              value={block.params.y}
              onChange={(e) => handleInputChange('y', Number(e.target.value))}
            />
          </>
        );
      case 'repeat':
        return (
          <input
            type="number"
            className="w-16 px-2 py-1 bg-amber-400 focus:bg-amber-300 text-white rounded border-none focus:outline-none focus:ring-2 focus:ring-white"
            value={block.params.times}
            onChange={(e) => handleInputChange('times', Number(e.target.value))}
          />
        );
      case 'say':
      case 'think':
        return (
          <>
            <input
              type="text"
              className="w-32 px-2 py-1 bg-purple-400 focus:bg-purple-300 text-white rounded border-none focus:outline-none focus:ring-2 focus:ring-white"
              value={block.params.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
            />
            <span className="mx-1">for</span>
            <input
              type="number"
              className="w-12 px-2 py-1 bg-purple-400 focus:bg-purple-300 text-white rounded border-none focus:outline-none focus:ring-2 focus:ring-white"
              value={block.params.seconds}
              onChange={(e) => handleInputChange('seconds', Number(e.target.value))}
            />
            <span className="ml-1">seconds</span>
          </>
        );
      default:
        return null;
    }
  };

  const getLabelWithParams = () => {
    let label = block.label;
    
    if (block.action === 'move') {
      label = label.replace('[steps]', block.params.steps.toString());
    } else if (block.action === 'turn') {
      label = label.replace('[degrees]', block.params.degrees.toString());
    } else if (block.action === 'goto') {
      label = label.replace('[x]', block.params.x.toString()).replace('[y]', block.params.y.toString());
    } else if (block.action === 'repeat') {
      label = label.replace('[times]', block.params.times.toString());
    } else if (block.action === 'say' || block.action === 'think') {
      label = label.replace('[message]', `"${block.params.message}"`).replace('[seconds]', block.params.seconds.toString());
    }
    
    return label;
  };

  return (
    <div className="relative group">
      <div
        className={`${getBlockColor()} text-white p-3 rounded-md shadow cursor-grab`}
        onClick={() => setIsEditing(!isEditing)}
      >
        <div className="flex items-center space-x-2">
          <span>{getBlockIcon()}</span>
          {isEditing ? (
            <div className="flex items-center flex-wrap">
              {renderParams()}
            </div>
          ) : (
            <span>{getLabelWithParams()}</span>
          )}
        </div>
      </div>
      
      <button 
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => {
          e.stopPropagation();
          onRemoveBlock(block.id);
        }}
      >
        <Trash2 size={16} className="text-white hover:text-red-200" />
      </button>
    </div>
  );
};