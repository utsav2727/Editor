// src/components/Editor.js
import React, { useEffect, useState } from 'react';
import ToolbarItem from './ToolbarItem';
import Canvas from './Canvas';
import { reportDATA } from './dummyAPI';
// import { Bars4Icon } from '@heroicons/react/24/outline';


const Editor = () => {

  const [APIdata, setAPIdata] = useState([]);
  const [fetchProducts, setFetchProducts] = useState([]);
  const [APIFulldata, setAPIFulldata] = useState([]);

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
      console.log('draggedItem----', draggedItem);
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
      console.log('draggedItem----', draggedItem);
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

  console.log('reportDATA', reportDATA);

  // const handleStyles = (type,selected,e)=>{
  //   if(type==='bold'){
  //       console.log(canvasItems[selected]);
  //       const fontWeight =  canvasItems[selected]?.formatter.fontWeight =="bold" ? "normal" : "bold";
  //       canvasItems[selected] = {...canvasItems[selected], formatter:{...canvasItems[selected]?.formatter, fontWeight }}
  //       setCanvasItems([...canvasItems]);
      
  //       updateTemplateTextField(canvasItems, selected);


      
  //     }
  //   else if(type==='italic'){
  //     console.log(canvasItems[selected]);
  //       const fontStyle =  canvasItems[selected]?.formatter.fontStyle =="italic" ? "normal" : "italic";
  //       canvasItems[selected] = {...canvasItems[selected], formatter:{...canvasItems[selected]?.formatter, fontStyle }}
  //       setCanvasItems([...canvasItems]);

  //       updateTemplateTextField(canvasItems, selected);

  //   } else if(type==='underline'){
  //     console.log(canvasItems[selected]);
  //     const textDecoration =  canvasItems[selected]?.formatter.textDecoration =="underline" ? "none" : "underline";
  //     canvasItems[selected] = {...canvasItems[selected], formatter:{...canvasItems[selected]?.formatter, textDecoration }}
  //     setCanvasItems([...canvasItems]);
  //     updateTemplateTextField(canvasItems, selected);

  //   } else if(type==='fontfamily'){
  //     console.log(canvasItems[selected]);
  //     console.log(e.target.value);
  //     const fontFamily =   e.target.value;
  //     canvasItems[selected] = {...canvasItems[selected], formatter:{...canvasItems[selected]?.formatter, fontFamily }}
  //     setCanvasItems([...canvasItems]);
  //     updateTemplateTextField(canvasItems, selected);
  //   }
  //   else if(type==='alignRight'){
  //     console.log(canvasItems[selected]);
  //     const textAlign =   'right';
  //     canvasItems[selected] = {...canvasItems[selected], formatter:{...canvasItems[selected]?.formatter, textAlign }}
  //     setCanvasItems([...canvasItems]);
  //     updateTemplateTextField(canvasItems, selected);
  //   }
  //   else if(type==='alignLeft'){
  //     console.log(canvasItems[selected]);
  //     const textAlign =   'left';
  //     canvasItems[selected] = {...canvasItems[selected], formatter:{...canvasItems[selected]?.formatter, textAlign }}
  //     setCanvasItems([...canvasItems]);
  //     updateTemplateTextField(canvasItems, selected);
  //   }
  //   else if(type==='alignCenter'){
  //     console.log(canvasItems[selected]);
  //     const textAlign =   'center';
  //     canvasItems[selected] = {...canvasItems[selected], formatter:{...canvasItems[selected]?.formatter, textAlign }}
  //     setCanvasItems([...canvasItems]);
  //     updateTemplateTextField(canvasItems, selected);
  //   }else if(type==='color'){
  //     console.log(e);
  //     const color =   e;
  //     canvasItems[selected] = {...canvasItems[selected], formatter:{...canvasItems[selected]?.formatter, color }}
  //     setCanvasItems([...canvasItems]);
  //     updateTemplateTextField(canvasItems, selected);
  //   }else if(type==='fontSize'){
  //     console.log(e);
  //     const fontSize =   e;
  //     canvasItems[selected] = {...canvasItems[selected], formatter:{...canvasItems[selected]?.formatter, fontSize }}
  //     setCanvasItems([...canvasItems]);
  //     updateTemplateTextField(canvasItems, selected);
  //   }else if(type==='bgColor'){
  //     console.log(e);
  //     const backgroundColor =   e;
  //     canvasItems[selected] = {...canvasItems[selected], formatter:{...canvasItems[selected]?.formatter, backgroundColor }}
  //     setCanvasItems([...canvasItems]);
  //     updateTemplateTextField(canvasItems, selected);
  //   }else if(type==='width'){
  //     console.log(e);
  //     const width =   e;
  //     console.log(canvasItems[selected]);
  //     canvasItems[selected] = {...canvasItems[selected], formatter:{...canvasItems[selected]?.formatter, width }}
  //     setCanvasItems([...canvasItems]);
  //     updateTemplateTextField(canvasItems, selected);
  //   }
    
  // }

  

  useEffect(()=>{
    fetch('https://dummyjson.com/products?limit=10&skip=10&select=title,price')
    .then(res => res.json())
    .then((data)=>setFetchProducts(data.products));
  },[])

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
          <label for="countries" class="block mb-2 text-sm font-bold">Select API Endpoint</label>
          <select onChange={(e)=>{handleSelectAPI(e)}} id="countries" class=" bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-secondary focus:border-secondary block w-full p-1  active:ring-secondary focus-visible:outline-none focus-within:border-secondary">
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
      <Canvas />
    </div>
  );
};

export default Editor;
