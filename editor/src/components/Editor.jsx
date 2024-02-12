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


  

  const handleDragStart = (e, title, tag,role) => {
    if (tag == "columns") {
      const columnData = APIFulldata.map((data) => {
        const obj = {styles:{}};
        obj[title] = data[title];
        return obj
      });
      const draggedItem = {
        type: "columns",
        data: columnData,
        title: [{ title: title, modifiedTitle: title, styles:{} }]
      };
      console.log('draggedItem----', draggedItem);
      e.dataTransfer.setData('text', JSON.stringify(draggedItem));
    } else {
      const draggedItem = {
        type: "text",
        title: title,
        role:role
      };
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

  
  

  

  useEffect(()=>{
    fetch('https://dummyjson.com/products?limit=10&skip=10&select=title,price')
    .then(res => res.json())
    .then((data)=>setFetchProducts(data.products));
  },[])

  return (
    <div className="flex h-screen text-xs">
      <div className="w-1/4 bg-secondary text-white p-4">
        <div className='flex flex-col w-full gap-2'>
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
          <label for="countries" class="block mb-2 text-sm font-bold">Select API Endpoint</label>
          <select onChange={(e)=>{handleSelectAPI(e)}} id="countries" class=" bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-secondary focus:border-secondary block w-full p-1  active:ring-secondary focus-visible:outline-none focus-within:border-secondary">
            <option className=' ' selected>Choose a API Endpoint</option>
            <option value="dummayAPI">dummy API</option>
            <option value="products">Products</option>
          </select>
        </div>
        <h3 className='font-bold'>Columns</h3>
        <div className='max-h-80 overflow-y-auto'>
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
