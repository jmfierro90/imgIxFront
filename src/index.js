import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import {createStore} from 'redux';
import {Provider} from 'react-redux';

//------------------------REDUCER-------------------------------------------
const initialStoreState = {history:false, imgUrl: "",current:{}, 
                          param:{width:700,height:500,flip:"none",orient: "none",rot:0,bri:0,con:0,exp:0,gam:0,high:0,hue:0,invert:false,sat:0,shad:0,sharp:0,usm:0,usmrad:0,vib:0},
                          prev:{width:700,height:500,flip:"none",orient: "none",rot:0,bri:0,con:0,exp:0,gam:0,high:0,hue:0,invert:false,sat:0,shad:0,sharp:0,usm:0,usmrad:0,vib:0}}
const reducer = (state = initialStoreState, action)=>{
  switch (action.type){

    case "IMGURL":
      return {
        ...state,
        imgUrl: action.payload,
      };

    case "IMGTRANS":
      return {
        ...state,
        param:{
          ...state.param,
          width: action.payload.width,
          height: action.payload.height,
        }
      };
    case "IMGROT":
      return {
        ...state,
        param:{
          ...state.param,
          rot: action.payload.rot,
          orient:action.payload.orient,
          flip: action.payload.flip
        }
      }
    case "IMGADJ":
      return {
        ...state,
        param:{
          ...state.param,
          bri:action.payload.bri,
          con:action.payload.con,
          exp:action.payload.exp,
          gam:action.payload.gam,
          high:action.payload.high,
          hue:action.payload.hue,
          invert:action.payload.invert,
          sat:action.payload.sat,
          shad:action.payload.shad,
          sharp:action.payload.sharp,
          usm:action.payload.usm,
          usmrad:action.payload.usmrad,
          vib:action.payload.vib
        }
      }
    case "HISTORY":
      return {
        ...state,
        history: action.payload
      }
    case "UNDO":
      return{
        ...state,
        param: action.payload
      }
    case "REDO":
      return{
        ...state,
        param: action.payload
      }
    case "CURRENT":
      return{
        ...state,
        current: action.payload,
      }

    default:
      return state;
  }
}

const currentStateAction = (param) =>{
    return {
        type: "CURRENT",
        payload: param,
  }
}

//------------------------STORE-------------------------------------------
const store = createStore(reducer);
console.log('Estado inicial', store.getState())
store.subscribe(()=>{ 
                      Object.size = function(obj) {
                        var size = 0,
                          key;
                        for (key in obj) {
                          if (obj.hasOwnProperty(key)) size++;
                        }
                        return size;
                      };

                      let currentObjSize = Object.size(store.getState().current)
                      let current = JSON.stringify(store.getState().current)
                      let param = JSON.stringify(store.getState().param)
                      let prev = JSON.stringify(store.getState().prev)
                      

                      if(param !== prev && param !== current){
                        
                        store.dispatch(currentStateAction(store.getState().param))
                      }
                      
                      console.log("Cambio el estado", store.getState())
                    })




ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();
reportWebVitals();
