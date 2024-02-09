// src/components/Editor.js
import React, { useEffect, useState } from 'react';
import ToolbarItem from './ToolbarItem';
import Canvas from './Canvas';
import { reportDATA } from './dummyAPI';

const Editor = () => {

  const [APIdata, setAPIdata] = useState([]);
  const [fetchProducts, setFetchProducts] = useState([]);
  const [APIFulldata, setAPIFulldata] = useState([]);


  

  const handleDragStart = (e, title, tag) => {
    if (tag == "columns") {
      const columnData = APIFulldata.map((data) => {
        const obj = {};
        obj[title] = data[title];
        return obj
      });
      const draggedItem = {
        type: "columns",
        data: columnData,
        title: [{ title: title, modifiedTitle: title }]
      };
      console.log('draggedItem----', draggedItem);
      e.dataTransfer.setData('text', JSON.stringify(draggedItem));
    } else {
      const draggedItem = {
        type: "text",
        title: title
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
    <div className="flex h-screen text-sm">
      <div className="w-1/4 bg-gray-200 p-4">
        <div>
          <h2 className='font-bold'>Headers</h2>
          <ToolbarItem tag={'input'} title="Gujarat Bank" onDragStart={handleDragStart} />
        </div>
        <div>
          <label for="countries" class="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Select API Endpoint</label>
          <select onChange={(e)=>{handleSelectAPI(e)}} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Choose a API Endpoint</option>
            <option value="dummayAPI">dummy API</option>
            <option value="products">Products</option>
          </select>


          <h3 className='font-bold mt-6'>Columns</h3>
          {APIdata.map((item) => {
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
