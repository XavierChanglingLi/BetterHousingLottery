import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {DataProvider} from './GlobalState'
import Header from './components/headers/Header'
import MainPages from './components/mainpages/Pages'
import FloorPlan from './components/headers/floorplan';


function App() {
  return (
    <DataProvider>
      <Router>
          <div className = "fp" style={{marginTop: "0px"}}>
              <FloorPlan/>
          </div>
        <div className="App">
          <Header />
          <MainPages />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
