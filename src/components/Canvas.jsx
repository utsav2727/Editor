// src/components/Canvas.js
import React, { useState } from 'react';
import DragMove from './DragMove';
import TextEditor from './TextEditor';
import TableEditor from './TableEditor';

const Canvas = () => {
  const [nodePosition, setNodePostion] = useState([]);
  const [textStyle, setTextStyle] = useState({});

  // const [translate, setTranslate] = useState({
  //   x: 0,
  //   y: 0
  // });


  const handleDragMove = (e, index) => {
    console.log('index', index);
    console.log(e);
    console.log(nodePosition);

    if (nodePosition[index]) {
      const obj = {
        x: (nodePosition[index]?.x || 0) + e.movementX,
        y: (nodePosition[index]?.y || 0) + e.movementY,
      }
      const update = nodePosition;
      update[index] = obj;
      setNodePostion([...update]);
    } else {
      const newMember = nodePosition;
      const obj = {
        x: 0 + e.movementX,
        y: 0 + e.movementY
      }
      newMember.push(obj);
      setNodePostion(newMember);
    }
  };

  const [canvasItems, setCanvasItems] = useState([]);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const draggedItem = JSON.parse(e.dataTransfer.getData('text'));
    console.log('draggedItem', draggedItem);
    setCanvasItems((prevItems) => [...prevItems, draggedItem]);
  };

  const handleDropOnTable = (e) => {
    // if (!e.defaultPrevented) {
    //   e.stopPropagation(); // Prevent event bubbling
    //   console.log(e.dataTransfer)
    //   const draggedItem = JSON.parse(e.dataTransfer.getData('text'));
    //   // Handle dropping onto the TableEditor component
    //   console.log('Dropped onto TableEditor:', draggedItem);
    // }
    // e.preventDefault();
    // e.stopPropagation();
    // console.log(e.dataTransfer.getData('text'))
    // const draggedItem = JSON.parse(e.dataTransfer.getData('text'));
    // console.log('draggedItemonTable--', draggedItem);
    // setCanvasItems((prevItems) => [...prevItems, draggedItem]);
  };

  const [reportTemplate, setReportTemplate] = useState({
    templateId: 1, schema: {
      additionalInfo: {
        dataFields: [], Header: [{
          id: 1, field: "", formatter:
          {
            bold: false, italic: false, underline: false,
          },
        },],
        SubHeader:
          [{
            field: "Branch Code- 12412", formatter: {
              bold: false, italic: false, underline: false,
            },
          }, {
            field: "Report NO. ", formatter: {
              bold: false, italic: false, underline: false,
            },
          },], Footer: [{
            field: "Clerk/Cashier", formatter: {
              bold: false, italic: false, underline: false,
            },
          }, {
            field: "Bank Manager", formatter: {
              bold: false, italic: false, underline: false,
            },
          },],
      },
    }, dataTemplate: { row: [], },
  });


  console.log('reportTemplate--', reportTemplate);

  const onStyleChange = (item) => {
    reportTemplate.schema.additionalInfo.Header = item;
    setReportTemplate(reportTemplate)
  }

  return (
    <div
      className="flex flex-col overflow-clip bg-white w-3/4"
    >
      <div className='flex'>
        <button className='border border-slate-200 px-1' onClick={() => setTextStyle({ fontWeight: "bold" })}>B</button>
        <button className='border border-slate-200 px-1' onClick={() => setTextStyle({ fontStyle: "italic" })}>I</button>
        <button className='border border-slate-200 px-1' onClick={() => setTextStyle({ textDecoration: "underline" })}>U</button>
      </div>
      <div className='flex flex-col overflow-clip h-full bg-white border border-slate-400'
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {canvasItems.map((item, index) => (
          <div key={index} className="mb-4">
            <DragMove index={index} onDragMove={handleDragMove}>
              <div
                style={{
                  transform: `translateX(${nodePosition[index]?.x}px) translateY(${nodePosition[index]?.y}px)`
                }}
              >
                {console.log(item)}
                {item.type == 'text' &&
                  <TextEditor textStyle={textStyle} setTextStyle={setTextStyle} onStyleChange={onStyleChange} label={item.title} />
                }
                {item.type == 'columns' &&
                  <div 
                    onDragOver={handleDropOnTable}
                    onDrop={handleDrop}
                    >
                  <TableEditor key={index} handleDropOnTable={handleDropOnTable} columns={item.title} data={item.data}/>
                  </div>
                }

              </div>
            </DragMove>
          </div>
        ))}
        {/* {
          <DragMove index={0} onDragMove={handleDragMove}>
            <div
            style={{
              transform: `translateX(${nodePosition[0]?.x}px) translateY(${nodePosition[0]?.y}px)`
            }}
            >
            <table className='border border-collapse'>
              <thead>
                <tr>
                  <th>Column 1</th>
                  <th>Column 2</th>
                  <th>Column 3</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Data 1</td>
                  <td>Data 2</td>
                  <td>Data 3</td>
                </tr>
                <tr>
                  <td>Data 4</td>
                  <td>Data 5</td>
                  <td>Data 6</td>
                </tr>
              </tbody>
          </table> 
          </div>
        </DragMove>
       
      } */}
      </div>
    </div>
  );
};

export default Canvas;
