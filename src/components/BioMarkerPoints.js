import React from 'react'

const BioMarkerPoints = ({title, desc, tag,unit}) => {
    return (
        <div className='w-1/2 pr-4 pb-4'>

            <div className='border rounded rounded-md border-slate-200 shadow-sm'>
                <div className={`border-l-2 rounded rounded-md
                ${tag=="Optimized" ? 'border-lime-500' : null } 
                ${tag=="Normal" ? 'border-yellow-400' : null } 
                ${tag=="High" ? 'border-red-600' : null } 
                `}>
                    <div className='flex justify-between'>
                        <h3 className='ml-2 font-bold p-2 text-sm'>
                            {title}
                        </h3>
                        <div className={`mr-2 px-2 h-fit pb-1 m-2 border rounded rounded-xl
                        ${tag=="Optimized" ? 'bg-lime-500 text-white' : null } 
                        ${tag=="Normal" ? 'bg-yellow-400 text-black' : null } 
                        ${tag=="High" ? 'bg-red-600 text-white' : null }
                        
                        
                        `}>
                            {tag}
                        </div>
                    </div>

                    <div className='flex mt-1 justify-between'>
                        <h3 className='ml-2 p-2'>
                        {desc}
                        </h3>
                        <div className='mr-2 p-2'>
                            {unit}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default BioMarkerPoints