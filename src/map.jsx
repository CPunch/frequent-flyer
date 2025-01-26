import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const calculateMidpoint = (startLat, startLong, endLat, endLong) => {
  const midLat = (startLat + endLat) / 2;
  const midLong = (startLong + endLong) / 2;
  return [midLong, midLat];
}

const calculateZoom = (startLat, startLong, endLat, endLong) => {
  
}

const Mapbox = ({ className, startLat, startLong, endLat, endLong }) => {
  const mapContainerRef = useRef();
  const mapRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;

    if (!startLat || !startLong || !endLat || !endLong) {
      return;
    }

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: calculateMidpoint(startLat, startLong, endLat, endLong), // starting position [lng, lat]
      style: 'mapbox://styles/mapbox/dark-v11',
      zoom: 1 // starting zoom
    });

    map.on('load', () => {
      // Set marker options.
      const startMarker = new mapboxgl.Marker({
        color: "#FFFFFF",
        draggable: false
      }).setLngLat([startLong, startLat])
        .addTo(map);
  
      const endMarker = new mapboxgl.Marker({
        color: "#FFFFFF",
        draggable: false
      }).setLngLat([endLong, endLat])
        .addTo(map);
  
      // Define the GeoJSON for the line
      const line = {
        'type': 'FeatureCollection',
        'features': [{
          'type': 'Feature',
          'geometry': {
            'type': 'LineString',
            'coordinates': [
              [startLong, startLat], // Point 1 [lng, lat]
              [endLong, endLat]  // Point 2 [lng, lat]
            ]
          }
        }]
      };
  
      // Add the GeoJSON source to the map
      map.addSource('line', {
        'type': 'geojson',
        'data': line
      });
  
      // Add a layer to render the line
      map.addLayer({
        'id': 'line-layer',
        'type': 'line',
        'source': 'line',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': '#FF0000', // Red color
          'line-width': 4 // Line width
        }
      });

      const bounds = new mapboxgl.LngLatBounds(
        new mapboxgl.LngLat(startLong, startLat),
        new mapboxgl.LngLat(endLong, endLat)
      );
      // Fit the map to the bounds with optional padding
      map.fitBounds(bounds, { padding: 100 });
    })

    // Cleanup map on unmount
    mapRef.current = map;
    return () => mapRef.current.remove();
  }, [startLat, startLong, endLat, endLong]);

  return (
    <div className={`relative flex justify-center items-center ${className}`}>
      <div
        ref={mapContainerRef}
        className="border-2 border-solid flex-.5 w-full h-full bg-zinc-900 relative shadow-lg"
      />
    </div>
  );
};


export default Mapbox;