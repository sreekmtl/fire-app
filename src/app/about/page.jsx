import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col'>
        <p className='flex justify-center'>See fire locations using the power of Remote Sensing Data.This app uses Sentinel-2 data to detect active fire locations and burnt area
        From sentinel-2 data, Active fire locations are calculated using NGDR, SAHM indices and burnt area is calculated using NBR and DNBR. The app uses 
        Geoserver at the backend for delivering geospatial data</p>
    </div>
  )
}

export default page