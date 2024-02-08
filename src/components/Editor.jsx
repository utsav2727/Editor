// src/components/Editor.js
import React from 'react';
import ToolbarItem from './ToolbarItem';
import Canvas from './Canvas';
import { reportDATA } from './dummyAPI';

const Editor = () => {
  const handleDragStart = (e, title, tag) => {
    if(tag=="columns"){
      const columnData = reportDATA[0].procGetagriloandetailsData.map((data)=>{
        return data[title]
      });
      const draggedItem = {
        type:"columns",
        data: columnData,
        title: title
      };
      console.log('draggedItem----', draggedItem);
      e.dataTransfer.setData('text', JSON.stringify(draggedItem));
    }else{
      const draggedItem = {
        type:"text",
        title:title
      };
      console.log('draggedItem----', draggedItem);
      e.dataTransfer.setData('text', JSON.stringify(draggedItem));
    }


  };

  console.log('reportDATA',reportDATA);

  const firstData = reportDATA[0].procGetagriloandetailsData[0]
  const extractedColumns = Object.keys(firstData);

  console.log('exttacted', extractedColumns)

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-gray-200 p-4">
        <div>
        <h2 className='font-bold'>Bank Name</h2>
        <ToolbarItem tag={'input'} title="Gujarat Bank" onDragStart={handleDragStart} />
        </div>
        <div>
        <h2 className='font-bold'>Fetched Table Data</h2>
        {extractedColumns.map((item)=>{
          return <ToolbarItem tag={'columns'} title={item} onDragStart={handleDragStart} />
        })}
        
        </div>
      </div>

      {/* Right Canvas */}
      <Canvas />
    </div>
  );
};

export default Editor;
