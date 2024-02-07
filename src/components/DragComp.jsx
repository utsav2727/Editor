import React, { useState } from 'react'
import DragMove from './DragMove'
import TextEditor from './TextEditor';

const DragComp = () => {
    const [translate, setTranslate] = useState({
        x: 0,
        y: 0
      });
    
      const handleDragMove = (e) => {
        console.log(translate);
        console.log(e);
        if(translate.y<=65 ){
          setTranslate({
            x: translate.x + e.movementX,
            y: translate.y + e.movementY
          });
        }
        
      };
  return (
    <DragMove onDragMove={handleDragMove}>
          <div
            style={{
              transform: `translateX(${translate.x}px) translateY(${translate.y}px)`
            }}
          >
            <TextEditor label={'Bank Name:'}/> 
          </div>
    </DragMove>
  )
}

export default DragComp