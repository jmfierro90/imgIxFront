import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

const  ImgSelect = (props) => {

    const [images, setImages] = useState([])

    useEffect(()=>{
        axios.get('https://storage.googleapis.com/nanlabs-engineering-technical-interviews/imgix-samples-list.json')
            .then(res=>{
               
                setImages(res.data)
            })
            .catch(error =>{
                console.log(error)
            })
    },[])

    const changeImgUrl = (url)=>{
        return {
            type: "IMGURL",
            payload: url
        }
    }

    const handleSelect = (e)=>{
        props.dispatch(changeImgUrl(e.target.value))

    }

    return (
        
            <select onChange={handleSelect} className="form-control">
                <option value="">Choose an image</option>
                {images.map(image => <option key={image.url} value={image.url}>{image.name}</option>)}
                
            </select>
        
    )
}


export default connect()(ImgSelect);
