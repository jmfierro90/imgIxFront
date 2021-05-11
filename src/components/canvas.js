import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import ImgixClient from "@imgix/js-core";
import Imgix from 'react-imgix';

const Canvas = (props)=>{

    //----------------------------------------------------------URL GENERATOR
    const client = new ImgixClient({
        domain: 'assets.imgix.net',
        secureURLToken: '<SECURE TOKEN>',
      });
    const url = client.buildURL(props.imgUrl.substring(24), {   w: props.param.width, 
                                                                h: props.param.height,

                                                                flip: props.param.flip,
                                                                orient: props.param.orient,
                                                                rot: props.param.rot,
                                                                bri: props.param.bri,
                                                                con: props.param.con,
                                                                exp: props.param.exp,
                                                                gam: props.param.gam,
                                                                high: props.param.high,
                                                                hue: props.param.hue,
                                                                invert: props.param.invert,
                                                                sat: props.param.sat,
                                                                shad: props.param.shad,
                                                                sharp: props.param.sharp,
                                                                usm: props.param.usm,
                                                                usmrad: props.param.usmrad,
                                                                vib: props.param.vib  });
    //----------------------------------------------------------
    const undoAction = (param) =>{
        return {
            type: "UNDO",
            payload: param
        }
    }

    const redoAction = (param) => {
        return {
            type: "REDO",
            payload: param
        }
    }

    const handleUndo = () => {
       props.dispatch(undoAction(props.prev))
    }

    const handleRedo = () => {
        props.dispatch(redoAction(props.current))
    }

    const downloadImg = () => {
        downloadImage(url, props.imgUrl.substring(34))    
    }

    async function downloadImage(imageSrc, name) {
        const image = await fetch(imageSrc)
        const imageBlog = await image.blob()
        const imageURL = URL.createObjectURL(imageBlog)
      
        const link = document.createElement('a')
        link.href = imageURL
        link.download = name
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }

    return (
        <div id="canvas" className="row">

            {props.imgUrl === "" &&
            <div className="col-sm-12">
                <h1 className="text-secondary">Choose an image to edit</h1>
            </div>
            }

            {props.imgUrl !== "" &&
            <div  className="col-sm-12 img-cont">
                <Imgix
                
                src={props.imgUrl}
                width={props.param.width}
                height={props.param.height}
                imgixParams={{
                    w: props.param.width,
                    h: props.param.height,
                    flip: props.param.flip,
                    orient: props.param.orient,
                    rot: props.param.rot,
                    bri:props.param.bri,
                    con:props.param.con,
                    exp:props.param.exp,
                    gam:props.param.gam,
                    high:props.param.high,
                    hue:props.param.hue,
                    invert:props.param.invert,
                    sat:props.param.sat,
                    shad:props.param.shad,
                    sharp:props.param.sharp,
                    usm:props.param.usm,
                    usmrad:props.param.usmrad,
                    vib:props.param.vib
                }}
                />;
            </div>
            }

            {!props.history && props.imgUrl !== "" &&
                <div className="row mt-3" id="contBotonera">
                    <div className="col-sm-12">
                        <button onClick={downloadImg}className="btn btn-secondary">Download</button>
                    </div>
                    <div className="col-sm-12 mt-2 mb-3"><a className="text-secondary" target="_blank" href={url}>Open in new Tab</a></div>
                </div>
                }

                {props.history && props.imgUrl !== "" &&
                <div className="row mt-3" id="contBotonera">
                    <div className="col-sm-12">

                        <button onClick={handleUndo} style={{padding:"5px 10px"}} className="btn btn-secondary mr-3">
                            <span style={{verticalAlign:"middle"}} className="material-icons">undo</span>
                        </button>

                        <button onClick={downloadImg} className="btn btn-secondary">Download </button>
                        

                        <button onClick={handleRedo} style={{padding:"5px 10px"}} className="btn btn-secondary ml-3">
                            <span style={{verticalAlign:"middle"}} className="material-icons">redo</span>
                        </button>
                    </div>

                    <div className="col-sm-12 mt-2 mb-3"><a className="text-secondary" target="_blank" href={url}>Open in new Tab</a></div>
                </div>
                }
        </div>
    ) 
}

const mapStateToProps = (state) => ({
    imgUrl : state.imgUrl,
    current: state.current,
    prev: state.prev,
    param: state.param,
    history: state.history
})

export default connect(mapStateToProps)(Canvas)