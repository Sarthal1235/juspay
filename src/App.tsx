import React from 'react';
import { Workspace } from './components/Workspace';
import { Header } from './components/Header';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Header />
      <Workspace />
    </div>
  );
}

export default App;