// src/components/Editor.js
import React from 'react';
import ToolbarItem from './ToolbarItem';
import Canvas from './Canvas';

const Editor = () => {
  const handleDragStart = (e, title) => {
    const draggedItem = title;
    console.log('draggedItem----', e.dataTransfer);
    e.dataTransfer.setData('text', JSON.stringify(draggedItem));
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-gray-200 p-4">
        <ToolbarItem title="Bank Name: " onDragStart={handleDragStart} />
        <ToolbarItem title="Input" onDragStart={handleDragStart} />
      </div>

      {/* Right Canvas */}
      <Canvas />
    </div>
  );
};

export default Editor;
