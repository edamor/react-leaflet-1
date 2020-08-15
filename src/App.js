import React, { useState, useRef } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';



const JAWG_MAPS_ATTRIBUTION = '<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank" >&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const JAWG_MAPS_URL = 'https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token=lNxq0pQhFu6KYGsBMZGR7jpptBymkekJPuabpa0gWBWFbbqSpKfLU4OcE8yt3nH2';

export const security = new L.Icon({
  iconUrl: './shield.png',
  iconRetinaUrl: './shield.png',
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
  iconSize: [40, 40],
  shadowUrl: './shield-shadow.png',
  shadowSize: [29, 40],
  shadowAnchor: [7, 40],
})



function App() {

  let mapRef = useRef(true);

  let center = { lat: 14.594215561943921, lng: 120.97045898437501 };
  let [latLng, setLatLng] = useState([{ lat: 14.594215561943921, lng: 120.97045898437501 }]);



  const handleClick = (e) => {
    let map = mapRef.current;
    if (map !== true) {
      setLatLng([...latLng, {lat: e.latlng.lat, lng: e.latlng.lng}]);
      
    }  
  }

  
  const showPins = latLng.map((item,index) => {
      if (index !== 0) {
        return <Marker key={index} position={item} icon={security} />
      } else return <div key={index}></div>;
  })

  return (
    <div id="main">
      <Map
        id="map"
        center={center}
        length={4}
        onClick={handleClick}
        ref={mapRef}
        zoom={12}
        subdomains={'abcd'}
        >
        <TileLayer
          attribution={JAWG_MAPS_ATTRIBUTION}
          url={JAWG_MAPS_URL}
        />
        {showPins}
      </Map>
    </div>
  );
}

export default App;
