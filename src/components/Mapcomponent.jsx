'use client'

import React, { useEffect, useState } from 'react';
import { Map, View } from 'ol';
import Sources from '@/mapOperations/sources';
import 'ol/ol.css';
import TileLayer from 'ol/layer/Tile';
import Overlay from 'ol/Overlay';

let src= new Sources();

function Mapcomponent({source, location, layer}){


    useEffect(()=>{
        const map= new Map({
            target:"map",
            layers:[new TileLayer({
                source:source,
            }),],
            view: new View({
                center:[0,0],
                zoom:0,
            }),
        });

        if (location) {
            const view = map.getView();
            view.setCenter(location);
            view.setZoom(8); 
        }

        if(layer){
            map.addLayer(layer);
        }


        return ()=> map.setTarget(null)
    }, [source, location]);

    

    return (
            <div id="map" className="map-container"/>
      );
}



export default Mapcomponent;