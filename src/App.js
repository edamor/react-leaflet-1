import React, { useState, useRef } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import shield from './shield.png';
import shieldShadow from './shield-shadow.png';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';



const JAWG_MAPS_ATTRIBUTION = '<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank" >&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const JAWG_MAPS_URL = 'https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token=lNxq0pQhFu6KYGsBMZGR7jpptBymkekJPuabpa0gWBWFbbqSpKfLU4OcE8yt3nH2';
const OPEN_SEARCH_NOMINATIM_API = 'http://open.mapquestapi.com/nominatim/v1/reverse.php?key=SGGb10bl30OdYVP4VhMt0AqyrBCz4T5R&format=json&'

export const security = new L.Icon({
  iconUrl: shield,
  iconRetinaUrl: shield,
  iconAnchor: [22, 43],
  popupAnchor: [0, -35],
  iconSize: [40, 40],
  shadowUrl: shieldShadow,
  shadowSize: [29, 40],
  shadowAnchor: [8, 42],
})



function App() {

  let mapRef = useRef(true);

  let center = { lat: 14.588235065060537, lng: 121.0192108154297 };
  let [markerData, setMarkerData] = useState([]);


  const mapMarkers = () => {
    if (markerData.length === 0) {
      return;
    } else return (
      markerData.map((item, index) => {
        return (
          <Marker key={item.id} position={item.coordinates} icon={security} >
            <Popup
              minWidth={256}
              className="popup-component"
            >
              {
                `
                  ${item.address.road ? item.address.road 
                  : item.address.suburb ? item.address.suburb  
                  : item.address.neighbourhood ? item.address.neighbourhood 
                  : "Somewhere"  }, 
                  ${item.address.county ? item.address.county : item.address.city}, 
                  ${item.address.region ? item.address.region : item.address.state} 
                `
              }
            </Popup>
          </Marker>
        )
      })
    )
  }


  const fetchAddress = async (x, y) => {
    let API = `${OPEN_SEARCH_NOMINATIM_API}lat=${x}&lon=${y}`
    let response;
    try {
      response = await fetch(API)
    } catch (e) {
      console.log(e);
      alert('Please check your internet connection');
    }
    if (response !== undefined) {
      if (!response.ok) {
        console.log("response status: " + response.status);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let data = await response.json();
      let setThis = {
        id: data.place_id,
        address: data.address,
        coordinates: {
          lat: x,
          lng: y
        }
      }
      setMarkerData([...markerData, setThis])
    }
  }
  
  const handleClick = (e) => {fetchAddress(e.latlng.lat, e.latlng.lng)};
  
  return (
    <div id="main">
      <Map
        id="map"
        center={center}
        length={4}
        onClick={handleClick}
        ref={mapRef}
        zoom={10}
        subdomains={'abcd'}
        >
        <TileLayer
          attribution={JAWG_MAPS_ATTRIBUTION}
          url={JAWG_MAPS_URL}
          />
        {mapMarkers()}
      </Map>
    </div>
  );
}

export default App;
