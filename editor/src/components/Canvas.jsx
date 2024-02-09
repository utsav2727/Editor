// src/components/Canvas.js
import React, { useState } from 'react';
import DragMove from './DragMove';
import TextEditor from './TextEditor';
import TableEditor from './TableEditor';

const Canvas = () => {
  const [nodePosition, setNodePostion] = useState([]);
  const [textStyle, setTextStyle] = useState({});

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = ()=>{
    setShowModal(true)
  }

  const handleCloseModal = ()=>{
    setShowModal(false);
  }


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

  const handleDrop = (e, value, index) => {
    e.preventDefault();
    e.stopPropagation();

    if(value=='text'){
      console.log('inside text');
      const draggedItem = JSON.parse(e.dataTransfer.getData('text'));
      console.log('draggedItem', draggedItem);
      setCanvasItems((prevItems)=> [...prevItems, draggedItem])
    }else if(value == 'table'){
      console.log('inside table')
      const draggedItem = JSON.parse(e.dataTransfer.getData('text'));
      let modifiedElement = canvasItems[index];
      modifiedElement.title = [...modifiedElement.title, ...draggedItem.title];
      modifiedElement.data = modifiedElement.data.map((item, index)=>{
        return {...item, ...draggedItem.data[index]}
      })

      canvasItems[index] = modifiedElement;

      setCanvasItems([...canvasItems]);
      reportTemplate.schema.additionalInfo.dataFields = [...modifiedElement.title];
      setReportTemplate(reportTemplate)

    }
  };

  const onColumnChange = (e, coreIndex,titleindex)=>{
    const coreIndexElement = canvasItems;

    coreIndexElement[coreIndex].title[titleindex] = {
      ...coreIndexElement[coreIndex].title[titleindex], modifiedTitle: e.target.value
    }

    setCanvasItems([...coreIndexElement]);

    const convertData = coreIndexElement.filter((item)=>item.type=="columns").map((item)=>{
      return item.title
    });
    reportTemplate.schema.additionalInfo.dataFields = [...convertData]
    setReportTemplate(reportTemplate)
  }

  

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
        <button className='border border-slate-400 px-3' onClick={() => setTextStyle({ fontWeight: "bold" })}>B</button>
        <button className='border border-slate-400 px-3' onClick={() => setTextStyle({ fontStyle: "italic" })}>I</button>
        <button className='border border-slate-400 px-3' onClick={() => setTextStyle({ textDecoration: "underline" })}>U</button>
      </div>
      <div className='flex flex-col overflow-clip h-full bg-white border border-slate-600'
        onDragOver={handleDragOver}
        onDrop={(e)=>{handleDrop(e,'text')}}
      >
        {canvasItems.map((item, index) => (
          <div key={index} className="mb-4">
            <DragMove style={{width:"fit-content"}} index={index} onDragMove={handleDragMove}>
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
                    onDragOver={handleDragOver}
                    onDrop={(e)=>{handleDrop(e,'table',index)}}
                    >
                  <TableEditor 
                  key={index} 
                  // handleDropOnTable={handleDropOnTable} 
                  columns={item.title} 
                  data={item.data}
                  onColumnChange={onColumnChange}
                  showModal={showModal}
                  handleCloseModal={handleCloseModal}
                  handleShowModal ={handleShowModal}
                  coreIndex={index}
                  />
                  </div>
                }

              </div>
            </DragMove>
          </div>
        ))}
        
      </div>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 leading-relaxed">
                    I always felt like I could do anything. That’s the main
                    thing people are controlled by! Thoughts- their perception
                    of themselves! They're slowed down by their perception of
                    themselves. If you're taught you can’t do anything, you
                    won’t do anything. I was taught I could do everything.
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default Canvas;
