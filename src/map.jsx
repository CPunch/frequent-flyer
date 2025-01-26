import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxExample = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;

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
      className="relative h-[50vh] flex justify-center items-center"
      style={{
        backgroundImage: `url('/src/assets/cloud_background.png'), linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7))`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        ref={mapContainerRef}
        className="flex-.5 w-4/5 h-4/5 bg-white relative z-10 shadow-lg"
      />
    </div>
  );
};


export default MapboxExample;