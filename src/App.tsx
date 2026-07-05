import { useState } from 'react';
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
    isSynced,
    setDrawingMode,
    setSelectedMarkerId,
    addMarker,
    removeMarker,
    addPolygonVertex,
    clearAll,
    save,
    loadState,
  } = useMapState();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="app">
      <Sidebar
        markers={markers}
        polygon={polygon}
        selectedMarkerId={selectedMarkerId}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((c) => !c)}
        onSelectMarker={setSelectedMarkerId}
        onRemoveMarker={removeMarker}
      />

      <main className="app__main">
        <Toolbar
          drawingMode={drawingMode}
          markers={markers}
          polygon={polygon}
          isSynced={isSynced}
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
