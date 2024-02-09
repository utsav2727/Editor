// src/components/ToolbarItem.js
import React from 'react';

const ToolbarItem = ({ title, onDragStart, tag }) => {

  


  return (
    <div
      className="p-2 cursor-pointer hover:bg-gray-200"
      draggable
      onDragStart={(e) => onDragStart(e, title, tag)}
    >
      {title}
    </div>
  );
};

export default ToolbarItem;
