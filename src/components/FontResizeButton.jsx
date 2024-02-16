import React, { useState } from 'react';
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';

const FontResizeButton = ({ onSelectSize }) => {
  const [showSizePicker, setShowSizePicker] = useState(false);
  const [selectedSize, setSelectedSize] = useState(16); // Initial size in pixels

  const handleClick = () => {
    setShowSizePicker(!showSizePicker);
  };

  const handleSizeChange = (e) => {
    setSelectedSize(parseInt(e.target.value, 10));
  };

  const handleSizeSelect = (selectedSize) => {
    onSelectSize(selectedSize);
    setShowSizePicker(false);
  };

  return (
    <div>
      <button className='icon-button' onClick={handleClick}>
        <TextIncreaseIcon fontSize='small' />
      </button>

      {showSizePicker && (
        <div className='absolute bg-third z-50 text-black flex flex-col top-16 p-1 rounded-md border'>
            <ul className='flex flex-col gap-1 w-full'>
                <li className='hover:bg-hoverSecondary w-full p-1' onClick={()=>{handleSizeSelect(16)}}>{`16 px`}</li>
                <li className='hover:bg-hoverSecondary w-full p-1' onClick={()=>{handleSizeSelect(18)}}>{`18 px`}</li>
                <li className='hover:bg-hoverSecondary w-full p-1' onClick={()=>{handleSizeSelect(20)}}>{`20 px`}</li>
                <li className='hover:bg-hoverSecondary w-full p-1' onClick={()=>{handleSizeSelect(24)}}>{`24 px`}</li>
                <li className='hover:bg-hoverSecondary w-full p-1' onClick={()=>{handleSizeSelect(28)}}>{`28 px`}</li>
                <li className='hover:bg-hoverSecondary w-full p-1' onClick={()=>{handleSizeSelect(32)}}>{`32 px`}</li>
            </ul>
        </div>
      )}
    </div>
  );
};

export default FontResizeButton