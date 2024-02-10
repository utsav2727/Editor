import React, { useEffect, useRef, useState } from 'react';
import './TextEditor.css';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const TextEditor = ({label, value,onStyleChange, setTextStyle, textStyle, coreIndex, onDeleteClick, role}) => {
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
        style={{...textStyle, width:`${label.length +2}ch`}}
        onFocus={(e)=>{setTextFocus(true)}}
        onBlur={(e)=>{
          setTextFocus(false)
        }}
        ref={editorRef}
        onChange={(e)=>{onChange(e)}}
        value={label}
        draggable={false}
        className='focus-within:outline-none focus:border-slate-200 focus:border focus:rounded-md'
      ></textarea>
      {textFocus && <div className='absolute -top-2 -right-2 p-2'>
        <button onMouseDown={(e)=>{
          // console.log('clicked!!');
          onDeleteClick(e, coreIndex,role);
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
