'use client'

import React, { useState,useRef } from 'react';
import Mapcomponent from '@/components/Mapcomponent';
import Mapcontrol from '@/components/Mapcontrol';
import Sources from '@/mapOperations/sources';
import { fromLonLat } from 'ol/proj';

let src = new Sources();

const page = () => {

    let defaultLocation= '';
    let defaultProduct= 'fire';

    const [source, setSource] = useState(src.EsriMaps);
    const [product, setProduct]= useState(defaultProduct)
    const [geolocation, setLocation]= useState(defaultLocation);
    const [mapLocation, setMapLocation]= useState([8687373.06, 3544749.53]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [overlayLayer, setOverlayLayer] = useState(null);
    const [legendImg, setLegendImg]=useState('');


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
      if (geolocation==='') {
        alert('Enter a valid location');
      }else{
        const [longitude, latitude]= geolocation.split(',').map(Number);
        const loc_epsg3857= fromLonLat([longitude,latitude]);
        setMapLocation(loc_epsg3857);
      }
      
    };


    const handleAddLayer=()=>{
      const loc_epsg3857= fromLonLat([78,30]);
      setMapLocation(loc_epsg3857);
      if (selectedDate && (product==='fire')){
        let dateString= selectedDate.toISOString().split('T')[0]
        setOverlayLayer(src.overlayWFS(product+'-'+dateString ));
      }else if (selectedDate && (product==='dnbr')){
        let dateString= selectedDate.toISOString().split('T')[0]
        setOverlayLayer(src.overlayWMS(product+'-'+dateString)[0]);
        setLegendImg(src.overlayWMS(product+'-'+dateString)[1]);
      }else {
        alert('Enter Date');
      }
      
    }

  const handleClearAll = () => {
      location.reload();
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
        handleClearAll={handleClearAll}
        handleAddLayer={handleAddLayer}
        legendImg={legendImg} />

    </div>
    </>
  )
}

export default page