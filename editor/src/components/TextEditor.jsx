import React, { useEffect, useRef, useState } from 'react';
import './TextEditor.css';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const TextEditor = ({label,role, value,onStyleChange, setTextStyle, textStyle, coreIndex, onDeleteClick, type}) => {
  const editorRef = useRef(null);
  
  const [textFocus, setTextFocus] = useState(false);

  
  const onChange = (e)=>{
    onStyleChange(e, coreIndex);
  }

  return (
    <div>
      
      <div className='relative p-2 items-center'>
        {/* <div>{label}</div> */}
        
      <textarea
        // placeholder={label} 
        style={{...textStyle, width:`${label.length +2}ch`, resize:'none', fontSize:'20px'}}
        onFocus={(e)=>{setTextFocus(true)}}
        onBlur={(e)=>{
          setTextFocus(false)
        }}
        ref={editorRef}
        onChange={(e)=>{onChange(e)}}
        value={label}
        draggable={false}
        className='h-12 leading-5 focus-within:outline-none focus:border-slate-200 focus:border focus:rounded-md'
      ></textarea>
      {role=='header' && <div className='border-b-2 border-black absolute bottom-2 left-[-37vw] w-[100vw]'>
        </div>}
      {textFocus && <div className='absolute -top-2 -right-2 p-2'>
        <button onMouseDown={(e)=>{
          // console.log('clicked!!');
          onDeleteClick(e, coreIndex,type);
        }}  className='bg-black rounded-full text-white'>
          <CloseOutlinedIcon fontSize='small'/>
        </button>
        </div>
      }
      </div>
    </div>
  );
};

export default TextEditor;
