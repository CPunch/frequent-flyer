import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxExample = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();
  const Token = 'pk.eyJ1Ijoic2V0aHRzdHViYnMiLCJhIjoiY202Y21tYzg2MGxyZDJrcHllMzMyYnY5dCJ9.KU9IvWK3Y58UKAFpc8u8LA';


  useEffect(() => {
    mapboxgl.accessToken = Token;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 5 // starting zoom
    });

    // Cleanup map on unmount
    return () => mapRef.current.remove();
  }, []);

  return (
    <div
      style={{ height: '100%' }}
      ref={mapContainerRef}
      className="map-container"
    />
  );
};


export default MapboxExample;