import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Modifier, RangeModifier, SelectModifier} from './modifier';

const Editor = (props) => {

    //------------------------------------------------------inputs
    const initInputs = {modifiers: [], adjustMod:[], process:false, rangeMod:false, orientMod:false, invertMod:false, flipMod:false}
    const [input, setInput] = useState(initInputs)
    //-----------------------------------------------------------
    const orientOpt = [1,2,3,4,5,6,7,8,90,180,270]
    const flipOpt = ["none","h","v","hv"]

    const historyAction = (toggle)=>{
        return {
            type: "HISTORY",
            payload: toggle
        }
    }

    const transAction = (width, height)=>{

        return {
            type: "IMGTRANS",
            payload: {
                width: width,
                height: height,
            }
        }
    }
    
    const rotAction = (rot, orient, flip)=>{

        return {
            type: "IMGROT",
            payload: {
                rot: rot,
                orient: orient,
                flip: flip
            }
        }
    }

    const adjustAction = (bri, con, exp, gam, high, hue, invert, sat, shad, sharp, usm, usmrad, vib)=>{

        return {
            type: "IMGADJ",
            payload: {
                bri:bri,
                con:con,
                exp:exp,
                gam:gam,
                high:high,
                hue:hue,
                invert:invert,
                sat:sat,
                shad:shad,
                sharp:sharp,
                usm:usm,
                usmrad:usmrad,
                vib:vib
            }
        }
    }

    const handleModifier = () => {
        let newMod = document.getElementById("modSelect").value

        if(input.modifiers.includes(newMod) || input.adjustMod.some(e => e.name === newMod)){
            return
        }else{
            if(newMod === "rotation"){
                setInput({...input, rangeMod:true, process:true})
            }else if(newMod === "orient"){
                setInput({...input, orientMod:true, process:true})
            }else if(newMod === "invert"){
                setInput({...input, invertMod:true, process:true})
            }else if(newMod === "flip"){
                setInput({...input, flipMod:true, process:true})

            }else if(newMod === "brightness" || newMod === "contrast" || newMod === "exposure" || newMod === "gamma" || newMod === "saturation" || newMod === "unsharp" || newMod === "vibrance"){
                
                const newAdjustMod = [...input.adjustMod, {name: newMod, min:-100, max:100}]
                setInput({...input, adjustMod: newAdjustMod, process: true})

            }else if(newMod === "highlight"){

                const newAdjustMod = [...input.adjustMod, {name: newMod, min:-100, max:0}]
                setInput({...input, adjustMod: newAdjustMod, process: true})

            }else if(newMod === "hue"){

                const newAdjustMod = [...input.adjustMod, {name: newMod, min:0, max:360}]
                setInput({...input, adjustMod: newAdjustMod, process: true})
            
            }else if(newMod === "shadow" || newMod === "sharpen"){

                const newAdjustMod = [...input.adjustMod, {name: newMod, min:0, max:100}]
                setInput({...input, adjustMod: newAdjustMod, process: true})
            
            }else if(newMod === "unsharpRadius"){

                const newAdjustMod = [...input.adjustMod, {name: newMod, min:0, max:500}]
                setInput({...input, adjustMod: newAdjustMod, process: true})

            }else{
                const newModifiers = [...input.modifiers, newMod]
                setInput({...input, modifiers: newModifiers, process: true})
            }
        }
        
    }

    const handleProcess = () =>{

        if(input.modifiers.length === 0 && input.adjustMod.length === 0 && !input.rangeMod && !input.invertMod && !input.orientMod && !input.flipMod){
            return
        }else{

            if (document.body.contains(document.getElementById('width'))) {
                let newWidth = parseInt(document.getElementById('width').value)
                props.dispatch(transAction(newWidth, props.param.height))
              }
            if (document.body.contains(document.getElementById('height'))) {
                let newHeight = parseInt(document.getElementById('height').value)
                props.dispatch(transAction(props.param.width, newHeight))
            }

            if (document.body.contains(document.getElementById('rotation'))) {
                let newRot = parseInt(document.getElementById('rotation').value)
                props.dispatch(rotAction(newRot, props.param.orient, props.param.flip))
            }

            if (document.body.contains(document.getElementById('orient'))) {
                let newOrient = document.getElementById('orient').value
                props.dispatch(rotAction(props.param.rot, newOrient, props.param.flip))
            }

            if (document.body.contains(document.getElementById('flip'))) {
                let newFlip = document.getElementById('flip').value
                props.dispatch(rotAction(props.param.rot, props.param.orient, newFlip))
            }

            if (document.body.contains(document.getElementById('brightness'))){
                let newAdj = parseInt(document.getElementById('brightness').value)
                props.dispatch(adjustAction(newAdj, props.param.con, props.param.exp, props.param.gam, props.param.high, props.param.hue, props.param.invert, props.param.sat, props.param.shad, props.param.sharp, props.param.usm, props.param.usmrad, props.param.vib))
            }

            if (document.body.contains(document.getElementById('contrast'))){
                let newAdj = parseInt(document.getElementById('contrast').value)
                props.dispatch(adjustAction(props.param.bri, newAdj, props.param.exp, props.param.gam, props.param.high, props.param.hue, props.param.invert, props.param.sat, props.param.shad, props.param.sharp, props.param.usm, props.param.usmrad, props.param.vib))
            }

            if (document.body.contains(document.getElementById('exposure'))){
                let newAdj = parseInt(document.getElementById('exposure').value)
                props.dispatch(adjustAction(props.param.bri, props.param.con, newAdj, props.param.gam, props.param.high, props.param.hue, props.param.invert, props.param.sat, props.param.shad, props.param.sharp, props.param.usm, props.param.usmrad, props.param.vib))
            }

            if (document.body.contains(document.getElementById('gamma'))){
                let newAdj = parseInt(document.getElementById('gamma').value)
                props.dispatch(adjustAction(props.param.bri, props.param.con, props.param.exp, newAdj, props.param.high, props.param.hue, props.param.invert, props.param.sat, props.param.shad, props.param.sharp, props.param.usm, props.param.usmrad, props.param.vib))
            }

            if (document.body.contains(document.getElementById('saturation'))){
                let newAdj = parseInt(document.getElementById('saturation').value)
                props.dispatch(adjustAction(props.param.bri, props.param.con, props.param.exp, props.param.gam, props.param.high, props.param.hue, props.param.invert, newAdj, props.param.shad, props.param.sharp, props.param.usm, props.param.usmrad, props.param.vib))
            }

            if (document.body.contains(document.getElementById('highlight'))){
                let newAdj = parseInt(document.getElementById('highlight').value)
                props.dispatch(adjustAction(props.param.bri, props.param.con, props.param.exp, props.param.gam, newAdj, props.param.hue, props.param.invert, props.param.sat, props.param.shad, props.param.sharp, props.param.usm, props.param.usmrad, props.param.vib))
            }

            if (document.body.contains(document.getElementById('hue'))){
                let newAdj = parseInt(document.getElementById('hue').value)
                props.dispatch(adjustAction(props.param.bri, props.param.con, props.param.exp, props.param.gam, props.param.high, newAdj, props.param.invert, props.param.sat, props.param.shad, props.param.sharp, props.param.usm, props.param.usmrad, props.param.vib))
            }

            if (document.body.contains(document.getElementById('shadow'))){
                let newAdj = parseInt(document.getElementById('shadow').value)
                props.dispatch(adjustAction(props.param.bri, props.param.con, props.param.exp, props.param.gam, props.param.high, props.param.hue, props.param.invert, props.param.sat, newAdj, props.param.sharp, props.param.usm, props.param.usmrad, props.param.vib))
            }

            if (document.body.contains(document.getElementById('sharpen'))){
                let newAdj = parseInt(document.getElementById('sharpen').value)
                props.dispatch(adjustAction(props.param.bri, props.param.con, props.param.exp, props.param.gam, props.param.high, props.param.hue, props.param.invert, props.param.sat, props.param.shad, newAdj, props.param.usm, props.param.usmrad, props.param.vib))
            }

            if (document.body.contains(document.getElementById('unsharp'))){
                let newAdj = parseInt(document.getElementById('unsharp').value)
                props.dispatch(adjustAction(props.param.bri, props.param.con, props.param.exp, props.param.gam, props.param.high, props.param.hue, props.param.invert, props.param.sat, props.param.shad, props.param.sharp, newAdj, props.param.usmrad, props.param.vib))
            }

            if (document.body.contains(document.getElementById('unsharpRadius'))){
                let newAdj = parseInt(document.getElementById('unsharpRadius').value)
                props.dispatch(adjustAction(props.param.bri, props.param.con, props.param.exp, props.param.gam, props.param.high, props.param.hue, props.param.invert, props.param.sat, props.param.shad, props.param.sharp, props.param.usm, newAdj, props.param.vib))
            }

            if (document.body.contains(document.getElementById('vibrance'))){
                let newAdj = parseInt(document.getElementById('vibrance').value)
                props.dispatch(adjustAction(props.param.bri, props.param.con, props.param.exp, props.param.gam, props.param.high, props.param.hue, props.param.invert, props.param.sat, props.param.shad, props.param.sharp, props.param.usm, props.param.usmrad, newAdj))
            }

            if (document.body.contains(document.getElementById('invert'))){
                let contenedor = document.getElementById('invert').value
                let newAdj = false
                if(contenedor === "true"){newAdj = true}
                props.dispatch(adjustAction(props.param.bri, props.param.con, props.param.exp, props.param.gam, props.param.high, props.param.hue, newAdj, props.param.sat, props.param.shad, props.param.sharp, props.param.usm, props.param.usmrad, props.param.vib))
            }
            
            props.dispatch(historyAction(true))

            //props.dispatch(currentStateAction(props.param))
        }
    }
    
    return (
        <ul className="text-center pl-4 pr-4" id="editor">

                <li>
                    <span className="text-left">Edit Img</span>
                    <hr className="mt-1 mb-2 w-75 mx-auto"></hr>
                    <select className="form-control" id="modSelect">
                        <option>width</option>
                        <option>height</option>
                        <option>flip</option>
                        <option>rotation</option>
                        <option>orient</option>
                        
                        <option>brightness</option>
                        <option>contrast</option>
                        <option>exposure</option>
                        <option>gamma</option>
                        <option>saturation</option>

                        <option>highlight</option>
                        <option>hue</option>
                        <option>invert</option>
                        
                        <option>shadow</option>
                        <option>sharpen</option>
                        <option>unsharp</option>
                        <option>unsharpRadius</option>
                        <option>vibrance</option>
                    </select>
                </li>

                <li className="mt-3 mb-3">
                    <button onClick={handleModifier}  className="btn btn-secondary">Add Operation</button>
                    <hr className="mt-3 mb-2 w-75 mx-auto"></hr>
                </li>

                {input.modifiers.length !== 0 &&
                    input.modifiers.map(
                        (modifier, i) => <Modifier key={i} parametro={modifier} />
                    )
                }

                {input.adjustMod.length !== 0 &&
                    input.adjustMod.map(
                        (modifier, i) => <RangeModifier key={i} parametro={modifier.name} min={modifier.min} max={modifier.max} />
                    )
                }

                {input.rangeMod && <RangeModifier parametro="rotation" min="0" max="359" formato="°"/>}

                {input.orientMod && <SelectModifier parametro="orient" options={orientOpt}/>}
                
                {input.invertMod && <SelectModifier parametro="invert" options={["false", "true"]}/>}
                
                {input.flipMod && <SelectModifier parametro="flip" options={flipOpt}/>}

                {input.process && <li><button onClick={handleProcess} className="btn btn-secondary">Process</button></li>}

            </ul>
    )
}

const mapStateToProps = (state) => ({
    imgUrl : state.imgUrl,
    param: state.param,
})

export default connect(mapStateToProps)(Editor)
