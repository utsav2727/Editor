// src/components/Editor.js
import React, { useEffect, useRef, useState } from 'react';
import ToolbarItem from './ToolbarItem';
import Canvas from './Canvas';
import { reportDATA } from './dummyAPI';
import ColorPickerButton from './ColorPickerButton';
import FontResizeButton from './FontResizeButton';
import WidthSetterButton from './WidthSetterButton';
// import { Bars4Icon } from '@heroicons/react/24/outline';
import FormatBoldOutlinedIcon from '@mui/icons-material/FormatBoldOutlined';
import FormatItalicOutlinedIcon from '@mui/icons-material/FormatItalicOutlined';
import FormatUnderlinedOutlinedIcon from '@mui/icons-material/FormatUnderlinedOutlined';
import FormatAlignLeftOutlinedIcon from '@mui/icons-material/FormatAlignLeftOutlined';
import FormatAlignRightOutlinedIcon from '@mui/icons-material/FormatAlignRightOutlined';
import FormatAlignCenterOutlinedIcon from '@mui/icons-material/FormatAlignCenterOutlined';
import { FormatAlignCenterOutlined } from '@mui/icons-material';
import * as html2pdf from 'html2pdf.js'
import ReactToPrint from 'react-to-print';
// import { downloadPdfDocument } from './downloadPdf';


