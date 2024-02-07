import React, { useEffect, useRef, useState } from 'react';
import './TextEditor.css';

const TextEditor = ({label, value,onStyleChange}) => {
  const editorRef = useRef(null);
  const [styleButtons, setStyleButton] = useState(false);
  const [textStyle, setTextStyle] = useState({});
  const [textvalue, setValue] = useState('');

  const handleFormat = (command) => {


  };

  const handleBold=()=>{
    editorRef.current.focus();
    setTextStyle({fontWeight:"bold"})
  }

  const handleOnBlur = ()=>{
    
  }
  const onChange = (e)=>{

    setValue(e.target.value);
    console.log('textStyle',textStyle);

    onStyleChange( { id: 1, field: e.target.value, formatter: 
    { 
      bold: textStyle.fontWeight=="bold", italic: textStyle?.fontStyle=="italic", underline: textStyle?.textDecoration=="underline", 
    } 
    })
  }

  useEffect(()=>{
    onStyleChange( { id: 1, field: textvalue, formatter: 
      { 
        bold: textStyle.fontWeight=="bold", italic: textStyle?.fontStyle=="italic", underline: textStyle?.textDecoration=="underline", 
      } 
      })
  },[textStyle,styleButtons])

  return (
    <div>
      
      <div className='flex p-2 items-center'>
        {/* <div>{label}</div> */}
        <div>
      {styleButtons && <div className='flex'>
        <button  className='border border-slate-200 px-1' onClick={() =>setTextStyle({fontWeight:"bold"}) }>B</button>
        <button className='border border-slate-200 px-1' onClick={() => setTextStyle({fontStyle:"italic"})}>I</button>
        <button className='border border-slate-200 px-1' onClick={() => setTextStyle({textDecoration:"underline"})}>U</button>
      </div>}
      <textarea
        placeholder={label} 
        style={textStyle}
        onFocus={()=>{setStyleButton(true)}}
        ref={editorRef}
        onChange={(e)=>{onChange(e)}}
        value={textvalue}
        // onBlur={()=>{
        //   setStyleButton(false)
        // }}
      ></textarea>
      </div>
      </div>
    </div>
  );
};

export default TextEditor;
