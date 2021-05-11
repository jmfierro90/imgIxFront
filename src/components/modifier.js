import React from 'react'


export const Modifier = (props) => {
    return (
       
        <li className="input-group input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-sm">{props.parametro}</span>
            </div>
            <input id={props.parametro} type="number" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"></input>
        </li>

    )
}

export const RangeModifier = (props) => {
    const [ value, setValue ] = React.useState(0);
    return (
        
       
        <li className="input-group input-group mb-3">
            <div className="input-group-prepend w-100">
                <span className="input-group-text w-100" id="inputGroup-sizing-sm">{props.parametro}: {value}{props.formato}</span>
            </div>
            <div className="bg-light rounded" id="rangeSlider"><input type="range" min={props.min} max={props.max} id={props.parametro} value={value} onChange={e => setValue(e.target.value)} /></div>
        </li>

    )
}

export const SelectModifier = (props) => {

    return (
         
        <div className="selectMod mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-sm">{props.parametro}</span>
            </div>
            <select className="form-control" id={props.parametro}>
                {props.options.map(
                    (i) => <option key={i}>{i}</option>
                )}
            </select>
        </div>

    )
}
