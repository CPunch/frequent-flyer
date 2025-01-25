import React from "react";
import mapboxgl from 'mapbox-gl';
import MapboxExample from "../map.jsx"; 
import 'mapbox-gl/dist/mapbox-gl.css';

const App = () => {
  return (
    <div>
      <div className="text-bold text-center text-3xl">hiiii :D</div>
      <div style={{height: "500px"}}>
        <MapboxExample />
      </div>
    </div>
  );
};

export default App;