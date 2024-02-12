// src/components/ToolbarItem.js
import React from 'react';

const ToolbarItem = ({ title, onDragStart, tag, role }) => {

  


  return (
    <div>
    <div
      className="p-2 cursor-pointer border-b border-slate-400 rounded-sm hover:bg-hover"
      draggable
      onDragStart={(e) => onDragStart(e, title, tag,role)}
    >
      {title}
    </div>
    </div>
  );
};

export default ToolbarItem;
