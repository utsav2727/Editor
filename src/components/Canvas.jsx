// src/components/Canvas.js
import React, { useState } from 'react';
import DragMove from './DragMove';
import TextEditor from './TextEditor';
import TableEditor from './TableEditor';
import FormatBoldOutlinedIcon from '@mui/icons-material/FormatBoldOutlined';
import FormatItalicOutlinedIcon from '@mui/icons-material/FormatItalicOutlined';
import FormatUnderlinedOutlinedIcon from '@mui/icons-material/FormatUnderlinedOutlined';
import FormatAlignLeftOutlinedIcon from '@mui/icons-material/FormatAlignLeftOutlined';
import FormatAlignRightOutlinedIcon from '@mui/icons-material/FormatAlignRightOutlined';
import FormatAlignCenterOutlinedIcon from '@mui/icons-material/FormatAlignCenterOutlined';
import AllOutOutlinedIcon from '@mui/icons-material/AllOutOutlined';
import TablePreview from './TablePreview';
import TableContent from './TableContent';

const Canvas = () => {
  const [nodePosition, setNodePostion] = useState([]);
  const [textStyle, setTextStyle] = useState({});

  const [showModal, setShowModal] = useState({status:false, data:[]});

  const handleShowModal = (data)=>{
    setShowModal({status:true, data:data})
  }

  const handleCloseModal = ()=>{
    setShowModal({status:false, data:[]});
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

  // console.log('canvasItemsBody', canvasItems);
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

      console.log('canvasItems', canvasItems);
      modifiedElement.title = [...modifiedElement.title, ...draggedItem.title];
      modifiedElement.data = modifiedElement.data.map((item, index)=>{
        return {...item, ...draggedItem.data[index]}
      })

      canvasItems[index] = modifiedElement;

      const convertData = canvasItems.filter((item)=>item.type=="columns").map((item)=>{
        return item.title
      });

      setCanvasItems([...canvasItems]);
      reportTemplate.schema.additionalInfo.dataFields = [...convertData];
      setReportTemplate(reportTemplate)

    }
  };

  const onColumnChange = (e, coreIndex,titleindex)=>{
    const coreIndexElement = canvasItems;

    coreIndexElement[coreIndex].title[titleindex] = {
      ...coreIndexElement[coreIndex].title[titleindex], modifiedTitle: e.target.value
    }

    setCanvasItems([...coreIndexElement]);

    console.log('canvasItems table', canvasItems);

    const convertData = coreIndexElement.filter((item)=>item.type=="columns").map((item)=>{
      return item.title
    });
    reportTemplate.schema.additionalInfo.dataFields = [...convertData]
    setReportTemplate(reportTemplate)
  }

  

  const [reportTemplate, setReportTemplate] = useState({
    templateId: 1, schema: {
      additionalInfo: {
        dataFields: [], Header: [
          // {
          // id: 1, field: "", formatter:
          // {
          //   bold: false, italic: false, underline: false,
          // },
          // },
      ],
        SubHeader:
          [{
            field: "Branch Code- 12412", formatter: {
              bold: false, italic: false, underline: false,
            },
          }, {
            field: "Report NO. ", formatter: {
              bold: false, italic: false, underline: false,
            },
          },], 
          Footer: [{
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

  const onStyleChange = (e, coreIndex) => {
    console.log('canvasItem--', canvasItems);
    console.log('coreIndex--', coreIndex);
    
    canvasItems[coreIndex] = {...canvasItems[coreIndex], title:e.target.value};

    setCanvasItems([...canvasItems]);

    const convertData = canvasItems.filter((item)=>item.type=="text");

    reportTemplate.schema.additionalInfo.Header = [...convertData];
    setReportTemplate(reportTemplate)
  }

  const onDeleteClick = (e, coreIndex,role)=>{
    console.log('canvasItem--', canvasItems);
    console.log('coreIndex--', coreIndex);

    if (coreIndex > -1) { 
      canvasItems.splice(coreIndex, 1); 
    }
    console.log('canvasItems removed --', canvasItems)

    setCanvasItems([...canvasItems]);

    if(role==='text'){
      const convertData = canvasItems.filter((item)=>item.type=="text");
      reportTemplate.schema.additionalInfo.Header = [...convertData];
      setReportTemplate(reportTemplate)
    }else if(role==='table'){
      const convertData = canvasItems.filter((item)=>item.type=="columns");
      reportTemplate.schema.additionalInfo.dataFields= convertData.map((item)=>{
        return item.title
      })
      // console.log('convertData',convertData);
      // let modifiedElement = canvasItems[index];
      // reportTemplate.schema.additionalInfo.Header = [...convertData];

      setReportTemplate(reportTemplate)
    }

  }

  return (
    <div
      className="flex flex-col overflow-y-auto overflow-x-clip bg-white w-3/4"
    >
      <h1 className='text-2xl font-bold text-center'>Create Your Report Template</h1>
      <div className='flex gap-1 bg-colorPanel border rounded-sm p-1 border-slate-300'>
        <button className='icon-button' onClick={() => setTextStyle({ fontWeight: "bold" })}><FormatBoldOutlinedIcon fontSize='small'/></button>
        <button className='icon-button' onClick={() => setTextStyle({ fontStyle: "italic" })}><FormatItalicOutlinedIcon fontSize='small'/></button>
        <button className='icon-button' onClick={() => setTextStyle({ textDecoration: "underline" })}><FormatUnderlinedOutlinedIcon fontSize='small'/></button>
      </div>
      <div className='flex flex-col overflow-y-auto overflow-x-clip h-full bg-white border border-l-slate-300 border-r-slate-300 border-b-slate-300'
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
                {item.type == 'text' &&
                  <TextEditor 
                  coreIndex={index}
                  textStyle={textStyle} setTextStyle={setTextStyle} onStyleChange={onStyleChange} label={item.title} 
                  onDeleteClick={onDeleteClick}
                  role={'text'}
                  />
                  
                }
                {item.type == 'columns' &&
                  <div 
                    onDragOver={handleDragOver}
                    onDrop={(e)=>{handleDrop(e,'table',index)}}
                    >
                  <TableEditor 
                  key={index} 
                  columns={item.title} 
                  data={item.data}
                  onColumnChange={onColumnChange}
                  showModal={showModal}
                  handleCloseModal={handleCloseModal}
                  handleShowModal ={handleShowModal}
                  coreIndex={index}
                  role={'table'}
                  onDeleteClick={onDeleteClick}
                  />
                  </div>
                }

              </div>
            </DragMove>
          </div>
        ))}
        
      </div>
      {showModal.status ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                <div>
                <TablePreview 
                  data={showModal.data}
                  />
                {/*footer*/}
                </div>
                <div className="flex items-center justify-end p-2 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-primary text-white active:bg-blue-600 font-bold uppercase text-sm px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
