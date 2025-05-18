import React, { createContext, useContext, ReactNode, useState } from 'react';

interface DndContextType {
  dragging: boolean;
  setDragging: (dragging: boolean) => void;
}

const DndContext = createContext<DndContextType>({
  dragging: false,
  setDragging: () => {},
});

export const useDnd = () => useContext(DndContext);

interface DndProviderProps {
  children: ReactNode;
}

export const DndProvider: React.FC<DndProviderProps> = ({ children }) => {
  const [dragging, setDragging] = useState(false);

  return (
    <DndContext.Provider value={{ dragging, setDragging }}>
      {children}
    </DndContext.Provider>
  );
};