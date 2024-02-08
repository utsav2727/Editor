import React, { useEffect, useRef, useState } from 'react';
import './TextEditor.css';

const TextEditor = ({label, value,onStyleChange, setTextStyle, textStyle}) => {
  const editorRef = useRef(null);
  
  const [textvalue, setValue] = useState('');

  
  const onChange = (e)=>{

    setValue(e.target.value);
    console.log('textStyle',textStyle);

    onStyleChange( { id: 1, field: e.target.value, formatter: 
    { 
      bold: textStyle.fontWeight=="bold", italic: textStyle?.fontStyle=="italic", underline: textStyle?.textDecoration=="underline", 
    } 
    })
    }

  

  return (
    <div>
      
      <div className='flex p-2 items-center'>
        {/* <div>{label}</div> */}
      <div>
      
      <textarea
        placeholder={label} 
        style={textStyle}
        ref={editorRef}
        onChange={(e)=>{onChange(e)}}
        value={textvalue}
        draggable={false}
      ></textarea>
      </div>
      </div>
    </div>
  );
};

export default TextEditor;
