// src/components/Canvas.js
import React, { useState } from 'react';
import DragMove from './DragMove';
import TextEditor from './TextEditor';

const Canvas = () => {
  const [translate, setTranslate] = useState({
    x: 0,
    y: 0
  });

  const handleDragMove = (e) => {
    console.log(translate);
    console.log(e);
    if(translate.y<=65 ){
      setTranslate({
        x: translate.x + e.movementX,
        y: translate.y + e.movementY
      });
    }
    
  };

  const [canvasItems, setCanvasItems] = useState([]);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const draggedItem = JSON.parse(e.dataTransfer.getData('text'));
    console.log(draggedItem);
    setCanvasItems((prevItems) => [...prevItems, draggedItem]);
  };

  const [reportTemplate, setReportTemplate] = useState({ templateId: 1, schema: { additionalInfo: { dataFields: [], Header: [ { id: 1, field: "", formatter: 
  { 
    bold: false, italic: false, underline: false, 
  }, }, ], 
  SubHeader: 
  [ { field: "Branch Code- 12412", formatter: { 
    bold: false, italic: false, underline: false,
  }, }, { field: "Report NO. ", formatter: { 
    bold: false, italic: false, underline: false, 
  }, }, ], Footer: [ { field: "Clerk/Cashier", formatter: {
    bold: false, italic: false, underline: false, }, }, { field: "Bank Manager", formatter: {
    bold: false, italic: false, underline: false, }, }, ], }, }, dataTemplate: { row: [], }, });


  console.log('reportTemplate--', reportTemplate);

  const onStyleChange = (item)=>{
    reportTemplate.schema.additionalInfo.Header = item;
    setReportTemplate(reportTemplate)
  }

  return (
    // <div className="flex h-16 relative" onDragOver={handleDragOver}
    // onDrop={handleDrop}>


    //     {canvasItems.map(()=>(
    //       <DragMove onDragMove={handleDragMove}>
    //       <div
    //         style={{
    //           transform: `translateX(${translate.x}px) translateY(${translate.y}px)`
    //         }}
    //       >
    //         <TextEditor label={'Bank Name:'}/> 
    //       </div>
    //     </DragMove>
    //     ))}
    // </div>
    <div
      className="flex flex-col overflow-clip bg-white w-3/4"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Canvas content goes here */}
      {canvasItems.map((item, index) => (
        <div key={index} className="mb-4">
          <DragMove onDragMove={handleDragMove}>
            <div
            style={{
              transform: `translateX(${translate.x}px) translateY(${translate.y}px)`
            }}
          >
            <TextEditor onStyleChange={onStyleChange} label={item}/> 
          </div>
        </DragMove>
        </div>
      ))}
    </div>
);
};

export default Canvas;
