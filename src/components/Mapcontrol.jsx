import React from 'react'
import Button from './Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Mapcontrol = ({handleBaseMapChange, handleProductChange, handleLocationChange, handleZoomToLocation, selectedDate, handleDateChange, handleClearAll}) => {
  return (
    <div className='w-full lg:w-[30%] p-4 bg-gray-100'>
      <div className='mb-4'>
        <label htmlFor="dropdown1" className='block mb-2'>Select Base Map</label>
        <select id="dropdown1" onChange={handleBaseMapChange} className='w-full p-2 border border-gray-300 rounded'>
          <option value="esri_world">Satellite View (ESRI World Imagery)</option>
          <option value="osm_std">OSM Standard</option>
        </select>
      </div>
      <div className='mb-4'>
        <label htmlFor="editText" className='block mb-2'>Enter Location</label>
        <input 
          type="text" 
          id="editText" 
          onChange={handleLocationChange}
          className='w-full p-2 border border-gray-300 rounded' 
          placeholder="Enter Coordinates (Lon,Lat)"
        />
      </div>
      <div className='mb-4'>
        <label htmlFor="dropdown2" className='block mb-2'>Select Product</label>
        <select id="dropdown2" className='w-full p-2 border border-gray-300 rounded' onChange={handleProductChange}>
          <option value="fire">Fire points (Vector)</option>
          <option value="burnt">Burnt severity (Raster)</option>
        </select>
      </div>
      
      <div className='mb-4'>
        <label htmlFor="datePicker" className='block mb-2'>Select Date</label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          className='w-full p-2 border border-gray-300 rounded'
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
        />
      </div>
      <div className='flex space-x-4'>
      <Button type="button" icon={'/visible.svg'} title="View" variant="btn_view" clickEvent={handleZoomToLocation} />
      <Button type="button" icon={'/remove.svg'} title="Clear all" variant="btn_download" clickEvent={handleClearAll} />
      </div>
      </div>
  )
}

export default Mapcontrol;