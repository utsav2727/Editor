import React, { useEffect, useRef, useState } from 'react';
import './TextEditor.css';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const TextEditor = ({label,role, value,styles,onStyleChange, 
  setTextStyle, textStyle, coreIndex, onDeleteClick, type,
  setSelected,setTrackSelected
}) => {
  const editorRef = useRef(null);
  
  const [textFocus, setTextFocus] = useState(false);
  const [lineFocus, setLineFocus] = useState(false);

  const [switch1, setSwitch1] = useState(false);

  // console.log('styles', styles)
  
  const onChange = (e)=>{
    onStyleChange(e, coreIndex);
  }

  const handleFocus =(e)=>{
    // console.log('here');
    setTextFocus(true);
    setSelected(coreIndex);
    setTrackSelected(coreIndex);
  }

  const handleBlur=(e)=>{
    setTextFocus(false);
    setSelected(null);
    setSwitch1(false);
  }

  const onLineSelected = ()=>{
    setLineFocus(!lineFocus)
      setTrackSelected(coreIndex);
  
  }

  return (
    <div>
      
      <div className='relative p-2 items-center'>
        {switch1==false ? 
        label == '' ?  (<div onClick={()=>{onLineSelected()}} style= {{...styles}}></div>): 
        (<div
        style={{
          // ...textStyle, 
          width:`${label.length +2}ch`, resize:'none', fontSize:'20px'
          ,...styles
        }}
        className='flex flex-col justify-center select-none h-12 leading-5 focus-within:outline-none focus:border-slate-200 focus:border focus:rounded-md'
        onDoubleClick={()=>{setSwitch1(true)}}
        >
          {label}
          </div>
        )
           : null
          }
      {switch1==true && <input
        // placeholder={label} 
        style={{
          // ...textStyle, 
          width:`${label.length +2}ch`, resize:'none', fontSize:'20px'
          ,...styles
        }}
        onFocus={(e)=>{
          
          handleFocus()
        }}
        onBlur={(e)=>{
          handleBlur()
        }}
        // disabled={true}
        // disabled={true}
        autoFocus
        ref={editorRef}
        onChange={(e)=>{onChange(e)}}
        value={label}
        draggable={false}
        className='border border-slate-200 select-none h-12 leading-5 focus-within:outline-none focus:border-slate-200 focus:border focus:rounded-md'
      ></input>}
      {/* {role=='header' && <div className='border-b-2 border-black absolute bottom-2 left-[-37vw] w-[100vw]'>
        </div>} */}
      {textFocus && <div className='absolute -top-2 -right-2 p-2'>
        <button onMouseDown={(e)=>{
          // console.log('clicked!!');
          onDeleteClick(e, coreIndex,type);
        }}  className='bg-black rounded-full text-white'>
          <CloseOutlinedIcon fontSize='small'/>
        </button>
        </div>
      }
      {lineFocus && <div className='absolute -top-2 -right-2 p-2'>
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
