import { Route, Routes } from 'react-router-dom';
import MapPage from './components/pages/map.page';
import ChartPage from './components/pages/chart.page';

function App() {

  return (
    <Routes >
      <Route path='/*' element={<MapPage/>}/>
      <Route path='/chart' element={<ChartPage/>}/>
    </Routes>
  );

}

export default App;
