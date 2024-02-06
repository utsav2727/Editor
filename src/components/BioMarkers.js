import React from 'react'
import BioMarkerPoints from './BioMarkerPoints'

const bioMarkersPointsList = [
  {
    title: "Albemium",
    desc: "Serum protein",
    tag: "Optimized",
    unit: "4.7 g/dL"
  },
  {
    title: "Albemium",
    desc: "Serum protein",
    tag: "Normal",
    unit: "4.7 g/dL"
  },
  {
    title: "Albemium",
    desc: "Serum protein",
    tag: "High",
    unit: "4.7 g/dL"
  },
  {
    title: "Albemium",
    desc: "Serum protein",
    tag: "Normal",
    unit: "4.7 g/dL"
  },
  {
    title: "Albemium",
    desc: "Serum protein",
    tag: "Optimized",
    unit: "4.7 g/dL"
  },
  {
    title: "Albemium",
    desc: "Serum protein",
    tag: "Optimized",
    unit: "4.7 g/dL"
  },
  {
    title: "Albemium",
    desc: "Serum protein",
    tag: "High",
    unit: "4.7 g/dL"
  },
  {
    title: "Albemium",
    desc: "Serum protein",
    tag: "Optimized",
    unit: "4.7 g/dL"
  },
  {
    title: "Albemium",
    desc: "Serum protein",
    tag: "Optimized",
    unit: "4.7 g/dL"
  }
  
]

const BioMarkers = ({ title, bioMarkersPointsListProps }) => {
  return (
    // <div className='flex flex-col max-w-screen-md items-center'>
    <div className='m-auto pt-10 max-w-screen-md'>
      <div className='flex flex-row p-5 border border-slate-300 shadow-md'>
        <div className='w-1/3  flex flex-col items-center'>
          <div className='text-md font-bold'>{title}
          </div>
          <div className='mt-24 text-xs '>
            Your july 11, 2023 test did not have all the markers require for score evaluations.
          </div>
        </div>
        <div className='w-2/3'>
          <p className='text-xs'>Recovery biomarkers provide insights into the body's response to
            exercise of the physical activity across different intensities and durations.

            <br />
            <br />
            The Recovery biomarkers that can reflects the efficieny of the process includes:
          </p>

          <div className='flex text-xs flex-row my-5 flex-wrap'>
            {bioMarkersPointsList.map((item)=>{
              return <BioMarkerPoints title={item.title} desc={item.desc} tag={item.tag} unit={item.unit} /> 
            })}
            
          </div>
        </div>


      </div>

    </div>
    // </div>
  )
}

export default BioMarkers