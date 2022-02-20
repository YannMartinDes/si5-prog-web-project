import { Route, Routes } from 'react-router-dom';
import MapPage from './components/pages/Map.page';
import ChartPage from './components/pages/Chart.page';

function App() {

  return (
    <Routes >
      <Route path='/*' element={<MapPage/>}/>
      <Route path='/chart' element={<ChartPage/>}/>
    </Routes>
  );

}

export default App;
