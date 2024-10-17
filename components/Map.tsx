"use client";

import { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, DrawingManager, Polygon, Polyline, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 33.5902,
  lng: 130.4017
};

const libraries: ("drawing")[] = ["drawing"];

type MapProps = {
  userType: 'municipality' | 'operator' | 'resident';
  isEditing: boolean;
};

export default function Map({ userType, isEditing }: MapProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAWgeoLW_h-AoDEz1VDrl4TuamvZA4XZic",
    libraries: libraries
  });

  const [map, setMap] = useState(null);
  const [polygons, setPolygons] = useState<google.maps.Polygon[]>([]);
  const [polylines, setPolylines] = useState<google.maps.Polyline[]>([]);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

  const drawingManagerRef = useRef<google.maps.drawing.DrawingManager | null>(null);

  const onLoad = useCallback(function callback(map: any) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const onDrawingManagerLoad = (drawingManager: google.maps.drawing.DrawingManager) => {
    drawingManagerRef.current = drawingManager;
  };

  const onPolygonComplete = (polygon: google.maps.Polygon) => {
    polygon.setOptions({
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      strokeColor: '#FF0000',
      strokeWeight: 2
    });
    setPolygons([...polygons, polygon]);
  };

  const onPolylineComplete = (polyline: google.maps.Polyline) => {
    polyline.setOptions({
      strokeColor: '#0000FF',
      strokeWeight: 3
    });
    setPolylines([...polylines, polyline]);
  };

  const onMarkerComplete = (marker: google.maps.Marker) => {
    setMarkers([...markers, marker]);
  };

  const getDrawingMode = () => {
    if (!isEditing) return null;
    switch (userType) {
      case 'municipality':
        return google.maps.drawing.OverlayType.POLYGON;
      case 'operator':
        return google.maps.drawing.OverlayType.POLYLINE;
      case 'resident':
        return google.maps.drawing.OverlayType.MARKER;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (drawingManagerRef.current) {
      drawingManagerRef.current.setDrawingMode(getDrawingMode());
      drawingManagerRef.current.setOptions({
        polygonOptions: {
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          strokeColor: '#FF0000',
          strokeWeight: 2,
          editable: isEditing
        },
        polylineOptions: {
          strokeColor: '#0000FF',
          strokeWeight: 3,
          editable: isEditing
        }
      });
    }
  }, [isEditing, userType]);

  useEffect(() => {
    polygons.forEach(polygon => polygon.setEditable(isEditing));
    polylines.forEach(polyline => polyline.setEditable(isEditing));
  }, [isEditing, polygons, polylines]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <DrawingManager
        onLoad={onDrawingManagerLoad}
        onPolygonComplete={onPolygonComplete}
        onPolylineComplete={onPolylineComplete}
        onMarkerComplete={onMarkerComplete}
        options={{
          drawingMode: getDrawingMode(),
          drawingControl: false,
        }}
      />
      {polygons.map((polygon, index) => (
        <Polygon 
          key={`polygon-${index}`} 
          paths={polygon.getPath()} 
          options={{
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            strokeColor: '#FF0000',
            strokeWeight: 2,
            editable: isEditing
          }}
        />
      ))}
      {polylines.map((polyline, index) => (
        <Polyline 
          key={`polyline-${index}`} 
          path={polyline.getPath()} 
          options={{
            strokeColor: '#0000FF',
            strokeWeight: 3,
            editable: isEditing
          }}
        />
      ))}
      {markers.map((marker, index) => (
        <Marker key={`marker-${index}`} position={marker.getPosition()} />
      ))}
    </GoogleMap>
  ) : <></>;
}