import React, { useState } from 'react';
import FormatColorTextOutlinedIcon from '@mui/icons-material/FormatColorTextOutlined';
import FormatColorFillTwoToneIcon from '@mui/icons-material/FormatColorFillTwoTone';

const ColorPickerButton = ({ onSelectColor, type }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState('black'); // Initial color

  const handleClick = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleColorSelect = () => {
    onSelectColor(selectedColor);
    setShowColorPicker(false);
  };

  return (
    <div>
      <button className='icon-button' onClick={handleClick}>
        {type=='text'? <FormatColorTextOutlinedIcon fontSize='small'/>: <FormatColorFillTwoToneIcon fontSize='small'/>} {/* Replace with your icon component */}
      </button>

      {showColorPicker && (
        <div className='absolute z-50 bg-third text-white flex flex-col top-16 p-2 rounded-md border'>
          <input type="color" className='focus-within:outline-none' value={selectedColor} onChange={handleColorChange} />
          <button className='bg-third rounded-md p-1 text-white' onClick={handleColorSelect}>Apply</button>
        </div>
      )}
    </div>
  );
};

export default ColorPickerButton;