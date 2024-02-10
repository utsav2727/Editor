// src/components/ToolbarItem.js
import React from 'react';

const ToolbarItem = ({ title, onDragStart, tag }) => {

  


  return (
    <div
      className="p-2 cursor-pointer border-b border-slate-400 rounded-sm hover:bg-gray-400"
      draggable
      onDragStart={(e) => onDragStart(e, title, tag)}
    >
      {title}
    </div>
  );
};

export default ToolbarItem;
