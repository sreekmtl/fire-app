import TileLayer from 'ol/layer/Tile';
import {XYZ,OSM, TileWMS} from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Circle , Fill, Stroke, Style } from 'ol/style';


const EsriLayers={
  'World_Basemap_v2':'World_Basemap_v2',
  'World_Topo_Map':'World_Topo_Map',
  'World_Street_Map':'World_Street_Map',
  'World_Hillshade':'Elevation/World_Hillshade',
  'World_Ocean_Base': 'Ocean/World_Ocean_Base',
  'World_Imagery': 'World_Imagery'
  };

class Sources{
    
  constructor(){

        this.OSM_Standard= new OSM();

        this.OSM_Humanitarian= new XYZ({
            url: 'https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
  
          });

          this.EsriMaps= new XYZ({
            url: 'https://services.arcgisonline.com/arcgis/rest/services/'+EsriLayers['World_Imagery']+'/MapServer/MapServer/tile/{z}/{y}/{x}',
  
          });

          this.nbr= new TileLayer({
            source:new TileWMS({
            url: 'http://localhost:8080/geoserver/tiger/wms?SERVICE=WMS',
            params: {'LAYERS': 'Apoly_landmarks', 
            'TILED': true,
            'VERSION':'1.1.0',
            'BBOX':'-74.068, 40.649, -73.886, 40.912',
            'SRS':'EPSG:4326',
            'WIDTH':256,
            'HEIGHT':256,
            'FORMAT':'image/png'
  
          },
            serverType: 'geoserver',
            //crossOrigin: 'Anonymous',
          })
          })

 }

  overlayWFS(layer){
    console.log(layer);
      let geojsonUrl='/api/geoserver/fireDetection/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=fireDetection%3A'+layer+'&maxFeatures=50&outputFormat=application%2Fjson';
      const vectorSource = new VectorSource({
        format: new GeoJSON({
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857', 
        }),
        url: geojsonUrl,
      });
    
      // Create a vector layer using the vector source
      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      vectorLayer.setStyle(
        new Style({
          image: new Circle({
            radius: 7,
            fill: new Fill({
              color: 'rgba(255, 0, 0, 1)', 
            }),
            stroke: new Stroke({
              color: 'rgba(0, 0, 0, 1)', 
              width: 2,
            }),
          }),
        })
      )

      return vectorLayer;

  }

  overlayWMS(layer){
    return new TileLayer({
      source:new TileWMS({
      url: 'http://localhost:8080/geoserver/fireDetection/wms?SERVICE=WMS',
      params: {'LAYERS': layer, 
      'TILED': true,
      'VERSION':'1.1.1',
      //'BBOX':'-74.068, 40.649, -73.886, 40.912',
      'SRS':'EPSG:4326',
      'WIDTH':256,
      'HEIGHT':256,
      'FORMAT':'image/png'

    },
      serverType: 'geoserver',
      //crossOrigin: 'Anonymous',
    })
    })
  }

}

export default Sources;