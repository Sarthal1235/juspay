import React from 'react';
import { Code } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-500 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center">
        <Code size={32} className="text-white mr-2" />
        <h1 className="text-2xl font-bold text-white">Visual Code Editor</h1>
      </div>
    </header>
  );
};