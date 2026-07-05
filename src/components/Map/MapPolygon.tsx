import { Layer, Source } from 'react-map-gl';
import type { PolygonData } from '../../types';

interface MapPolygonProps {
  polygon: PolygonData | null;
}

export default function MapPolygon({ polygon }: MapPolygonProps) {
  // Need at least 2 vertices to render anything visible
  if (!polygon || polygon.vertices.length < 2) return null;

  // A polygon can only be closed (and filled) once it has 3+ vertices.
  // With 2 vertices we render a dashed LineString as a visual guide.
  const isCloseable = polygon.vertices.length >= 3;
  const coordinates = isCloseable
    ? [...polygon.vertices, polygon.vertices[0]] // close the ring
    : polygon.vertices;

  // Switch geometry type based on whether the shape can be closed
  const geojson: GeoJSON.Feature = {
    type: 'Feature',
    properties: {},
    geometry: isCloseable
      ? { type: 'Polygon', coordinates: [coordinates] }
      : { type: 'LineString', coordinates },
  };

  // Separate source for vertex dots so they render on top of the polygon
  const vertexPoints: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: polygon.vertices.map((v, i) => ({
      type: 'Feature' as const,
      properties: { index: i },
      geometry: { type: 'Point' as const, coordinates: v },
    })),
  };

  return (
    <>
      <Source id="polygon-source" type="geojson" data={geojson}>
        {/* Fill layer only renders once the shape is closeable */}
        {isCloseable && (
          <Layer
            id="polygon-fill"
            type="fill"
            paint={{ 'fill-color': '#3b82f6', 'fill-opacity': 0.15 }}
          />
        )}
        {/* Solid outline when closed, dashed when still drawing */}
        <Layer
          id="polygon-outline"
          type="line"
          paint={{
            'line-color': '#3b82f6',
            'line-width': 2,
            'line-dasharray': isCloseable ? [1] : [2, 2],
          }}
        />
      </Source>

      {/* Vertex dots rendered as a separate source so they sit above the fill */}
      <Source id="vertex-source" type="geojson" data={vertexPoints}>
        <Layer
          id="polygon-vertices"
          type="circle"
          paint={{
            'circle-radius': 5,
            'circle-color': '#ffffff',
            'circle-stroke-color': '#3b82f6',
            'circle-stroke-width': 2,
          }}
        />
      </Source>
    </>
  );
}