const Editor = () => {

  const ref = useRef();
  const [printer, setPrinter] = useState(false);
  const [APIdata, setAPIdata] = useState([]);
  const [fetchProducts, setFetchProducts] = useState([]);
  const [APIFulldata, setAPIFulldata] = useState([]);


  const [template, setTemplate] = useState([{}]);

  const [currentOpenTemplate, setCurrentOpenTemplate] = useState({
    selected: null,
    setCanvasItems:null
    ,updateTemplateTextField:null
    ,canvasItems:null
  })

  const handleDragStart = (e, title, tag,role,borderStyle) => {
    if (tag == "columns") {
      const columnData = APIFulldata.map((data) => {
        const obj = {formatter:{}};
        obj[title] = data[title];
        return obj
      });
      const draggedItem = {
        type: "columns",
        data: columnData,
        title: [{ field: title, caption: title, formatter:{} }]
      };
      // console.log('draggedItem----', draggedItem);
      e.dataTransfer.setData('text', JSON.stringify(draggedItem));
    } else {
      let draggedItem = {
        type: "text",
        field: title,
        role:role,
        formatter:{}
      };
      if(title=="" && borderStyle=='solid'){
        draggedItem = {...draggedItem, formatter:{borderBottom:"1px solid black", width:"80vw", height:'4px'}}
      }else if(title=="" && borderStyle=='dashed'){
        draggedItem = {...draggedItem, formatter:{borderBottom:"1px dashed black", width:"100vw"}}
      }else if(title=="" && borderStyle=='dotted'){
        draggedItem = {...draggedItem, formatter:{borderBottom:"1px dotted black", width:"100vw"}}
      }
      // console.log('draggedItem----', draggedItem);
      e.dataTransfer.setData('text', JSON.stringify(draggedItem));
    }
  };

  const handleSelectAPI = (e)=>{
    console.log('e',e.target.value);

    if(e.target.value==='dummayAPI'){
      const fullData = reportDATA[0].procGetagriloandetailsData;
      const firstData =  reportDATA[0].procGetagriloandetailsData[0];
      
      const extractedColumns = Object.keys(firstData);

      console.log('exttacted', extractedColumns);
      setAPIdata(extractedColumns);

      setAPIFulldata(fullData);
    }else if(e.target.value=="products"){
      const fullData = fetchProducts;
      const firstData = fetchProducts[0];
      const extractedColumns = Object.keys(firstData);

      setAPIdata(extractedColumns);
      setAPIFulldata(fullData);
    }else{
      setAPIdata([]);
      setAPIFulldata([]);
    }

  }

  // console.log('reportDATA', reportDATA);

  const handleStyles = (type,e ) => {
    let selected = currentOpenTemplate.selected;
    let setCanvasItems = currentOpenTemplate.setCanvasItems; 
    let updateTemplateTextField = currentOpenTemplate.updateTemplateTextField;
    let  canvasItems = currentOpenTemplate.canvasItems;

    if(type==='bold'){
        // console.log(canvasItems[selected]);
        const fontWeight =  canvasItems[selected]?.formatter.fontWeight =="bold" ? "normal" : "bold";
        canvasItems[selected] = {...canvasItems[selected], formatter:{...canvasItems[selected]?.formatter, fontWeight }}
        setCanvasItems([...canvasItems]);
      
        updateTemplateTextField(canvasItems, selected);


      
      }
    else if(type==='italic'){
      // console.log(canvasItems[selected]);
        const fontStyle =  canvasItems[selected]?.formatter.fontStyle =="italic" ? "normal" : "italic";
        canvasItems[selected] = {...canvasItems[selected], formatter:{...canvasItems[selected]?.formatter, fontStyle }}
        setCanvasItems([...canvasItems]);

        updateTemplateTextField(canvasItems, selected);

    } else if(type==='underline'){
      // console.log(canvasItems[selected]);
      const textDecoration =  canvasItems[selected]?.formatter.textDecoration =="underline" ? "none" : "underline";
      canvasItems[selected] = {...canvasItems[selected], formatter:{...canvasItems[selected]?.formatter, textDecoration }}
      setCanvasItems([...canvasItems]);
      updateTemplateTextField(canvasItems, selected);

    } else if(type==='fontfamily'){
      // console.log(canvasItems[selected]);
      // console.log(e.target.value);
      const fontFamily =   e.target.value;
      canvasItems[selected] = {...canvasItems[selected], formatter:{...canvasItems[selected]?.formatter, fontFamily }}
      setCanvasItems([...canvasItems]);
      updateTemplateTextField(canvasItems, selected);
    }
    else if(type==='alignRight'){
      // console.log(canvasItems[selected]);
      const textAlign =   'right';
      canvasItems[selected] = {...canvasItems[selected], formatter:{...canvasItems[selected]?.formatter, textAlign }}
      setCanvasItems([...canvasItems]);
      updateTemplateTextField(canvasItems, selected);
    }
    else if(type==='alignLeft'){
      // console.log(canvasItems[selected]);
      const textAlign =   'left';
      canvasItems[selected] = {...canvasItems[selected], formatter:{...canvasItems[selected]?.formatter, textAlign }}
      setCanvasItems([...canvasItems]);
      updateTemplateTextField(canvasItems, selected);
    }
    else if(type==='alignCenter'){
      // console.log(canvasItems[selected]);
      const textAlign =   'center';
      canvasItems[selected] = {...canvasItems[selected], formatter:{...canvasItems[selected]?.formatter, textAlign }}
      setCanvasItems([...canvasItems]);
      updateTemplateTextField(canvasItems, selected);
    }else if(type==='color'){
      // console.log(e);
      const color =   e;
      canvasItems[selected] = {...canvasItems[selected], formatter:{...canvasItems[selected]?.formatter, color }}
      setCanvasItems([...canvasItems]);
      updateTemplateTextField(canvasItems, selected);
    }else if(type==='fontSize'){
      // console.log(e);
      const fontSize =   e;
      canvasItems[selected] = {...canvasItems[selected], formatter:{...canvasItems[selected]?.formatter, fontSize }}
      setCanvasItems([...canvasItems]);
      updateTemplateTextField(canvasItems, selected);
    }else if(type==='bgColor'){
      // console.log(e);
      const backgroundColor =   e;
      canvasItems[selected] = {...canvasItems[selected], formatter:{...canvasItems[selected]?.formatter, backgroundColor }}
      setCanvasItems([...canvasItems]);
      updateTemplateTextField(canvasItems, selected);
    }else if(type==='width'){
      // console.log(e);
      const width =   e;
      console.log(canvasItems[selected]);
      canvasItems[selected] = {...canvasItems[selected], formatter:{...canvasItems[selected]?.formatter, width }}
      setCanvasItems([...canvasItems]);
      updateTemplateTextField(canvasItems, selected);
    }
    
  }

  const handleAddTemplate = ()=>{
    const obj = {};
    setTemplate([...template,obj]);
  }
  

  useEffect(()=>{
    fetch('https://dummyjson.com/products?limit=10&skip=10&select=title,price')
    .then(res => res.json())
    .then((data)=>setFetchProducts(data.products));
  },[]);

  console.log('finalTemplate', template);

  const handleFinalTemplateUpdate = (index, item)=>{
    template[index] = item;
    setTemplate([...template]);
  }

  const handlePrint = ()=>{
    setPrinter(true);
    console.log('pressse');
  }

  return (
    <div className="flex text-xs">
      <div className="w-1/5 h-screen bg-secondary text-white px-4 py-2">
        <div className='flex flex-col w-full gap-1'>
        <div>
          <h2 className='font-bold text-sm'>Headers</h2>
          <ToolbarItem tag={'input'} role='header' title="Gujarat Bank" onDragStart={handleDragStart} />
        </div>
        <div>
          <h2 className='font-bold text-sm'>SubHeaders</h2>
          <ToolbarItem tag={'input'} role='subheader' title="Sub Header" onDragStart={handleDragStart} />
        </div>
        <div>
          <h2 className='font-bold text-sm'>Footer</h2>
          <ToolbarItem tag={'input'} role='footer' title="Footer" onDragStart={handleDragStart} />
        </div>
        <div className=''>
        <h2 className='font-bold text-sm '>Lines</h2>
        <div className='bg-secondary'>
        <ToolbarItem tag={'input'} role='header' title="" onDragStart={handleDragStart} borderStyle={'solid'}/>
        <ToolbarItem tag={'input'} role='header' title="" onDragStart={handleDragStart} borderStyle={'dashed'}/>
        <ToolbarItem tag={'input'} role='header' title="" onDragStart={handleDragStart} borderStyle={'dotted'}/>
        </div>
        </div>
        <div className=''>
          <label for="countries" className="block mb-2 text-sm font-bold">Select API Endpoint</label>
          <select onChange={(e)=>{handleSelectAPI(e)}} id="countries" className=" bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-secondary focus:border-secondary block w-full p-1  active:ring-secondary focus-visible:outline-none focus-within:border-secondary">
            <option className=' ' selected>Choose a API Endpoint</option>
            <option value="dummayAPI">dummy API</option>
            <option value="products">Products</option>
          </select>
        </div>
        
        <h3 className='font-bold'>Columns</h3>
        <div className='max-h-72 overflow-y-auto'>
          {APIdata.map((item) => {
            return <ToolbarItem tag={'columns'} title={item} onDragStart={handleDragStart} />
          })}
          </div>
      </div>
      </div>
      {/* Right Canvas */}


      <div
      
      className="overflow-auto bg-white w-4/5 h-screen"
      >
      <h1 className='text-2xl font-bold text-center'>Create Your Report Template</h1>
      <div className='flex gap-1 items-center justify-between bg-secondary text-white border rounded-sm p-1 border-slate-300'>
        <div className='flex gap-1'>
        <button className='icon-button' onClick={() => 
          // {}
          handleStyles('bold')
          }><FormatBoldOutlinedIcon fontSize='small'/></button>
        <button className='icon-button' onClick={() => 
          // {}
          handleStyles('italic')
          }><FormatItalicOutlinedIcon fontSize='small'/></button>
        <button className='icon-button' onClick={() => 
          // {}
          handleStyles('underline')
          }><FormatUnderlinedOutlinedIcon fontSize='small'/></button>
        <select onChange={(e)=>{
          handleStyles('fontfamily',e)
          // {}
          }} className="bg-third text-white  w-24  text-xs rounded-sm focus:ring-secondary focus:border-secondary block p-1  active:ring-secondary focus-visible:outline-none focus-within:border-secondary">
            <option className='poppins' selected>Poppins</option>
            <option value="sans-serif">Sans serif</option>
            <option value="monospace">Monospace</option>
            <option value="cursive">Cursive</option>
            <option value="Open Sans">Open Sans</option>
        </select>
        <button className='icon-button' onClick={() => 
          handleStyles('alignLeft')
          // {}
          }><FormatAlignLeftOutlinedIcon fontSize='small'/></button>
        <button className='icon-button' onClick={() => 
          handleStyles('alignCenter')
          // {}
          }><FormatAlignCenterOutlined fontSize='small'/></button>
        <button className='icon-button' onClick={() => 
          handleStyles('alignRight')
          // {}
          }><FormatAlignRightOutlinedIcon fontSize='small'/></button>
        <ColorPickerButton type='text' onSelectColor={(color)=> 
          handleStyles('color', color )
          // {}
          } />
        <FontResizeButton onSelectSize={(size)=> 
          handleStyles('fontSize', `${size}px` )
          // {}
          } />
        <ColorPickerButton type='bg' onSelectColor={(color)=> 
          handleStyles('bgColor', color )
          // {}
          } />
        <WidthSetterButton onSelectWidth={(width)=> 
          handleStyles('width', `${width}vw` )
          // {}
          } />
          </div>
          <div className='flex gap-2'>
            <button onClick={()=>{handleAddTemplate()}} className='bg-third rounded-sm hover:bg-hoverSecondary p-1 px-2'>Add Template</button>
            
            <ReactToPrint
              bodyClass="print-agreement"
              content={(printepress) => ref.current}
              onBeforeGetContent={async ()=>{
                await handlePrint()
              }}
              onAfterPrint={()=>{
                console.log('after')
                setPrinter(false);
              }} 
              // onBeforePrint={}
              trigger={() => (
                <button className='bg-third rounded-sm hover:bg-hoverSecondary p-1 px-2'>Save as PDF</button>
            )}
            />
          
            </div>
      </div>
      <div ref={ref} className='h-[88vh] overflow-auto ' id="scrollableDiv">
      {template.map((item, index)=>{
        return (<Canvas printer={printer} setCurrentOpenTemplate={setCurrentOpenTemplate} templateIndex={index} handleFinalTemplateUpdate={handleFinalTemplateUpdate}/>)
      }) 
      }
      </div>
      </div>
    </div>
  );
};

export default Editor;
