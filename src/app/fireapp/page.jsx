'use client'

import React, { useState,useRef } from 'react';
import Mapcomponent from '@/components/Mapcomponent';
import Mapcontrol from '@/components/Mapcontrol';
import Sources from '@/mapOperations/sources';
import { fromLonLat } from 'ol/proj';

let src = new Sources();
let overlayLayer= null;

const page = () => {

    const overlayRef = useRef(null);

    let defaultLocation= '';
    let defaultProduct= 'fire';

    const [source, setSource] = useState(src.EsriMaps);
    const [product, setProduct]= useState(defaultProduct)
    const [location, setLocation]= useState(defaultLocation);
    const [mapLocation, setMapLocation]= useState([8687373.06, 3544749.53]);
    const [selectedDate, setSelectedDate] = useState(null);


    const handleBaseMapChange = (event) => {
    const selectedSource = event.target.value === 'esri_world' ? src.EsriMaps : src.OSM_Standard;
    setSource(selectedSource);
    };

    const handleProductChange= (event)=>{
      const selectedProduct= event.target.value === 'fire'? 'fire':'dnbr';
      setProduct(selectedProduct);
    }

    const handleLocationChange= (event)=>{
      setLocation(event.target.value);
    };

    
    const handleDateChange = (date) => {
      setSelectedDate(date);
      console.log(date.toISOString()); 
    };

    const handleZoomToLocation= ()=>{
      const [longitude, latitude]= location.split(',').map(Number);
      const loc_epsg3857= fromLonLat([longitude,latitude]);
      console.log(loc_epsg3857);
      //overlayLayer= src.nbr;
      
      if (selectedDate && (product==='fire')){
        setMapLocation(loc_epsg3857);
        let dateString= selectedDate.toISOString().split('T')[0]
        overlayLayer=src.overlayWFS(product+'-'+dateString );
      }else if (selectedDate && (product==='dnbr')){
        setMapLocation(loc_epsg3857);
        let dateString= selectedDate.toISOString().split('T')[0]
        overlayLayer= src.overlayWMS(product+'-'+dateString);
      }else {
        alert('Enter Date');
      }
    };

  const handleClearAll = () => {
      overlayRef.current = null;
      setMapLocation(null);
  };

  return (
    <>
    <div className='flex flex-col lg:flex-row w-full gap-2 '>
        <Mapcomponent source={source} 
        location={mapLocation} 
        layer={overlayLayer} />
        <Mapcontrol 
        handleBaseMapChange={handleBaseMapChange} 
        handleProductChange={handleProductChange}
        handleLocationChange={handleLocationChange} 
        handleZoomToLocation={handleZoomToLocation}
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
        handleClearAll={handleClearAll} />

    </div>
    </>
  )
}

export default page