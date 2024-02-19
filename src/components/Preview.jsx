import React, { useEffect } from 'react'
import Canvas from './Canvas'
import { useLocation } from 'react-router-dom';

const Preview = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const htmlContent = searchParams.get('htmlContent');

    useEffect(()=>{
        const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

        // Get the existing transform values
        const originalTransform = document.getElementById('transform-div').style.transform;
        const matchX = originalTransform.match(/translateX\(([^)]+)\)/);
        const matchY = originalTransform.match(/translateY\(([^)]+)\)/);

        // Convert pixel values to vw and vh
        const translateX_px = parseFloat(matchX[1]);
        const translateY_px = parseFloat(matchY[1]);
        
        const translateX_vw = (translateX_px / viewportWidth) * 100;
        const translateY_vh = (translateY_px / viewportHeight) * 100;
        
        document.getElementById('transform-div').style.transform = `translateX(${translateX_vw}vw) translateY(${translateY_vh}vh)`
    },[])
  
    return (
      <div>
        {/* Render HTML content received from the query parameter */}

        <div className='w-4/5 m-auto' dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    );
}

export default Preview