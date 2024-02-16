import React, { useState } from 'react';
import LinearScaleIcon from '@mui/icons-material/LinearScale';

const WidthSetterButton = ({ onSelectWidth }) => {
  const [selectedWidth, setSelectedWidth] = useState(100); // Initial width in pixels
  const [showSizePicker, setShowSizePicker] = useState(false);

  const handleWidthChange = (e) => {
    setSelectedWidth(parseInt(e.target.value, 10));
  };

  const handleWidthSelect = () => {
    onSelectWidth(selectedWidth);
    setShowSizePicker(false);
  };
  const handleClick = () => {
    setShowSizePicker(!showSizePicker);
  };

  return (
    <div>
    <button className='icon-button' onClick={handleClick}>
        <LinearScaleIcon fontSize='small' />
      </button>
      {showSizePicker  && (<div className='absolute bg-third z-50 text-black flex flex-col top-16 p-1 rounded-md border'>
        <div className='flex'><input
        type="range"
        value={selectedWidth}
        onChange={handleWidthChange}
        min={10}
        max={80}
      />
      {/* <span>{selectedWidth}px</span> */}
      </div>
      <button onClick={handleWidthSelect}>Apply</button>
      </div>)
      }
    </div>
  );
};

export default WidthSetterButton;