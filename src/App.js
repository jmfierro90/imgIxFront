import React from 'react';


import './App.css';
import './scss/style.css'

import Nav from './components/nav.js'
import Canvas from './components/canvas.js'

function App() {

  return (
    <div className="App bg-dark">

      <div className="bg-head p-1">
        <h4 className="text-left">Imgix</h4>
      </div>

      <div className="row">
        <div className="col-sm-12 col-md-9" id="canvasCont"><Canvas /></div>
        <div className="col-sm-12 col-md-3" id="navCont"><Nav/></div>
        
      </div>
    </div>
  );
}

export default App;
