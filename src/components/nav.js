import React from 'react'
import ImgSelect from './imgSelect';
import Editor from './editor';

const Nav = (props) => {


    return (
            <div id="nav">
                    <nav>
                        <ul className="pl-4 pr-4 mt-2">
                            <li className="text-center">
                                <span>Choose Img</span>
                                <hr className="mt-1 mb-2 w-75 mx-auto"></hr>
                                <ImgSelect />
                            </li>                    
                        </ul>
                        <Editor/>
                    </nav>
            </div>
    )
}

export default Nav