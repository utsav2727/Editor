// src/components/ToolbarItem.js
import React from 'react';

const ToolbarItem = ({ title, onDragStart }) => {

  


  return (
    <div
      className="p-4 cursor-pointer hover:bg-gray-200"
      draggable
      onDragStart={(e) => onDragStart(e, title)}
    >
      {title}
    </div>
  );
};

export default ToolbarItem;
