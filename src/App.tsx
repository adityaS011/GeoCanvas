import MapView from './components/Map/MapView';
import Sidebar from './components/Sidebar/Sidebar';
import Toolbar from './components/Toolbar/Toolbar';
import { useMapState } from './hooks/useMapState';

export default function App() {
  const {
    markers,
    polygon,
    drawingMode,
    selectedMarkerId,
    setDrawingMode,
    setSelectedMarkerId,
    addMarker,
    removeMarker,
    addPolygonVertex,
    clearAll,
    save,
    loadState,
  } = useMapState();

  return (
    <div className="app">
      <Sidebar
        markers={markers}
        polygon={polygon}
        selectedMarkerId={selectedMarkerId}
        onSelectMarker={setSelectedMarkerId}
        onRemoveMarker={removeMarker}
      />

      <main className="app__main">
        <Toolbar
          drawingMode={drawingMode}
          markers={markers}
          polygon={polygon}
          onModeChange={setDrawingMode}
          onSave={save}
          onClear={clearAll}
          onLoadState={loadState}
        />

        <MapView
          markers={markers}
          polygon={polygon}
          drawingMode={drawingMode}
          selectedMarkerId={selectedMarkerId}
          onAddMarker={addMarker}
          onAddPolygonVertex={addPolygonVertex}
          onSelectMarker={setSelectedMarkerId}
        />
      </main>
    </div>
  );
}
