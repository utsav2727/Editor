// src/components/ToolbarItem.js
import React from 'react';

const ToolbarItem = ({ title, onDragStart, tag, role , borderStyle }) => {

  


  return (
    <div>
    <div
      className="py-2 px-2 cursor-pointer border-b border-slate-400 rounded-sm hover:bg-hover"
      draggable
      onDragStart={(e) => onDragStart(e, title, tag,role,borderStyle)}
    >
      {/* {title} */}
      {(role=='header' && title=="")? <div className={`border border-${borderStyle}`}></div>: title }
    </div>
    </div>
  );
};

export default ToolbarItem;
