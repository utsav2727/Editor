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
import LinearScaleIcon from '@mui/icons-material/LinearScale';

import { FormatAlignCenterOutlined } from '@mui/icons-material';
import ColorPickerButton from './ColorPickerButton';
import FontResizeButton from './FontResizeButton';
import WidthSetterButton from './WidthSetterButton';

const Canvas = () => {
  const [nodePosition, setNodePostion] = useState([]);
  const [textStyle, setTextStyle] = useState({});

  const [showModal, setShowModal] = useState({status:false, data:[]});

  const [selected, setSelected] = useState(null);
  const [trackselected, setTrackSelected] = useState(null);

  // console.log('nodePosition--',nodePosition[0]);
  // console.log('trackselected--',trackselected);

  const handleShowModal = (data)=>{
    setShowModal({status:true, data:data})
  }

  const handleCloseModal = ()=>{
    setShowModal({status:false, data:[]});
  }


  const handleDragMove = (e, index) => {
    // console.log('index', index);
    // console.log(e);
    // console.log('e.movementX',e.movementX);
    // console.log('e.movementY',e.movementY);
      if (nodePosition[index]) {
        const obj = {
          x: (nodePosition[index]?.x || 0) + e.movementX,
          y: (nodePosition[index]?.y || 0) + e.movementY,
        }
        // if((obj.x>-12 && obj.x<740) && obj.y>0){
        if(1==1){
          const update = nodePosition;
          update[index] = obj;
          setNodePostion([...update]);
        }
        
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
  const handleDrop = (e, value, index,role) => {
    e.preventDefault();
    e.stopPropagation();

    if(value=='text'){
      console.log('inside text');
      try {
        const draggedItem = JSON.parse(e.dataTransfer.getData('text'));
      console.log('draggedItem', draggedItem);
      setCanvasItems((prevItems)=> [...prevItems, draggedItem]);
      if(draggedItem.role=='header'){
        const convertData = canvasItems.filter((item)=>item.role=="header").map((item)=>{
          return [item]
        });
        reportTemplate.schema.additionalInfo.Header = [...convertData,[draggedItem]];
        setReportTemplate(reportTemplate)
      }else if(draggedItem.role=='subheader'){
        const convertData = canvasItems.filter((item)=>item.role=="subheader").map((item)=>{
          return [item]
        });
        reportTemplate.schema.additionalInfo.SubHeader = [...convertData,draggedItem];
        setReportTemplate(reportTemplate)
      }else if(draggedItem.role=='footer'){
        const convertData = canvasItems.filter((item)=>item.role=="footer").map((item)=>{
          return [item]
        });
        reportTemplate.schema.additionalInfo.Footer = [...convertData,draggedItem];
        setReportTemplate(reportTemplate)
      } else if(draggedItem.type=='columns'){
        console.log('herre')
        const convertData = canvasItems.filter((item)=>item.type=="columns").map((item)=>{
          return item.title
        });
        console.log(convertData);
        reportTemplate.schema.additionalInfo.dataFields = [...convertData, draggedItem];
        reportTemplate.dataTemplate.row = [...convertData,draggedItem];
        setReportTemplate(reportTemplate)
      }
      } catch (error) {
        console.log(error)
      }
      
      
    }else if(value == 'table'){
      console.log('inside table')
      const draggedItem = JSON.parse(e.dataTransfer.getData('text'));

      console.log('draggedItem---', draggedItem);

      if(draggedItem.type=="columns"){
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
        reportTemplate.dataTemplate.row = [...convertData];
        setReportTemplate(reportTemplate)
      }

      

    }
  };

  const onColumnChange = (e, coreIndex,titleindex)=>{
    const coreIndexElement = canvasItems;

    coreIndexElement[coreIndex].title[titleindex] = {
      ...coreIndexElement[coreIndex].title[titleindex], caption: e.target.value
    }

    setCanvasItems([...coreIndexElement]);

    console.log('canvasItems table', canvasItems);

    const convertData = coreIndexElement.filter((item)=>item.type=="columns").map((item)=>{
      return item.title
    });
    reportTemplate.schema.additionalInfo.dataFields = [...convertData]
    reportTemplate.dataTemplate.row = [...convertData]
    setReportTemplate(reportTemplate)
  }

  const onColumnDelete = (e, coreIndex,titleindex)=>{
    const coreIndexElement = canvasItems;

    console.log('delete ---',coreIndexElement[coreIndex].title[titleindex]);

    if (titleindex > -1) { 
      coreIndexElement[coreIndex].title.splice(titleindex, 1); 
    }
    console.log('after delete ---',coreIndexElement[coreIndex].title);
    // coreIndexElement[coreIndex].title[titleindex] = {
    //   ...coreIndexElement[coreIndex].title[titleindex], modifiedTitle: e.target.value
    // }

    setCanvasItems([...coreIndexElement]);

    console.log('canvasItems table', canvasItems);

    const convertData = coreIndexElement.filter((item)=>item.type=="columns").map((item)=>{
      return item.title
    });
    reportTemplate.schema.additionalInfo.dataFields = [...convertData]
    reportTemplate.dataTemplate.row = [...convertData]
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
          [
          //   {
          //   field: "Branch Code- 12412", formatter: {
          //     bold: false, italic: false, underline: false,
          //   },
          // }, {
          //   field: "Report NO. ", formatter: {
          //     bold: false, italic: false, underline: false,
          //   },
          // },
        ], 
          Footer: [
          //   {
          //   field: "Clerk/Cashier", formatter: {
          //     bold: false, italic: false, underline: false,
          //   },
          // }, {
          //   field: "Bank Manager", formatter: {
          //     bold: false, italic: false, underline: false,
          //   },
          // },
        ],
      },
    }, dataTemplate: { row: [], },
  });


  console.log('UpdatedreportTemplate--', reportTemplate);

  const onStyleChange = (e, coreIndex) => {
    console.log('canvasItem--', canvasItems);
    console.log('coreIndex--', coreIndex);
    
    canvasItems[coreIndex] = {...canvasItems[coreIndex], field:e.target.value};

    setCanvasItems([...canvasItems]);

    if(canvasItems[coreIndex].role=='header'){
      const convertData = canvasItems.filter((item)=>item.role=="header").map((item)=>{
        return [item]
      });
      console.log('convertData', convertData);
      reportTemplate.schema.additionalInfo.Header = [...convertData];
      setReportTemplate(reportTemplate)
    }else if(canvasItems[coreIndex].role=='subheader'){
      const convertData = canvasItems.filter((item)=>item.role=="subheader").map((item)=>{
        return [item]
      });
      reportTemplate.schema.additionalInfo.SubHeader = [...convertData];
      setReportTemplate(reportTemplate)
    }else if(canvasItems[coreIndex].role=='footer'){
      const convertData = canvasItems.filter((item)=>item.role=="footer").map((item)=>{
        return [item]
      });
      reportTemplate.schema.additionalInfo.Footer = [...convertData];
      setReportTemplate(reportTemplate)
    }

    // const convertData = canvasItems.filter((item)=>item.type=="text");

    // reportTemplate.schema.additionalInfo.Header = [...convertData];
    // setReportTemplate(reportTemplate)
  }

  

  const onDeleteClick = (e, coreIndex,role)=>{
    console.log('canvasItem--', canvasItems);
    console.log('coreIndex--', coreIndex);
    const modified = canvasItems.map((item)=>item);
    console.log(canvasItems[coreIndex]);
    if (coreIndex > -1) { 
      canvasItems.splice(coreIndex, 1); 
    }
    console.log('canvasItems removed --', canvasItems)
    setCanvasItems([...canvasItems]);
    

    if(role==='text'){
      // const convertData = canvasItems.filter((item)=>item.type=="text");
      // reportTemplate.schema.additionalInfo.Header = [...convertData];
      // setReportTemplate(reportTemplate)
      console.log(modified[coreIndex]);
      if(modified[coreIndex]?.role=='header'){
        if (coreIndex > -1) { 
          modified.splice(coreIndex, 1); 
        }
        const convertData = modified.filter((item)=>item.role=="header");
        reportTemplate.schema.additionalInfo.Header = [...convertData];
        setReportTemplate(reportTemplate);
      }else if(modified[coreIndex]?.role=='subheader'){
        if (coreIndex > -1) { 
          modified.splice(coreIndex, 1); 
        }
        const convertData = modified.filter((item)=>item.role=="subheader");
        reportTemplate.schema.additionalInfo.SubHeader = [...convertData];
        setReportTemplate(reportTemplate);
      }else if(modified[coreIndex]?.role=='footer'){
        if (coreIndex > -1) { 
          modified.splice(coreIndex, 1); 
        }
        const convertData = modified.filter((item)=>item.role=="footer");
        reportTemplate.schema.additionalInfo.Footer = [...convertData];
        setReportTemplate(reportTemplate);
      }
      

    }else if(role==='table'){
      const convertData = canvasItems.filter((item)=>item.type=="columns").map((item)=>{
        return item.title
      });
      reportTemplate.schema.additionalInfo.dataFields= [...convertData]
      reportTemplate.dataTemplate.row= [...convertData]
      // console.log('convertData',convertData);
      // let modifiedElement = canvasItems[index];
      // reportTemplate.schema.additionalInfo.Header = [...convertData];

      setReportTemplate(reportTemplate)
    }

  }

  const handleSaveButton = (title,coreIndex)=>{
    console.log('preview-title', title );
    console.log('previewcoreIndex', coreIndex );

    const coreIndexElement = canvasItems;

    console.log('coreIndexElement',coreIndexElement);

    coreIndexElement[coreIndex].title = title;
    setCanvasItems([...coreIndexElement]);

    setShowModal(false);

    const convertData = canvasItems.filter((item)=>item.type=="columns").map((item)=>{
      return item.title
    });
    reportTemplate.schema.additionalInfo.dataFields = [...convertData];
    reportTemplate.dataTemplate.row = [...convertData];
    setReportTemplate(reportTemplate)

  }

  const updateTemplateTextField = (canvasItems,selected)=>{
    if(canvasItems[selected].role=='header'){
      const convertData = canvasItems.filter((item)=>item.role=="header").map((item)=>{
        return [item]
      });
      reportTemplate.schema.additionalInfo.Header = [...convertData];
      setReportTemplate(reportTemplate)
    }else if(canvasItems[selected].role=='subheader'){
      const convertData = canvasItems.filter((item)=>item.role=="subheader").map((item)=>{
        return [item]
      });
      reportTemplate.schema.additionalInfo.SubHeader = [...convertData];
      setReportTemplate(reportTemplate)
    }else if(canvasItems[selected].role=='footer'){
      const convertData = canvasItems.filter((item)=>item.role=="footer").map((item)=>{
        return [item]
      });
      reportTemplate.schema.additionalInfo.Footer = [...convertData];
      setReportTemplate(reportTemplate)
    }
  }

  const handleStyles = (type,selected,e)=>{
    if(type==='bold'){
        console.log(canvasItems[selected]);
        const fontWeight =  canvasItems[selected]?.formatter.fontWeight =="bold" ? "normal" : "bold";
        canvasItems[selected] = {...canvasItems[selected], formatter:{...canvasItems[selected]?.formatter, fontWeight }}
        setCanvasItems([...canvasItems]);
      
        updateTemplateTextField(canvasItems, selected);


      
      }
    else if(type==='italic'){
      console.log(canvasItems[selected]);
        const fontStyle =  canvasItems[selected]?.formatter.fontStyle =="italic" ? "normal" : "italic";
        canvasItems[selected] = {...canvasItems[selected], formatter:{...canvasItems[selected]?.formatter, fontStyle }}
        setCanvasItems([...canvasItems]);

        updateTemplateTextField(canvasItems, selected);

    } else if(type==='underline'){
      console.log(canvasItems[selected]);
      const textDecoration =  canvasItems[selected]?.formatter.textDecoration =="underline" ? "none" : "underline";
      canvasItems[selected] = {...canvasItems[selected], formatter:{...canvasItems[selected]?.formatter, textDecoration }}
      setCanvasItems([...canvasItems]);
      updateTemplateTextField(canvasItems, selected);

    } else if(type==='fontfamily'){
      console.log(canvasItems[selected]);
      console.log(e.target.value);
      const fontFamily =   e.target.value;
      canvasItems[selected] = {...canvasItems[selected], formatter:{...canvasItems[selected]?.formatter, fontFamily }}
      setCanvasItems([...canvasItems]);
      updateTemplateTextField(canvasItems, selected);
    }
    else if(type==='alignRight'){
      console.log(canvasItems[selected]);
      const textAlign =   'right';
      canvasItems[selected] = {...canvasItems[selected], formatter:{...canvasItems[selected]?.formatter, textAlign }}
      setCanvasItems([...canvasItems]);
      updateTemplateTextField(canvasItems, selected);
    }
    else if(type==='alignLeft'){
      console.log(canvasItems[selected]);
      const textAlign =   'left';
      canvasItems[selected] = {...canvasItems[selected], formatter:{...canvasItems[selected]?.formatter, textAlign }}
      setCanvasItems([...canvasItems]);
      updateTemplateTextField(canvasItems, selected);
    }
    else if(type==='alignCenter'){
      console.log(canvasItems[selected]);
      const textAlign =   'center';
      canvasItems[selected] = {...canvasItems[selected], formatter:{...canvasItems[selected]?.formatter, textAlign }}
      setCanvasItems([...canvasItems]);
      updateTemplateTextField(canvasItems, selected);
    }else if(type==='color'){
      console.log(e);
      const color =   e;
      canvasItems[selected] = {...canvasItems[selected], formatter:{...canvasItems[selected]?.formatter, color }}
      setCanvasItems([...canvasItems]);
      updateTemplateTextField(canvasItems, selected);
    }else if(type==='fontSize'){
      console.log(e);
      const fontSize =   e;
      canvasItems[selected] = {...canvasItems[selected], formatter:{...canvasItems[selected]?.formatter, fontSize }}
      setCanvasItems([...canvasItems]);
      updateTemplateTextField(canvasItems, selected);
    }else if(type==='bgColor'){
      console.log(e);
      const backgroundColor =   e;
      canvasItems[selected] = {...canvasItems[selected], formatter:{...canvasItems[selected]?.formatter, backgroundColor }}
      setCanvasItems([...canvasItems]);
      updateTemplateTextField(canvasItems, selected);
    }else if(type==='width'){
      console.log(e);
      const width =   e;
      console.log(canvasItems[selected]);
      canvasItems[selected] = {...canvasItems[selected], formatter:{...canvasItems[selected]?.formatter, width }}
      setCanvasItems([...canvasItems]);
      updateTemplateTextField(canvasItems, selected);
    }
    
  }

  return (
    <div
      className="flex flex-col overflow-y-auto overflow-x-clip bg-white w-4/5"
    >
      <h1 className='text-2xl font-bold text-center'>Create Your Report Template</h1>
      <div className='flex gap-1 bg-secondary text-white border rounded-sm p-1 border-slate-300'>
        <button className='icon-button' onClick={() => handleStyles('bold',trackselected)}><FormatBoldOutlinedIcon fontSize='small'/></button>
        <button className='icon-button' onClick={() => handleStyles('italic',trackselected)}><FormatItalicOutlinedIcon fontSize='small'/></button>
        <button className='icon-button' onClick={() => handleStyles('underline',trackselected)}><FormatUnderlinedOutlinedIcon fontSize='small'/></button>
        <select onChange={(e)=>{handleStyles('fontfamily',trackselected,e)}} class="bg-third text-white  w-24  text-xs rounded-sm focus:ring-secondary focus:border-secondary block p-1  active:ring-secondary focus-visible:outline-none focus-within:border-secondary">
            <option className='poppins' selected>Poppins</option>
            <option value="sans-serif">Sans serif</option>
            <option value="monospace">Monospace</option>
            <option value="cursive">Cursive</option>
            <option value="Open Sans">Open Sans</option>
        </select>
        <button className='icon-button' onClick={() => handleStyles('alignLeft',trackselected)}><FormatAlignLeftOutlinedIcon fontSize='small'/></button>
        <button className='icon-button' onClick={() => handleStyles('alignCenter',trackselected)}><FormatAlignCenterOutlined fontSize='small'/></button>
        <button className='icon-button' onClick={() => handleStyles('alignRight',trackselected)}><FormatAlignRightOutlinedIcon fontSize='small'/></button>
        <ColorPickerButton type='text' onSelectColor={(color)=> handleStyles('color',trackselected, color )} />
        <FontResizeButton onSelectSize={(size)=> handleStyles('fontSize',trackselected, `${size}px` )} />
        <ColorPickerButton type='bg' onSelectColor={(color)=> handleStyles('bgColor',trackselected, color )} />
        <WidthSetterButton onSelectWidth={(width)=> handleStyles('width',trackselected, `${width}vw` )} />
      </div>
      <div className='flex flex-col overflow-y-auto overflow-x-clip h-full bg-white border border-secondary'
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

                  <div >
                  <TextEditor 
                  coreIndex={index}
                  textStyle={textStyle} setTextStyle={setTextStyle} onStyleChange={onStyleChange} 
                  label={item.field} 
                  role={item.role}
                  onDeleteClick={onDeleteClick}
                  type={'text'}
                  styles={item.formatter}
                  setSelected={setSelected}
                  setTrackSelected={setTrackSelected}
                  />
                  </div>
                  
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
                  onColumnDelete={onColumnDelete}
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
                  setShowModal={setShowModal}
                  handleSaveButton={handleSaveButton}
                  />
                {/*footer*/}
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
