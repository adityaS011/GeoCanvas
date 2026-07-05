import styled from 'styled-components';
import { useState } from 'react';
import MapView from './components/Map/MapView';
import Sidebar from './components/Sidebar/Sidebar';
import Toolbar from './components/Toolbar/Toolbar';
import { useMapState } from './hooks/useMapState';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const ContentRow = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  min-height: 0;
  @media (max-width: 768px) {
    flex-direction: column;
    overflow-y: auto;
  }
`;

export default function App() {
  const {
    markers, polygon, drawingMode, selectedMarkerId, isSynced,
    setDrawingMode, setSelectedMarkerId, addMarker, removeMarker,
    addPolygonVertex, clearAll, save, loadState,
  } = useMapState();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    () => typeof window !== 'undefined' && window.innerWidth <= 768
  );

  return (
    <AppContainer>
      <Toolbar
        drawingMode={drawingMode}
        markers={markers}
        polygon={polygon}
        onModeChange={setDrawingMode}
        onSave={save}
        onClear={clearAll}
        onLoadState={loadState}
      />
      <ContentRow>
        <Sidebar
          markers={markers}
          polygon={polygon}
          selectedMarkerId={selectedMarkerId}
          collapsed={sidebarCollapsed}
          isSynced={isSynced}
          onToggle={() => setSidebarCollapsed((c) => !c)}
          onSelectMarker={setSelectedMarkerId}
          onRemoveMarker={removeMarker}
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
      </ContentRow>
    </AppContainer>
  );
}
